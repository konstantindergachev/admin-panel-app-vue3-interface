<template>
  <main class="row">
    <form @submit.prevent="submit" class="form-user">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h1 class="h3 my-3 fw-normal text-center">Edit user</h1>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="First name"
        required
        v-model="form.firstname"
      />
      <input
        type="text"
        class="form-control mb-1"
        placeholder="Last name"
        required
        v-model="form.lastname"
      />
      <input
        type="email"
        class="form-control mb-1"
        placeholder="name@example.com"
        required
        v-model="form.email"
      />
      <label>Roles</label>
      <select
        name="roleId"
        class="form-select"
        aria-label="Default select example"
        v-model="form.role.id"
      >
        <option :value="role.id" v-for="role of roles" :key="role.id">{{ role.name }}</option>
      </select>
      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
        <i class="fa fa-paper-plane"></i>
      </button>
    </form>
  </main>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { IRole } from '@/pages/roles/Roles.interface';
import { IUserEdit } from './Users.interface';

export default {
  setup() {
    const form = reactive<IUserEdit>({
      firstname: '',
      lastname: '',
      email: '',
      role: { id: 0, name: '' },
    });
    const errors = reactive({
      request: '',
    });
    const roles = ref<IRole[]>([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const { data: rolesData } = await axios.get('roles');
      roles.value = rolesData;

      const { data: userData } = await axios.get(`users/${route.params.id}`);
      form.firstname = userData.firstname;
      form.lastname = userData.lastname;
      form.email = userData.email;
      form.role = userData.role;
    });

    const submit = async () => {
      try {
        await axios.put(`users/${route.params.id}`, form);
        await router.push('/users');
      } catch (error) {
        errors.request = error.message;
      }
    };

    return { form, roles, submit, errors };
  },
};
</script>

<style scoped>
.row {
  justify-content: center;
}
.form-user {
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
