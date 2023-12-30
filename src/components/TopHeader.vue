<script setup lang="ts">
import { FwbAvatar } from "flowbite-vue";
import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { getUsername } = storeToRefs(authStore);
</script>

<template>
  <div
    class="flex justify-end items-center gap-4 border-b border-b-black pb-4 px-4"
  >
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
</template>
