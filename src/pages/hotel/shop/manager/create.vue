<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { useRoute, useRouter } from "vue-router";
import { showToast } from "vant";
import { createManager } from "./utils/api";
import type { Manager } from "./utils/type";

const route = useRoute();
const router = useRouter();

const save = async ({ managerInfo }: { managerInfo: Omit<Manager, "id"> }) => {
  const shopId = +(route.query.shop_id as string);
  try {
    const { userId, roleId, hotelIds } = managerInfo;
    await createManager(shopId, userId, roleId, hotelIds);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
