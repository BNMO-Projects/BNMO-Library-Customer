<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { WishlistResponse } from "@/types/response.type";
import CartPlusSolid from "@/components/icons/CartPlusSolid.vue";

defineProps({
  wishlist: {
    type: Object as () => WishlistResponse,
    required: true
  }
});

const cartStore = useCartStore();

const handleAddToCart = (id: string) => {
  cartStore.addItemToCart(id);
};
</script>

<template>
  <div
    class="hidden lg:flex rounded-md p-4 gap-4 bg-container-color dark:bg-container-color-dark shadow-md w-full"
  >
    <img
      :src="wishlist.book_cover"
      :alt="wishlist.id"
      class="rounded-md w-16 lg:w-24 2xl:w-32 3xl:w-36"
    />
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-between">
        <div class="flex gap-4 items-center">
          <h3 class="truncate">{{ wishlist.title }}</h3>
          <p>{{ wishlist.author_name }}</p>
        </div>
        <div class="flex gap-4 items-center">
          <p class="hidden lg:block">
            Wishlist added on
            {{
              new Date(wishlist.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            }}
          </p>
          <span class="book-type-tag">
            {{ wishlist.book_type }}
          </span>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex gap-4 items-center">
          <span class="tag-span">
            {{ wishlist.category_name }}
          </span>

          <span class="tag-span">
            {{ wishlist.genre_name }}
          </span>

          <span class="tag-span">
            {{ wishlist.language_name }}
          </span>
        </div>
        <p class="font-bold">
          Stock: {{ wishlist.current_stock }} /
          {{ wishlist.original_stock }}
        </p>
      </div>
      <p class="line-clamp-3">{{ wishlist.description }}</p>

      <div class="flex flex-col lg:flex-row gap-4">
        <RouterLink :to="'/book-detail/' + wishlist.book_id">
          <button class="button-full">See Details</button>
        </RouterLink>
        <button class="button-full w-fit">
          <component :is="CartPlusSolid" custom-class="text-white" />
          <p v-if="wishlist.price" @click="handleAddToCart(wishlist.book_id)">
            Add to cart for
            {{
              wishlist.price.toLocaleString("en-US", {
                style: "currency",
                currency: "IDR",
                currencyDisplay: "narrowSymbol"
              })
            }}
          </p>
          <p v-else @click="handleAddToCart(wishlist.book_id)">Add to cart</p>
        </button>
      </div>
    </div>
  </div>

  <div
    class="flex lg:hidden flex-col rounded-md p-4 gap-4 bg-container-color shadow-md"
  >
    <div class="flex w-full gap-2">
      <img
        :src="wishlist.book_cover"
        :alt="wishlist.id"
        class="rounded-md w-24"
      />
      <div class="flex flex-col gap-2">
        <h3 class="line-clamp-2">{{ wishlist.title }}</h3>
        <p>{{ wishlist.author_name }}</p>
        <p class="font-bold">
          Stock: {{ wishlist.current_stock }} /
          {{ wishlist.original_stock }}
        </p>
        <span class="tag-span w-fit font-bold">
          {{ wishlist.book_type }}
        </span>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-4">
      <RouterLink :to="'/book-detail/' + wishlist.book_id">
        <button class="button-full">See Details</button>
      </RouterLink>
      <button class="button-full">
        <component :is="CartPlusSolid" custom-class="text-white" />
        <p v-if="wishlist.price" @click="handleAddToCart(wishlist.book_id)">
          Add to cart for Rp
          {{ (wishlist.price / 1000).toFixed(1) + "K" }}
        </p>
        <p v-else @click="handleAddToCart(wishlist.book_id)">Add to cart</p>
      </button>
    </div>
  </div>
</template>
