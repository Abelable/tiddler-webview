<template>
  <Info
    :editingRoomTypeInfo="editingRoomTypeInfo"
    @save="save"
    @delete="_delete"
  />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showConfirmDialog, showToast } from "vant";
import { editRoomType, getRoomType, deleteRoomType } from "./utils/api";
import type { FormRoomType, RoomTypeDetail } from "./utils/type";

const route = useRoute();
const router = useRouter();

const roomTypeId = ref(0);
const editingRoomTypeInfo = ref<Omit<FormRoomType, "id">>();

onMounted(async () => {
  const { id, imageList, ...rest } = await getRoomType(
    +(route.query.id as string)
  );
  roomTypeId.value = id;
  editingRoomTypeInfo.value = {
    ...rest,
    imageList: imageList.map((item) => ({ url: item })),
  };
});

const save = async ({
  roomTypeInfo,
}: {
  roomTypeInfo: Omit<RoomTypeDetail, "id">;
}) => {
  try {
    await editRoomType({ id: roomTypeId.value, ...roomTypeInfo });
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};

const _delete = () =>
  showConfirmDialog({ title: "确定删除该房间类型吗？" })
    .then(async () => {
      try {
        await deleteRoomType(roomTypeId.value);
        router.back();
      } catch (error) {
        showToast("删除失败，请重试");
      }
    })
    .catch(() => true);
</script>

<style lang="scss" scoped></style>
