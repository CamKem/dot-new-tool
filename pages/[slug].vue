<script setup>
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;

onMounted(async () => {
  await $fetch(`/api/redirect/${slug}`)
    .then(response => {
      if (response.exists) {
        window.location.href = response.url;
      } else {
        router.push('/');
      }
    })
    .catch(error => {
      console.error('error:', error);
      router.push('/');
    });
});
</script>

<template>
  <div v-if="slug" class="styles">
    <h1>Redirecting to {{ slug }}</h1>
  </div>
</template>

<style scoped>
h1 {
  @apply mb-4 text-4xl font-bold;
  @apply bg-gradient-to-r from-amber-400 to-pink-300 bg-clip-text text-transparent;
}
.styles {
  @apply bg-gradient-to-r from-blue-400 to-green-400;
  @apply flex justify-center items-center h-screen font-bold text-4xl;
}
</style>
