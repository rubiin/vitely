<template>
  <div ref="stageEl" class="boat-stage">
    <div
      class="boat-sail"
      :class="{ 'full-speed': fullSpeed }"
      @pointerdown="onClick"
      aria-hidden="true"
    >
      <div class="boat-bob">
        <div ref="tiltEl" class="boat-tilt">
          <svg
            class="boat-svg"
            viewBox="0 0 240 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- hull -->
            <path
              d="M28 74 Q120 92 212 74 L196 84 Q120 94 44 84 Z"
              fill="currentColor"
            />
            <!-- mast -->
            <path
              d="M120 74 V18"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <!-- main sail -->
            <path d="M122.5 21 L122.5 70 L176 70 Z" fill="var(--accent)" />
            <!-- jib -->
            <path
              d="M117 24 L117 68 L66 68 Z"
              fill="currentColor"
              opacity="0.5"
            />
            <!-- flag -->
            <path d="M120 18 L132 22 L120 26 Z" fill="var(--accent)" />
          </svg>
        </div>
      </div>
    </div>
    <div class="wave-line hero-waves" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ fullspeed: [] }>();

const stageEl = ref<HTMLElement | null>(null);
const tiltEl = ref<HTMLElement | null>(null);
const fullSpeed = ref(false);

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

let clicks = 0;
let resetTimer: ReturnType<typeof setTimeout> | undefined;

function onClick() {
  if (reduceMotion()) return;

  clicks += 1;
  if (clicks >= 3) {
    clicks = 0;
    fullSpeed.value = true;
    emit('fullspeed');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      fullSpeed.value = false;
    }, 6000);
  }
}

let raf = 0;

function onMove(e: PointerEvent) {
  if (reduceMotion() || !finePointer() || !tiltEl.value) return;
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const rect = stageEl.value?.getBoundingClientRect();
    if (!rect) return;
    // relative position of the pointer across the stage, -0.5 … 0.5
    const rx = (e.clientX - rect.left) / rect.width - 0.5;
    const ry = (e.clientY - rect.top) / rect.height - 0.5;
    const dx = rx * 14;
    const dy = ry * 6;
    const rot = rx * 5;
    if (tiltEl.value) {
      tiltEl.value.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    }
  });
}

onMounted(() => {
  if (finePointer() && !reduceMotion()) {
    window.addEventListener('pointermove', onMove, { passive: true });
  }
});

onUnmounted(() => {
  window.removeEventListener('pointermove', onMove);
  cancelAnimationFrame(raf);
  clearTimeout(resetTimer);
});
</script>

<style scoped>
.boat-stage {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.boat-sail {
  position: absolute;
  top: 8px;
  left: 0;
  color: var(--ink);
  transform: translateX(-20vw);
  animation: sail-across 26s linear infinite;
  will-change: transform;
}

.boat-sail.full-speed {
  animation-duration: 5s;
}

.boat-bob {
  animation: bob 4.2s ease-in-out infinite;
}

.boat-tilt {
  transition: transform 300ms ease-out;
}

.boat-svg {
  display: block;
  width: clamp(200px, 34vw, 320px);
  height: auto;
  filter: drop-shadow(0 6px 14px rgb(0 0 0 / 8%));
}

.hero-waves {
  position: absolute;
  right: 0;
  bottom: 6px;
  left: 0;
}

@keyframes sail-across {
  from {
    transform: translateX(-20vw);
  }

  to {
    transform: translateX(100vw);
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0) rotate(-1.5deg);
  }

  50% {
    transform: translateY(-7px) rotate(1.5deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .boat-sail {
    transform: translateX(calc(50vw - 160px));
    animation: none;
  }

  .boat-bob {
    animation: none;
  }

  .hero-waves {
    animation: none;
  }
}
</style>
