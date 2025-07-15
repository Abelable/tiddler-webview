<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { createRoom } from "./utils/api";
import type { RoomInfo } from "./utils/type";

const router = useRouter();

const save = async ({ roomInfo }: { roomInfo: Omit<RoomInfo, "id"> }) => {
  try {
    await createRoom(roomInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
