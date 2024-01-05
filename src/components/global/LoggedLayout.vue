<script setup lang="ts">
import Sidebar from "@/components/global/Sidebar.vue";
import { onUnmounted, ref } from "vue";
import BottomNavbar from "@/components/global/BottomNavbar.vue";

const isLg = ref(window.screen.width > 1023);
const isXl = ref(window.screen.width > 1279);
const isTwoXl = ref(window.screen.width > 1535);
const isThreeXl = ref(window.screen.width > 1919);

const watchWindowSize = () => {
  isLg.value = window.screen.width > 1023;
  isXl.value = window.screen.width > 1279;
  isTwoXl.value = window.screen.width > 1535;
  isThreeXl.value = window.screen.width > 1919;

  emit("resizeLg", isLg.value);
  emit("resizeXl", isXl.value);
  emit("resizeTwoXl", isTwoXl.value);
  emit("resizeThreeXl", isThreeXl.value);
};

window.addEventListener("resize", watchWindowSize);

onUnmounted(() => {
  window.removeEventListener("resize", watchWindowSize);
});

const emit = defineEmits<{
  (event: "resizeLg", payload: boolean): void;
  (event: "resizeXl", payload: boolean): void;
  (event: "resizeTwoXl", payload: boolean): void;
  (event: "resizeThreeXl", payload: boolean): void;
}>();
</script>

<template>
  <main class="flex flex-col lg:flex-row min-h-screen">
    <Sidebar v-if="isLg" />
    <section
      class="absolute right-0 bg-main-color w-full lg:w-5/6 flex flex-col p-8 gap-4 min-h-screen"
    >
      <slot></slot>
    </section>
    <BottomNavbar v-if="!isLg" />
  </main>
</template>
