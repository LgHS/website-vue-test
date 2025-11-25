<script setup>
import FooterLayout from './components/layout/FooterLayout.vue';

const links = [
  { label: "Home", to: "/" },
  { label: "Agenda", to: "/agenda" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
]
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/img/logo.svg" />

    <div class="wrapper">
      <nav class="flex flex-wrap justify-center md:justify-end gap-2">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to"
          class="inline-block uppercase font-bold px-2 py-2 hover:bg-black hover:text-white transition-colors">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <FooterLayout />
</template>

<style scoped></style>
