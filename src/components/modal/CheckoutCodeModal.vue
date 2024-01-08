<script setup lang="ts">
import { toRefs, Transition } from "vue";
import { useCartStore } from "@/store/cart.store";
import { storeToRefs } from "pinia";

const props = defineProps({
  isModalOpen: {
    type: Boolean
  }
});

const { isModalOpen } = toRefs(props);

const emit = defineEmits<{ (event: "closeModal"): void }>();

const cartStore = useCartStore();

const { validationCode } = storeToRefs(cartStore);
</script>

<template>
  <!-- Modal -->
  <Transition name="fade">
    <div
      v-if="isModalOpen"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <!-- Modal container -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <!-- Modal content -->
        <div
          class="inline-block align-middle bg-modal-color dark:bg-modal-color-dark text-text-color dark:text-text-color-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full"
        >
          <!-- Header -->
          <div
            class="bg-modal-header-color dark:bg-modal-header-color-dark px-6 py-3 flex"
          >
            <h3 id="modal-title">Order Validation Code</h3>
          </div>

          <!-- Body -->
          <div class="flex flex-col px-4 pt-5 pb-4 sm:p-6 sm:pb-4 gap-4">
            <p>This is your order validation code:</p>
            <h3 class="text-center">{{ validationCode }}</h3>
            <p>You may see this code in My Library -> Order History</p>
            <p class="text-sm">
              Note: This validation code will be needed when picking up your
              order!
            </p>
          </div>

          <!-- Footer -->
          <div class="px-4 py-3 flex flex-col lg:flex-row justify-end gap-2">
            <button
              type="button"
              class="button-red lg:w-fit"
              @click="$emit('closeModal')"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
