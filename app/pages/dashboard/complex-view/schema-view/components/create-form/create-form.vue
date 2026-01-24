<script setup>
import { ref } from 'vue';

const name = ref('createForm');

const isShow = ref(false);
const show = (rowData) => {
  isShow.value = true;
  console.log(rowData);
}

defineExpose({
  name,
  show
});
</script>

<template>
  <el-drawer
      v-model="isShow"
      direction="rtl"
      :destroy-on-close="true"
      :size="550"
  >
  </el-drawer>
</template>

<style scoped lang="less">

</style>