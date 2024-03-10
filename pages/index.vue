<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="slug" @input="checkSlugDebounced" placeholder="Enter slug">
      <div class="absolute">
        <CheckBadgeIcon v-show="state.available" class="z-50 mt-1 mr-2 text-green-500 h-[28px] w-[28px]"/>
        <XCircleIcon v-show="state.unavailable" class="z-50 mt-1 mr-2 text-red-500 h-[28px] w-[28px]"/>
      </div>
      <input v-model="user" placeholder="Enter Twitter username">
      <button type="submit">Create DM Link</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash-es';
import CheckBadgeIcon from "@heroicons/vue/24/solid/CheckBadgeIcon.js";
import XCircleIcon from "@heroicons/vue/24/solid/XCircleIcon.js";
import { useFlash } from '@inertiajs/inertia-vue3';

const slug = ref('');
const user = ref('');
const message = ref('');
const notification = useNotification();

const state = reactive({
  available: false,
  unavailable: false
});

const checkSlug = async () => {
  const response = await fetch(`/api/check-slug?slug=${slug.value}`);
  const data = await response.json();
  if (data.exists) {
    state.available = false;
    state.unavailable = true;
    notification.error('Slug already exists');
  } else {
    notification.success('Slug is available');
  }
};

const checkSlugDebounced = debounce(checkSlug, 300);

const submitForm = async () => {
  // Submit form implementation
};
</script>
