<template>
  <main class="row">
    <form @submit.prevent="submit" class="form-user">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h1 class="h3 my-3 fw-normal text-center">Create user</h1>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="First name"
        required
        v-model="form.firstname"
        @blur="validate('firstname')"
        @keypress="validate('firstname')"
      />
      <p class="form-input-error" v-if="!!errors.firstname">
        {{ errors.firstname }}
      </p>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="Last name"
        required
        v-model="form.lastname"
        @blur="validate('lastname')"
        @keypress="validate('lastname')"
      />
      <p class="form-input-error" v-if="!!errors.lastname">
        {{ errors.lastname }}
      </p>
      <input
        type="email"
        class="form-control mb-1"
        placeholder="name@example.com"
        required
        v-model="form.email"
        @blur="validate('email')"
        @keypress="validate('email')"
      />
      <p class="form-input-error" v-if="!!errors.email">
        {{ errors.email }}
      </p>
      <input
        type="password"
        class="form-control mb-1"
        placeholder="Password"
        required
        v-model="form.password"
        @blur="validate('password')"
        @keypress="validate('password')"
      />
      <p class="form-input-error" v-if="!!errors.password">
        {{ errors.password }}
      </p>
      <input
        type="password"
        class="form-control mb-1"
        placeholder="Password confirm"
        required
        v-model="form.password_confirm"
        @blur="validate('password_confirm')"
        @keypress="validate('password_confirm')"
      />
      <p class="form-input-error" v-if="!!errors.password_confirm">
        {{ errors.password_confirm }}
      </p>
      <label>Roles</label>
      <select
        name="roleId"
        class="form-select"
        aria-label="Default select example"
        v-model="form.roleId"
        @blur="validate('roleId')"
      >
        <option :value="role.id" v-for="role of roles" :key="role.id">{{ role.name }}</option>
      </select>
      <p class="form-input-error" v-if="!!errors.roleId">
        {{ errors.roleId }}
      </p>
      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
        <i class="fa fa-paper-plane"></i>
      </button>
    </form>
  </main>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { userCreateSchema } from '../../validations/user-create';
import { IUserCreate, IUserErrors } from './Users.interface';
import { IRole } from '@/pages/roles/Roles.interface';

export default {
  setup() {
    const form = reactive<IUserCreate>({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirm: '',
      roleId: '',
    });

    const errors = reactive({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirm: '',
      roleId: '',
      request: '',
    });

    const router = useRouter();
    const roles = ref<IRole[]>([]);

    onMounted(async () => {
      const { data } = await axios.get('roles');
      roles.value = data;
    });

    const submit = async () => {
      try {
        await axios.post('users', form);
        await router.push('/users');
      } catch (error) {
        errors.request = error.message;
      }
    };

    const validate = async (field: keyof IUserErrors) => {
      try {
        await userCreateSchema.validateAt(field, form);
        errors[field] = '';
      } catch (error) {
        errors[field] = error.message;
      }
    };

    return { form, roles, submit, validate, errors };
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
