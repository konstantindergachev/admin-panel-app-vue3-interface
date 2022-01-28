<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h1 class="h3 mb-3 fw-normal text-center">Sign in form</h1>
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
        class="form-control mb-3"
        placeholder="Password"
        required
        v-model="form.password"
        @blur="validate('password')"
        @keypress="validate('password')"
      />
      <p class="form-input-error" v-if="!!errors.password">
        {{ errors.password }}
      </p>

      <small>If you don't have an account yet, go to the</small>
      <router-link to="/signup">{{ ' ' }}sign up</router-link>

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
import { signinSchema } from '../validations/signin';
import { ISignin, ISigninErrors } from './Signin.interface';

export default {
  setup() {
    const form = reactive<ISignin>({
      email: '',
      password: '',
    });
    const errors = reactive<ISigninErrors>({
      email: '',
      password: '',
      request: '',
    });

    const router = useRouter();

    const submit = async () => {
      try {
        await axios.post('signin', {
          email: form.email,
          password: form.password,
        });
        await router.push('/');
      } catch (error) {
        errors.request = error.message;
      }
    };

    const validate = async (field: keyof ISigninErrors) => {
      try {
        await signinSchema.validateAt(field, form);
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
.form-signin {
  min-height: 100vh;
  width: 100%;
  max-width: 330px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
