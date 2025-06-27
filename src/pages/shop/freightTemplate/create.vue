<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";

import { onMounted } from "vue";
import { showToast } from "vant";
import { useRoute, useRouter } from "vue-router";
import { createFreightTemplate } from "./utils/api";
import { setRegionOptions } from "./utils/index";

import type { FreightTemplate } from "./utils/type";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  setRegionOptions();
});

const save = async ({
  freightTemplate,
}: {
  freightTemplate: Omit<FreightTemplate, "id">;
}) => {
  const shopId = +(route.query.shop_id as string);
  try {
    await createFreightTemplate(shopId, freightTemplate);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
