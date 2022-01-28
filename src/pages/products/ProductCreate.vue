<template>
  <main class="row">
    <form @submit.prevent="submit" class="form-product">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h3 class="h3 my-3 fw-normal text-center">Create product</h3>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="title"
        required
        v-model="form.title"
        @blur="validate('title')"
        @keypress="validate('title')"
      />
      <p class="error" v-if="!!errors.title">
        {{ errors.title }}
      </p>
      <textarea
        class="form-control mb-1"
        rows="3"
        placeholder="description"
        required
        v-model="form.description"
        @blur="validate('description')"
        @keypress="validate('description')"
      ></textarea>
      <p class="error" v-if="!!errors.description">
        {{ errors.description }}
      </p>
      <div class="input-group mb-1">
        <input
          type="text"
          class="form-control"
          placeholder="image link"
          required
          v-model="form.image"
          @blur="validate('image')"
          @keypress="validate('image')"
        />
        <ImageUploader @uploaded="form.image = $event" />
      </div>
      <p class="error" v-if="!!errors.image">
        {{ errors.image }}
      </p>
      <input
        type="number"
        class="form-control"
        placeholder="price"
        required
        v-model="form.price"
        @blur="validate('price')"
        @keypress="validate('price')"
      />
      <p class="error" v-if="!!errors.price">
        {{ errors.price }}
      </p>
      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
        <i class="fa fa-paper-plane"></i>
      </button>
    </form>
  </main>
</template>

<script lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import ImageUploader from '@/components/ImageUploader.vue';
import { productCreateSchema } from '../../validations/product-create';
import { IProduct, IProductErrors } from './Products.interface';

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
      title: '',
      description: '',
      image: '',
      price: '',
      request: '',
    });

    const router = useRouter();

    const submit = async () => {
      try {
        await axios.post('products', form);
        await router.push('/products');
      } catch (error) {
        errors.request = error.message;
      }
    };

    const validate = async (field: keyof IProductErrors) => {
      try {
        await productCreateSchema.validateAt(field, form);
        errors[field] = '';
      } catch (error) {
        errors[field] = error.message;
      }
    };

    return { form, submit, validate, errors };
  },
};
</script>

<style scoped>
.row {
  justify-content: center;
}
.form-product {
  width: 100%;
  max-width: 330px;
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
