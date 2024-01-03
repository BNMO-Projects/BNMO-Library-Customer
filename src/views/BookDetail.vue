<script setup lang="ts">
import { onMounted } from "vue";
import TopHeader from "@/components/global/TopHeader.vue";
import LoggedLayout from "@/components/global/LoggedLayout.vue";
import { router } from "@/router/router";
import { useBookStore } from "@/store/book.store";
import { storeToRefs } from "pinia";
import { FwbSpinner } from "flowbite-vue";
import { useCartStore } from "@/store/cart.store";

const bookStore = useBookStore();
const cartStore = useCartStore();

const { getBookDetail, isLoadingBookDetail } = storeToRefs(bookStore);

onMounted(() => {
  bookStore.getBookDetails(router.currentRoute.value.params.id as string);
});

const handleAddToCart = (id: string) => {
  cartStore.addItemToCart(id);
};
</script>

<template>
  <LoggedLayout>
    <TopHeader />
    <div class="flex justify-center">
      <FwbSpinner v-if="isLoadingBookDetail" size="12" />
      <div v-else class="flex flex-col w-full p-0 lg:p-4 gap-8">
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <img
            :src="getBookDetail.book_cover"
            :alt="getBookDetail.id"
            class="w-48 rounded-md"
          />
          <div class="flex flex-col gap-4 w-full">
            <div
              class="flex flex-col lg:flex-row items-center justify-between gap-4"
            >
              <h1 class="text-center">{{ getBookDetail.title }}</h1>
              <span class="bg-orange-coral px-4 py-2 rounded-lg font-bold">
                {{ getBookDetail.book_type }}
              </span>
            </div>
            <h3 class="text-center lg:text-left">
              {{ getBookDetail.author_name }}
            </h3>
            <p class="text-center lg:text-left">
              ISBN: {{ getBookDetail.isbn }}
            </p>
            <div
              class="flex flex-col lg:flex-row gap-4 border-t border-t-black pt-4 items-center"
            >
              <button
                class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full lg:w-fit text-base font-bold rounded-lg px-4 py-2 flex items-center justify-center gap-2"
              >
                <img
                  src="/icons/heart_solid.svg"
                  alt="Wishlist heart"
                  class="w-4"
                />
                Add to wishlist
              </button>
              <button
                class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full lg:w-fit text-base font-bold rounded-lg px-4 py-2 flex items-center justify-center gap-2"
              >
                <img
                  src="/icons/cart_plus_solid.svg"
                  alt="Wishlist heart"
                  class="w-5"
                />
                <p
                  v-if="getBookDetail.price"
                  @click="handleAddToCart(getBookDetail.id)"
                >
                  Add to cart for
                  {{
                    getBookDetail.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "IDR",
                      currencyDisplay: "narrowSymbol"
                    })
                  }}
                </p>
                <p v-else @click="handleAddToCart(getBookDetail.id)">
                  Add to cart
                </p>
              </button>
              <p class="font-bold">
                Stock: {{ getBookDetail.current_stock }} /
                {{ getBookDetail.original_stock }}
              </p>
            </div>
            <div class="flex flex-col flex-wrap lg:flex-row gap-4 items-center">
              <div class="flex gap-4 items-center">
                <span class="bg-orange-coral text-sm px-2 rounded-md">
                  {{ getBookDetail.category_name }}
                </span>

                <span class="bg-orange-coral text-sm px-2 rounded-md">
                  {{ getBookDetail.genre_name }}
                </span>

                <span class="bg-orange-coral text-sm px-2 rounded-md">
                  {{ getBookDetail.language_name }}
                </span>
              </div>

              <p class="font-bold">
                Publication:
                {{ new Date(getBookDetail.publication_year).getFullYear() }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full gap-4 mb-12 lg:mb-0">
          <h3>Description</h3>
          <p>{{ getBookDetail.description }}</p>
        </div>
      </div>
    </div>
  </LoggedLayout>
</template>
