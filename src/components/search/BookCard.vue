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
      <img
        :src="book.book_cover"
        :alt="book.id"
        class="rounded-md h-48 lg:h-fit"
      />
      <p class="font-bold line-clamp-2 lg:line-clamp-none lg:truncate">
        {{ book.title }}
      </p>
      <p>{{ book.author_name }}</p>
    </div>
  </RouterLink>
</template>
