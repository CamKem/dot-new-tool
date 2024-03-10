<template>
  <teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-in-out"
      enter-from-class="translate-y-12 scale-75 opacity-0 ease-in-out"
      enter-to-class="scale-100 opacity-100 ease-in-out"
      leave-active-class="transition duration-300 ease-in-out"
      leave-from-class="translate-y-0 scale-100 opacity-100 ease-in-out"
      leave-to-class="translate-y-12 scale-75 opacity-0 ease-in-out"
    >
      <div
        v-if="flash.show"
        :id="`flash-message-${props.id}`"
        :class="getFlashMessageClasses(flash.type)"
        class="flash-message"
      >
        {{ flash.message }}
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import {nextTick, onMounted} from "vue";
import useElementById from "../Composables/useElementById";
import {useFlashStore} from "../Stores/flashStore";

let props = defineProps({id: Number});
const store = useFlashStore();
const flash = store.findMessage(props.id);

onMounted(() => {
  store.setHideTimer(props.id, 3000)
  nextTick(() => {
    const el = useElementById(`flash-message-${props.id}`);
    el.value.style.marginBottom = `${(props.id * 80) + 16}px`;
  });
});

const getFlashMessageClasses = (type) => {
  return {
    "text-sky-300 border-sky-300": type === "success",
    "border-red-300 text-red-300": type === "error",
    "border-amber-200 text-amber-200": type === "warning",
    "border-cyan-300 text-cyan-300": type === "info",
  };
};
</script>

<style scoped>
.flash-message {
  @apply fixed right-0 bottom-0 z-50 m-4 rounded-lg border bg-gray-700 px-8 py-6 text-sm font-bold shadow-lg;
  @apply hover:bg-gray-700 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30;
}
</style>
