<script setup lang="ts">
import { toRefs } from "vue";
import { OrderHistoryResponse } from "@/types/response.type";
import {
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel
} from "flowbite-vue";
import OrderHistoryCartItem from "@/components/my-library/order-history/OrderHistoryCartItem.vue";

const props = defineProps({
  orderHistory: {
    type: Object as () => OrderHistoryResponse,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const { orderHistory, index } = toRefs(props);

const statusTagColor = () => {
  if (orderHistory.value.status === "PENDING") {
    return "yellow-tag";
  } else if (orderHistory.value.status === "READY") {
    return "green-tag";
  } else if (orderHistory.value.status === "COMPLETED") {
    return "blue-tag";
  }
};

const calculateSubtotal = () => {
  let subtotal = 0;
  orderHistory.value.cart_items.map((item) => {
    subtotal += item.price ? item.price : 0;
  });
  return subtotal;
};
</script>

<template>
  <FwbAccordionPanel>
    <FwbAccordionHeader>
      <div class="hidden lg:flex w-full items-center justify-between">
        <div class="flex gap-4 items-center">
          <span :class="statusTagColor()">{{ orderHistory.status }}</span>
          <h2>Order {{ index }}</h2>
          <p class="text-sm">
            Ordered on
            {{
              new Date(orderHistory.created_at).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            }}
          </p>
        </div>
        <p class="mr-8">
          Validation code: <strong>{{ orderHistory.validation_code }}</strong>
        </p>
      </div>
      <div class="flex flex-col lg:hidden w-full gap-2">
        <div class="flex gap-4 items-center">
          <span :class="statusTagColor()">{{ orderHistory.status }}</span>
          <h2>Order {{ index }}</h2>
        </div>
        <p class="text-sm">
          Ordered on
          {{
            new Date(orderHistory.created_at).toLocaleString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })
          }}
        </p>
        <p>
          Validation code: <strong>{{ orderHistory.validation_code }}</strong>
        </p>
      </div>
    </FwbAccordionHeader>
    <FwbAccordionContent>
      <div
        class="hidden lg:flex w-full text-center font-bold border-b border-b-black/20 dark:border-b-white p-4 mb-4"
      >
        <p class="w-[30%]">Book</p>
        <p class="w-1/5">Type</p>
        <p class="w-[20%]">Status</p>
        <p class="w-[10%]">Quantity</p>
        <p class="w-[20%]">Price</p>
      </div>
      <div class="flex flex-col gap-4">
        <OrderHistoryCartItem
          v-for="item in orderHistory.cart_items"
          :key="item.book_id"
          :items="item"
        />
        <p class="lg:text-end lg:mr-4">
          Grand total:
          <strong>
            {{
              calculateSubtotal().toLocaleString("en-US", {
                style: "currency",
                currency: "IDR",
                currencyDisplay: "narrowSymbol"
              })
            }}
          </strong>
        </p>
      </div>
    </FwbAccordionContent>
  </FwbAccordionPanel>
</template>
