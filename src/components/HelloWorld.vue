<template>
  <div class="text-center text-md">
    <h1 class="font-serif font-bold font-bold text-4xl mb-2">
      {{ msg }}
    </h1>

    <p>
      {{ t('recomended-ide') }}
      <a
        href="https://code.visualstudio.com/"
        target="_blank"
      >VSCode</a>
      +
      <a
        href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
        target="_blank"
      >
        Vetur
      </a>
      or
      <a
        href="https://github.com/johnsoncodehk/volar"
        target="_blank"
      >Volar</a>
      ({{ t('if-using') }}
      <code
        class="text-xs font-mono bg-yellow-200 text-yellow-700 rounded px-0.5 py-0.5"
      >&lt;script setup&gt;</code>)
    </p>

    <p>
      {{ t('See') }}
      <code
        class="text-xs font-mono bg-yellow-200 text-yellow-700 rounded px-0.5 py-0.5"
      >README.md</code>
      {{ t('more-info') }}
    </p>

    <counter />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>();

const { t } = useI18n();
</script>

<style scoped>
label {
  margin: 0 0.5em;

  @apply !font-bold;
}
</style>
