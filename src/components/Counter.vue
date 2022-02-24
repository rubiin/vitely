<template>
  <div class="flex flex-col my-5">
    <a
      href="#"
      class="btn counter"
      @click="counter.increment()"
    >Click me</a>
    <span class="counter !w-4/12">Clicked: {{ counter.count }} times</span>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '/@/stores/counter';
const counter = useCounterStore();
</script>

<style>
.counter {
  @apply w-2/12 m-auto my-2 py-2;
}
</style>
