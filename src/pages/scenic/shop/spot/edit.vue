<template>
  <Info :editingScenicInfo="editingScenicInfo" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getScenicInfo, editScenic } from "./utils/api";
import type { ScenicInfo, FormScenicInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const scenicId = ref(0);
const editingScenicInfo = ref<FormScenicInfo>();

onMounted(() => {
  setScenicInfo();
});

const setScenicInfo = async () => {
  const { id, video, imageList, projectList, ...rest } = await getScenicInfo(
    +(route.query.id as string)
  );
  scenicId.value = id;
  editingScenicInfo.value = {
    ...rest,
    video: video ? [{ url: video }] : [],
    imageList: imageList.map((item) => ({ url: item })),
    projectList: projectList.map((item) => ({
      ...item,
      image: [{ url: item.image }],
    })),
  };
};

const save = async ({ scenicInfo }: { scenicInfo: Omit<ScenicInfo, "id"> }) => {
  try {
    await editScenic({ id: scenicId.value, ...scenicInfo });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
