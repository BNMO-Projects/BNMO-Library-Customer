<script setup lang="ts">
import { onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useOrderHistoryStore } from "@/store/orderhistory.store";

import { FwbSpinner, FwbAccordion } from "flowbite-vue";
import InboxOutline from "@/components/icons/InboxOutline.vue";
import OrderHistoryItem from "@/components/my-library/order-history/OrderHistoryItem.vue";

const orderHistoryStore = useOrderHistoryStore();

const { orderHistory, isLoadingOrderHistory } = storeToRefs(orderHistoryStore);

onMounted(() => {
  orderHistoryStore.fetchWishlist();
  document.title = "Order History - BNMO Library";
});
</script>

<template>
  <div
    v-if="isLoadingOrderHistory"
    class="flex flex-1 items-center justify-center"
  >
    <FwbSpinner size="12" />
  </div>
  <div
    v-else-if="orderHistory.length === 0"
    class="flex flex-col flex-1 w-full items-center justify-center gap-8 text-center"
  >
    <component
      :is="InboxOutline"
      custom-class="text-black dark:text-white w-32"
    />
    <h2>Your order history is currently empty.</h2>
    <p>To add a new order, simply proceed to checkout your cart.</p>
  </div>
  <div v-else class="flex flex-col w-full gap-4">
    <FwbAccordion flush :open-first-item="false" class="w-full">
      <OrderHistoryItem
        v-for="(item, index) in orderHistory"
        :key="item.id"
        :order-history="item"
        :index="orderHistory.length - index"
      />
    </FwbAccordion>
    <div class="mb-12 lg:mb-0">
      <p>Note:</p>
      <p>
        <span class="yellow-tag">PENDING</span> orders are awaiting verification
        from library admin
      </p>
      <p>
        <span class="green-tag">READY</span> orders are verified by admin and
        are ready to be picked up
      </p>
      <p><span class="blue-tag">COMPLETED</span> orders has been picked up</p>
    </div>
  </div>
</template>
