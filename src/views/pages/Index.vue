<template>
  <div class="page">
    <!-- ================= NAV ================= -->
    <header class="nav">
      <div class="nav-inner">
        <a href="#top" class="brand">
          <BoatMark class="brand-mark" />
          <span class="brand-name font-mono-ui">VITELY</span>
        </a>

        <nav class="nav-links" aria-label="Primary">
          <a
            class="nav-link font-mono-ui"
            href="https://vitejs.dev/guide/"
            rel="noreferrer"
            target="_blank"
            >{{ t('docs') }}</a
          >
          <a
            class="nav-link font-mono-ui"
            href="https://github.com/rubiin/vitely"
            rel="noreferrer"
            target="_blank"
            >{{ t('github') }}</a
          >
          <a class="nav-link font-mono-ui" href="#quickstart">{{
            t('get_started')
          }}</a>

          <span class="nav-divider" aria-hidden="true"></span>

          <button
            type="button"
            class="icon-btn"
            :title="t('toggle_language')"
            @click="toggleLocales"
          >
            <i class="i-carbon-translate" />
          </button>
          <ThemeSelect />
        </nav>
      </div>
    </header>

    <!-- ================= HERO ================= -->
    <section id="top" class="hero">
      <div class="hero-inner">
        <h1
          class="hero-title font-serif-display rise"
          style="animation-delay: 0ms"
        >
          VITELY
        </h1>

        <p
          class="hero-tagline font-serif-display rise"
          style="animation-delay: 150ms"
        >
          {{ t('tagline') }}
        </p>

        <p class="hero-sub rise" style="animation-delay: 300ms">
          {{ t('hero_sub') }}
        </p>

        <div class="hero-actions rise" style="animation-delay: 450ms">
          <a class="btn btn-primary" href="#quickstart"
            >{{ t('get_started') }} <span aria-hidden="true">→</span></a
          >
          <a
            class="btn btn-ghost"
            href="https://github.com/rubiin/vitely"
            rel="noreferrer"
            target="_blank"
            >GitHub <span aria-hidden="true">↗</span></a
          >
        </div>

        <p class="hero-stack font-mono-ui rise" style="animation-delay: 550ms">
          {{ t('stack') }}
        </p>

        <div class="hero-boat rise" style="animation-delay: 600ms">
          <HeroBoat @fullspeed="onFullSpeed" />
          <Transition name="fade">
            <p v-if="fullSpeed" class="full-speed font-mono-ui">
              {{ t('full_speed') }}
            </p>
          </Transition>
        </div>

        <p class="hero-supporting rise" style="animation-delay: 900ms">
          {{ t('hero_supporting') }}
        </p>
      </div>
    </section>

    <SailDivider />

    <!-- ================= WHY ================= -->
    <section class="section why">
      <Reveal>
        <p class="eyebrow">{{ t('why_label') }}</p>
      </Reveal>

      <div class="why-lines font-serif-display">
        <Reveal :delay="0"
          ><p>{{ t('why_l1') }}</p></Reveal
        >
        <Reveal :delay="80"
          ><p class="muted">{{ t('why_l2') }}</p></Reveal
        >
        <Reveal :delay="160"
          ><p class="muted">{{ t('why_l3') }}</p></Reveal
        >
        <Reveal :delay="240"
          ><p class="muted">{{ t('why_l4') }}</p></Reveal
        >
        <Reveal :delay="320"
          ><p>{{ t('why_l5') }}</p></Reveal
        >
      </div>

      <div class="why-points">
        <Reveal
          v-for="(point, i) in whyPoints"
          :key="point.label"
          :delay="i * 90"
        >
          <p class="point">
            <span class="point-num font-mono-ui">0{{ i + 1 }}</span>
            <span class="point-label">{{ t(point.label) }}</span>
          </p>
        </Reveal>
      </div>
    </section>

    <!-- ================= INCLUDED ================= -->
    <section class="section included">
      <Reveal>
        <p class="eyebrow">{{ t('included_label') }}</p>
      </Reveal>
      <Reveal :delay="100">
        <ul class="tech-list font-mono-ui">
          <li v-for="tech in techList" :key="tech">{{ tech }}</li>
        </ul>
      </Reveal>
    </section>

    <!-- ================= QUICK START ================= -->
    <section id="quickstart" class="section quickstart">
      <Reveal>
        <p class="eyebrow">{{ t('quickstart_label') }}</p>
      </Reveal>
      <Reveal :delay="80">
        <h2 class="section-title font-serif-display">
          {{ t('quickstart_title') }}
        </h2>
      </Reveal>
      <Reveal :delay="160">
        <TerminalBlock
          :commands="commands"
          :ready-text="t('ready_in', { ms: '342ms' })"
        />
      </Reveal>
    </section>

    <!-- ================= STRUCTURE ================= -->
    <section class="section structure">
      <Reveal>
        <p class="eyebrow">{{ t('structure_label') }}</p>
      </Reveal>
      <Reveal :delay="80">
        <h2 class="section-title font-serif-display">
          {{ t('structure_title') }}
        </h2>
      </Reveal>
      <Reveal :delay="160">
        <ProjectTree :lines="treeLines" />
      </Reveal>
    </section>

    <SailDivider />

    <!-- ================= FOOTER ================= -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-boat" aria-hidden="true">
          <BoatMark class="footer-boat-mark" />
        </div>

        <h2 class="footer-title font-serif-display">{{ t('footer_ready') }}</h2>
        <p class="footer-sub">{{ t('footer_start') }}</p>

        <a class="btn btn-primary footer-cta" href="#quickstart"
          >{{ t('get_started') }} <span aria-hidden="true">→</span></a
        >
      </div>

      <div class="footer-base">
        <div class="footer-base-left">
          <span class="footer-brand font-mono-ui">VITELY</span>
          <span class="footer-tagline">{{ t('tagline') }}</span>
        </div>
        <div class="footer-base-right font-mono-ui">
          <a
            href="https://github.com/rubiin/vitely"
            rel="noreferrer"
            target="_blank"
            >GitHub</a
          >
          <span aria-hidden="true">·</span>
          <span>{{ t('mit') }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import BoatMark from '/@/components/BoatMark.vue';
import ThemeSelect from '/@/components/ThemeSelect.vue';
import HeroBoat from '/@/components/HeroBoat.vue';
import SailDivider from '/@/components/SailDivider.vue';
import Reveal from '/@/components/Reveal.vue';
import TerminalBlock from '/@/components/TerminalBlock.vue';
import ProjectTree from '/@/components/ProjectTree.vue';

const { t, availableLocales, locale } = useI18n();

const toggleLocales = () => {
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

/* ---------- hero ---------- */

const fullSpeed = ref(false);
let fullSpeedTimer: ReturnType<typeof setTimeout> | undefined;

function onFullSpeed() {
  fullSpeed.value = true;
  clearTimeout(fullSpeedTimer);
  fullSpeedTimer = setTimeout(() => {
    fullSpeed.value = false;
  }, 6000);
}

onUnmounted(() => clearTimeout(fullSpeedTimer));

/* ---------- why ---------- */

const whyPoints = [
  { label: 'point_minimal' },
  { label: 'point_fast' },
  { label: 'point_flexible' },
  { label: 'point_yours' },
];

/* ---------- included ---------- */

const techList = ['Vue 3', 'Vite', 'TypeScript', 'Pinia', 'UnoCSS', 'VueUse'];

/* ---------- quick start ---------- */

const commands = [
  'git clone github.com/rubiin/vitely',
  'cd vitely',
  'pnpm install',
  'pnpm dev',
];

/* ---------- structure ---------- */

const treeLines = [
  'src/',
  '├── components/',
  '├── composables/',
  '├── layouts/',
  '├── pages/',
  '├── router/',
  '├── stores/',
  '└── main.ts',
];
</script>

<style scoped>
.page {
  background-color: var(--bg);
}

/* ---------- nav ---------- */

.nav {
  position: sticky;
  z-index: 20;
  top: 0;
  border-bottom: 1px solid var(--border);
  background-color: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(10px);
}

.nav-inner {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  max-width: 72rem;
  margin: 0 auto;
  padding: 14px 24px;
}

.brand {
  display: inline-flex;
  gap: 9px;
  align-items: center;
  color: var(--ink);
}

.brand:hover {
  color: var(--ink);
}

.brand-mark {
  width: 26px;
  height: 26px;
}

.brand-name {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.22em;
}

.nav-links {
  display: flex;
  gap: 22px;
  align-items: center;
}

.nav-link {
  font-size: 13px;
  color: var(--muted);
}

.nav-link:hover {
  color: var(--ink);
}

.nav-divider {
  width: 1px;
  height: 18px;
  background-color: var(--border);
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  color: var(--muted);
  background-color: transparent;
  cursor: pointer;
  transition: color 200ms ease-out;
}

.icon-btn:hover {
  color: var(--ink);
  background-color: color-mix(in srgb, var(--border) 40%, transparent);
}

/* ---------- hero ---------- */

.hero {
  padding: 96px 24px 40px;
  overflow: hidden;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 48rem;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  margin: 0;
  font-size: clamp(3.4rem, 11vw, 7.5rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.02em;
}

.hero-tagline {
  margin: 28px 0 0;
  font-size: clamp(1.35rem, 3.4vw, 2.1rem);
  font-weight: 400;
  line-height: 1.25;
  color: var(--ink);
}

.hero-sub {
  max-width: 34rem;
  margin: 18px 0 0;
  font-size: 16px;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-top: 34px;
}

.hero-stack {
  margin: 30px 0 0;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.hero-boat {
  position: relative;
  width: 100%;
  margin-top: 26px;
}

.full-speed {
  margin: 6px 0 0;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.hero-supporting {
  margin: 26px 0 0;
  font-size: 14px;
  color: var(--muted);
}

/* entrance stagger */

.rise {
  opacity: 0;
  animation: rise 700ms ease-out forwards;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- sections ---------- */

.section {
  max-width: 72rem;
  margin: 0 auto;
  padding: 96px 24px;
}

.why {
  max-width: 52rem;
}

.why-lines {
  margin-top: 26px;
  font-size: clamp(1.7rem, 4.4vw, 3rem);
  font-weight: 400;
  line-height: 1.3;
}

.why-lines p {
  margin: 0;
}

.why-lines .muted {
  color: var(--muted);
}

.why-points {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 72px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
}

.point {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
}

.point-num {
  font-size: 12px;
  color: var(--accent);
}

.point-label {
  font-size: 17px;
  font-weight: 500;
}

/* ---------- included ---------- */

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 26px;
  margin: 26px 0 0;
  padding: 0;
  font-size: 15px;
  list-style: none;
}

.tech-list li {
  color: var(--ink);
}

/* ---------- quickstart ---------- */

.quickstart {
  max-width: 52rem;
}

.section-title {
  margin: 14px 0 0;
  font-size: clamp(1.8rem, 4.4vw, 2.8rem);
  font-weight: 400;
  line-height: 1.2;
}

.quickstart .terminal {
  margin-top: 40px;
}

/* ---------- structure ---------- */

.structure {
  max-width: 52rem;
}

.structure .tree {
  margin-top: 40px;
}

/* ---------- footer ---------- */

.footer {
  border-top: 1px solid var(--border);
  background-color: var(--surface);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 48rem;
  margin: 0 auto;
  padding: 96px 24px 40px;
  text-align: center;
}

.footer-boat {
  position: relative;
  width: 100%;
  height: 34px;
  margin-bottom: 40px;
  overflow: hidden;
}

.footer-boat-mark {
  position: absolute;
  left: 0;
  width: 30px;
  height: 30px;
  color: var(--muted);
  animation: footer-sail 26s linear infinite;
}

.footer-title {
  margin: 0;
  font-size: clamp(1.9rem, 4.6vw, 3rem);
  font-weight: 400;
  line-height: 1.2;
}

.footer-sub {
  margin: 16px 0 0;
  color: var(--muted);
}

.footer-cta {
  margin-top: 32px;
}

.footer-base {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  max-width: 72rem;
  margin: 0 auto;
  padding: 28px 24px;
  border-top: 1px solid var(--border);
}

.footer-base-left {
  display: flex;
  gap: 12px;
  align-items: baseline;
  font-size: 13px;
  color: var(--muted);
}

.footer-brand {
  font-size: 13px;
  letter-spacing: 0.22em;
  color: var(--ink);
}

.footer-base-right {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 13px;
  color: var(--muted);
}

@keyframes footer-sail {
  from {
    transform: translateX(-60px);
  }

  to {
    transform: translateX(100vw);
  }
}

/* ---------- fade (easter egg caption) ---------- */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 600ms ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ---------- responsive ---------- */

@media (width <= 768px) {
  .nav-link {
    display: none;
  }

  .nav-divider {
    display: none;
  }

  .why-points {
    grid-template-columns: repeat(2, 1fr);
  }

  .section {
    padding: 72px 24px;
  }
}

@media (width <= 480px) {
  .why-points {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rise {
    opacity: 1;
    animation: none;
  }

  .footer-boat-mark {
    transform: translateX(calc(50vw - 15px));
    animation: none;
  }
}
</style>
