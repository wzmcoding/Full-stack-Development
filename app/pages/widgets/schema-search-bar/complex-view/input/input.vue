<script setup>
import { ref, onMounted } from 'vue';

const { schemaKey, schema } = defineProps({
  schemaKey: String,
  schema: Object
})

const emit = defineEmits(['loaded']);

const dtoValue = ref();
const getValue = () => {
  return dtoValue.value !== undefined ? { [schemaKey]: dtoValue.value } : {}
}

const reset = () => {
  dtoValue.value = schema?.option?.default;
}

defineExpose({
  getValue,
  reset
})
</script>

<template>
  <el-input v-model="dtoValue" v-bind="schema.option" class="input"></el-input>
</template>

<style scoped lang="less">
.input {

}
</style>