<template>
  <div
    :ref="setEl"
    class="reveal"
    :class="{ 'is-visible': inView }"
    :style="delay ? { transitionDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useInView } from '/@/composables';

withDefaults(defineProps<{ delay?: number }>(), { delay: 0 });

const { inView, setEl } = useInView();
</script>

<style scoped>
.reveal {
  opacity: 0;
  transition:
    opacity 600ms ease-out,
    transform 600ms ease-out;
  transform: translateY(12px);
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transition: none;
    transform: none;
  }
}
</style>
