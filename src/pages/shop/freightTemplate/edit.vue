<template>
  <div>编辑运费模板</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { getFreightTemplate } from "./utils/api";

const route = useRoute();

onMounted(() => {
  setTemplateInfo();
});

const setTemplateInfo = async () => {
  const info = await getFreightTemplate(+(route.query.id as string));
  console.log(info);
};
</script>

<style lang="scss" scoped></style>
