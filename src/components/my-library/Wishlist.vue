<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";
import { router } from "@/router/router";

import { storeToRefs } from "pinia";
import { useWishlistStore } from "@/store/wishlist.store";
import { WishlistSearchQuery } from "@/types/request.type";

import { FwbInput, FwbSpinner, FwbPagination, FwbSelect } from "flowbite-vue";
import WishlistCard from "@/components/my-library/WishlistCard.vue";
import SearchLoopOutline from "@/components/icons/SearchLoopOutline.vue";
import HeartOutline from "@/components/icons/HeartOutline.vue";

const props = defineProps({
  isLg: {
    type: Boolean
  }
});

const { isLg } = toRefs(props);

const wishlistStore = useWishlistStore();
const page = ref(1);
const query = ref({} as WishlistSearchQuery);

const bookTypeOptions = [
  { name: "ALL", value: "ALL" },
  { name: "BORROWABLE", value: "BORROWABLE" },
  { name: "ONSALE", value: "ONSALE" }
];

const { wishlist, wishlistMetadata, isLoadingWishlist } =
  storeToRefs(wishlistStore);

onMounted(() => {
  const pageQuery = router.currentRoute.value.query.page;
  if (pageQuery && pageQuery !== null) {
    page.value = parseInt(pageQuery as string);
  }

  query.value.currentPage = page.value;
  query.value.limitPerPage = 5;
  query.value.bookType = "ALL";
  wishlistStore.fetchWishlist(query.value);

  document.title = "Wishlist - BNMO Library";
});

const handleSearch = () => {
  query.value.currentPage = 1;
  if (page.value !== 1) {
    router.push({
      name: "My Library",
      query: { page: 1 },
      params: { tab: "wishlist" }
    });
  }
  wishlistStore.fetchWishlist(query.value);
};

watch(page, () => {
  router.push({
    name: "My Library",
    query: { page: page.value },
    params: { tab: "wishlist" }
  });
  query.value.currentPage = page.value;
  wishlistStore.fetchWishlist(query.value);
});
</script>

<template>
  <div v-if="isLoadingWishlist" class="flex flex-1 items-center justify-center">
    <FwbSpinner size="12" />
  </div>
  <div
    v-else-if="wishlist.length === 0"
    class="flex flex-col flex-1 w-full items-center justify-center gap-8 text-center"
  >
    <component
      :is="HeartOutline"
      custom-class="text-black dark:text-white w-32"
    />
    <h2>Your wishlist is empty right now.</h2>
    <p>Start adding your favorite items to it and keep them saved for later!</p>
  </div>
  <div v-else class="flex flex-col gap-4 items-center">
    <div class="flex flex-col lg:flex-row w-full gap-4">
      <FwbInput
        v-model="query.searchQuery"
        id="search_query"
        placeholder="Search book title..."
        type="text"
        class="w-full"
      >
        <template #prefix>
          <component
            :is="SearchLoopOutline"
            custom-class="text-black dark:text-white w-5 h-5"
          />
        </template>
      </FwbInput>
      <FwbSelect v-model="query.bookType" :options="bookTypeOptions" />
      <button
        @click="handleSearch"
        class="button-full lg:w-1/5"
        :disabled="isLoadingWishlist"
      >
        <FwbSpinner v-if="isLoadingWishlist" />
        Search
      </button>
    </div>

    <div class="flex flex-col w-full gap-4">
      <WishlistCard v-for="item in wishlist" :key="item.id" :wishlist="item" />
    </div>
    <div class="flex w-full items-center justify-center mb-12 lg:mb-0">
      <FwbPagination
        v-model="page"
        :total-pages="wishlistMetadata.totalPage"
        show-icons
        :slice-length="isLg ? 2 : 1"
        large
      />
    </div>
  </div>
</template>
