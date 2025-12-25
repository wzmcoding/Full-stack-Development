<template>
  <h1>page2</h1>
  <input v-model="content" />
</template>
<script setup>
import { ref } from 'vue';
import utils from '$common/utils';
const content = ref('')
console.log('page2')
</script>
<style lang="less" scoped></style>