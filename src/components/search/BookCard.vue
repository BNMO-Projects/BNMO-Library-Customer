<script setup lang="ts">
import { BookListResponse } from "@/types/response.type";

defineProps({
  book: {
    type: Object as () => BookListResponse,
    required: true
  }
});
</script>

<template>
  <RouterLink :to="'/book-detail/' + book.id">
    <div class="flex flex-col w-32 lg:w-36 xl:w-44 gap-1 hover:cursor-pointer">
      <img :src="book.book_cover" :alt="book.id" class="rounded-md" />
      <p class="font-bold truncate">{{ book.title }}</p>
      <p>{{ book.author_name }}</p>
    </div>
  </RouterLink>
</template>
