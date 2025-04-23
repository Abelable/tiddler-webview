<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { createGoods } from "./utils/api";
import {
  setFreightTemplateOptions,
  setCategoryOptions,
  setPickupAddressOptions,
  setRefundAddressOptions,
} from "./utils/index";
import type { GoodsInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const shopId = ref(0);

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
  setFreightTemplateOptions();
  setCategoryOptions();
  setPickupAddressOptions(shopId.value);
  setRefundAddressOptions(shopId.value);
});

const save = async ({ goodsInfo }: { goodsInfo: Omit<GoodsInfo, "id"> }) => {
  try {
    await createGoods(shopId.value, goodsInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
