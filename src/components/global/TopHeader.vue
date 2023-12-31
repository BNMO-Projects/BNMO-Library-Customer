<script setup lang="ts">
import { FwbAvatar } from "flowbite-vue";
import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { getUsername } = storeToRefs(authStore);
</script>

<template>
  <div
    class="flex items-center border-b border-b-black pb-4 px-4"
    :class="$route.name === 'Book Detail' ? 'justify-between' : 'justify-end'"
  >
    <div
      v-if="$route.name === 'Book Detail'"
      class="flex items-center gap-4 hover:cursor-pointer"
      @click="$router.back"
    >
      <img src="/icons/arrow_left.svg" alt="Back button" class="w-6" />
      <p class="font-bold">Back</p>
    </div>
    <div class="flex items-center gap-4">
      <p class="font-bold">
        {{
          new Date().toLocaleString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        }}
      </p>
      <div class="flex items-center justify-center gap-2">
        <FwbAvatar rounded>
          <template #placeholder>
            <img src="/icons/user_solid.svg" alt="Avatar Icon" class="w-7" />
          </template>
        </FwbAvatar>
        <p class="font-bold">{{ getUsername }}</p>
      </div>
    </div>
  </div>
</template>
