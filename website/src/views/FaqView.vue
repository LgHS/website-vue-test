<script setup>
  import faq from '@/assets/datas/faq-data.json'
</script>

<template>
  <h1>FAQ</h1>

  <div>
    <div v-for="item in faq" :key="item.question">
      <h3>{{ item.question }}</h3>
      <p v-html="item.answer"></p>
    </div>
  </div>
</template>