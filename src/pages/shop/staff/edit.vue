<template>
  <Info :editingStaffInfo="editingStaffInfo" @save="save" @delete="_delete" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showConfirmDialog, showToast } from "vant";
import { editStaff, getStaff, deleteStaff } from "./utils/api";
import type { StaffDetail } from "./utils/type";

const route = useRoute();
const router = useRouter();

const addressId = ref(0);
const editingStaffInfo = ref<Omit<StaffDetail, "id">>();

onMounted(async () => {
  const { id, ...rest } = await getStaff(+(route.query.id as string));
  addressId.value = id;
  editingStaffInfo.value = rest;
});

const save = async ({
  addressInfo,
}: {
  addressInfo: Omit<StaffDetail, "id">;
}) => {
  try {
    await editStaff(addressInfo);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};

const _delete = () =>
  showConfirmDialog({ title: "确定删除该退货地址吗？" })
    .then(async () => {
      try {
        await deleteStaff(addressId.value);
        router.back();
      } catch (error) {
        showToast("删除失败，请重试");
      }
    })
    .catch(() => true);
</script>

<style lang="scss" scoped></style>
