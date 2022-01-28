<template>
  <main class="wrapper">
    <h2 class="text-center">Oops, it looks like the page you're looking for doesn't exist.</h2>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  width: 100%;
  position: relative;
  min-height: 50vh;
  margin: auto;
}
.wrapper h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff0000;
}
</style>
