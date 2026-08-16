<template>
  <div class="terminal">
    <button
      type="button"
      class="copy-btn font-mono-ui"
      :aria-label="t('copy')"
      @click="copy"
    >
      {{ copied ? t('copied') : t('copy') }}
    </button>

    <div class="terminal-body font-mono-ui">
      <p v-for="line in commands" :key="line" class="cmd">
        <span class="prompt">$</span>
        <span>{{ line }}</span>
      </p>
      <p class="ready">
        <span class="dot" aria-hidden="true"></span>
        {{ readyText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    commands: string[];
    readyText: string;
  }>(),
  {},
);

const copied = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  const text = props.commands.map(c => `$ ${c}`).join('\n');
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // clipboard API unavailable (e.g. insecure context): fall back
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  copied.value = true;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    copied.value = false;
  }, 2000);
}

onUnmounted(() => clearTimeout(resetTimer));
</script>

<style scoped>
.terminal {
  position: relative;
  padding: 28px 24px;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 12px 32px rgb(0 0 0 / 5%);
  background-color: var(--surface);
}

.copy-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 5px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  opacity: 0;
  font-size: 12px;
  color: var(--muted);
  background-color: transparent;
  cursor: pointer;
  transition: opacity 200ms ease-out;
}

.copy-btn:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.terminal:hover .copy-btn {
  opacity: 1;
}

.terminal-body {
  overflow-x: auto;
  font-size: 14px;
  line-height: 2;
}

.cmd {
  display: flex;
  gap: 10px;
  margin: 0;
  white-space: pre;
}

.prompt {
  color: var(--accent);
  user-select: none;
}

.ready {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 8px 0 0;
  color: var(--muted);
}

.dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2fb344;
}

@media (width <= 640px) {
  .copy-btn {
    opacity: 1;
  }
}
</style>
