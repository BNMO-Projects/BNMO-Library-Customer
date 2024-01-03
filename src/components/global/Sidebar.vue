<script setup lang="ts">
import { router } from "@/router/router";
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
  { name: "Cart", path: "Cart", icon: "/icons/cart_solid.svg" },
  { name: "Settings", path: "Settings", icon: "/icons/cog_solid.svg" }
];

const authStore = useAuthStore();

const enableActiveRoute = (name: string) => {
  if (router.currentRoute.value.name === name) {
    return "bg-orange-coral";
  } else if (
    name === "Search" &&
    router.currentRoute.value.name === "Book Detail"
  ) {
    return "bg-orange-coral";
  }

  return undefined;
};
</script>

<template>
  <aside
    class="bg-yellow-mustard w-1/6 h-screen hidden lg:block lg:fixed left-0 top-0"
  >
    <div class="p-4 h-full">
      <img src="/images/logo.webp" alt="BNMO Logo" class="w-32 mb-8" />
      <div class="flex flex-col gap-2">
        <RouterLink
          v-for="route in routes"
          :key="route.name"
          :to="{ name: route.path, query: route.query, params: route.params }"
          class="hover:bg-orange-coral p-2 rounded-lg"
          :class="enableActiveRoute(route.name)"
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
