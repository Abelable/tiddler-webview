<template>
  <Info :editingRoomInfo="editingRoomInfo" @save="save" />
</template>

<script setup lang="ts">
import Info from "./components/Info.vue";
import { showToast } from "vant";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getRoomInfo, editRoom } from "./utils/api";
import type { RoomInfo, FormRoomInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const roomId = ref(0);
const editingRoomInfo = ref<FormRoomInfo>();

onMounted(() => {
  setRoomInfo();
});

const setRoomInfo = async () => {
  const { id, cancellable, ...rest } = await getRoomInfo(
    +(route.query.id as string)
  );
  roomId.value = id;
  editingRoomInfo.value = { ...rest, cancellable: !!cancellable };
};

const save = async ({ roomInfo }: { roomInfo: Omit<RoomInfo, "id"> }) => {
  try {
    await editRoom({ id: roomId.value, ...roomInfo });
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style lang="scss" scoped></style>
