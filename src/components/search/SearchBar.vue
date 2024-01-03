<script setup lang="ts">
import { onMounted, ref, watch, toRefs } from "vue";
import { FwbButton, FwbInput, FwbRadio } from "flowbite-vue";
import { CatalogSearchQuery } from "@/types/request.type";
import { useBookStore } from "@/store/book.store";
import { storeToRefs } from "pinia";
import SearchableDropdown from "../global/SearchableDropdown.vue";
import { router } from "@/router/router";

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

const bookStore = useBookStore();
const query = ref({} as CatalogSearchQuery);

const {
  getCategories,
  isLoadingCategories,
  getGenres,
  isLoadingGenres,
  getLanguages,
  isLoadingLanguages
} = storeToRefs(bookStore);

onMounted(() => {
  bookStore.getCategoriesList(undefined);
  bookStore.getGenresList(undefined);
  bookStore.getLanguagesList(undefined);

  query.value.currentPage = page.value;
  query.value.limitPerPage = limit.value;
  query.value.bookType = "ALL";
  bookStore.getBooksList(query.value);
});

const handleSearch = () => {
  query.value.currentPage = 1;
  if (page.value !== 1) {
    router.push({ name: "Search", query: { page: 1 } });
  }
  bookStore.getBooksList(query.value);
};

watch(page, () => {
  query.value.currentPage = page.value;
  bookStore.getBooksList(query.value);
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
            <img
              src="/icons/search_loop_outline.svg"
              alt="Search loop"
              class="w-5"
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
            <img src="/icons/user_solid.svg" alt="Search loop" class="w-4" />
          </template>
        </FwbInput>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row w-full gap-4 items-end">
      <SearchableDropdown
        placeholder="Search category"
        :options="getCategories"
        label="Category"
        optionLabel="name"
        trackBy="name"
        :isLoading="isLoadingCategories"
        @searchQuery="(query) => bookStore.getCategoriesList(query)"
        @selectedValue="(value) => (query.category = value)"
      />
      <SearchableDropdown
        placeholder="Search genres"
        :options="getGenres"
        label="Genre"
        optionLabel="name"
        trackBy="name"
        :isLoading="isLoadingGenres"
        @searchQuery="(query) => bookStore.getGenresList(query)"
        @selectedValue="(value) => (query.genre = value)"
      />
      <SearchableDropdown
        placeholder="Search languages"
        :options="getLanguages"
        label="Language"
        optionLabel="name"
        trackBy="name"
        :isLoading="isLoadingLanguages"
        @searchQuery="(query) => bookStore.getLanguagesList(query)"
        @selectedValue="(value) => (query.language = value)"
      />
      <div class="flex flex-col gap-2 w-full lg:w-1/5">
        <p class="text-sm">Book Type</p>
        <ul class="flex gap-4">
          <li>
            <FwbRadio
              v-model="query.bookType"
              label="All"
              name="radio-horizontal"
              value="ALL"
            />
          </li>
          <li>
            <FwbRadio
              v-model="query.bookType"
              label="Borrowable"
              name="radio-horizontal"
              value="BORROWABLE"
            />
          </li>
          <li>
            <FwbRadio
              v-model="query.bookType"
              label="Onsale"
              name="radio-horizontal"
              value="ONSALE"
            />
          </li>
        </ul>
      </div>
      <FwbButton
        class="bg-yellow-mustard hover:bg-orange-coral transition ease-in-out w-full lg:w-1/5 h-fit text-base font-bold inline-flex items-center justify-center text-black"
        @click="handleSearch"
      >
        Search
      </FwbButton>
    </div>
  </div>
</template>
