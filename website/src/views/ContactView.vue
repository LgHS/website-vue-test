<script setup>
const bce = import.meta.env.VITE_CONTACT_BCE

const address = "Rue de la Loi 16 bis 4020 Liège"
const encodedAddress = encodeURIComponent(address)
const googleMapsUrl = "https://www.google.com/maps/search/?q="+encodedAddress

const tel = import.meta.env.VITE_CONTACT_TEL
const mailGeneral = import.meta.env.VITE_CONTACT_MAIL_GENERAL
const mailAdmin = import.meta.env.VITE_CONTACT_MAIL_ADMIN
const mailCctv = import.meta.env.VITE_CONTACT_MAIL_CCTV
const mailNoc = import.meta.env.VITE_CONTACT_MAIL_NOC
</script>

<template>
  <article class="mb-6">
    <h3 class="bg-black text-white uppercase font-bold px-4 py-3 text-base mb-4">
      Contact
    </h3>
    <div class="leading-relaxed">
      <div class="text-center my-6 py-4 bg-gray-50 dark:bg-black/50 border-2 border-black">
        <p class="font-bold mb-1">Liège Hackerspace ASBL</p>
        <p class="text-sm mb-1">{{ bce }}</p>
        <a :href="googleMapsUrl" target="_blank" rel="noopener" class="text-sm">
          Rue de la Loi 16 bis<br />4020 Liège, Belgique
        </a>
      </div>
      <p class="mb-4">
        Pour rappel, le hackerspace n'est pas un club de <i>"pirates informatiques"</i>. Nous ne réalisons aucune
        activité illégale, et il est inutile de nous contacter pour récupérer un compte, contourner une protection, ou
        "craquer" quoi que ce soit. Notre mission porte sur l'apprentissage, le partage d'un lieu et de connaissances.
      </p>
      <hr class="mb-4">
      <h4>Général</h4>
      <p class="mb-4"><b>Préférez toujours le mail général</b> pour nous joindre.
      </p>
      <ul>
        <li><b>Mail général:</b> <a :href="`mailto:${mailGeneral}`">{{ mailGeneral }}</a></li>
        <li><b>Téléphone:</b> <a :href="`tel:${tel}`">{{ tel }}</a></li>
      </ul>
      <p></p>
      <h4>Social</h4>
      <ul>
        <li><b>Facebook:</b> <a href="https://www.facebook.com/liegehackerspace/" target="_blank"
            rel="noopener">facebook.com/liegehackerspace/</a></li>
        <li><b>Instagram:</b> <a href="https://www.instagram.com/lghackerspace/" target="_blank"
            rel="noopener">instagram.com/lghackerspace/</a></li>
      </ul>
      <h4>Autres</h4>
      <p><em>Requêtes uniquement, nous n'avons pas besoin de consultants, services, ...</em></p>
      <ul>
        <li><b>Admin:</b> <a :href="`mailto:${mailAdmin}`">{{ mailAdmin }}</a></li>
        <li><b>Caméra &amp; RGPD:</b> <a :href="`mailto:${mailCctv}`">{{ mailCctv }}</a></li>
        <li><b>NOC &amp; Abuse:</b> <a :href="`mailto:${mailNoc}`">{{ mailNoc }}</a></li>
      </ul>
    </div>
  </article>
</template>