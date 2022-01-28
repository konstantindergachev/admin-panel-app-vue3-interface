<template>
  <Header :toggle="toggle" />
  <div class="container-fluid flex-auto">
    <div class="row">
      <Nav :toggle="toggle" :isMenuOpen="isMenuOpen" />
      <main v-if="!isComponentMount" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="lds-dual-ring"></div>
      </main>
      <main v-else class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view />
      </main>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  components: { Header, Nav, Footer },
  setup() {
    const isComponentMount = ref(false);
    const router = useRouter();
    const store = useStore();
    const isMenuOpen = ref('');

    onMounted(async () => {
      try {
        const { data, status } = await axios.get('user');
        store.dispatch('userModule/setUser', data);
        if (status === 200) {
          isComponentMount.value = true;
        }
      } catch (error) {
        await router.push('/signup');
      }
    });

    const toggle = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return { isMenuOpen, toggle, isComponentMount };
  },
};
</script>
<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #212529;
  border-color: #212529 transparent #212529 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
