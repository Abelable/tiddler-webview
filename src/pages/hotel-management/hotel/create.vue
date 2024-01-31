<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { createHotel } from "./utils/api";
import type { Hotel } from "./utils/type";

const router = useRouter();

const save = async ({ hotelInfo }: { hotelInfo: Omit<Hotel, "id"> }) => {
  try {
    await createHotel(hotelInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
