<script setup>
import FooterLayout from './components/layout/FooterLayout.vue';
import HeaderLayout from './components/layout/HeaderLayout.vue';
</script>

<template>
  <HeaderLayout />

  <RouterView />

  <FooterLayout />
</template>

<style scoped></style>
