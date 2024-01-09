<script setup lang="ts">
import { router } from "@/router/router";
import { useAuthStore } from "@/store/auth.store";
import HomeSolid from "@/components/icons/HomeSolid.vue";
import SearchLoopOutline from "@/components/icons/SearchLoopOutline.vue";
import BookSolid from "@/components/icons/BookSolid.vue";
import CartSolid from "@/components/icons/CartSolid.vue";
import CogSolid from "@/components/icons/CogSolid.vue";
import ArrowRightBracket from "@/components/icons/ArrowRightBracket.vue";

const routes = [
  { name: "Home", path: "Home", icon: HomeSolid },
  {
    name: "Search",
    path: "Search",
    icon: SearchLoopOutline,
    query: { page: 1 }
  },
  {
    name: "My Library",
    path: "My Library",
    icon: BookSolid,
    query: { page: 1 },
    params: { tab: "wishlist" }
  },
  { name: "Cart", path: "Cart", icon: CartSolid },
  { name: "Settings", path: "Settings", icon: CogSolid }
];

const authStore = useAuthStore();

const enableActiveRoute = (name: string) => {
  if (router.currentRoute.value.name === name) {
    return "bg-hover-color";
  } else if (
    name === "Search" &&
    router.currentRoute.value.name === "Book Detail"
  ) {
    return "bg-hover-color";
  }

  return undefined;
};
</script>

<template>
  <aside
    class="bg-secondary-color text-white w-1/6 h-screen hidden lg:block lg:fixed left-0 top-0 dark:bg-secondary-color-dark"
  >
    <div class="p-4 h-full">
      <img src="/images/logo-white.webp" alt="BNMO Logo" class="w-40 mb-8" />
      <div class="flex flex-col gap-2">
        <RouterLink
          v-for="route in routes"
          :key="route.name"
          :to="{ name: route.path, query: route.query, params: route.params }"
          class="hover:bg-hover-color p-2 rounded-lg"
          :class="enableActiveRoute(route.name)"
        >
          <div class="flex items-center gap-3">
            <component :is="route.icon" custom-class="text-white h-6 w-6" />
            <p class="font-bold">{{ route.name }}</p>
          </div>
        </RouterLink>
        <div
          class="hover:bg-hover-color p-2 rounded-lg hover:cursor-pointer"
          @click="authStore.postLogout"
        >
          <div class="flex items-center gap-3">
            <component :is="ArrowRightBracket" custom-class="text-white" />
            <p class="font-bold">Logout</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
