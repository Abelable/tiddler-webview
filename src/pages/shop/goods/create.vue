<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { createGoods } from "./utils/api";
import {
  setFreightTemplateOptions,
  setCategoryOptions,
  setRefundAddressOptions,
} from "./utils/index";
import type { GoodsInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  setFreightTemplateOptions();
  setCategoryOptions();
  setRefundAddressOptions(route.query.shop_id);
});

const save = async ({ goodsInfo }: { goodsInfo: Omit<GoodsInfo, "id"> }) => {
  try {
    await createGoods(goodsInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
