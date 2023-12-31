<script setup lang="ts">
import { onMounted, ref, watch, toRefs } from "vue";
import { router } from "@/router/router";

import { storeToRefs } from "pinia";
import { useBookStore } from "@/store/book.store";
import { CatalogSearchQuery } from "@/types/request.type";

import { FwbSpinner, FwbInput, FwbSelect } from "flowbite-vue";
import SearchableDropdown from "@/components/global/SearchableDropdown.vue";
import SearchLoopOutline from "@/components/icons/SearchLoopOutline.vue";
import UserSolid from "@/components/icons/UserSolid.vue";

const bookStore = useBookStore();

const {
  isLoadingBooks,
  categories,
  isLoadingCategories,
  genres,
  isLoadingGenres,
  languages,
  isLoadingLanguages
} = storeToRefs(bookStore);

const bookTypeOptions = [
  { name: "ALL", value: "ALL" },
  { name: "BORROWABLE", value: "BORROWABLE" },
  { name: "ONSALE", value: "ONSALE" }
];

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
});

const { page, limit } = toRefs(props);

const query = ref({} as CatalogSearchQuery);

onMounted(() => {
  bookStore.fetchCategories(undefined);
  bookStore.fetchGenres(undefined);
  bookStore.fetchLanguages(undefined);

  query.value.currentPage = page.value;
  query.value.limitPerPage = limit.value;
  query.value.bookType = "ALL";
  bookStore.fetchBooks(query.value);
});

const handleSearch = () => {
  query.value.currentPage = 1;
  if (page.value !== 1) {
    router.push({ name: "Search", query: { page: 1 } });
  }
  bookStore.fetchBooks(query.value);
};

watch(page, () => {
  query.value.currentPage = page.value;
  bookStore.fetchBooks(query.value);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col lg:flex-row w-full gap-4">
      <div class="lg:w-[75%]">
        <FwbInput
          v-model="query.searchQuery"
          label="Book title"
          id="search_query"
          placeholder="Search book title..."
          type="text"
        >
          <template #prefix>
            <component
              :is="SearchLoopOutline"
              custom-class="text-black dark:text-white w-5 h-5"
            />
          </template>
        </FwbInput>
      </div>
      <div class="lg:w-[25%]">
        <FwbInput
          v-model="query.authorQuery"
          label="Author"
          id="author_query"
          placeholder="Search author name..."
          type="text"
        >
          <template #prefix>
            <component
              :is="UserSolid"
              custom-class="text-black dark:text-white w-5 h-5"
            />
          </template>
        </FwbInput>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row w-full gap-4 items-end">
      <SearchableDropdown
        placeholder="Search category"
        :options="categories"
        label="Category"
        optionLabel="genres"
        trackBy="name"
        :isLoading="isLoadingCategories"
        @searchQuery="(query) => bookStore.fetchCategories(query)"
        @selectedValue="(value) => (query.category = value)"
      />
      <SearchableDropdown
        placeholder="Search genres"
        :options="genres"
        label="Genre"
        optionLabel="name"
        trackBy="name"
        :isLoading="isLoadingGenres"
        @searchQuery="(query) => bookStore.fetchGenres(query)"
        @selectedValue="(value) => (query.genre = value)"
      />
      <SearchableDropdown
        placeholder="Search languages"
        :options="languages"
        label="Language"
        optionLabel="name"
        trackBy="name"
        :isLoading="isLoadingLanguages"
        @searchQuery="(query) => bookStore.fetchLanguages(query)"
        @selectedValue="(value) => (query.language = value)"
      />
      <FwbSelect
        v-model="query.bookType"
        :options="bookTypeOptions"
        label="Book type"
        class="w-full lg:w-1/5"
      />
      <button
        @click="handleSearch"
        class="button-full lg:w-1/5"
        :disabled="isLoadingBooks"
      >
        <FwbSpinner v-if="isLoadingBooks" />
        Search
      </button>
    </div>
  </div>
</template>
