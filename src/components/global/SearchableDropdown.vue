<script setup lang="ts">
import { ref, toRefs } from "vue";
import { FwbInput, FwbSpinner } from "flowbite-vue";
import debounce from "debounce";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  placeholder: {
    type: String,
    required: true
  },
  options: {
    type: Array<any>,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  optionLabel: {
    type: String,
    required: true
  },
  trackBy: {
    type: String,
    required: true
  },
  isLoading: {
    type: Boolean
  }
});

const { options, optionLabel, trackBy, isLoading } = toRefs(props);

const open = ref(false);
const query = ref<string | undefined>();
const dropdown = ref(null);

const emit = defineEmits<{
  (event: "searchQuery", payload: string): void;
  (event: "selectedValue", payload: string | undefined): void;
}>();

const handleQueryChange = debounce((event: Event) => {
  emit("searchQuery", (event.target as HTMLInputElement).value);
}, 500);

const handleSelectedValue = (value: any) => {
  open.value = false;
  query.value = value[optionLabel.value];
  emit("selectedValue", value[trackBy.value]);
};

const handleRemoveSelected = () => {
  query.value = undefined;
  emit("selectedValue", undefined);
};

onClickOutside(dropdown, () => (open.value = false));
</script>

<template>
  <div class="w-full lg:w-1/5">
    <p class="text-sm mb-2">{{ label }}</p>
    <div
      ref="dropdown"
      class="relative flex flex-col gap-0"
      @focus="open = true"
    >
      <div
        class="flex bg-gray-50 border border-gray-300 pr-4 rounded-lg items-center focus-within:ring-2 focus-within:ring-blue-500"
        @click="open = !open"
      >
        <FwbInput
          v-model="query"
          @input="handleQueryChange($event)"
          :placeholder="placeholder"
          class="border-none focus:border-none focus:ring-0 w-full"
        />
        <img
          v-if="!isLoading && query"
          src="/icons/close_outline.svg"
          class="w-3 hover:cursor-pointer mr-3"
          @click="handleRemoveSelected"
        />
        <img
          v-if="!isLoading"
          src="/icons/angle_down_outline.svg"
          alt="Open Dropdown"
          class="w-4 hover:cursor-pointer"
        />
        <FwbSpinner v-else size="8" />
      </div>
      <div
        class="absolute bg-gray-50 mt-12 z-[1] w-full shadow-lg"
        tabindex="-1"
        :class="open ? 'block' : 'hidden'"
      >
        <div
          v-for="option in options"
          :key="option.id"
          class="hover:bg-secondary-color hover:text-white p-2 hover:cursor-pointer text-ellipsis"
          @click="handleSelectedValue(option)"
        >
          <p>{{ option[optionLabel] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
