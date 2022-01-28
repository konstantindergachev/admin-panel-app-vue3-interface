<template>
  <h3 class="text-center mt-3">Products</h3>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/products/create" class="btn btn-success btn-sm"
      ><i class="fa fa-plus" style="font-size: 12px"></i
    ></router-link>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td><img :src="product.image" class="card-img-top" :alt="product.title" /></td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <router-link :to="`/products/${product.id}/edit`" class="btn btn-info btn-sm"
              ><i class="fa fa-edit" style="font-size: 12px"></i></router-link
            >{{ ' ' }}
            <button type="button" class="btn btn-danger btn-sm" @click="del(product.id)">
              <i class="fa fa-trash-o" style="font-size: 12px"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator :last-page="lastPage" @page-changed="load($event)" />
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Paginator from '@/components/Paginator.vue';
import { IProduct } from './Products.interface';

export default {
  components: { Paginator },
  setup() {
    const router = useRouter();
    const products = ref<IProduct[]>([]);
    const lastPage = ref<number>(0);

    const load = async (page = 1) => {
      try {
        const { data } = await axios.get(`products?page=${page}`);
        products.value = data.products;
        lastPage.value = data.metadata.lastPage;
      } catch (error) {
        await router.push('/signin');
      }
    };

    onMounted(load);

    const del = async (productId: number) => {
      if (confirm('Are you sure?')) {
        await axios.delete(`products/${productId}`);
        products.value = products.value.filter((product: IProduct) => product.id !== productId);
      }
    };

    return { products, del, lastPage, load };
  },
};
</script>
<style scoped>
.card-img-top {
  max-width: 50px;
}
</style>
