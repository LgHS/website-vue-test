<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const selectedPhotos = ref([]) // reactive

function regenerateGallery() {
  const modules = import.meta.glob('@/assets/img/photos/*.jpg', { eager: true })
  const photos = Object.values(modules).map(m => m.default)

  // Shuffle
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[photos[i], photos[j]] = [photos[j], photos[i]]
  }

  selectedPhotos.value = photos.slice(0, 5)
}

onMounted(() => {
  regenerateGallery()
})

// Regenerate when route changes (needed because SPA)
watch(
  () => route.fullPath, // watch it
  () => { // on change...
    regenerateGallery()
  }
)
</script>


<template>
  <section class="hidden md:block p-12 bg-gray-100">
    <div class="max-w-screen-2xl mx-auto">
      <div class="grid grid-cols-4 lg:grid-cols-5 gap-4">

        <img v-for="(photo, index) in selectedPhotos" :key="photo" :src="photo" :class="[
          index === 4 ? 'hidden lg:block' : '',
          'w-full aspect-square object-cover hover:opacity-90 transition-opacity'
        ]" alt="" />

      </div>
    </div>
  </section>
</template>
