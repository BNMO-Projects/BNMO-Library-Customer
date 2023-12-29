<script setup lang="ts">
import { ref } from "vue";
import { FwbInput } from "flowbite-vue";
import { RegisterRequest } from "@/types/request.type";

const form = ref({} as RegisterRequest);
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
      <form class="flex flex-col justify-center w-4/5 gap-12 py-8">
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
          >
            <template #prefix>
              <img src="/icons/envelope_solid.svg" class="w-5" />
            </template>
          </FwbInput>
          <FwbInput
            v-model="form.username"
            id="username"
            label="Username"
            placeholder="Username"
            type="text"
            required
          >
            <template #prefix>
              <img src="/icons/user_settings_solid.svg" class="w-5" />
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
          <button
            type="submit"
            class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
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
