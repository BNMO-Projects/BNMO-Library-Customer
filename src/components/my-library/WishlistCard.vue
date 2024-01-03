<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { WishlistResponse } from "@/types/response.type";
import { FwbButton } from "flowbite-vue";

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
  <div class="hidden lg:flex rounded-md p-4 gap-4 shadow-md">
    <img
      :src="wishlist.book_cover"
      :alt="wishlist.id"
      class="rounded-md w-16 lg:w-24 2xl:w-28 3xl:w-32"
    />
    <div class="flex flex-col w-full gap-2 relative">
      <span
        class="absolute bg-orange-coral px-4 py-2 rounded-lg font-bold right-0 top-0"
      >
        {{ wishlist.book_type }}
      </span>
      <h2 class="truncate w-[60%]">{{ wishlist.title }}</h2>
      <p>{{ wishlist.author_name }}</p>
      <p class="font-bold">
        Stock: {{ wishlist.current_stock }} /
        {{ wishlist.original_stock }}
      </p>
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
      <div class="flex flex-col lg:flex-row gap-4">
        <RouterLink :to="'/book-detail/' + wishlist.book_id">
          <FwbButton
            class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full h-fit text-base font-bold inline-flex items-center justify-center text-black"
          >
            See Details
          </FwbButton>
        </RouterLink>
        <button
          class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full lg:w-fit text-base font-bold rounded-lg px-4 py-2 flex items-center justify-center gap-2"
        >
          <img
            src="/icons/cart_plus_solid.svg"
            alt="Wishlist heart"
            class="w-5"
          />
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

  <div class="flex lg:hidden flex-col rounded-md p-4 gap-4 shadow-md">
    <div class="flex w-full gap-2">
      <img
        :src="wishlist.book_cover"
        :alt="wishlist.id"
        class="rounded-md w-24"
      />
      <div class="flex flex-col gap-2">
        <h3>{{ wishlist.title }}</h3>
        <p>{{ wishlist.author_name }}</p>
        <p class="font-bold">
          Stock: {{ wishlist.current_stock }} /
          {{ wishlist.original_stock }}
        </p>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-4">
      <RouterLink :to="'/book-detail/' + wishlist.book_id">
        <FwbButton
          class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full h-fit text-base font-bold inline-flex items-center justify-center text-black"
        >
          See Details
        </FwbButton>
      </RouterLink>
      <button
        class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full lg:w-fit text-base font-bold rounded-lg px-4 py-2 flex items-center justify-center gap-2"
      >
        <img
          src="/icons/cart_plus_solid.svg"
          alt="Wishlist heart"
          class="w-5"
        />
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
</template>
