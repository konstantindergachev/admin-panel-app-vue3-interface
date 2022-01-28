<template>
  <main class="row">
    <form @submit.prevent="submit" class="form-product">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h1 class="h3 my-3 fw-normal text-center">Edit product</h1>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="title"
        required
        v-model="form.title"
      />
      <textarea
        class="form-control mb-1"
        rows="3"
        placeholder="description"
        required
        v-model="form.description"
      ></textarea>
      <div class="input-group mb-1">
        <input
          type="text"
          class="form-control"
          placeholder="image link"
          required
          v-model="form.image"
        />
        <ImageUploader @uploaded="form.image = $event" />
      </div>
      <input type="number" class="form-control" placeholder="price" required v-model="form.price" />
      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
        <i class="fa fa-paper-plane"></i>
      </button>
    </form>
  </main>
</template>

<script lang="ts">
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import ImageUploader from '@/components/ImageUploader.vue';
import { IProduct } from './Products.interface';

export default {
  components: { ImageUploader },
  setup() {
    const form = reactive<IProduct>({
      title: '',
      description: '',
      image: '',
      price: 0,
    });
    const errors = reactive({
      request: '',
    });

    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const { data } = await axios.get(`products/${route.params.id}`);

      form.title = data.title;
      form.description = data.description;
      form.image = data.image;
      form.price = data.price;
    });

    const submit = async () => {
      try {
        await axios.put(`products/${route.params.id}`, form);
        await router.push('/products');
      } catch (error) {
        errors.request = error.message;
      }
    };

    return { form, submit, errors };
  },
};
</script>

<style scoped>
.row {
  justify-content: center;
}
.form-product {
  width: 100%;
  max-width: 500px;
  padding: 15px;
}
label {
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  padding: 0 0.84rem;
  color: #72777b;
}
</style>
