<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { FwbAvatar } from "flowbite-vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const carouselSlides = [
  {
    image: "/images/jumbotron-section-2-1.png",
    heading: "Endless choices at your fingertips",
    description:
      "Dive into a sea of knowledge with our extensive collection. From the latest bestsellers to timeless classics, discover books that will inspire, entertain, and enlighten you. Explore genres that pique your curiosity and authors who speak to your soul."
  },
  {
    image: "/images/jumbotron-section-2-2.png",
    heading: "Your Library, Digitalized",
    description:
      "Embrace the convenience of digital reading with our expansive e-library. Access thousands of e-books and audiobooks on-the-go, on any device. Your next great read is just a tap away, anytime and anywhere."
  },
  {
    image: "/images/jumbotron-section-2-3.png",
    heading: "Join Our Reader's Community",
    description:
      "More than just a library, we're a community. Participate in book clubs, author talks, and literary events. Connect with fellow book lovers, share insights, and be part of our story-loving family."
  },
  {
    image: "/images/jumbotron-section-2-4.png",
    heading: "Interactive Learning for Kids",
    description:
      "Spark the joy of reading in young minds with our interactive children's section. Engage with beautifully illustrated storybooks, educational activities, and games that make learning fun. Encourage your child's imagination and growth with stories that stay with them forever."
  },
  {
    image: "/images/jumbotron-section-2-5.png",
    heading: "Research Without Boundaries",
    description:
      "Supporting academic excellence and research, our comprehensive database offers access to scholarly articles, journals, and reference materials across all disciplines. Expand your knowledge with reliable resources at your academic or professional fingertips."
  }
];

const reviewsListLg = [
  {
    image: "/images/avatar-serena.png",
    title: "A Source of Knowledge",
    author: "Serena Holman",
    review:
      "BNMO Library isn't just an app; it's a gateway to worlds I never knew existed! The e-book collection is incredible, and the reading interface is so user-friendly. It's like having a personal librarian in my pocket!"
  },
  {
    image: "/images/avatar-frazer.png",
    title: "My Go-To App for Reading",
    author: "Frazer Dawson",
    review:
      "From bestsellers to niche gems, BNMO Library has it all. I've joined two book clubs through the app, and the sense of community is just wonderful. Plus, the offline reading feature is a lifesaver during my commute."
  },
  {
    image: "/images/avatar-sebastian.png",
    title: "Beyond Satisfied!",
    author: "Sebastian Brewer",
    review:
      "The BNMO Library app transformed how I read. The interface is intuitive, and the selection is vast. I'm particularly impressed with the audiobook quality - it's perfect for my evening relaxations."
  }
];

const reviewsList = [
  {
    image: "/images/avatar-serena.png",
    title: "A Source of Knowledge",
    author: "Serena Holman",
    review:
      "BNMO Library isn't just an app; it's a gateway to worlds I never knew existed! The e-book collection is incredible, and the reading interface is so user-friendly. It's like having a personal librarian in my pocket!"
  },
  {
    image: "/images/avatar-frazer.png",
    title: "My Go-To App for Reading",
    author: "Frazer Dawson",
    review:
      "From bestsellers to niche gems, BNMO Library has it all. I've joined two book clubs through the app, and the sense of community is just wonderful. Plus, the offline reading feature is a lifesaver during my commute."
  }
];

const isLg = ref(window.screen.width > 1023);
const darkMode = ref(
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
);

const watchWindowSize = () => {
  isLg.value = window.screen.width > 1023;
};

const watchColorScheme = (event: MediaQueryListEvent) => {
  darkMode.value = event.matches ? true : false;
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    darkMode.value = event.matches ? true : false;
  });

window.addEventListener("resize", watchWindowSize);
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", watchColorScheme);

onUnmounted(() => {
  window.removeEventListener("resize", watchWindowSize);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .removeEventListener("change", watchColorScheme);
});
</script>

<template>
  <main
    class="flex flex-col min-h-screen text-text-color dark:text-text-color-dark select-none"
  >
    <section
      class="relative h-screen w-full bg-no-repeat bg-cover bg-center"
      style="background-image: url(&quot;/images/jumbotron-section-1.png&quot;)"
    >
      <img
        v-if="!darkMode"
        src="/images/logo.webp"
        alt="BNMO logo"
        class="w-40 fixed top-4 left-4 lg:top-8 lg:left-8 z-10"
      />
      <img
        v-else
        src="/images/logo-white.webp"
        alt="BNMO logo"
        class="w-40 fixed top-4 left-4 lg:top-8 lg:left-8 z-10"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent to-main-color dark:from-transparent dark:to-main-color-dark"
      ></div>
      <div
        class="relative flex flex-col items-center justify-center h-full gap-8 z-[5] px-8"
      >
        <div class="text-center">
          <h1 class="lg:text-6xl font-bold drop-shadow-2xl">
            Welcome to BNMO Library
          </h1>
          <h2 class="mt-4 drop-shadow-2xl">
            Unlock a universe of knowledge and adventure.
          </h2>
        </div>
        <div class="flex gap-8">
          <RouterLink :to="{ name: 'Register' }">
            <button class="button-jumbotron">Sign up</button>
          </RouterLink>
          <RouterLink :to="{ name: 'Login' }">
            <button class="button-jumbotron">Login</button>
          </RouterLink>
        </div>
      </div>
    </section>
    <section
      class="relative flex flex-col items-center justify-center w-full h-screen bg-main-color dark:bg-main-color-dark gap-16 lg:gap-8"
    >
      <h1>Our features</h1>
      <Carousel
        :items-to-show="isLg ? 3 : 1"
        :autoplay="5000"
        :wrap-around="true"
      >
        <Slide v-for="(slide, index) in carouselSlides" :key="index">
          <div
            class="flex flex-col rounded-xl w-3/4 h-[32rem] bg-secondary-color/80 dark:bg-secondary-color-dark/80 text-text-color-dark gap-4 shadow-xl"
          >
            <div
              class="w-full h-2/5 bg-no-repeat bg-cover bg-center rounded-t-xl"
              :style="`background-image: url(${slide.image})`"
            ></div>
            <div class="flex flex-col items-center justify-center gap-4 p-4">
              <h3>{{ slide.heading }}</h3>
              <p class="text-sm lg:text-base">{{ slide.description }}</p>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
    <section
      class="relative h-screen w-full bg-no-repeat bg-cover bg-center"
      style="background-image: url(&quot;/images/jumbotron-section-3.png&quot;)"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-transparent to-main-color dark:from-transparent dark:to-main-color-dark"
      ></div>
      <div
        class="relative flex flex-col items-center justify-center h-full gap-4 lg:gap-8 z-[5]"
      >
        <h1 class="text-center lg:text-6xl font-bold drop-shadow-2xl">
          Our customer reviews
        </h1>
        <div
          v-if="isLg"
          class="flex flex-row items-center justify-center gap-2 lg:gap-4 text-text-color-dark"
        >
          <div
            class="flex flex-col bg-secondary-color/80 w-4/5 lg:w-1/4 p-4 rounded-lg gap-4"
            v-for="(item, index) in reviewsListLg"
            :key="index"
          >
            <div class="flex items-center gap-4">
              <FwbAvatar :img="item.image" rounded size="lg" />
              <div class="flex flex-col">
                <h2>{{ item.title }}</h2>
                <p class="font-bold text-sm lg:text-base">{{ item.author }}</p>
              </div>
            </div>
            <p class="text-sm lg:text-base">"{{ item.review }}"</p>
          </div>
        </div>
        <div
          v-else
          class="flex flex-col items-center justify-center gap-2 lg:gap-4 text-text-color-dark"
        >
          <div
            class="flex flex-col bg-secondary-color/80 w-4/5 lg:w-1/4 p-4 rounded-lg gap-4"
            v-for="(item, index) in reviewsList"
            :key="index"
          >
            <div class="flex items-center gap-4">
              <FwbAvatar :img="item.image" rounded size="lg" />
              <div class="flex flex-col">
                <h2>{{ item.title }}</h2>
                <p class="font-bold text-sm lg:text-base">{{ item.author }}</p>
              </div>
            </div>
            <p class="text-sm lg:text-base">"{{ item.review }}"</p>
          </div>
        </div>
      </div>
    </section>
    <footer
      class="flex flex-col lg:flex-row justify-center lg:justify-between items-center bg-secondary-color dark:bg-secondary-color-dark text-text-color-dark p-8 font-bold gap-8"
    >
      <p>
        &#169; {{ new Date().getFullYear() }}
        <a
          href="https://bnmo-library-customer.netlify.app"
          class="hover:underline"
          >BNMO</a
        >&#8482; All rights reserved
      </p>
      <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
        <a href="/register" class="hover:underline">Register</a>
        <a href="/login" class="hover:underline">Login</a>
      </div>
    </footer>
  </main>
</template>
