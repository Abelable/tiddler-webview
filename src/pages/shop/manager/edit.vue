<template>
  <Info
    :editingManagerInfo="editingManagerInfo"
    @save="save"
    @delete="_delete"
  />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showConfirmDialog, showToast } from "vant";
import { editManager, getManager, deleteManager } from "./utils/api";
import type { ManagerDetail } from "./utils/type";

const route = useRoute();
const router = useRouter();

const managerId = ref(0);
const editingManagerInfo = ref<Omit<ManagerDetail, "id">>();

onMounted(async () => {
  const { id, ...rest } = await getManager(+(route.query.id as string));
  managerId.value = id;
  editingManagerInfo.value = rest;
});

const save = async ({
  managerInfo,
}: {
  managerInfo: Omit<ManagerDetail, "id">;
}) => {
  try {
    await editManager(managerInfo);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};

const _delete = () =>
  showConfirmDialog({ title: "确定删除该退货地址吗？" })
    .then(async () => {
      try {
        await deleteManager(managerId.value);
        router.back();
      } catch (error) {
        showToast("删除失败，请重试");
      }
    })
    .catch(() => true);
</script>

<style lang="scss" scoped></style>
