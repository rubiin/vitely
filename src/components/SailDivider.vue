<template>
  <div class="sail-divider" aria-hidden="true">
    <BoatMark class="divider-boat" />
    <div class="wave-line"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.sail-divider {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 44px;
  overflow: hidden;
}

.divider-boat {
  position: absolute;
  top: 2px;
  left: 0;
  width: 26px;
  height: 26px;
  color: var(--muted);
  transform: translateX(-40px);
  animation: divider-sail 24s linear infinite;
}

.wave-line {
  width: 100%;
}

@keyframes divider-sail {
  from {
    transform: translateX(-40px);
  }

  to {
    transform: translateX(100vw);
  }
}

@media (prefers-reduced-motion: reduce) {
  .divider-boat {
    transform: translateX(calc(50vw - 13px));
    animation: none;
  }
}
</style>
