<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { createAddress } from "./utils/api";
import type { AddressDetail } from "./utils/type";

const router = useRouter();

const save = async ({
  addressInfo,
}: {
  addressInfo: Omit<AddressDetail, "id">;
}) => {
  try {
    await createAddress(addressInfo);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
