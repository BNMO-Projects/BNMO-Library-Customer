<script setup lang="ts">
import { onMounted, ref } from "vue";

import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/cart.store";

import { FwbSpinner } from "flowbite-vue";
import LoggedLayout from "@/components/global/LoggedLayout.vue";
import TopHeader from "@/components/global/TopHeader.vue";
import CartRow from "@/components/cart/CartRow.vue";
import CartOutline from "@/components/icons/CartOutline.vue";
import CheckoutConfirmationModal from "@/components/modal/CheckoutConfirmationModal.vue";

const cartStore = useCartStore();

const { cartItems, subtotal, isLoadingAddCartItem } = storeToRefs(cartStore);

const isModalOpen = ref(false);

onMounted(() => {
  cartStore.fetchCartItems();
});
</script>

<template>
  <CheckoutConfirmationModal
    :is-modal-open="isModalOpen"
    @close-modal="isModalOpen = false"
  />
  <LoggedLayout>
    <TopHeader />
    <FwbSpinner size="12" v-if="isLoadingAddCartItem" />
    <div
      v-else-if="cartItems.length === 0"
      class="flex flex-col flex-1 w-full items-center justify-center gap-8 text-center"
    >
      <component
        :is="CartOutline"
        custom-class="text-black dark:text-white w-32"
      />
      <h2>Your shopping cart is currently empty.</h2>
      <p>Browse our collection to find something you'll love!</p>
    </div>
    <div class="flex flex-col gap-4 lg:gap-0" v-else>
      <h2>Shopping Cart</h2>
      <div
        class="hidden lg:flex w-full text-center font-bold border-b border-b-black/20 dark:border-b-white p-4 mb-4"
      >
        <p class="w-[30%]">Book</p>
        <p class="w-1/5">Type</p>
        <p class="w-[15%]">Price</p>
        <p class="w-[10%]">Quantity</p>
        <p class="w-[20%]">Subtotal</p>
      </div>
      <CartRow v-for="items in cartItems" :key="items.id" :items="items" />
      <div
        class="flex flex-col-reverse lg:flex-row items-center justify-between py-4"
      >
        <p>
          * Please note: We <strong>do not</strong> offer delivery. All books
          must be picked up in-store, free of any shipping charges.
        </p>
        <div
          class="flex justify-between lg:justify-normal gap-0 lg:gap-8 items-center w-full lg:w-fit"
        >
          <p class="font-bold">Subtotal</p>
          <h2 class="font-normal">
            {{
              subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "IDR",
                currencyDisplay: "narrowSymbol"
              })
            }}
            *
          </h2>
        </div>
      </div>
      <div class="flex justify-end items-center mb-12 lg:mb-0">
        <button
          type="submit"
          class="button-full lg:w-1/4"
          @click="isModalOpen = true"
        >
          <FwbSpinner v-if="false" />
          Checkout
        </button>
      </div>
    </div>
  </LoggedLayout>
</template>
