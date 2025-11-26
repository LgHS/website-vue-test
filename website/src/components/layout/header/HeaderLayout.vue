<script setup>
import TopHeaderLayout from './TopHeaderLayout.vue';

const links = [
  { label: "Home", to: "/" },
  { label: "Agenda", to: "/agenda" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
]
</script>

<template>
  <header class="py-12 relative">
    <div>
      <TopHeaderLayout />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex items-center justify-center md:justify-start">
        <a href="/" title="Retour à la page d'accueil" class="block">
          <img src="@/assets/img/logo.svg" alt="Liège Hackerspace - Learn \ Make \ Share" class="h-32 w-auto">
        </a>
      </div>

      <nav class="flex items-center justify-center md:justify-end mt-8 md:mt-0">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to"
          class="inline-block uppercase font-bold px-2 py-2 hover:bg-black hover:text-white transition-colors">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>