<template>
  <h3 class="text-center my-3">Users</h3>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/users/create" class="btn btn-success btn-sm"
      ><i class="fa fa-plus" style="font-size: 12px"></i>
    </router-link>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstname }} {{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
          <td>
            <router-link :to="`/users/${user.id}/edit`" class="btn btn-info btn-sm">
              <i class="fa fa-edit" style="font-size: 12px"></i> </router-link
            >{{ ' ' }}
            <button type="button" class="btn btn-danger btn-sm" @click="del(user.id)">
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
import { IUser } from './Users.interface';

export default {
  components: { Paginator },
  setup() {
    const router = useRouter();
    const users = ref<IUser[]>([]);
    const lastPage = ref<number>(0);

    const load = async (page = 1) => {
      try {
        const { data } = await axios.get(`users?page=${page}`);
        users.value = data.users;
        lastPage.value = data.metadata.lastPage;
      } catch (error) {
        await router.push('/signin');
      }
    };

    onMounted(load);

    const del = async (userId: number) => {
      if (confirm('Are you sure?')) {
        await axios.delete(`users/${userId}`);
        users.value = users.value.filter((user: IUser) => user.id !== userId);
      }
    };

    return { users, del, lastPage, load };
  },
};
</script>
