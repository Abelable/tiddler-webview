<template>
  <Info
    v-if="shopId"
    :shopId="shopId"
    :editingTicketInfo="editingTicketInfo"
    @save="save"
  />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTicketInfo, editTicket } from "./utils/api";

import type { TicketInfo, FormTicketInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const shopId = ref(0);
const ticketId = ref(0);
const editingTicketInfo = ref<FormTicketInfo>();

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
  setTicketInfo();
});

const setTicketInfo = async () => {
  const {
    id,
    boxAvailable,
    needPreBook,
    buyLimit,
    perTableUsageLimit,
    overlayUsageLimit,
    ...rest
  } = await getTicketInfo(+(route.query.id as string));
  ticketId.value = id;
  editingTicketInfo.value = {
    ...rest,
    boxAvailable: !!boxAvailable,
    needPreBook: !!needPreBook,
    buyLimit: buyLimit || undefined,
    perTableUsageLimit: perTableUsageLimit || undefined,
    overlayUsageLimit: overlayUsageLimit || undefined,
  };
};

const save = async ({ ticketInfo }: { ticketInfo: Omit<TicketInfo, "id"> }) => {
  try {
    await editTicket(shopId.value, { id: ticketId.value, ...ticketInfo });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
