<script setup lang="ts">
import TopHeader from "@/components/TopHeader.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <main class="flex min-h-screen">
    <Sidebar />
    <section class="bg-sky-blue w-5/6 flex flex-col p-8">
      <TopHeader />
    </section>
  </main>
</template>
