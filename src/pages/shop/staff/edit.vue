<template>
  <Info
    :editingAddressInfo="editingAddressInfo"
    @save="save"
    @delete="_delete"
  />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showConfirmDialog, showToast } from "vant";
import { editAddress, getAddress, deleteAddress } from "./utils/api";
import type { AddressDetail } from "./utils/type";

const route = useRoute();
const router = useRouter();

const addressId = ref(0);
const editingAddressInfo = ref<Omit<AddressDetail, "id">>();

onMounted(async () => {
  const { id, ...rest } = await getAddress(+(route.query.id as string));
  addressId.value = id;
  editingAddressInfo.value = rest;
});

const save = async ({
  addressInfo,
}: {
  addressInfo: Omit<AddressDetail, "id">;
}) => {
  try {
    await editAddress(addressInfo);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};

const _delete = () =>
  showConfirmDialog({ title: "确定删除该退货地址吗？" })
    .then(async () => {
      try {
        await deleteAddress(addressId.value);
        router.back();
      } catch (error) {
        showToast("删除失败，请重试");
      }
    })
    .catch(() => true);
</script>

<style lang="scss" scoped></style>
