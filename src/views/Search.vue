<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import TopHeader from "@/components/TopHeader.vue";
import Sidebar from "@/components/Sidebar.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import { useBookStore } from "@/store/book.store";
import { storeToRefs } from "pinia";
import BookCard from "@/components/search/BookCard.vue";
import { FwbPagination, FwbSpinner } from "flowbite-vue";
import { router } from "@/router/router";

const bookStore = useBookStore();
const page = ref(1);

const { getBooks, getBooksMetadata, isLoadingBooks } = storeToRefs(bookStore);
const isLg = window.screen.width > 1023;

onMounted(() => {
  const pageQuery = router.currentRoute.value.query.page;
  if (pageQuery && pageQuery !== null) {
    page.value = parseInt(pageQuery as string);
  }
});

watch(page, () => {
  router.push({ name: "Search", query: { page: page.value } });
});
</script>

<template>
  <main class="flex min-h-screen">
    <Sidebar />
    <section
      class="absolute right-0 bg-sky-blue w-full lg:w-5/6 flex flex-col p-8 gap-4 min-h-screen"
    >
      <TopHeader />
      <div class="flex flex-col gap-4">
        <SearchBar :page="page" />
        <div v-if="isLoadingBooks" class="flex justify-center gap-4">
          <FwbSpinner size="12" />
        </div>
        <div v-else class="flex flex-col gap-4">
          <h2>Search result</h2>
          <div
            class="grid grid-cols-2 grid-rows-5 lg:grid-cols-5 lg:grid-rows-2 gap-8"
          >
            <BookCard v-for="book in getBooks" :key="book.id" :book="book" />
          </div>
          <div class="flex w-full items-center justify-center">
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
    </section>
  </main>
</template>
