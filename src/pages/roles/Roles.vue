<template>
  <h3 class="text-center mt-3">Roles</h3>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/roles/create" class="btn btn-success btn-sm"
      ><i class="fa fa-plus" style="font-size: 12px"></i>
    </router-link>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <router-link :to="`/roles/${role.id}/edit`" class="btn btn-info btn-sm"
              ><i class="fa fa-edit" style="font-size: 12px"></i></router-link
            >{{ ' ' }}
            <button type="button" class="btn btn-danger btn-sm" @click="del(role.id)">
              <i class="fa fa-trash-o" style="font-size: 12px"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
import { IRole } from './Roles.interface';

export default {
  setup() {
    const router = useRouter();
    const roles = ref<IRole[]>([]);
    const store = useStore();
    const storedRoles = computed(() => store.state.roleModule.roles);

    const load = async () => {
      if (!storedRoles.value.length) {
        try {
          const { data } = await axios.get('roles');
          roles.value = data;
          store.dispatch('roleModule/setRoles', data);
        } catch (error) {
          await router.push('/signin');
        }
      } else {
        roles.value = storedRoles.value;
      }
    };

    onMounted(load);

    const del = async (roleId: number) => {
      if (confirm('Are you sure?')) {
        await axios.delete(`roles/${roleId}`);
        roles.value = roles.value.filter((role: IRole) => role.id !== roleId);
      }
    };

    return { roles, del };
  },
};
</script>
<style scoped>
.page-link {
  cursor: pointer;
}
</style>
