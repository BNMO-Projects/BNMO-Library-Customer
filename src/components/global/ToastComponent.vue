<script setup lang="ts">
defineProps({
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});
</script>

<template>
  <div>
    <p class="font-bold">{{ heading }}</p>
    <p class="text-sm">{{ description }}</p>
  </div>
</template>
