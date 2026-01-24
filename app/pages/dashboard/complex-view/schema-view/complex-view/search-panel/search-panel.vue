<script setup>
import { inject } from 'vue';
import SchemaSearchBar from '$widgets/schema-search-bar/schema-search-bar.vue';
const { searchSchema } = inject('schemaViewData');

const emit = defineEmits(['search']);

const onLoad = (searchValObj) => {
  emit('search', searchValObj);
}

const onSearch = (searchValObj) => {
  emit('search', searchValObj);
}

const onReset = () => {
  emit('search', {});
}
</script>

<template>
  <el-card class="search-panel">
    <schema-search-bar
      :schema="searchSchema"
      @load="onLoad"
      @search="onSearch"
      @reset="onReset"
    ></schema-search-bar>
  </el-card>
</template>

<style scoped lang="less">
.search-panel {
  margin: 10px 10px 0 10px;
}
:deep(.el-card__body) {
  padding-bottom: 2px;
}
</style>