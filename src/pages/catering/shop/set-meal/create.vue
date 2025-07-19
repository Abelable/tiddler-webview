<template>
  <Info v-if="shopId" :shopId="shopId" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createSetMeal } from "./utils/api";

import type { SetMealInfo } from "./utils/type";

const router = useRouter();
const route = useRoute();

const shopId = ref(0);

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
});

const save = async ({
  setMealInfo,
}: {
  setMealInfo: Omit<SetMealInfo, "id">;
}) => {
  try {
    await createSetMeal(shopId.value, setMealInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
