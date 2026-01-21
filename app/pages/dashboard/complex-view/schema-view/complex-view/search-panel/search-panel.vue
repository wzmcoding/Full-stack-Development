<script setup>
import { inject } from 'vue';

const { searchSchema } = inject('schemaViewData');

const emit = defineEmits(['search']);
</script>

<template>
  <el-card>
    search-panel
  </el-card>
</template>

<style scoped lang="less">

</style>