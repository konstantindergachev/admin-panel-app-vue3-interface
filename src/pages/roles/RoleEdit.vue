<template>
  <main class="row">
    <form @submit.prevent="submit" class="form-role">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h1 class="h3 my-3 fw-normal text-center">Edit role</h1>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="Role name"
        required
        v-model="form.name"
      />
      <div
        class="form-check form-check-inline"
        v-for="permission of permissionList"
        :key="permission.id"
      >
        <input
          class="form-check-input"
          type="checkbox"
          :value="permission.id"
          :checked="checked(permission.id)"
          @change="select(permission.id, $event.target.checked)"
        />
        <label class="form-check-label">{{ permission.name }}</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">
        <i class="fa fa-paper-plane"></i>
      </button>
    </form>
  </main>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { IPermission } from './Roles.interface';

export default {
  setup() {
    const form = reactive({
      name: '',
      permissions: [] as number[],
    });
    const errors = reactive({
      request: '',
    });
    const permissionList = ref<number[]>([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const { data: permissionData } = await axios.get('permissions');
      permissionList.value = permissionData;

      const { data: formData } = await axios.get(`roles/${route.params.id}`);
      form.name = formData.name;
      form.permissions = formData.permissions.map((permission: IPermission) => permission.id);
    });

    const select = (id: number, isChecked: boolean) => {
      if (isChecked) {
        form.permissions = [...form.permissions, id];
        return;
      }

      form.permissions = form.permissions.filter((permission) => permission !== id);
    };

    const checked = (id: number) => {
      return form.permissions.some((permission) => permission === id);
    };

    const submit = async () => {
      try {
        await axios.put(`roles/${route.params.id}`, form);
        await router.push('/roles');
      } catch (error) {
        errors.request = error.message;
      }
    };

    return { form, permissionList, select, checked, submit, errors };
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
