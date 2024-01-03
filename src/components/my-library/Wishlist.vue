<script setup lang="ts">
import { router } from "@/router/router";
import { useWishlistStore } from "@/store/wishlist.store";
import { WishlistSearchQuery } from "@/types/request.type";
import { FwbInput, FwbButton, FwbSpinner, FwbPagination } from "flowbite-vue";
import { storeToRefs } from "pinia";
import { onMounted, ref, toRefs } from "vue";
import WishlistCard from "@/components/my-library/WishlistCard.vue";

const props = defineProps({
  isLg: {
    type: Boolean
  }
});

const { isLg } = toRefs(props);

const wishlistStore = useWishlistStore();
const page = ref(1);
const query = ref({} as WishlistSearchQuery);

const { getWishlist, getWishlistMetadata, isLoadingWishlist } =
  storeToRefs(wishlistStore);

onMounted(() => {
  const pageQuery = router.currentRoute.value.query.page;
  if (pageQuery && pageQuery !== null) {
    page.value = parseInt(pageQuery as string);
  }

  query.value.currentPage = page.value;
  query.value.limitPerPage = 10;
  query.value.bookType = "ALL";
  wishlistStore.getWishlistData(query.value);
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
  wishlistStore.getWishlistData(query.value);
};

const rowsLg = (total: number, page: number) => {
  let rows = 2;
  if (total - (page - 1) * 10 < 5) {
    rows = 1;
  }

  return rows;
};

const rowsBase = (total: number, page: number) => {
  let rows = 5;
  if (total - (page - 1) * 10 < 8) {
    rows = 4;
  } else if (total - (page - 1) * 10 < 6) {
    rows = 3;
  } else if (total - (page - 1) * 10 < 4) {
    rows = 2;
  } else if (total - (page - 1) * 10 < 2) {
    rows = 1;
  }

  return rows;
};
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="flex w-full gap-4">
      <FwbInput
        v-model="query.searchQuery"
        id="search_query"
        placeholder="Search book title..."
        type="text"
        class="w-full"
      >
        <template #prefix>
          <img
            src="/icons/search_loop_outline.svg"
            alt="Search loop"
            class="w-5"
          />
        </template>
      </FwbInput>
      <FwbButton
        class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full lg:w-1/5 h-fit text-base font-bold inline-flex items-center justify-center text-black"
        @click="handleSearch"
      >
        Search
      </FwbButton>
    </div>
    <FwbSpinner v-if="isLoadingWishlist" size="12" />
    <div
      class="grid gap-4"
      :class="`grid-cols-1 grid-rows-${rowsBase(
        getWishlistMetadata.total,
        page
      )} lg:grid-cols-2 lg:grid-rows-${rowsLg(
        getWishlistMetadata.total,
        page
      )}`"
    >
      <WishlistCard
        v-for="item in getWishlist"
        :key="item.id"
        :wishlist="item"
      />
    </div>
    <div class="flex w-full items-center justify-center mb-12 lg:mb-0">
      <FwbPagination
        v-model="page"
        :total-pages="getWishlistMetadata.totalPage"
        show-icons
        :slice-length="isLg ? 2 : 1"
        large
      />
    </div>
  </div>
</template>
