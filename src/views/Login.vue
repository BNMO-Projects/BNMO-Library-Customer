<script setup lang="ts">
import { ref } from "vue";
import {} from "flowbite";
import { LoginRequest } from "@/types/request.type";
import InputWithAddon from "@components/global/InputWithAddon.vue";

const form = ref({} as LoginRequest);
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

      <form class="flex flex-col w-4/5 lg:w-3/5 gap-12">
        <div class="flex flex-col text-center gap-4">
          <h1>Welcome back!</h1>
          <h2>Please login to continue</h2>
        </div>

        <div class="flex flex-col gap-4">
          <InputWithAddon
            v-model="form.username"
            id="username"
            label="Username"
            placeholder="Username"
            type="text"
            required
          >
            <template #addon>
              <img src="/icons/user_solid.svg" class="w-4" />
            </template>
          </InputWithAddon>
          <InputWithAddon
            v-model="form.password"
            id="password"
            label="Password"
            placeholder="Password"
            type="text"
            required
          >
            <template #addon>
              <img src="/icons/lock_solid.svg" class="w-4" />
            </template>
          </InputWithAddon>
        </div>

        <div class="flex flex-col w-full items-center gap-4">
          <button
            type="submit"
            class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
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
@/types/request.type
