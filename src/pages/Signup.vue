<template>
  <main class="form-signup">
    <form @submit.prevent="submit">
      <p class="error text-center" v-if="!!errors.request">
        {{ errors.request }}
      </p>
      <h1 class="h3 mb-3 fw-normal text-center">Sign up form</h1>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="First name"
        required
        v-model="form.firstname"
        @blur="signupValidate('firstname')"
        @keypress="signupValidate('firstname')"
      />
      <p class="form-input-error" v-if="!!errors.firstname">
        {{ errors.firstname }}
      </p>
      <input
        type="text"
        class="form-control"
        placeholder="Last name"
        required
        v-model="form.lastname"
        @blur="signupValidate('lastname')"
        @keypress="signupValidate('lastname')"
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
        @blur="signupValidate('email')"
        @keypress="signupValidate('email')"
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
        @blur="signupValidate('password')"
        @keypress="signupValidate('password')"
      />
      <p class="form-input-error" v-if="!!errors.password">
        {{ errors.password }}
      </p>
      <input
        type="password"
        class="form-control mb-3"
        placeholder="Password confirm"
        required
        v-model="form.password_confirm"
        @blur="signupValidate('password_confirm')"
        @keypress="signupValidate('password_confirm')"
      />
      <p class="form-input-error" v-if="!!errors.password_confirm">
        {{ errors.password_confirm }}
      </p>
      <small>If you have an account go to the</small>
      <router-link to="/signin">{{ ' ' }}sign in</router-link>
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
import { signupSchema } from '../validations/signup';
import { ISignup, ISignupErrors } from './Signup.interface';

export default {
  setup() {
    const form = reactive<ISignup>({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirm: '',
    });

    const errors = reactive({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirm: '',
      request: '',
    });

    const router = useRouter();

    const submit = async () => {
      try {
        await axios.post('signup', {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
          password_confirm: form.password_confirm,
        });
        await router.push('/signin');
      } catch (error) {
        errors.request = error.message;
      }
    };

    const signupValidate = async (field: keyof ISignupErrors) => {
      try {
        await signupSchema.validateAt(field, form);
        errors[field] = '';
      } catch (error) {
        errors[field] = error.message;
      }
    };

    return { form, submit, signupValidate, errors };
  },
};
</script>
<style scoped>
.form-signup {
  min-height: 100vh;
  width: 100%;
  max-width: 330px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-signup .checkbox {
  font-weight: 400;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}

.form-signup input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signup input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
