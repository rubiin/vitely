<template>
  <div ref="rootEl" class="theme-select">
    <button
      type="button"
      class="theme-trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-label="t('select_theme')"
      @click="toggle"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.enter.prevent="selectHighlighted"
      @keydown.esc="close"
    >
      <span class="theme-icon-wrap" aria-hidden="true">
        <Transition name="swap" mode="out-in">
          <i v-if="isLight" key="sun" class="i-carbon-sun theme-icon" />
          <i v-else key="moon" class="i-carbon-moon theme-icon" />
        </Transition>
      </span>
      <span class="theme-label font-mono-ui">{{ current.label }}</span>
      <svg
        class="theme-caret"
        viewBox="0 0 10 10"
        width="10"
        height="10"
        aria-hidden="true"
      >
        <path
          d="M2 3.5 L5 6.5 L8 3.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <Transition name="pop">
      <ul
        v-if="open"
        class="theme-menu"
        role="listbox"
        :aria-label="t('select_theme')"
      >
        <li
          v-for="(option, i) in THEMES"
          :key="option.id"
          role="option"
          :aria-selected="option.id === theme"
          :class="{
            'is-active': option.id === theme,
            'is-highlighted': i === highlighted,
          }"
          @click="pick(option.id)"
          @mouseenter="highlighted = i"
        >
          <span
            class="theme-dot"
            :style="{ backgroundColor: option.dot }"
            aria-hidden="true"
          ></span>
          <span class="theme-option-label">{{ option.label }}</span>
          <span
            v-if="option.id === theme"
            class="theme-check"
            aria-hidden="true"
            >✓</span
          >
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { THEMES, useTheme } from '/@/composables';
import type { ThemeId } from '/@/composables';

const { theme, setTheme } = useTheme();
const { t } = useI18n();

const open = ref(false);
const highlighted = ref(0);
const rootEl = ref<HTMLElement | null>(null);

const current = computed(
  () => THEMES.find(option => option.id === theme.value) ?? THEMES[0],
);

const isLight = computed(() => theme.value === 'light');

function openMenu() {
  highlighted.value = THEMES.findIndex(option => option.id === theme.value);
  open.value = true;
}

function close() {
  open.value = false;
}

function toggle() {
  open.value ? close() : openMenu();
}

function move(delta: number) {
  if (!open.value) {
    openMenu();
    return;
  }
  highlighted.value =
    (highlighted.value + delta + THEMES.length) % THEMES.length;
}

function selectHighlighted() {
  pick(THEMES[highlighted.value].id);
}

function pick(id: ThemeId) {
  setTheme(id);
  close();
}

onClickOutside(rootEl, close);
</script>

<style scoped>
.theme-select {
  position: relative;
}

.theme-trigger {
  display: inline-flex;
  gap: 7px;
  align-items: center;
  height: 34px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  color: var(--muted);
  background-color: transparent;
  cursor: pointer;
  transition:
    border-color 200ms ease-out,
    color 200ms ease-out,
    background-color 200ms ease-out;
}

.theme-trigger:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.theme-dot {
  flex: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.theme-icon-wrap {
  display: grid;
  flex: none;
  width: 16px;
  height: 16px;
  place-items: center;
}

.theme-icon {
  font-size: 16px;
}

/* sun/moon crossfade when the theme changes */

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 260ms ease-out,
    transform 260ms ease-out;
}

.swap-enter-from {
  opacity: 0;
  transform: rotate(-100deg) scale(0.5);
}

.swap-leave-to {
  opacity: 0;
  transform: rotate(100deg) scale(0.5);
}

.theme-label {
  max-width: 9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-caret {
  flex: none;
  opacity: 0.7;
}

.theme-menu {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  right: 0;
  min-width: 11rem;
  margin: 0;
  padding: 5px;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 14%);
  background-color: var(--surface);
  list-style: none;
}

.theme-menu li {
  display: flex;
  gap: 9px;
  align-items: center;
  padding: 7px 9px;
  border-radius: 5px;
  font-size: 13px;
  color: var(--ink);
  cursor: pointer;
}

.theme-menu li.is-highlighted {
  background-color: color-mix(in srgb, var(--border) 55%, transparent);
}

.theme-menu li.is-active {
  color: var(--accent);
}

.theme-option-label {
  flex: 1;
}

.theme-check {
  font-size: 12px;
}

/* dropdown pop transition */

.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 140ms ease-out,
    transform 140ms ease-out;
  transform-origin: top right;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
