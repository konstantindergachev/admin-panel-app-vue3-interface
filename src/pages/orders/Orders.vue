<template>
  <h3 class="text-center my-3">Orders</h3>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <a href="javascript:void(0)" class="btn btn-success btn-sm" @click="exportCSV"
      >Export CSV file</a
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="order in orders" :key="order.id">
          <tr>
            <td>{{ order.id }}</td>
            <td>{{ order.firstname }} {{ order.lastname }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.total }}</td>
            <td>
              <button type="button" class="btn btn-info btn-sm" @click="select(order.id)">
                <i v-if="selected === order.id" class="fa fa-eye-slash"></i>
                <i v-else class="fa fa-eye"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="5">
              <div class="overflow-hidden" :class="selected === order.id ? 'show' : 'hide'">
                <table class="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Product Title</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.order_items" :key="item.id">
                      <td>{{ item.product_title }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </template>
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
import { IOrder } from './Orders.interface';

export default {
  components: { Paginator },
  setup() {
    const router = useRouter();
    const orders = ref<IOrder[]>([]);
    const lastPage = ref<number>(0);
    const selected = ref<number>(0);

    const load = async (page = 1) => {
      try {
        const { data } = await axios.get(`orders?page=${page}`);
        orders.value = data.orders.map((order: IOrder) => {
          const itemsTotal: number[] = [];
          order.order_items.forEach((item) => itemsTotal.push(item.price * item.quantity));
          order.total = itemsTotal.reduce((acc, cur) => cur + acc, 0);

          return order;
        });
        lastPage.value = data.metadata.lastPage;
      } catch (error) {
        await router.push('/signin');
      }
    };

    onMounted(load);

    const select = (orderId: number) => {
      selected.value = selected.value !== orderId ? orderId : 0;
    };

    const exportCSV = async () => {
      const { data } = await axios.post('export', {}, { responseType: 'blob' });
      const blob = new Blob([data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(data);
      link.download = 'orders.csv';
      link.click();
    };

    return { orders, lastPage, load, selected, select, exportCSV };
  },
};
</script>
<style scoped>
.show {
  max-height: 150px;
  transition: max-height 0.5s ease-in;
}
.hide {
  max-height: 0px;
  transition: max-height 0.5s ease-out;
}
</style>
