<script setup>
const { menuItem } = defineProps(['menuItem'])
</script>

<template>
  <el-sub-menu :index="menuItem.key">
    <template #title>{{ menuItem.name }}</template>
    <div :key="item.key" v-for="item in menuItem.subMenu">
      <SubMenu :menuItem="item" v-if="item.subMenu && item.subMenu.length > 0"></SubMenu>
      <el-menu-item v-else :index="item.key">{{ item.name }}</el-menu-item>
    </div>
  </el-sub-menu>
</template>

<style scoped lang="less">

</style>