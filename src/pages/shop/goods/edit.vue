<template>
  <Info v-if="visible" :editingGoodsInfo="editingGoodsInfo" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { editGoods, getGoodsInfo } from "./utils/api";
import {
  setFreightTemplateOptions,
  setRefundAddressOptions,
  setCategoryOptions,
  setPickupAddressOptions,
} from "./utils/index";
import type { GoodsInfo, FormGoodsInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const shopId = ref(0);
const goodsId = ref(0);
const editingGoodsInfo = ref<FormGoodsInfo>();
const visible = ref(false);

onMounted(async () => {
  shopId.value = +(route.query.shop_id as string);
  await setFreightTemplateOptions();
  await setCategoryOptions();
  await setPickupAddressOptions(shopId.value);
  await setRefundAddressOptions(shopId.value);
  await setGoodsInfo();
  visible.value = true;
});

const setGoodsInfo = async () => {
  const {
    id,
    cover,
    video,
    imageList,
    detailImageList,
    defaultSpecImage,
    marketPrice,
    skuList,
    refundStatus,
    ...rest
  } = await getGoodsInfo(+(route.query.id as string));
  goodsId.value = id;
  editingGoodsInfo.value = {
    ...rest,
    cover: [{ url: cover }],
    video: video ? [{ url: video }] : [],
    imageList: imageList.map((item) => ({ url: item })),
    detailImageList: detailImageList.map((item) => ({ url: item })),
    defaultSpecImage: [{ url: defaultSpecImage }],
    marketPrice: marketPrice || undefined,
    skuList: skuList.map((item) => ({
      ...item,
      cover: item.cover ? [{ url: item.cover }] : [],
    })),
    refundStatus: refundStatus === 1,
  };
};

const save = async ({ goodsInfo }: { goodsInfo: Omit<GoodsInfo, "id"> }) => {
  try {
    await editGoods(shopId.value, { id: goodsId.value, ...goodsInfo });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
