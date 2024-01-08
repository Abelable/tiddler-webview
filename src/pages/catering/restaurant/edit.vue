<template>
  <Info :editingRestaurantInfo="editingRestaurantInfo" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getRestaurantInfo, editRestaurant } from "./utils/api";
import type { RestaurantInfo, FormRestaurantInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const restaurantId = ref(0);
const editingRestaurantInfo = ref<FormRestaurantInfo>();

onMounted(async () => {
  setRestaurantInfo();
});

const setRestaurantInfo = async () => {
  const {
    id,
    video,
    cover,
    foodImageList,
    environmentImageList,
    priceImageList,
    ...rest
  } = await getRestaurantInfo(+(route.query.id as string));
  restaurantId.value = id;
  editingRestaurantInfo.value = {
    ...rest,
    video: video ? [{ url: video }] : [],
    cover: [{ url: cover }],
    foodImageList: foodImageList.map((item) => ({ url: item })),
    environmentImageList: environmentImageList.map((item) => ({
      url: item,
    })),
    priceImageList: priceImageList.map((item) => ({ url: item })),
  };
};

const save = async ({
  restaurantInfo,
}: {
  restaurantInfo: Omit<RestaurantInfo, "id">;
}) => {
  try {
    await editRestaurant({ id: restaurantId.value, ...restaurantInfo });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
