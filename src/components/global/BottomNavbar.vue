<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";

const routes = [
  { name: "Home", path: "Home", icon: "/icons/home_solid.svg" },
  {
    name: "Search",
    path: "Search",
    icon: "/icons/search_loop_outline.svg",
    query: { page: 1 }
  },
  {
    name: "My Library",
    path: "My Library",
    icon: "/icons/book_solid.svg",
    query: { page: 1 },
    params: { tab: "wishlist" }
  },
  { name: "Settings", path: "Settings", icon: "/icons/cog_solid.svg" }
];

const authStore = useAuthStore();
</script>

<template>
  <div class="fixed flex w-full bg-yellow-mustard bottom-0">
    <ul class="flex w-full py-4 px-8 justify-between">
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="{ name: route.path, query: route.query, params: route.params }"
      >
        <li>
          <img :src="route.icon" :alt="route.name" class="w-5" />
        </li>
      </RouterLink>
      <li @click="authStore.postLogout">
        <img src="/icons/arrow_right_bracket.svg" alt="Logout" class="w-5" />
      </li>
    </ul>
  </div>
</template>
