<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { useRoute, useRouter } from "vue-router";
import { showToast } from "vant";
import { createStaff } from "./utils/api";
import type { Staff } from "./utils/type";

const route = useRoute();
const router = useRouter();

const save = async ({ addressInfo }: { addressInfo: Omit<Staff, "id"> }) => {
  const shopId = +(route.query.shop_id as string);
  try {
    await createStaff(shopId, addressInfo);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
