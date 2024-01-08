<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { createRestaurant } from "./utils/api";
import type { RestaurantInfo } from "./utils/type";

const router = useRouter();

const save = async ({
  restaurantInfo,
}: {
  restaurantInfo: Omit<RestaurantInfo, "id">;
}) => {
  try {
    await createRestaurant(restaurantInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
