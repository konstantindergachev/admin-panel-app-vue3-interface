<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar"
    :class="isMenuOpen ? 'collapse' : ''"
  >
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item" v-for="link in links" :key="link.slug">
          <router-link :to="link.path" class="nav-link" @click="toggle">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { navigation } from '../configs';
import { INav } from './Nav.interface';

export default {
  props: { toggle: Function, isMenuOpen: Boolean },
  setup() {
    const links = ref<INav[]>([]);
    onMounted(() => (links.value = navigation));
    return { links };
  },
};
</script>

<style scoped>
.router-link-exact-active {
  color: #0d6efd;
}
</style>
