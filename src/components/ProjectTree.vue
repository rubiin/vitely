<template>
  <div :ref="setEl" class="tree font-mono-ui">
    <p v-for="(line, i) in visibleLines" :key="i" class="tree-line">
      {{ line }}
    </p>
    <span v-if="showCursor" class="cursor" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
import { useInView } from '/@/composables';

const props = withDefaults(
  defineProps<{
    lines: string[];
  }>(),
  {},
);

const { inView, setEl } = useInView({ threshold: 0.4 });

const shown = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;
const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

watch(
  inView,
  value => {
    if (!value) return;
    if (reduceMotion()) {
      shown.value = props.lines.length;
      return;
    }
    timer = setInterval(() => {
      shown.value += 1;
      if (shown.value >= props.lines.length) {
        clearInterval(timer);
        timer = undefined;
      }
    }, 70);
  },
  { immediate: true },
);

const visibleLines = computed(() => props.lines.slice(0, shown.value));
const showCursor = computed(() => shown.value < props.lines.length);

onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.tree {
  padding: 24px 26px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.9;
  white-space: pre;
  color: var(--ink);
  background-color: var(--surface);
}

.tree-line {
  margin: 0;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 2px;
  vertical-align: -2px;
  background-color: var(--accent);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    opacity: 0;
    animation: none;
  }
}
</style>
