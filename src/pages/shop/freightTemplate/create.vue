<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";

import { onMounted } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { createFreightTemplate } from "./utils/api";
import { setRegionOptions } from "./utils/index";

import type { FreightTemplate } from "./utils/type";

const router = useRouter();

onMounted(() => {
  setRegionOptions();
});

const save = async ({
  freightTemplate,
}: {
  freightTemplate: Omit<FreightTemplate, "id">;
}) => {
  try {
    await createFreightTemplate(freightTemplate);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
