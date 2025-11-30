<script setup>
import ICalParser from '@/assets/js/ical-parser';

const icsUrl = import.meta.env.VITE_CALENDAR_ICS_URL
const parser = new ICalParser()

async function loadCalendar() {
  const res = await fetch(icsUrl)
  const text = await res.text()

  parser.parse(text)
  const events = parser.getUpcomingEvents(20)

  console.log(events)
}

loadCalendar()
</script>

<template>
  <article class="mb-6">
    <h3 class="bg-black text-white uppercase font-bold px-4 py-3 text-base mb-4">
      Agenda
    </h3>

    <p class="text-lg mb-3">
      Trouvez ci-dessous l'agenda du Liège Hackerspace pour les <strong>42 prochains jours</strong>.
    </p>
    <p class="text-sm text-gray-600">
      <em>Certains événements sont partiellement ou totalement indépendants du hackerspace mais organisés dans ses murs,
        souvent par ses membres.</em>
    </p>
    <div class="leading-relaxed">
      <h4>Open Night</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Mercredi 26 novembre</span>
        <span class="ml-4">🕐 16:00
          →
          22:00 </span>
      </p>

      <p class="text-sm">
        <b>Ouvert à tous!&nbsp; &nbsp;&nbsp;</b><i>Gratuit&nbsp; &nbsp; LgHs</i><br>Nous assurons l'accueil des
        visiteurs et des nouveaux membres chaque mercredi de 16h à 22h.<br>L'occasion parfaite de découvrir le
        hackerspace, ses membres, ses projets.
      </p>
      <h4>Linux Install Party (sur inscription)</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Samedi 29 novembre</span>
        <span class="ml-4">🕐 14:00
          →
          17:00 </span>
      </p>

      <p class="text-sm">
        <b>Sur inscription!</b>&nbsp; &nbsp;&nbsp;<i>PAF 3€</i>&nbsp; &nbsp; O<i>rganisé par un membre.</i><br>Cet
        événement n'est maintenu qu'en cas d'inscriptions suffisantes.<br><br><b>Inscription:&nbsp;<a
            href="mailto:lnux.ip.jhc@gmail.com" target="_blank"><u><u>lnux.ip.jhc@gmail.com</u></u></a></b>
      </p>
      <h4>Open Night</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Mercredi 3 décembre</span>
        <span class="ml-4">🕐 16:00
          →
          22:00 </span>
      </p>

      <p class="text-sm">
        <b>Ouvert à tous!&nbsp; &nbsp;&nbsp;</b><i>Gratuit&nbsp; &nbsp; LgHs</i><br>Nous assurons l'accueil des
        visiteurs et des nouveaux membres chaque mercredi de 16h à 22h.<br>L'occasion parfaite de découvrir le
        hackerspace, ses membres, ses projets.
      </p>
      <h4>Linux Meeting Party - Linux Liège Team</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Jeudi 4 décembre</span>
        <span class="ml-4">🕐 19:00
          →
          22:00 </span>
      </p>

      <p class="text-sm">
        <b>Ouvert à tous.&nbsp;</b><i>Gratuit organisé par&nbsp;LiLiT</i><br>Les Linux Meeting Parties (LMP) sont des
        rencontres informelles organisées par LiLiT dans nos locaux pour se rencontrer, pour discuter de GNU/Linux et
        des logiciels libres en général.
      </p>
      <h4>Open Night</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Mercredi 10 décembre</span>
        <span class="ml-4">🕐 16:00
          →
          22:00 </span>
      </p>

      <p class="text-sm">
        <b>Ouvert à tous!&nbsp; &nbsp;&nbsp;</b><i>Gratuit&nbsp; &nbsp; LgHs</i><br>Nous assurons l'accueil des
        visiteurs et des nouveaux membres chaque mercredi de 16h à 22h.<br>L'occasion parfaite de découvrir le
        hackerspace, ses membres, ses projets.
      </p>
      <h4>Samedi de fin d'année</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Samedi 13 décembre</span>
        <span class="ml-4">🕐 12:00
          →
          17:00 </span>
      </p>

      <p class="text-sm">
        <b>Réservé aux membres &amp; sympathisants*.</b><br>Le samedi après-midi rencontre inter-hackerspace et
        préparation de l'auberge espagnole de fin d'année.<br><br><i>*Anciens membres, visiteurs connus, autres
          hacker/maker/...spaces, voisins.</i>
      </p>
      <h4>Auberge espagnole de fin d'année</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Samedi 13 décembre</span>
        <span class="ml-4">🕐 17:00
          →
          23:00 </span>
      </p>

      <p class="text-sm">
        <b>Réservé aux membres &amp; sympathisants*.</b><br>Traditionnelle auberge espagnole de fin
        d'année.<br><br><i>*Anciens membres, visiteurs connus, autres hacker/maker/...spaces, voisins.</i>
      </p>
      <h4>Open Night - La dernière de l'année !</h4>
      <p class="text-sm text-gray-600">
        <span class="font-semibold">📅 Mercredi 17 décembre</span>
        <span class="ml-4">🕐 16:00
          →
          22:00 </span>
      </p>

      <p class="text-sm">
        <b>Ouvert à tous!&nbsp; &nbsp;&nbsp;</b><i>Gratuit&nbsp; &nbsp; LgHs</i><br>Nous assurons l'accueil des
        visiteurs et des nouveaux membres chaque mercredi de 16h à 22h.<br>L'occasion parfaite de découvrir le
        hackerspace, ses membres, ses projets.
      </p>
    </div>
    <div class="mt-8 p-4 bg-gray-50 border-2 border-black text-center">
      <p class="font-bold mb-3 text-lg">📆 S'abonner au calendrier</p>
      <p class="text-sm mb-4">Ajoutez notre calendrier à votre application préférée (Google Calendar, Apple Calendar,
        Outlook...)</p>
      <div class="bg-white border-2 border-black px-4 py-3 mb-3 inline-block">
        <code class="text-sm font-mono">https://lghs.be/calendar.php</code>
      </div>
      <button
        onclick="navigator.clipboard.writeText('https://lghs.be/calendar.php'); this.textContent='Copié !'; setTimeout(() =&gt; this.textContent='Copier l\'adresse', 2000)"
        class="inline-block bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors cursor-pointer">
        Copier l'adresse
      </button>
    </div>
  </article>
</template>