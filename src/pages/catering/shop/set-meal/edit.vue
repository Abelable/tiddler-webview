<template>
  <Info
    v-if="shopId"
    :shopId="shopId"
    :editingSetMealInfo="editingSetMealInfo"
    @save="save"
  />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSetMealInfo, editSetMeal } from "./utils/api";
import type { SetMealInfo, FormSetMealInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const shopId = ref(0);
const setMealId = ref(0);
const editingSetMealInfo = ref<FormSetMealInfo>();

onMounted(async () => {
  shopId.value = +(route.query.shop_id as string);
  setSetMealInfo();
});

const setSetMealInfo = async () => {
  const { id, cover, needPreBook, buyLimit, perTableUsageLimit, ...rest } =
    await getSetMealInfo(+(route.query.id as string));
  setMealId.value = id;
  editingSetMealInfo.value = {
    ...rest,
    cover: [{ url: cover }],
    needPreBook: !!needPreBook,
    buyLimit: buyLimit || undefined,
    perTableUsageLimit: perTableUsageLimit || undefined,
  };
};

const save = async ({
  setMealInfo,
}: {
  setMealInfo: Omit<SetMealInfo, "id">;
}) => {
  try {
    await editSetMeal(shopId.value, { id: setMealId.value, ...setMealInfo });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
