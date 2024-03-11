<template>
  <section>
    <form @submit.prevent="submitForm">
      <h1>Create new DM link</h1>
      <div class="input-container">
        <input v-model="form.slug" name="slug" placeholder="Enter slug" @input="checkSlugDebounced">
        <CheckBadgeIcon v-show="state.available"
                        class="absolute stroke-green-200 stroke-1 text-green-500 top-[6px] right-[4px] h-[28px] w-[28px]"/>
        <XCircleIcon v-show="state.unavailable"
                     class="absolute stroke-red-200 stroke-1 text-red-500 top-[6px] right-[4px] h-[28px] w-[28px]"/>
      </div>
      <input v-model="form.user" name="user" placeholder="Enter Twitter username">
      <button type="submit">Create your link</button>
    </form>
  </section>
</template>

<script setup>
import XCircleIcon from "@heroicons/vue/24/solid/XCircleIcon";
import CheckBadgeIcon from "@heroicons/vue/24/solid/CheckBadgeIcon";
import {debounce} from "lodash-es";
import {useFlashStore} from '../store/useFlashStore.js';

const flash = useFlashStore();

const form = reactive({
  slug: '',
  user: ''
});

const state = reactive({
  available: false,
  unavailable: false
});

const checkSlug = async () => {
  await $fetch(`/api/check-slug/${form.slug}`)
    .then(response => {
      if (response.exists) {
        state.available = false;
        state.unavailable = true;
      } else {
        state.available = true;
        state.unavailable = false;
      }
    })
    .catch(error => {
      console.error('error:', error);
      flash.addMessage({type: 'error', message: 'An error occurred while checking the slug.'});
    });
};

const checkSlugDebounced = debounce(checkSlug, 300);

const clearFlags = () => {
  state.available = false;
  state.unavailable = false;
};

const ClearForm = () => {
  form.slug = '';
  form.user = '';
  clearFlags();
};

const submitForm = async () => {
  if (form.slug && form.user && form.slug.length > 0 && form.user.length > 0) {
    if (state.available) {
      await $fetch('/api/create', {
        method: 'POST',
        body: {slug: form.slug, user: form.user}
      })
        .then(response => {
          if (response.success === false) {
            flash.addMessage({type: 'error', message: response.message});
            return;
          }
          flash.addMessage({type: 'success', message: response.message});
          return ClearForm();
        })
        .catch(error => {
          console.error('error:', error);
          flash.addMessage({type: 'error', message: 'An error occurred while creating the slug.'});
        });
    } else {
      flash.addMessage({type: 'error', message: 'Slug is not available'});
    }
  } else {
    flash.addMessage({type: 'error', message: 'Please fill in all fields'});
  }
};
</script>

<style scoped>
h1 {
  @apply mb-4 text-2xl font-bold;
  @apply bg-gradient-to-r from-amber-400 to-pink-300 bg-clip-text text-transparent;
}

form {
  @apply flex flex-col items-center rounded-2xl bg-blue-500 p-12 bg-opacity-35 space-y-4;
}

.input-container {
  @apply relative;
}

input::placeholder {
  @apply text-gray-400
}

input {
  @apply w-full rounded-lg px-4 py-2;
  @apply bg-blue-50 bg-opacity-80 text-gray-500;
  @apply bg-blue-50 bg-opacity-80 text-gray-500;
  @apply focus:bg-opacity-20 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50;
  @apply transition-all duration-300 ease-in-out;
}

button {
  @apply rounded-lg bg-blue-500 px-4 py-2 text-white;
  @apply hover:bg-blue-600;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50;
  @apply transition-all duration-300 ease-in-out;
}
</style>
