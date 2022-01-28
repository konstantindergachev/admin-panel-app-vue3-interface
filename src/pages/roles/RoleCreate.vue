<template>
  <main class="row">
    <form @submit.prevent="submit" class="form-role">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h1 class="h3 my-3 fw-normal text-center">Create role</h1>
      <input
        type="text"
        class="form-control"
        placeholder="Role name"
        required
        v-model="form.name"
        @blur="validate('name')"
        @keypress="validate('name')"
      />
      <p class="form-input-error" v-if="!!errors.name">
        {{ errors.name }}
      </p>
      <div
        class="form-check form-check-inline mt-3"
        v-for="permission of permissionList"
        :key="permission.id"
      >
        <input
          class="form-check-input"
          type="checkbox"
          :value="permission.id"
          @change="select(permission.id, $event.target.checked)"
          @blur="validate('permissions')"
        />
        <label class="form-check-label">{{ permission.name }}</label>
      </div>
      <p class="form-input-error" v-if="!!errors.permissions">
        {{ errors.permissions }}
      </p>
      <button class="w-100 btn btn-lg btn-primary mt-0" type="submit">
        <i class="fa fa-paper-plane"></i>
      </button>
    </form>
  </main>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { roleCreateSchema } from '../../validations/role-create';
import { IRoleErrors } from './Roles.interface';

export default {
  setup() {
    const form = reactive({
      name: '',
      permissions: [] as number[],
    });
    const errors = reactive({
      name: '',
      permissions: '',
      request: '',
    });
    const permissionList = ref<number[]>([]);
    const router = useRouter();

    onMounted(async () => {
      const { data } = await axios.get('permissions');

      permissionList.value = data;
    });

    const select = (id: number, isChecked: boolean) => {
      if (isChecked) {
        form.permissions = [...form.permissions, id];
        return;
      }

      form.permissions = form.permissions.filter((permission) => permission !== id);
    };

    const submit = async () => {
      try {
        await axios.post('roles', form);
        await router.push('/roles');
      } catch (error) {
        errors.request = error.message;
      }
    };

    const validate = async (field: keyof IRoleErrors) => {
      try {
        await roleCreateSchema.validateAt(field, form);
        errors[field] = '';
      } catch (error) {
        errors[field] = error.message;
      }
    };

    return { form, permissionList, select, submit, validate, errors };
  },
};
</script>
<style scoped>
.row {
  justify-content: center;
}
.form-role {
  width: 100%;
  max-width: 500px;
  padding: 15px;
}
.form-check {
  margin-top: 0.25rem;
  margin-bottom: 1rem;
}
.form-check input {
  margin-top: 0.3em;
}
</style>
