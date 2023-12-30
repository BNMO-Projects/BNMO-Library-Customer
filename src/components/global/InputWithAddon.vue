<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String],
    required: true,
    default: ""
  },
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  required: {
    type: Boolean
  }
});

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>

<template>
  <div>
    <label for="email" class="block mb-2 font-bold dark:text-white">{{
      label
    }}</label>
    <div class="flex">
      <span
        class="inline-flex items-center px-4 text-gray-900 bg-yellow-mustard border border-e-0 border-black rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
      >
        <slot name="addon"></slot>
      </span>
      <input
        :value="modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :required="required"
        class="rounded-none rounded-e-lg border border-black focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  </div>
</template>
