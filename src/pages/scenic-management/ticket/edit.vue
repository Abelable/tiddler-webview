<template>
  <Info :editingTicketInfo="editingTicketInfo" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getTicketInfo, editTicket } from "./utils/api";
import type { TicketInfo, FormTicketInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const ticketId = ref(0);
const editingTicketInfo = ref<FormTicketInfo>();

onMounted(() => {
  setTicketInfo();
});

const setTicketInfo = async () => {
  const {
    id,
    marketPrice,
    effectiveTime,
    validityTime,
    limitNumber,
    needExchange,
    ...rest
  } = await getTicketInfo(+(route.query.id as string));
  ticketId.value = id;
  editingTicketInfo.value = {
    marketPrice: marketPrice || undefined,
    effectiveTime: effectiveTime || undefined,
    validityTime: validityTime || undefined,
    limitNumber: limitNumber || undefined,
    needExchange: !!needExchange,
    ...rest,
  };
};

const save = async ({ ticketInfo }: { ticketInfo: Omit<TicketInfo, "id"> }) => {
  try {
    await editTicket(ticketInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
