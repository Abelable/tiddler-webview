<template>
  <Info :editingHotelInfo="editingHotelInfo" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getHotelInfo, editHotel } from "./utils/api";
import type { Hotel, FormHotel } from "./utils/type";

const route = useRoute();
const router = useRouter();

const hotelId = ref(0);
const editingHotelInfo = ref<FormHotel>();

onMounted(() => {
  setHotelInfo();
});

const setHotelInfo = async () => {
  const {
    id,
    video,
    cover,
    appearanceImageList,
    interiorImageList,
    roomImageList,
    environmentImageList,
    restaurantImageList,
    ...rest
  } = await getHotelInfo(+(route.query.id as string));
  hotelId.value = id;
  editingHotelInfo.value = {
    ...rest,
    video: video ? [{ url: video }] : [],
    cover: cover ? [{ url: cover }] : [],
    appearanceImageList: appearanceImageList.map((item) => ({ url: item })),
    interiorImageList: interiorImageList.map((item) => ({ url: item })),
    roomImageList: roomImageList.map((item) => ({ url: item })),
    environmentImageList: environmentImageList.map((item) => ({ url: item })),
    restaurantImageList: restaurantImageList.map((item) => ({ url: item })),
  };
};

const save = async ({ hotelInfo }: { hotelInfo: Omit<Hotel, "id"> }) => {
  try {
    await editHotel({ id: hotelId.value, ...hotelInfo });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
