<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { useRoute, useRouter } from "vue-router";
import { showToast } from "vant";
import { createAddress } from "./utils/api";
import type { PickupAddress } from "./utils/type";

const route = useRoute();
const router = useRouter();

const save = async ({
  pickupAddress,
}: {
  pickupAddress: Omit<PickupAddress, "id">;
}) => {
  const shopId = +(route.query.shop_id as string);
  try {
    await createAddress(shopId, pickupAddress);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
