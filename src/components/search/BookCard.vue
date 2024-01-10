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
  <RouterLink
    :to="'/book-detail/' + book.id"
    class="w-32 lg:w-36 xl:w-44 lg:m-auto"
  >
    <div class="flex flex-col gap-1 hover:cursor-pointer">
      <div class="relative">
        <img
          :src="book.book_cover"
          :alt="book.id"
          class="rounded-md h-48 lg:h-fit"
        />

        <div
          v-if="book.current_stock <= 0"
          class="absolute inset-0 bg-red-600 dark:bg-red-800 bg-opacity-80 dark:bg-opacity-80 flex items-center justify-center rounded-md"
        >
          <span class="font-bold text-2xl text-center">OUT OF STOCK</span>
        </div>
      </div>

      <p class="font-bold line-clamp-2 lg:line-clamp-none lg:truncate">
        {{ book.title }}
      </p>
      <p>{{ book.author_name }}</p>
    </div>
  </RouterLink>
</template>
