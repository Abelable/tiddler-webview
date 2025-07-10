<template>
  <Info :shopId="shopId" :editingTicketInfo="editingTicketInfo" @save="save" />
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
    marketPrice,
    effectiveTime,
    validityTime,
    limitNumber,
    needExchange,
    specList,
    ...rest
  } = await getTicketInfo(+(route.query.id as string));
  ticketId.value = id;
  editingTicketInfo.value = {
    marketPrice: marketPrice || undefined,
    effectiveTime: effectiveTime || undefined,
    validityTime: validityTime || undefined,
    limitNumber: limitNumber || undefined,
    needExchange: !!needExchange,
    specList: specList.map((item) => ({
      ...item,
      priceList: JSON.parse(item.priceList),
    })),
    ...rest,
  };
};

const save = async ({ ticketInfo }: { ticketInfo: Omit<TicketInfo, "id"> }) => {
  try {
    await editTicket(shopId.value, {
      id: ticketId.value,
      ...ticketInfo,
    });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
