'use strict'

export default class ICalParser {
  constructor() {
    this.events = []
  }

  /**
   * Parses raw ICS text content and extracts all VEVENT entries.
   * @param {string} icsContent - The raw ICS file content.
   * @returns {Array<Object>} A list of parsed calendar events.
   */
  parse(icsContent) {
    // Enlever seulement les retours chariots, PAS les espaces de début
    const lines = icsContent.split('\n')
    let currentEvent = null
    let currentProperty = ''

    for (let rawLine of lines) {
      let line = rawLine.replace(/\r$/, '')

      // Début d'un événement
      if (line.trim() === 'BEGIN:VEVENT') {
        currentEvent = {}
        continue
      }

      // Fin d'un événement
      if (line.trim() === 'END:VEVENT') {
        if (currentEvent) {
          this.events.push(currentEvent)
        }
        currentEvent = null
        continue
      }

      if (currentEvent) {
        // Lignes continuées (commençant par un espace ou tab)
        if (line.startsWith(' ') || line.startsWith('\t')) {
          if (currentProperty && currentEvent[currentProperty]) {
            // Ligne continuée : ajouter au contenu de la propriété précédente
            // Enlever SEULEMENT le premier caractère (l'espace de continuation)
            currentEvent[currentProperty] += line.substring(1)
          }
          continue
        }

        // Ligne normale avec propriété
        if (line.includes(':')) {
          const [property, value] = line.split(/:(.+)/)

          // Nettoyer le nom de propriété (enlever les paramètres mais les garder pour DTSTART)
          const propertyClean = property.split(';')[0]
          currentProperty = propertyClean

          // Garder la ligne complète pour DTSTART (avec timezone)
          if (propertyClean === 'DTSTART') {
            currentEvent['DTSTART_RAW'] = property
          }

          // Gérer les propriétés multiples (EXDATE, RDATE, etc.) comme tableaux
          if (propertyClean === 'EXDATE' || propertyClean === 'RDATE') {
            if (!currentEvent[propertyClean]) {
              currentEvent[propertyClean] = []
            }
            // Garder ligne complète
            currentEvent[propertyClean].push(property + ':' + value)
          } else {
            currentEvent[propertyClean] = value
          }
        }
      }
    }

    return this.events
  }

  /**
   * Returns upcoming simple and recurring events within a given time window.
   * @param {number} [limit=10] - Maximum number of events to return.
   * @param {number} [weeksAhead=12] - How many weeks ahead to look for occurrences.
   * @returns {Array<Object>} A sorted list of upcoming event occurrences.
   */
  getUpcomingEvents(limit = 10, weeksAhead = 12) {
    // Début de journée pour comparaison
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const maxDate = new Date(now)
    maxDate.setDate(maxDate.getDate() + weeksAhead * 7)

    const upcoming = []

    // Séparer les événements récurrents et les exceptions
    const recurringEvents = []
    const exceptions = {}
    const simpleEvents = []

    // Séparer simple / RRULE / exceptions
    for (const event of this.events) {
      if (!event.DTSTART) continue

      if (event['RECURRENCE-ID']) {
        // Événement exception - on le stocke pour remplacer l'occurrence
        if (!exceptions[event.UID]) exceptions[event.UID] = []
        exceptions[event.UID].push(event)
      } else if (event.RRULE) {
        // Événement récurrent
        recurringEvents.push(event)
      } else {
        // Événement simple
        simpleEvents.push(event)
      }
    }

    // Traiter les événements simples
    for (const event of simpleEvents) {
      const timezone = this.getTimezone(event)
      const start = this.parseDate(event.DTSTART, timezone)
      if (!start) continue

      if (start >= now) {
        upcoming.push({
          title: this.decodeText(event.SUMMARY || 'Sans titre'),
          description: this.decodeText(event.DESCRIPTION || ''),
          location: this.decodeText(event.LOCATION || ''),
          start,
          end: event.DTEND ? this.parseDate(event.DTEND, timezone) : null,
          url: event.URL || '',
          is_recurring: false,
        })
      }
    }

    // Traiter les événements récurrents
    for (const event of recurringEvents) {
      const occurrences = this.generateOccurrences(event, now, maxDate)

      // Pour chaque occurrence, vérifier s'il y a une exception
      for (let occ of occurrences) {
        const uid = event.UID
        const occDateKey = occ.start.toISOString().slice(0, 16)

        // Chercher une exception qui correspond
        if (exceptions[uid]) {
          for (const ex of exceptions[uid]) {
            // Parser RECURRENCE-ID
            let recurrenceId = ex['RECURRENCE-ID']
            const timezone = this.getTimezone(ex)

            // Nettoyer le RECURRENCE-ID (peut avoir TZID)
            if (recurrenceId.includes('TZID=') && recurrenceId.includes(':')) {
              recurrenceId = recurrenceId.split(':')[1]
            }

            const exDate = this.parseDate(recurrenceId, timezone)

            if (exDate && exDate.toISOString().slice(0, 16) === occDateKey) {
              occ = {
                title: this.decodeText(ex.SUMMARY || occ.title),
                description: this.decodeText(ex.DESCRIPTION || occ.description),
                location: this.decodeText(ex.LOCATION || occ.location),
                start: this.parseDate(ex.DTSTART, timezone),
                end: ex.DTEND ? this.parseDate(ex.DTEND, timezone) : occ.end,
                url: ex.URL || occ.url,
                is_recurring: true,
              }

              break
            }
          }
        }

        upcoming.push(occ)
      }
    }

    // Trier par date
    upcoming.sort((a, b) => a.start - b.start)

    return upcoming.slice(0, limit)
  }

  /**
   * Extracts the timezone from an event.
   * @param {Object} event - The event object containing DTSTART information.
   * @returns {string} The extracted timezone or "UTC" if none is defined.
   */
  getTimezone(event) {
    if (event.DTSTART_RAW && event.DTSTART_RAW.includes('TZID=')) {
      const match = event.DTSTART_RAW.match(/TZID=([^:]+)/)
      if (match) return match[1]
    }
    return 'UTC'
  }

  /**
   * Converts an RRULE string into a key–value object.
   * @param {string} rruleString - The RRULE definition from an ICS event.
   * @returns {Object} A parsed rule object containing FREQ, INTERVAL, BYDAY, etc.
   */
  parseRRule(str) {
    return Object.fromEntries(str.split(';').map((p) => p.split('=')))
  }

  /**
   * Generates all recurring occurrences of an event between two dates.
   * @param {Object} event - A parsed VEVENT containing RRULE and DTSTART.
   * @param {Date} startLimit - Earliest allowed occurrence date.
   * @param {Date} endLimit - Latest allowed occurrence date.
   * @returns {Array<Object>} A list of generated event occurrences.
   */
  generateOccurrences(event, startLimit, endLimit) {
    const occurrences = []

    // Extraire la timezone
    const timezone = this.getTimezone(event)

    // Parser la RRULE
    const rrule = this.parseRRule(event.RRULE)
    if (!rrule) return occurrences

    const dtstart = this.parseDate(event.DTSTART, timezone)
    if (!dtstart) return occurrences

    const dtend = event.DTEND ? this.parseDate(event.DTEND, timezone) : null
    const duration = dtend ? dtend - dtstart : null

    // Parser les dates d'exception (EXDATE)
    const exdates = []
    if (event.EXDATE) {
      const exdateValues = Array.isArray(event.EXDATE) ? event.EXDATE : [event.EXDATE]
      for (const exdateLine of exdateValues) {
        // Extraire la valeur de la ligne complète
        // Format: EXDATE;TZID=Europe/Brussels:20251224T160000
        let parts = exdateLine.split(':')[1]
        // Séparer les dates multiples (séparées par des virgules)
        for (let d of parts.split(',')) {
          const ex = this.parseDate(d.trim(), timezone)
          if (ex) {
            exdates.push(ex.toISOString().slice(0, 16))
          }
        }
      }
    }

    // Générer les occurrences selon la fréquence
    let current = new Date(dtstart)
    const maxOccurrences = 100 // Limite de sécurité

    for (let i = 0; i < maxOccurrences && current <= endLimit; i++) {
      // Vérifier si cette occurrence n'est pas dans les exceptions
      const key = current.toISOString().slice(0, 16)

      if (!exdates.includes(key) && current >= startLimit) {
        occurrences.push({
          title: this.decodeText(event.SUMMARY || 'Sans titre'),
          description: this.decodeText(event.DESCRIPTION || ''),
          location: this.decodeText(event.LOCATION || ''),
          start: new Date(current),
          end: duration ? new Date(current.getTime() + duration) : null,
          url: event.URL || '',
          is_recurring: true,
        })
      }

      // Calculer la prochaine occurrence
      if (rrule.FREQ === 'DAILY') {
        current.setDate(current.getDate() + (Number(rrule.INTERVAL) || 1))
      } else if (rrule.FREQ === 'WEEKLY') {
        current = this.getNextWeeklyOccurrence(current, rrule, dtstart)
      } else if (rrule.FREQ === 'MONTHLY') {
        current = this.getNextMonthlyOccurrence(current, rrule, dtstart)
      } else {
        // Fréquence non supportée
        break
      }
    }

    return occurrences
  }

  /**
   * Computes the next weekly occurrence based on RRULE settings.
   * @param {Date} current - The current occurrence date.
   * @param {Object} rrule - The parsed rrule object.
   * @param {Date} dtstart - The event's original DTSTART.
   * @returns {Date} The next weekly occurrence date.
   */
  getNextWeeklyOccurrence(current, rrule) {
    const days = {
      SU: 0,
      MO: 1,
      TU: 2,
      WE: 3,
      TH: 4,
      FR: 5,
      SA: 6,
    }

    const interval = Number(rrule.INTERVAL) || 1

    if (!rrule.BYDAY) {
      const next = new Date(current)
      next.setDate(next.getDate() + 7 * interval)
      return next
    }

    const daysList = rrule.BYDAY.split(',').map((d) => days[d])

    let next = new Date(current)
    next.setDate(next.getDate() + 1)

    for (let i = 0; i < 14; i++) {
      if (daysList.includes(next.getDay())) return next
      next.setDate(next.getDate() + 1)
    }

    return next
  }

  /**
   * Computes the next monthly occurrence based on RRULE configuration.
   * @param {Date} current - The current occurrence date.
   * @param {Object} rrule - Parsed rrule including BYDAY rules.
   * @param {Date} dtstart - The original DTSTART timestamp.
   * @returns {Date} The next monthly occurrence date.
   */
  getNextMonthlyOccurrence(current, rrule, dtstart) {
    const interval = Number(rrule.INTERVAL) || 1

    if (rrule.BYDAY) {
      const match = rrule.BYDAY.match(/(-?\d+)([A-Z]{2})/)
      if (match) {
        const order = Number(match[1])
        const code = match[2]

        const names = {
          SU: 'Sunday',
          MO: 'Monday',
          TU: 'Tuesday',
          WE: 'Wednesday',
          TH: 'Thursday',
          FR: 'Friday',
          SA: 'Saturday',
        }

        const dayName = names[code]

        let next = new Date(current)
        next.setMonth(next.getMonth() + interval)
        next.setDate(1)

        if (order > 0) {
          next = this.firstXofMonth(next, dayName, order)
        } else {
          next = this.lastXofMonth(next, dayName)
        }

        next.setHours(dtstart.getHours(), dtstart.getMinutes(), dtstart.getSeconds())

        return next
      }
    }

    const next = new Date(current)
    next.setMonth(next.getMonth() + interval)
    return next
  }

  firstXofMonth(date, dayName, order) {
    const d = new Date(date)
    d.setDate(1)

    while (d.toLocaleString('en-US', { weekday: 'long' }) !== dayName) {
      d.setDate(d.getDate() + 1)
    }

    d.setDate(d.getDate() + 7 * (order - 1))
    return d
  }

  lastXofMonth(date, dayName) {
    const d = new Date(date)
    d.setMonth(d.getMonth() + 1)
    d.setDate(0)

    while (d.toLocaleString('en-US', { weekday: 'long' }) !== dayName) {
      d.setDate(d.getDate() - 1)
    }

    return d
  }

  /**
   * Converts ICS date strings into JavaScript Date objects respecting timezones.
   * @param {string} dateString - Date in ICS format (YYYYMMDD or YYYYMMDDTHHmmss).
   * @param {string} [timezone="UTC"] - The timezone to parse the date into.
   * @returns {Date|null} A JavaScript Date object or null if invalid.
   */
  parseDate(str, timezone = 'UTC') {
    // Vérifier si la date est en UTC (finit par Z)
    const isUTC = str.endsWith('Z')
    // Format: 20251120T160000Z ou 20251120 ou 20251120T160000
    const clean = str.replace('T', '').replace('Z', '')

    let date = null

    if (clean.length === 8) {
      // Date seulement
      date = new Date(`${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}T00:00:00`)
    } else {
      date = new Date(
        // Date + heure
        `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}T` +
          `${clean.slice(8, 10)}:${clean.slice(10, 12)}:${clean.slice(12, 14)}`,
      )
    }

    // Si la date était en UTC et qu'on n'a pas déjà un timezone spécifique, convertir vers Europe/Brussels
    if (!isUTC && timezone !== 'UTC') {
      const dt = new Date(date.toLocaleString('en-US', { timeZone: timezone }))
      return dt
    }

    return date
  }

  /**
   * Decodes escaped ICS characters into their normal text equivalents.
   * @param {string} text - Raw escaped ICS text.
   * @returns {string} The unescaped, human-readable text.
   */
  decodeText(text) {
    // Décoder les caractères échappés
    // IMPORTANT: \, dans l'ICS signifie une vraie virgule (pas un séparateur)
    // On garde l'espace qui suit si présent
    return text.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';')
  }
}
