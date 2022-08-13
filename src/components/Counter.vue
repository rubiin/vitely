<template>
  <div class="mt-20">
    <a
      href="#"
      class="btn counter hover:(scale-110 transition duration-500)"
      @click="counter.increment()"
    >{{ counter.count === 0 ? 'Click me' : `${counter.count} times` }}</a>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '/@/stores/counter';
const counter = useCounterStore();
</script>

<style>
.counter {
  @apply sm:w-3/12 md:w-2/12 lg:w-2/12 m-auto my-2 py-2;
}
</style>
