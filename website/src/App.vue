<script setup>
import FooterLayout from './components/layout/FooterLayout.vue';
import GalleryLayout from './components/layout/gallery/GalleryLayout.vue';
import HeaderLayout from './components/layout/header/HeaderLayout.vue';
</script>

<template>
  <HeaderLayout />

  <RouterView />

  <GalleryLayout />

  <FooterLayout />
</template>

<style scoped></style>
