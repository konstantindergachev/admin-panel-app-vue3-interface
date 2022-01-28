<template>
  <main class="row">
    <p class="error text-center" v-if="!!errors.request">
      {{ errors.request }}
    </p>
    <form @submit.prevent="submitAccountInfo" class="col form-profile">
      <h1 class="h3 my-3 fw-normal text-center">Account information</h1>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="First name"
        required
        v-model="accountInfoForm.firstname"
        @blur="validateChangeInfo('firstname')"
        @keypress="validateChangeInfo('firstname')"
      />
      <p class="form-input-error" v-if="!!errors.firstname">
        {{ errors.firstname }}
      </p>
      <input
        type="text"
        class="form-control mb-1"
        placeholder="Last name"
        required
        v-model="accountInfoForm.lastname"
        @blur="validateChangeInfo('lastname')"
        @keypress="validateChangeInfo('lastname')"
      />
      <p class="form-input-error" v-if="!!errors.lastname">
        {{ errors.lastname }}
      </p>
      <input
        type="email"
        class="form-control mb-1"
        placeholder="name@example.com"
        required
        v-model="accountInfoForm.email"
        @blur="validateChangeInfo('email')"
        @keypress="validateChangeInfo('email')"
      />
      <p class="form-input-error" v-if="!!errors.email">
        {{ errors.email }}
      </p>
      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
        <i class="fa fa-save"></i>
      </button>
    </form>
    <form @submit.prevent="submitNewPassword" class="col form-profile">
      <h1 class="h3 my-3 fw-normal text-center">Change password</h1>
      <input
        type="password"
        class="form-control mb-1"
        placeholder="Password"
        required
        v-model="changePasswordForm.password"
        @blur="validateChangePassword('password')"
        @keypress="validateChangePassword('password')"
      />
      <p class="form-input-error" v-if="!!errors.password">
        {{ errors.password }}
      </p>
      <input
        type="password"
        class="form-control mb-1"
        placeholder="Password confirm"
        required
        v-model="changePasswordForm.password_confirm"
        @blur="validateChangePassword('password_confirm')"
        @keypress="validateChangePassword('password_confirm')"
      />
      <p class="form-input-error" v-if="!!errors.password_confirm">
        {{ errors.password_confirm }}
      </p>
      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
        <i class="fa fa-save"></i>
      </button>
    </form>
  </main>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { profileChangePasswordSchema, profileChangeInfoSchema } from '../validations/profile';
import {
  IProfile,
  IChangePassword,
  IProfileChangePasswordErrors,
  IProfileChangeInfoErrors,
} from './Profile.interface';

export default {
  setup() {
    const accountInfoForm = reactive<IProfile>({
      firstname: '',
      lastname: '',
      email: '',
    });
    const changePasswordForm = reactive<IChangePassword>({
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

    const store = useStore();
    const user = computed(() => store.state.userModule.user);
    accountInfoForm.firstname = user.value.firstname;
    accountInfoForm.lastname = user.value.lastname;
    accountInfoForm.email = user.value.email;

    const submitAccountInfo = async () => {
      try {
        const { data } = await axios.put('users/info', accountInfoForm);
        await store.dispatch('userModule/setUser', data);
      } catch (error) {
        errors.request = error.message;
      }
    };
    const submitNewPassword = async () => {
      try {
        await axios.put('users/password', changePasswordForm);
      } catch (error) {
        errors.request = error.message;
      }
    };

    const validateChangePassword = async (field: keyof IProfileChangePasswordErrors) => {
      try {
        await profileChangePasswordSchema.validateAt(field, changePasswordForm);
        errors[field] = '';
      } catch (error) {
        errors[field] = error.message;
      }
    };

    const validateChangeInfo = async (field: keyof IProfileChangeInfoErrors) => {
      try {
        await profileChangeInfoSchema.validateAt(field, accountInfoForm);
        errors[field] = '';
      } catch (error) {
        errors[field] = error.message;
      }
    };

    return {
      accountInfoForm,
      changePasswordForm,
      submitAccountInfo,
      submitNewPassword,
      validateChangePassword,
      validateChangeInfo,
      errors,
    };
  },
};
</script>
<style scoped>
.row {
  justify-content: space-evenly;
}
.form-profile {
  width: 100%;
  max-width: 330px;
  padding: 15px;
}

.form-profile .checkbox {
  font-weight: 400;
}

.form-profile .form-floating:focus-within {
  z-index: 2;
}

.form-profile input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-profile input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
