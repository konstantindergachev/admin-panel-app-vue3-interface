<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" @click="prev"><i class="fa fa-arrow-left"></i></a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="next"><i class="fa fa-arrow-right"></i></a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, SetupContext, watch } from 'vue';
export default {
  props: { lastPage: Number },
  events: ['page-changed'],

  setup(props: { lastPage: number }, ctx: SetupContext) {
    const page = ref<number>(1);

    watch(page, () => {
      ctx.emit('page-changed', page.value);
    });

    const prev = () => {
      if (page.value > 1) {
        page.value--;
      }
    };
    const next = () => {
      if (page.value < props.lastPage) {
        page.value++;
      }
    };
    return { prev, next };
  },
};
</script>
<style scoped>
.page-link {
  cursor: pointer;
}
</style>
