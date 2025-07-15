<template>
  <Info v-if="shopId" :shopId="shopId" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createRoom } from "./utils/api";

import type { RoomInfo } from "./utils/type";

const router = useRouter();
const route = useRoute();

const shopId = ref(0);

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
});

const save = async ({ roomInfo }: { roomInfo: Omit<RoomInfo, "id"> }) => {
  try {
    await createRoom(shopId.value, roomInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
