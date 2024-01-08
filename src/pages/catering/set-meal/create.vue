<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { createSetMeal } from "./utils/api";
import type { SetMealInfo } from "./utils/type";

const router = useRouter();

const save = async ({
  setMealInfo,
}: {
  setMealInfo: Omit<SetMealInfo, "id">;
}) => {
  try {
    await createSetMeal(setMealInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
