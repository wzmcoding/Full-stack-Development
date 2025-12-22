<template>
  <h1>page2</h1>
  <input v-model="content" />
</template>
<script setup>
import { ref } from 'vue';
const content = ref('')
console.log('page2')
</script>
<style lane="less" scoped></style>