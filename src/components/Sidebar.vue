<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";

const routes = [
  { name: "Home", path: "Home", icon: "/icons/home_solid.svg" },
  { name: "Search", path: "Search", icon: "/icons/search_loop_outline.svg" },
  { name: "My Library", path: "My Library", icon: "/icons/book_solid.svg" },
  { name: "Settings", path: "Settings", icon: "/icons/cog_solid.svg" }
];

const authStore = useAuthStore();
</script>

<template>
  <aside class="bg-yellow-mustard w-1/6 h-screen">
    <div class="p-4 h-full">
      <img src="/images/logo.webp" alt="BNMO Logo" class="w-32 mb-8" />
      <div class="flex flex-col gap-2">
        <RouterLink
          v-for="route in routes"
          :key="route.name"
          :to="{ name: route.path }"
          class="hover:bg-orange-coral p-2 rounded-lg"
          :class="$route.name === route.name ? 'bg-orange-coral' : undefined"
        >
          <div class="flex items-center gap-3">
            <img :src="route.icon" :alt="route.name" class="w-5" />
            <p class="font-bold">{{ route.name }}</p>
          </div>
        </RouterLink>
        <div
          class="hover:bg-orange-coral p-2 rounded-lg hover:cursor-pointer"
          @click="authStore.postLogout"
        >
          <div class="flex items-center gap-3">
            <img
              src="/icons/arrow_right_bracket.svg"
              alt="Logout"
              class="w-5"
            />
            <p class="font-bold">Logout</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
