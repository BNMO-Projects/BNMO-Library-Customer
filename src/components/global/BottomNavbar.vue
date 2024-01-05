<script setup lang="ts">
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
</script>

<template>
  <div class="fixed flex w-full bg-secondary-color bottom-0">
    <ul class="flex w-full py-4 px-8 justify-between">
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="{ name: route.path, query: route.query, params: route.params }"
      >
        <li>
          <component :is="route.icon" color="white" />
        </li>
      </RouterLink>
      <li @click="authStore.postLogout">
        <component :is="ArrowRightBracket" color="white" />
      </li>
    </ul>
  </div>
</template>
