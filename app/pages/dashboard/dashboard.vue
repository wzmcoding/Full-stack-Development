<script setup>
import { ref, onMounted } from "vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import headerView from './complex-view/header-view/header-view.vue'
import $curl from '$common/curl.js';
import { useMenuStore } from '$store/menu.js';
import { useProjectStore } from '$store/project.js';

const menuStore = useMenuStore();
const projectStore = useProjectStore();

onMounted(() => {
  getProjectList();
  getProjectConfig();
});

const projName = ref('')

// 请求 /api/project/list 接口，并缓存到 project-store 中
async function getProjectList() {
  const res = await $curl({
    method: 'get',
    url: '/api/project/list',
    query: {
      // TODO: 动态获取当前项目 key, 暂时先写死 pdd
      proj_key: 'pdd',
    },
  })

  if (!res || !res.success || !res.data) {
    return;
  }

  projectStore.setProjectList(res.data);
}
// 请求 /api/project 接口， 并缓存到 menu-store 中
async function getProjectConfig() {
  const res = await $curl({
    method: 'get',
    url: '/api/project',
    query: {
      // TODO: 动态获取当前项目 key, 暂时先写死 pdd
      proj_key: 'pdd',
    },
  })

  if (!res || !res.success || !res.data) {
    return;
  }

  const { name, menu } = res.data;
  projName.value = name;
  menuStore.setMenuList(menu);
}
</script>

<template>
  <el-config-provider :locale="zhCn">
    <headerView :projName="projName"></headerView>
  </el-config-provider>
</template>

<style scoped lang="less">

</style>