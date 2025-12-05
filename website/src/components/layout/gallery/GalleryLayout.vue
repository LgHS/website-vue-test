<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Galleria from 'primevue/galleria'

const route = useRoute()

const selectedPhotos = ref([])
const activePhotoIndex = ref(0)

const displayFullscreen = ref(false)

const windowWidth = ref(window.innerWidth);
// Computes columns count by breakpoint values
const nbColumns = computed(() => {
  if (windowWidth.value >= 1024) return 5; // lg:grid-cols-5
  if (windowWidth.value >= 768) return 4;  // md:grid-cols-4
  if (windowWidth.value >= 640) return 3;  // sm:grid-cols-3
  return 2; // default xs:grid-cols-2
});

// Display photos by columns count
const displayedPhotos = computed(() => {
  return selectedPhotos.value.slice(0, nbColumns.value);
});

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  console.log("windowWidth.value = "+windowWidth.value);
};

onMounted(() => {
  shufflePhotos() // Shuffles and selects
  window.addEventListener("resize", updateWidth);
})

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
})

// Shuffles at each route changes
watch(
  () => route.fullPath,
  () => shufflePhotos()
)

function shufflePhotos() {
  const modules = import.meta.glob('@/assets/img/photos/*.jpg', { eager: true })
  const photos = Object.values(modules).map(m => m.default)

  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[photos[i], photos[j]] = [photos[j], photos[i]]
  }

  selectedPhotos.value = photos.slice(0, 5); // 5 because max 5 columns
}

function openFullscreen(photo) {
  activePhotoIndex.value = selectedPhotos.value.indexOf(photo)
  displayFullscreen.value = true

  nextTick(() => { // Event click to close fullscreen
    setTimeout(() => attachOverlayClose())
  })
}

function closeFullscreen() {
  displayFullscreen.value = false
}

// Close fullscreen when clicking anywhere
function attachOverlayClose() {
  const overlay = document.querySelector('.p-galleria-mask')

  if (!overlay) return

  overlay.addEventListener('click', (e) => {
    const clickedInsideImage = e.target.closest('.p-galleria-item-wrapper')

    if (!clickedInsideImage) {
      closeFullscreen()
    }
  })
}
</script>

<template>
  <section class="block p-12 bg-gray-100">
    <!-- Photos -->
    <div class="max-w-screen-2xl mx-auto relative">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <img
          v-for="photo in displayedPhotos"
          :key="photo"
          :src="photo"
          @click="openFullscreen(photo)"
          class="w-full aspect-square object-cover transition duration-300 hover:scale-105 hover:shadow-xl/20 cursor-pointer"
          alt=""
        />
      </div>
    </div>

    <!-- Fullscreen -->
    <Galleria
      v-model:visible="displayFullscreen"
      :value="selectedPhotos"
      :activeIndex="activePhotoIndex"
      :fullScreen="true"
      :showThumbnails="false"
      :showItemNavigators="false"
      :showItemNavigatorsOnHover="false"
      :circular="true"
      :touchGestures="true"
      containerStyle="max-width: 90vw; max-height: 90vh;"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item"
          :alt="slotProps.item"
          class="w-full max-h-screen object-contain"
        />
      </template>
    </Galleria>

  </section>
</template>
