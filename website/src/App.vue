<script setup>
import FooterLayout from './components/layout/FooterLayout.vue';
import GalleryLayout from './components/layout/gallery/GalleryLayout.vue';
import HeaderLayout from './components/layout/header/HeaderLayout.vue';
</script>

<template>
  <div class="mx-20 mb-10">
    <HeaderLayout />

    <RouterView />

    <GalleryLayout />

    <FooterLayout />
  </div>
</template>

<style scoped></style>
