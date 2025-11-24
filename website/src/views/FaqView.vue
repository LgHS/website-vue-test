<script setup>
import faq from '@/assets/datas/faq-data.json'
</script>

<template>
  <h3 class="bg-black text-white uppercase font-bold px-4 py-3 text-base mb-4">
    Questions fréquentes
  </h3>

  <div>
    <div v-for="item in faq" :key="item.question" class="faq-item">
      <button class="faq-question">
        <span>{{ item.question }}</span>
      </button>
      <div class="faq-answer">
        <div>
          <p v-html="item.answer"></p>
        </div>
      </div>
    </div>
  </div>
</template>