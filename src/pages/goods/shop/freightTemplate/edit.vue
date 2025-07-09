<template>
  <Info :editingFreightTemplate="editingFreightTemplate" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";

import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFreightTemplate, editFreightTemplate } from "./utils/api";
import { setRegionOptions } from "./utils/index";

import type { FreightTemplate, FormFreightTemplate } from "./utils/type";

const route = useRoute();
const router = useRouter();

const freightTemplateId = ref(0);
const editingFreightTemplate = ref<FormFreightTemplate>();

onMounted(async () => {
  setRegionOptions();
  setTemplateInfo();
});

const setTemplateInfo = async () => {
  const { id, freeQuota, areaList, ...rest } = await getFreightTemplate(
    +(route.query.id as string)
  );
  freightTemplateId.value = id;
  editingFreightTemplate.value = {
    ...rest,
    freeQuota: freeQuota === 0 ? undefined : freeQuota,
    areaList: areaList.map((item) => ({
      ...item,
      pickedCityCodes: item.pickedCityCodes.split(","),
      pickedCityDescs: item.pickedCityDescs.split(","),
    })),
  };
};

const save = async ({
  freightTemplate,
}: {
  freightTemplate: Omit<FreightTemplate, "id">;
}) => {
  try {
    await editFreightTemplate({
      id: freightTemplateId.value,
      ...freightTemplate,
    });
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
