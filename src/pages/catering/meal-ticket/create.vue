<template>
  <Info @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/info.vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { createTicket } from "./utils/api";
import type { TicketInfo } from "./utils/type";

const router = useRouter();

const save = async ({ ticketInfo }: { ticketInfo: Omit<TicketInfo, "id"> }) => {
  try {
    await createTicket(ticketInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
