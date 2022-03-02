<template>
  <div class="container max-w-3xl mx-auto mt-15">
    <div class="h-60 mb-8">
      <transition
        enter-active-class="transition ease-out duration-1000 transform"
        enter-from-class="-translate-x-200 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in duration-1000 transform"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <logo-component v-if="show" class="w-52 mx-auto mb-12"></logo-component>
      </transition>
    </div>

    <HelloWorld :msg="t('hello') + ' 👋 ' + t('welcome')" />

    <footer class="text-center">
      <ul class="flex justify-between w-1/3 mx-auto mb-8">
        <li class="cursor-pointer text-2xl">
          <a
            href="#"
            class="footer-link text-cyan-600"
            :title="t('toggle_language')"
            @click="toggleLocales"
          >
            <i class="i-carbon-translate dark:i-carbon-translate" />
          </a>
        </li>
        <li class="cursor-pointer text-2xl">
          <a
            href="#"
            class="text-cyan-600"
            :title="t('toggle_theme')"
            @click="toggleDark"
          >
            <i class="i-carbon-sun dark:i-carbon-moon" />
          </a>
        </li>
        <li class="cursor-pointer text-2xl">
          <a
            href="https://github.com/rubiin"
            rel="noreferrer"
            target="_blank"
            class="footer-link text-cyan-600"
            title="Github repo"
          >
            <i class="i-carbon-logo-github dark:i-carbon-logo-github" />
          </a>
        </li>
      </ul>

      <span class="text-xs"
        >{{ t('made_by') }}
        <a
          class="footer-link text-cyan-400 hover:text-cyan-500"
          href="https://github.com/rubiin"
          rel="noreferrer"
          target="_blank"
          >Rubiin</a
        ></span
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
import LogoComponent from '/@/assets/imagotype.svg?component';
import { useTheme } from '/@/composables';
const { t, availableLocales, locale } = useI18n();

const toggleLocales = () => {
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

const { toggleDark } = useTheme();

onMounted(() => {
  document.body.classList.add('dark:bg-gray-800', 'dark:text-gray-200');
});

const show = ref(false);

setTimeout(() => {
  show.value = true;
}, 1000);
</script>

<style>
a,
.footer-link {
  transition: all 5s ease-out;
}
li {
  list-style: none;
}

.footer-link {
  opacity: 0.8;
}
</style>
