<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { CartItemListResponse } from "@/types/response.type";
defineProps({
  items: {
    type: Object as () => CartItemListResponse,
    required: true
  }
});

const cartStore = useCartStore();

const handleRemoveItem = (id: string) => {
  cartStore.removeItemFromCart(id);
};
</script>

<template>
  <div class="lg:flex items-center border-b border-b-black/20 p-4 hidden">
    <div class="flex items-center gap-4 w-[30%]">
      <img :src="items.book_cover" class="w-16" />
      <RouterLink
        :to="'/book-detail/' + items.book_id"
        class="flex flex-col hover:cursor-pointer hover:underline"
      >
        <p class="font-bold">{{ items.title }}</p>
        <p>{{ items.author_name }}</p>
      </RouterLink>
    </div>
    <div class="w-1/5 text-center">
      <span class="bg-orange-coral px-4 py-2 rounded-lg font-bold">
        {{ items.book_type }}
      </span>
    </div>
    <p class="w-[15%] text-center">
      {{
        items.price
          ? items.price.toLocaleString("en-US", {
              style: "currency",
              currency: "IDR",
              currencyDisplay: "narrowSymbol"
            })
          : "-"
      }}
    </p>
    <p class="w-[10%] text-center">1</p>
    <p class="w-[20%] text-center font-bold">
      {{
        items.price
          ? items.price.toLocaleString("en-US", {
              style: "currency",
              currency: "IDR",
              currencyDisplay: "narrowSymbol"
            })
          : "-"
      }}
    </p>
    <img
      src="/icons/close_outline.svg"
      alt="Remove item"
      class="w-3 hover:cursor-pointer"
      @click="handleRemoveItem(items.id)"
    />
  </div>
  <div class="flex items-center gap-4 lg:hidden">
    <img :src="items.book_cover" class="w-24" />
    <div class="flex flex-col w-4/5">
      <RouterLink
        :to="'/book-detail/' + items.book_id"
        class="flex flex-col w-full hover:cursor-pointer hover:underline"
      >
        <p class="font-bold">{{ items.title }}</p>
        <p>{{ items.author_name }}</p>
      </RouterLink>
      <p>{{ items.book_type }}</p>
      <p>
        {{
          items.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "IDR",
            currencyDisplay: "narrowSymbol"
          })
        }}
      </p>
    </div>
    <img
      src="/icons/close_outline.svg"
      alt="Remove item"
      class="w-3 hover:cursor-pointer"
      @click="handleRemoveItem(items.id)"
    />
  </div>
</template>
