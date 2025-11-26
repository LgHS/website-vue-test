<script setup></script>

<template>
  <nav class="absolute top-5 right-4 z-10">
    <ul class="flex items-center gap-1 text-sm text-gray-600">
      <li class="inline-flex items-center gap-2 mr-2">
        <span id="status-light" class="status-light status-unknown" title="Chargement..."></span>
        <span id="status-text" class="text-xs">Chargement</span>
      </li>
      <li class="inline-flex items-center">
        <img src="@/assets/img/user-crown.svg" alt="" class="w-4 h-4 mr-2">
      </li>
      <li>
        <a href="https://chat.lghs.be/" title="RocketChat" target="_blank" rel="noopener"
          class="px-1 hover:underline">RocketChat</a>
      </li>
      <li>
        <a href="https://passport.lghs.be/" title="Passport" target="_blank" rel="noopener"
          class="px-1 hover:underline">Passport</a>
      </li>
      <li>
        <a href="https://uptime.lghs.be/status/all" title="Monitoring" target="_blank" rel="noopener"
          class="px-1 hover:underline">Monitoring</a>
      </li>
    </ul>
  </nav>
</template>