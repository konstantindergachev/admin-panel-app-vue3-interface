<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap flex-shrink-0 p-0 shadow">
    <router-link to="/" class="navbar-brand col-md-3 col-lg-2 me-0 px-3">admin</router-link>
    <router-link to="/profile" class="nav-link px-3 text-white text-decoration-none">{{
      username
    }}</router-link>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <router-link to="/signin" class="nav-link px-3" @click="logout">Sign out </router-link>
      </div>
    </div>
    <button class="navbar-toggler mt-1 ms-1 d-md-none text-center" type="button" @click="toggle">
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  props: { toggle: Function },
  setup() {
    const username = ref<string>('');
    const store = useStore();
    const user = computed(() => store.state.userModule.user);

    watch(user, () => {
      username.value = `${user.value.firstname} ${user.value.lastname}`;
    });

    const logout = async () => {
      await axios.post('logout');
    };

    return { username, logout };
  },
};
</script>
