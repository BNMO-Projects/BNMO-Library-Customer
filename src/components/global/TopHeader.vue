<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth.store";

import { FwbAvatar } from "flowbite-vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import UserCircleSolid from "@/components/icons/UserCircleSolid.vue";

const authStore = useAuthStore();
const { username } = storeToRefs(authStore);
</script>

<template>
  <div
    class="flex items-center border-b border-b-black dark:border-b-white pb-4 px-4"
    :class="$route.name === 'Book Detail' ? 'justify-between' : 'justify-end'"
  >
    <div
      v-if="$route.name === 'Book Detail'"
      class="flex items-center gap-4 hover:cursor-pointer"
      @click="$router.back"
    >
      <component :is="ArrowLeft" custom-class="text-black dark:text-white" />
      <p class="font-bold">Back</p>
    </div>
    <div class="flex items-center gap-4">
      <p
        class="font-bold"
        :class="$route.name === 'Book Detail' ? 'hidden lg:block' : 'block'"
      >
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
            <component
              :is="UserCircleSolid"
              custom-class="text-black dark:text-white w-12"
            />
          </template>
        </FwbAvatar>
        <p class="font-bold">{{ username }}</p>
      </div>
    </div>
  </div>
</template>
