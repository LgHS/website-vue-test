<script setup>
import FooterLayout from './components/layout/FooterLayout.vue';
import HeaderLayout from './components/layout/header/HeaderLayout.vue';
</script>

<template>
  <HeaderLayout />

  <RouterView />

  <FooterLayout />
</template>

<style scoped></style>
