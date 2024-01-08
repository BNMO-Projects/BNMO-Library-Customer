<script setup lang="ts">
import { ref, onMounted } from "vue";
import { router } from "@/router/router";

import { storeToRefs } from "pinia";
import { useBookStore } from "@/store/book.store";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";

import { FwbSpinner } from "flowbite-vue";
import TopHeader from "@/components/global/TopHeader.vue";
import LoggedLayout from "@/components/global/LoggedLayout.vue";
import HeartSolid from "@/components/icons/HeartSolid.vue";
import CartPlusSolid from "@/components/icons/CartPlusSolid.vue";
import RemoveFromWishlistModal from "@/components/modal/RemoveFromWishlistModal.vue";

const bookStore = useBookStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const { bookDetail, isLoadingBookDetail } = storeToRefs(bookStore);

const isModalOpen = ref(false);

onMounted(async () => {
  await bookStore.fetchBookDetails(
    router.currentRoute.value.params.id as string
  );
  document.title = `${bookDetail.value.title} - BNMO Library`;
});

const handleAddToCart = async (id: string) => {
  if (bookDetail.value.in_wishlist) {
    isModalOpen.value = true;
  } else {
    await cartStore.addItemToCart(id);
    bookStore.fetchBookDetails(bookDetail.value.id);
  }
};

const handleAddToWishlist = async (id: string) => {
  await wishlistStore.addToWishlist(id);
  bookStore.fetchBookDetails(bookDetail.value.id);
};
</script>

<template>
  <RemoveFromWishlistModal
    :is-modal-open="isModalOpen"
    @close-modal="isModalOpen = false"
  />
  <LoggedLayout>
    <TopHeader />
    <div class="flex justify-center">
      <FwbSpinner v-if="isLoadingBookDetail" size="12" />
      <div v-else class="flex flex-col w-full p-0 lg:p-4 gap-8">
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <img
            :src="bookDetail.book_cover"
            :alt="bookDetail.id"
            class="w-48 rounded-md"
          />
          <div class="flex flex-col gap-4 w-full">
            <div
              class="flex flex-col lg:flex-row items-center justify-between gap-4"
            >
              <h1>{{ bookDetail.title }}</h1>
              <span class="book-type-tag">
                {{ bookDetail.book_type }}
              </span>
            </div>
            <h3 class="text-center lg:text-left">
              {{ bookDetail.author_name }}
            </h3>
            <p class="text-center lg:text-left">ISBN: {{ bookDetail.isbn }}</p>
            <div
              class="flex flex-col lg:flex-row gap-4 border-t border-t-black pt-4 items-center"
            >
              <button
                v-if="!bookDetail.in_wishlist"
                class="button-full lg:w-fit"
                @click="handleAddToWishlist(bookDetail.id)"
              >
                <component :is="HeartSolid" custom-class="text-white" />
                Add to wishlist
              </button>
              <RouterLink
                v-else
                :to="{
                  name: 'My Library',
                  query: { page: 1 },
                  params: { tab: 'Wishlist' }
                }"
                class="w-full lg:w-fit"
              >
                <button class="button-full">
                  <component :is="HeartSolid" custom-class="text-white" />
                  <p>View in wishlist</p>
                </button>
              </RouterLink>
              <button
                v-if="!bookDetail.in_cart && bookDetail.current_stock > 0"
                class="button-full lg:w-fit"
              >
                <component :is="CartPlusSolid" custom-class="text-white" />
                <p
                  v-if="bookDetail.price"
                  @click="handleAddToCart(bookDetail.id)"
                >
                  Add to cart for
                  {{
                    bookDetail.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "IDR",
                      currencyDisplay: "narrowSymbol"
                    })
                  }}
                </p>
                <p v-else @click="handleAddToCart(bookDetail.id)">
                  Add to cart
                </p>
              </button>
              <RouterLink
                v-else-if="bookDetail.in_cart && bookDetail.current_stock > 0"
                :to="{ name: 'Cart' }"
              >
                <button class="button-full lg:w-fit">
                  <component :is="CartPlusSolid" custom-class="text-white" />
                  <p>View in cart</p>
                </button>
              </RouterLink>
              <button v-else class="button-red lg:w-fit" disabled>
                <component :is="CartPlusSolid" custom-class="text-white" />
                <p>Out of stock</p>
              </button>
              <p class="font-bold">
                Stock: {{ bookDetail.current_stock }} /
                {{ bookDetail.original_stock }}
              </p>
            </div>
            <div class="flex flex-col flex-wrap lg:flex-row gap-4 items-center">
              <div class="flex gap-4 items-center">
                <span class="green-tag">
                  {{ bookDetail.category_name }}
                </span>

                <span class="green-tag">
                  {{ bookDetail.genre_name }}
                </span>

                <span class="green-tag">
                  {{ bookDetail.language_name }}
                </span>
              </div>

              <p class="font-bold">
                Publication:
                {{ new Date(bookDetail.publication_year).getFullYear() }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full gap-4 mb-12 lg:mb-0">
          <h3>Description</h3>
          <p class="text-justify">{{ bookDetail.description }}</p>
        </div>
      </div>
    </div>
  </LoggedLayout>
</template>
