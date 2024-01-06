<script setup lang="ts">
import { ref } from "vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth.store";
import { LoginRequest } from "@/types/request.type";

import { FwbInput, FwbSpinner } from "flowbite-vue";
import UserSolid from "@/components/icons/UserSolid.vue";
import LockSolid from "@/components/icons/LockSolid.vue";

const authStore = useAuthStore();

const { isLoadingLogin } = storeToRefs(authStore);

const form = ref({} as LoginRequest);
const darkMode = ref(
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
);

const handleLogin = () => {
  authStore.postLogin(form.value);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    darkMode.value = event.matches ? true : false;
  });
</script>

<template>
  <main class="flex min-h-screen text-text-color dark:text-text-color-dark">
    <section
      class="w-1/2 bg-secondary-color dark:bg-secondary-color-dark text-white hidden lg:flex flex-col items-center justify-center gap-4"
    >
      <img src="/images/login-art.webp" alt="Login art" class="w-96" />

      <div class="text-center">
        <h2>Borrow ebooks, audiobooks,</h2>
        <h2>and more - for free!</h2>
      </div>

      <div class="text-center">
        <p>Explore a universe of knowledge</p>
        <p>Start browsing now!</p>
      </div>
    </section>
    <section
      class="w-full lg:w-1/2 bg-main-color dark:bg-main-color-dark flex items-center justify-center"
    >
      <img
        v-if="!darkMode"
        src="/images/logo.webp"
        alt="BNMO logo"
        class="w-32 fixed top-4 right-4 lg:top-8 lg:right-8"
      />
      <img
        v-else
        src="/images/logo-white.webp"
        alt="BNMO logo"
        class="w-32 fixed top-4 right-4 lg:top-8 lg:right-8"
      />

      <form
        class="flex flex-col w-4/5 lg:w-3/5 gap-12"
        @submit.prevent="handleLogin"
      >
        <div class="flex flex-col text-center gap-4">
          <h1>Welcome back!</h1>
          <h2>Please login to continue</h2>
        </div>

        <div class="flex flex-col gap-4">
          <FwbInput
            v-model="form.username"
            id="username"
            label="Username"
            placeholder="Username"
            type="text"
            required
          >
            <template #prefix>
              <component
                :is="UserSolid"
                custom-class="text-black dark:text-white w-4 h-4"
              />
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
              <component
                :is="LockSolid"
                custom-class="text-black dark:text-white w-4 h-4"
              />
            </template>
          </FwbInput>
        </div>

        <div class="flex flex-col w-full items-center gap-4">
          <button type="submit" class="button-full">
            <FwbSpinner v-if="isLoadingLogin" />
            Login
          </button>
          <p>
            Don't have an account?
            <RouterLink
              to="/register"
              class="text-blue-400 visited:text-blue-700 underline"
              >Register now</RouterLink
            >
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
