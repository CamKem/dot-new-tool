<template>
  <main class="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-green-400">
    <CreateRecordForm />
    <FlashMessage
      v-for="message in flash.getMessages"
      :key="message.id"
      :id="message.id"
    />
  </main>
</template>

<script setup>
import {useFlashStore} from '../store/useFlashStore.js';
const flash = useFlashStore();
</script>
