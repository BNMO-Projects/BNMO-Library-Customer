<script setup lang="ts">
import { onMounted } from "vue";
import TopHeader from "@/components/global/TopHeader.vue";
import LoggedLayout from "@/components/global/LoggedLayout.vue";
import { router } from "@/router/router";
import { useBookStore } from "@/store/book.store";
import { storeToRefs } from "pinia";
import { FwbSpinner } from "flowbite-vue";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import HeartSolid from "@/components/icons/HeartSolid.vue";
import CartPlusSolid from "@/components/icons/CartPlusSolid.vue";

const bookStore = useBookStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const { getBookDetail, isLoadingBookDetail } = storeToRefs(bookStore);

onMounted(() => {
  bookStore.getBookDetails(router.currentRoute.value.params.id as string);
});

const handleAddToCart = async (id: string) => {
  await cartStore.addItemToCart(id);
  bookStore.getBookDetails(getBookDetail.value.id);
};

const handleRemoveFromCart = async (id: string) => {
  await cartStore.removeItemFromCart(id);
  bookStore.getBookDetails(getBookDetail.value.id);
};

const handleAddToWishlist = async (id: string) => {
  await wishlistStore.addNewWishlist(id);
  bookStore.getBookDetails(getBookDetail.value.id);
};

const handleRemoveFromWishlist = async (id: string) => {
  await wishlistStore.removeFromWishlist(id);
  bookStore.getBookDetails(getBookDetail.value.id);
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
              <span class="book-type-tag">
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
                v-if="!getBookDetail.in_wishlist"
                class="button-full lg:w-fit"
                @click="handleAddToWishlist(getBookDetail.id)"
              >
                <component :is="HeartSolid" custom-class="text-white" />
                Add to wishlist
              </button>
              <button
                v-else
                class="button-full lg:w-fit"
                @click="handleRemoveFromWishlist(getBookDetail.wishlist_id)"
              >
                <component :is="HeartSolid" custom-class="text-white" />
                Remove from wishlist
              </button>
              <button
                v-if="!getBookDetail.in_cart"
                class="button-full lg:w-fit"
              >
                <component :is="CartPlusSolid" custom-class="text-white" />
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
              <button v-else class="button-full lg:w-fit">
                <component :is="CartPlusSolid" custom-class="text-white" />
                <p @click="handleRemoveFromCart(getBookDetail.cart_item_id)">
                  Remove from cart
                </p>
              </button>
              <p class="font-bold">
                Stock: {{ getBookDetail.current_stock }} /
                {{ getBookDetail.original_stock }}
              </p>
            </div>
            <div class="flex flex-col flex-wrap lg:flex-row gap-4 items-center">
              <div class="flex gap-4 items-center">
                <span class="tag-span">
                  {{ getBookDetail.category_name }}
                </span>

                <span class="tag-span">
                  {{ getBookDetail.genre_name }}
                </span>

                <span class="tag-span">
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
          <p class="text-justify">{{ getBookDetail.description }}</p>
        </div>
      </div>
    </div>
  </LoggedLayout>
</template>
