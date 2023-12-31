<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { onUnmounted, ref } from "vue";
import BottomNavbar from "./BottomNavbar.vue";

const isLg = ref(window.screen.width > 1023);

const watchWindowSize = () => {
  isLg.value = window.screen.width > 1023;
  emit("resize", isLg.value);
};

window.addEventListener("resize", watchWindowSize);

onUnmounted(() => {
  window.removeEventListener("resize", watchWindowSize);
});

const emit = defineEmits<{ (event: "resize", payload: boolean): void }>();
</script>

<template>
  <main class="flex flex-col lg:flex-row min-h-screen">
    <Sidebar v-if="isLg" />
    <section
      class="absolute right-0 bg-sky-blue w-full lg:w-5/6 flex flex-col p-8 gap-4 min-h-screen"
    >
      <slot></slot>
    </section>
    <BottomNavbar v-if="!isLg" />
  </main>
</template>
