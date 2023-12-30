<script setup lang="ts">
import { ref } from "vue";
import { FwbButton, FwbInput } from "flowbite-vue";
import { RegisterRequest } from "@/types/request.type";
import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const form = ref({} as RegisterRequest);

const { loadingRegister, errDetailRegister } = storeToRefs(authStore);

const handleRegister = () => {
  authStore.postRegister(form.value);
};
</script>

<template>
  <main class="flex flex-row-reverse min-h-screen">
    <section class="w-1/2 relative hidden lg:block">
      <div>
        <img
          src="/images/register-bg.webp"
          alt="Register art"
          class="absolute object-cover w-full h-full z-[-10]"
        />
      </div>

      <div
        class="flex flex-col items-center justify-center text-white h-full gap-4"
      >
        <h1 class="text-center">Join BNMO Now!</h1>

        <div class="text-center">
          <h2>Your one-stop shop to knowlede,</h2>
          <h2>adventure, and imagination.</h2>
        </div>
      </div>
    </section>
    <section
      class="w-full lg:w-1/2 bg-sky-blue flex flex-col items-center justify-center py-8"
    >
      <h1 class="text-center">Register Account</h1>
      <form
        class="flex flex-col justify-center w-4/5 gap-12 py-8"
        @submit.prevent="handleRegister"
      >
        <div
          class="grid grid-cols-1 grid-rows-6 lg:grid-cols-2 lg:grid-rows-3 gap-x-8 gap-y-4"
        >
          <FwbInput
            v-model="form.first_name"
            id="first_name"
            label="First name"
            placeholder="First name"
            type="text"
            required
          >
            <template #prefix>
              <img src="/icons/user_solid.svg" class="w-4" />
            </template>
          </FwbInput>
          <FwbInput
            v-model="form.last_name"
            id="last_name"
            label="Last name (Optional)"
            placeholder="Last name"
            type="text"
          >
            <template #prefix>
              <img src="/icons/users_solid.svg" class="w-5" />
            </template>
          </FwbInput>
          <FwbInput
            v-model="form.email"
            id="email"
            label="Email"
            placeholder="Email"
            type="email"
            required
            :validation-status="
              errDetailRegister.hasOwnProperty('email') ? 'error' : undefined
            "
          >
            <template #prefix>
              <img src="/icons/envelope_solid.svg" class="w-5" />
            </template>
            <template
              v-if="errDetailRegister.hasOwnProperty('email')"
              #validationMessage
            >
              {{ errDetailRegister.email[0] }}
            </template>
          </FwbInput>
          <FwbInput
            v-model="form.username"
            id="username"
            label="Username"
            placeholder="Username"
            type="text"
            required
            :validation-status="
              errDetailRegister.hasOwnProperty('username') ? 'error' : undefined
            "
          >
            <template #prefix>
              <img src="/icons/user_settings_solid.svg" class="w-5" />
            </template>
            <template
              v-if="errDetailRegister.hasOwnProperty('username')"
              #validationMessage
            >
              {{ errDetailRegister.username[0] }}
            </template>
          </FwbInput>
          <FwbInput
            v-model="form.password"
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
            required
          >
            <template #prefix>
              <img src="/icons/lock_solid.svg" class="w-4" />
            </template>
          </FwbInput>
          <FwbInput
            v-model="form.password_confirmation"
            id="password_confirmation"
            label="Confirm password"
            placeholder="Confirm password"
            type="password"
            required
          >
            <template #prefix>
              <img src="/icons/lock_solid.svg" class="w-4" />
            </template>
          </FwbInput>
        </div>

        <div class="flex flex-col w-full items-center gap-4">
          <FwbButton
            type="submit"
            :loading="loadingRegister"
            class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full text-base font-bold inline-flex items-center justify-center"
          >
            Register
          </FwbButton>
          <p>
            Already have an account?
            <RouterLink
              to="/login"
              class="text-blue-400 visited:text-blue-700 underline"
              >Login now</RouterLink
            >
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
