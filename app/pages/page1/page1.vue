<template>
  <h1>page1</h1>
  <input v-model="content" />
</template>
<script setup>
import { ref } from 'vue';
import utils from '$common/utils';
const content = ref('')
console.log('page1')
</script>
<style lang="less" scoped></style>