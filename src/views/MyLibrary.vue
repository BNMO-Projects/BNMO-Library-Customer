<script setup lang="ts">
import { ref } from "vue";
import LoggedLayout from "@/components/global/LoggedLayout.vue";
import TopHeader from "@/components/global/TopHeader.vue";
import Wishlist from "@/components/my-library/wishlist/Wishlist.vue";
import OrderHistory from "@/components/my-library/order-history/OrderHistory.vue";
import { router } from "@/router/router";

const tabs = [
  { id: "wishlist", name: "Wishlist", query: { page: 1 } },
  {
    id: "order-history",
    name: "Order History",
    path: "/order-history"
  },
  {
    id: "currently-borrowed",
    name: "Currently Borrowed",
    path: "/currently-borrowed"
  }
];

const isLg = ref(window.screen.width > 1023);
const activeTab = ref(router.currentRoute.value.params.tab as string);
</script>

<template>
  <LoggedLayout @resize-lg="(value) => (isLg = value)">
    <TopHeader />
    <div
      class="flex flex-col flex-1 text-text-color dark:text-text-color-dark gap-4"
    >
      <ul
        class="flex whitespace-nowrap overflow-auto text-base font-bold text-center text-gray-500 dark:text-gray-400"
      >
        <li class="me-2" v-for="tab in tabs" :key="tab.id">
          <RouterLink
            :to="{
              name: 'My Library',
              query: tab.query,
              params: { tab: tab.id }
            }"
            class="inline-block px-4 py-3 rounded-lg hover:bg-secondary-color hover:text-white"
            :class="
              $route.params.tab === tab.id
                ? 'bg-secondary-color text-white'
                : 'text-black dark:text-white'
            "
          >
            {{ tab.name }}
          </RouterLink>
        </li>
      </ul>
      <Wishlist v-if="activeTab === 'wishlist'" :is-lg="isLg" />
      <OrderHistory v-if="activeTab === 'order-history'" :is-lg="isLg" />
    </div>
  </LoggedLayout>
</template>
