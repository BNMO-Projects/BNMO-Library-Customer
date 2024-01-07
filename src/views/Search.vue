<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { router } from "@/router/router";

import { storeToRefs } from "pinia";
import { useBookStore } from "@/store/book.store";

import { FwbPagination, FwbSpinner } from "flowbite-vue";
import TopHeader from "@/components/global/TopHeader.vue";
import LoggedLayout from "@/components/global/LoggedLayout.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import BookCard from "@/components/search/BookCard.vue";

const bookStore = useBookStore();
const page = ref(1);
const isLg = ref(window.screen.width > 1023);
const isThreeXl = ref(window.screen.width > 1919);

const { books, booksMetadata, isLoadingBooks } = storeToRefs(bookStore);

onMounted(() => {
  const pageQuery = router.currentRoute.value.query.page;
  if (pageQuery && pageQuery !== null) {
    page.value = parseInt(pageQuery as string);
  }
});

const rowsThreeXl = (total: number, page: number) => {
  let rows = 2;
  if (total - (page - 1) * 12 < 6) {
    rows = 1;
  }

  return rows;
};

const rowsLg = (total: number, page: number) => {
  let rows = 2;
  if (total - (page - 1) * 10 < 5) {
    rows = 1;
  }

  return rows;
};

const rowsMd = (total: number, page: number) => {
  let rows = 3;
  if (total - (page - 1) * 10 < 8) {
    rows = 2;
  } else if (total - (page - 1) * 10 < 4) {
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

watch(page, () => {
  router.push({ name: "Search", query: { page: page.value } });
});
</script>

<template>
  <LoggedLayout
    @resize-lg="(value) => (isLg = value)"
    @resize-three-xl="(value) => (isThreeXl = value)"
  >
    <TopHeader />
    <div class="flex flex-col flex-1 gap-4">
      <SearchBar :page="page" :limit="isThreeXl ? 12 : 10" />
      <div
        v-if="isLoadingBooks"
        class="flex flex-1 items-center justify-center gap-4"
      >
        <FwbSpinner size="12" />
      </div>
      <div v-else class="flex flex-col gap-4 justify-center">
        <h2>Search result</h2>
        <div
          :class="`3xl:grid-cols-6 3xl:grid-rows-${rowsThreeXl(
            booksMetadata.total,
            page
          )} lg:grid-cols-5 lg:grid-rows-${rowsLg(
            booksMetadata.total,
            page
          )} md:grid-cols-4 md:grid-rows-${rowsMd(
            booksMetadata.total,
            page
          )} grid-cols-2 grid-rows-${rowsBase(booksMetadata.total, page)}`"
          class="grid gap-8 place-items-center"
        >
          <BookCard v-for="book in books" :key="book.id" :book="book" />
        </div>
        <div class="flex w-full items-center justify-center mb-12 lg:mb-0">
          <FwbPagination
            v-model="page"
            :total-pages="booksMetadata.totalPage"
            show-icons
            :slice-length="isLg ? 2 : 1"
            large
          />
        </div>
      </div>
    </div>
  </LoggedLayout>
</template>
