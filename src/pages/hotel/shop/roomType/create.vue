<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";

import { useRoute, useRouter } from "vue-router";
import { showToast } from "vant";
import { createRoomType } from "./utils/api";

import type { RoomTypeDetail } from "./utils/type";

const route = useRoute();
const router = useRouter();

const save = async ({
  roomTypeInfo,
}: {
  roomTypeInfo: Omit<RoomTypeDetail, "id">;
}) => {
  const hotelId = +(route.query.hotel_id as string);
  try {
    await createRoomType(hotelId, roomTypeInfo);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
