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
import type { Manager, ManagerDetail } from "./utils/type";

const route = useRoute();
const router = useRouter();

const shopId = ref(0);
const managerId = ref(0);
const editingManagerInfo = ref<Omit<ManagerDetail, "id">>();

onMounted(async () => {
  shopId.value = +(route.query.shop_id as string);
  managerId.value = +(route.query.id as string);
  editingManagerInfo.value = await getManager(managerId.value, shopId.value);
});

const save = async ({ managerInfo }: { managerInfo: Omit<Manager, "id"> }) => {
  try {
    const { roleId, senicIds } = managerInfo;
    await editManager(shopId.value, managerId.value, roleId, senicIds);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};

const _delete = () =>
  showConfirmDialog({ title: "确定删除该退货地址吗？" })
    .then(async () => {
      try {
        await deleteManager(shopId.value, managerId.value);
        router.back();
      } catch (error) {
        showToast("删除失败，请重试");
      }
    })
    .catch(() => true);
</script>

<style lang="scss" scoped></style>
