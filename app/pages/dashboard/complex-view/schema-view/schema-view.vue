<script setup>
import {provide, ref} from 'vue';
import SearchPanel from './complex-view/search-panel/search-panel.vue';
import TablePanel from './complex-view/table-panel/table-panel.vue';
import { useSchema } from './hook/schema.js';

const { api, tableSchema, tableConfig, searchSchema, searchConfig } = useSchema();

const apiParams = ref({});
provide('schemaViewData', {
  api,
  apiParams,
  tableSchema,
  tableConfig,
  searchSchema,
  searchConfig
});

const onSearch = (searchValObj) => {
  apiParams.value = searchValObj;
};

const onTableOperate = () => {

}
</script>

<template>
  <el-row class="schema-view">
    <search-panel
      v-if="searchSchema?.properties && Object.keys(searchSchema.properties).length > 0"
      @search="onSearch"
    ></search-panel>
    <table-panel
      @operate="onTableOperate"
    ></table-panel>
  </el-row>
</template>

<style scoped lang="less">
.schema-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>