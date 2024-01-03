<script setup lang="ts">
import { FwbButton, FwbSpinner } from "flowbite-vue";
import CartRow from "@/components/cart/CartRow.vue";
import LoggedLayout from "@/components/global/LoggedLayout.vue";
import TopHeader from "@/components/global/TopHeader.vue";
import { useCartStore } from "@/store/cart.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const cartStore = useCartStore();

const { getCartItems, getSubtotal, isLoadingAddCartItem } =
  storeToRefs(cartStore);

onMounted(() => {
  cartStore.getAllCartItems();
});
</script>

<template>
  <LoggedLayout>
    <TopHeader />
    <FwbSpinner size="12" v-if="isLoadingAddCartItem" />
    <div class="flex flex-col" v-else>
      <div class="flex w-full text-center font-bold px-4 mb-4">
        <p class="w-[30%]">Book</p>
        <p class="w-1/5">Type</p>
        <p class="w-[15%]">Price</p>
        <p class="w-[10%]">Quantity</p>
        <p class="w-[20%]">Subtotal</p>
      </div>
      <CartRow v-for="items in getCartItems" :key="items.id" :items="items" />
      <div class="flex items-center justify-between py-4">
        <p>
          * Please note: We <strong>do not</strong> offer delivery. All books
          must be picked up in-store, free of any shipping charges.
        </p>
        <div class="flex gap-8 items-center">
          <p class="font-bold">Subtotal</p>
          <h2 class="font-normal">
            {{
              getSubtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "IDR",
                currencyDisplay: "narrowSymbol"
              })
            }}
            *
          </h2>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <FwbButton
          class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full lg:w-1/4 h-fit text-base font-bold inline-flex items-center justify-center text-black"
        >
          Checkout
        </FwbButton>
      </div>
    </div>
  </LoggedLayout>
</template>
