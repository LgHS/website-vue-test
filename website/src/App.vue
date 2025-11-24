<script setup></script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/img/logo.svg" />

    <div class="wrapper">
      <h1>The LgHS Website in Vue !</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/agenda">Agenda</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
