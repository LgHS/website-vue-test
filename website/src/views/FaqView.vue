<script setup>
import faq from '@/assets/datas/faq-data.json'
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primevue';
</script>

<template>
  <article class="mb-6">
    <h3 class="bg-black text-white uppercase font-bold px-4 py-3 text-base mb-4">
      Questions fréquentes
    </h3>

    <Accordion value="0">
      <AccordionPanel v-for="item in faq" :key="item.question" :value="item.question" class="faq-item">
        <AccordionHeader class="faq-question">
          {{ item.question }}
        </AccordionHeader>
        <AccordionContent class="faq-answer">
          <p v-html="item.answer"></p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </article>
</template>

<style scoped>
.faq-item {
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
}

.faq-question {
  transition: 0.3s;
  font-size: 1.125rem;
  font-weight: 700;
  background-color: #f9fafb;
}

.faq-question:hover {
  transition: 0.3s;
  font-size: 1.15rem;
}
</style>