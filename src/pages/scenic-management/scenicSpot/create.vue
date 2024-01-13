<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { createScenic } from "./utils/api";
import type { ScenicInfo } from "./utils/type";

const router = useRouter();

const save = async ({ scenicInfo }: { scenicInfo: Omit<ScenicInfo, "id"> }) => {
  try {
    await createScenic(scenicInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
