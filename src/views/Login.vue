<script setup lang="ts">
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { LoginRequest } from "@/types/request.type";
import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const form = ref({} as LoginRequest);

const { isLoadingLogin } = storeToRefs(authStore);

const handleLogin = () => {
  authStore.postLogin(form.value);
};
</script>

<template>
  <main class="flex min-h-screen">
    <section
      class="w-1/2 bg-yellow-mustard hidden lg:flex flex-col items-center justify-center gap-4"
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
      class="w-full lg:w-1/2 bg-sky-blue flex items-center justify-center"
    >
      <img
        src="/images/logo.webp"
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
            <template #prefix class="bg-yellow-mustard">
              <img src="/icons/user_solid.svg" class="w-4" />
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
        </div>

        <div class="flex flex-col w-full items-center gap-4">
          <FwbButton
            type="submit"
            :loading="isLoadingLogin"
            class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full text-base font-bold inline-flex items-center justify-center"
          >
            Login
          </FwbButton>
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
@/types/request.type
