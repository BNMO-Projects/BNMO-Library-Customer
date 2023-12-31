<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import TopHeader from "@/components/TopHeader.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import LoggedLayout from "@/components/LoggedLayout.vue";
import { useBookStore } from "@/store/book.store";
import { storeToRefs } from "pinia";
import BookCard from "@/components/search/BookCard.vue";
import { FwbPagination, FwbSpinner } from "flowbite-vue";
import { router } from "@/router/router";

const bookStore = useBookStore();
const page = ref(1);
const isLg = ref(window.screen.width > 1023);

const { getBooks, getBooksMetadata, isLoadingBooks } = storeToRefs(bookStore);

onMounted(() => {
  const pageQuery = router.currentRoute.value.query.page;
  if (pageQuery && pageQuery !== null) {
    page.value = parseInt(pageQuery as string);
  }
});

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
  <LoggedLayout @resize="(value) => (isLg = value)">
    <TopHeader />
    <div class="flex flex-col gap-4">
      <SearchBar :page="page" />
      <div v-if="isLoadingBooks" class="flex justify-center gap-4">
        <FwbSpinner size="12" />
      </div>
      <div v-else class="flex flex-col gap-8">
        <h2>Search result</h2>
        <div
          :class="`lg:grid-cols-5 lg:grid-rows-${rowsLg(
            getBooksMetadata.total,
            page
          )} md:grid-cols-4 md:grid-rows-${rowsMd(
            getBooksMetadata.total,
            page
          )} grid-cols-2 grid-rows-${Math.max(
            rowsBase(getBooksMetadata.total, page)
          )}`"
          class="grid gap-8"
        >
          <BookCard v-for="book in getBooks" :key="book.id" :book="book" />
        </div>
        <div class="flex w-full items-center justify-center mb-12 lg:mb-0">
          <FwbPagination
            v-model="page"
            :total-pages="getBooksMetadata.totalPage"
            show-icons
            :slice-length="isLg ? 2 : 1"
            large
          />
        </div>
      </div>
    </div>
  </LoggedLayout>
</template>
