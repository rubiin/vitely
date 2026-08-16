<template>
  <div :ref="setEl" class="tree font-mono-ui">
    <p v-for="(line, i) in visibleLines" :key="i" class="tree-line">
      <span
        v-for="(segment, j) in line.segments"
        :key="j"
        :class="segment.cls"
        >{{ segment.text }}</span
      >
    </p>
    <span v-if="showCursor" class="cursor" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
import { useInView } from '/@/composables';

interface TreeSegment {
  text: string;
  cls: string;
}

interface TreeLine {
  segments: TreeSegment[];
}

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

const visibleLines = computed<TreeLine[]>(() =>
  props.lines.slice(0, shown.value).map(line => parseLine(line)),
);

const showCursor = computed(() => shown.value < props.lines.length);

function parseLine(line: string): TreeLine {
  const segments: TreeSegment[] = [];
  const branch = line.match(/^(├── |└── )/);
  if (branch) {
    segments.push({ text: branch[0], cls: 'tree-branch' });
    line = line.slice(branch[0].length);
  }
  const isDir = line.endsWith('/');
  const isRoot = !branch && isDir;
  segments.push({
    text: line,
    cls: isRoot ? 'tree-dir tree-root' : isDir ? 'tree-dir' : 'tree-file',
  });
  return { segments };
}

onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.tree {
  padding: 24px 26px;
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
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

.tree-branch {
  color: var(--border);
  user-select: none;
}

.tree-dir {
  color: var(--accent);
}

.tree-root {
  font-weight: 600;
  color: var(--accent-strong);
}

.tree-file {
  color: var(--ink);
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
