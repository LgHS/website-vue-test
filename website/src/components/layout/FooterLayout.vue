<script setup>
const bce = import.meta.env.VITE_BCE
const bceUrl = import.meta.env.VITE_BCE_URL
const contactMail = import.meta.env.VITE_CONTACT_MAIL_GENERAL

const icons = import.meta.glob('@/assets/img/social/*.svg', { // Social icons SVG must be there
  eager: true,
  import: 'default'
}) // Fetch all social icons by generating optimized images URLs, according to deployment environment

/**
 * Resolves icon path by filename.
 * @param filename The filename of the icon to resolve.
 */
function resolveIcon(filename) {
  return icons[`/src/assets/img/social/${filename}`]
}

const socialLinks = [
  {
    href: "https://www.facebook.com/liegehackerspace/",
    title: "Facebook",
    img: "facebook.svg",
    alt: "Facebook"
  },
  {
    href: "https://www.instagram.com/lghackerspace/",
    title: "Instagram",
    img: "instagram.svg",
    alt: "Instagram"
  },
  {
    href: "https://github.com/LgHS",
    title: "Github",
    img: "github.svg",
    alt: "Github"
  },
  {
    href: "https://hackerspaces.be/",
    title: "Hackerspaces",
    img: "spaceinvaders.svg",
    alt: "SpaceInvaders"
  },
  {
    href: "https://mapall.space/heatmap/show.php?id=Liege+Hackerspace",
    title: "mapall.space/heatmap",
    img: "heat.svg",
    alt: "Heatmap"
  },
  {
    href: "https://lghs.be/sapi",
    title: "SpaceAPI",
    img: "spaceapi.svg",
    alt: "Space API"
  },
]
</script>

<template>
  <footer class="mt-14 pt-4 text-center relative">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[200px] h-px bg-black"></div>
    <p class="text-sm mb-2 italic">
      Outremeuse - +350m2 - Découpe laser, Impression 3D, Craft, Couture, CNC, Travail du bois, Travail du métal,
      Rétro-ingénierie, Audio-visuel, Résidences, ...
    </p>
    <p class="text-sm mb-4">
      <b>Liège Hackerspace ASBL</b> - <a :href=bceUrl target="_blank" rel="noopener">{{ bce }}</a>
      <br><b>Mail:</b> <a :href="`mailto:${contactMail}`">{{ contactMail }}</a>
    </p>
    <nav class="mt-4">
      <ul class="flex justify-center items-center gap-3">
        <li v-for="socialLink in socialLinks" v-bind:key="socialLink.href">
          <a :href="socialLink.href" :title="socialLink.title" target="_blank" rel="noopener"
            class="block w-10 h-10 hover:opacity-70 transition-opacity">
            <img :src="resolveIcon(socialLink.img)" :alt="socialLink.alt" class="w-full h-full">
          </a>
        </li>
      </ul>
    </nav>
  </footer>
</template>
