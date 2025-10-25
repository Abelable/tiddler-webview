<template>
  <div class="type-list">
    <SwipeCell v-for="(item, index) in typeList" :key="index">
      <div class="type row" @click="editType(item.id)">
        <div class="name limit">{{ item.name }}</div>
        <Icon name="arrow" size="0.24rem" />
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="confirmDelete(index)"
          square
          text="删除"
          type="danger"
        />
      </template>
    </SwipeCell>
  </div>
  <Empty
    v-if="!typeList.length"
    image="https://static.tiddler.cn/mp/default_illus/empty.png"
    description="暂无房间类型列表"
  />
  <button class="add-btn" @click="addType">新增房间类型</button>
</template>

<script setup lang="ts">
import {
  SwipeCell,
  Button,
  Icon,
  showConfirmDialog,
  Empty,
  showToast,
} from "vant";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getRoomTypeList, deleteRoomType } from "./utils/api";

import type { RoomTypeItem } from "./utils/type";

const route = useRoute();
const router = useRouter();

const hotelId = ref(0);
const typeList = ref<RoomTypeItem[]>([]);

onMounted(async () => {
  hotelId.value = +(route.query.hotel_id as string);
  typeList.value = await getRoomTypeList(hotelId.value);
});

const addType = () =>
  router.push({
    path: "/hotel/shop/room_type/create",
    query: { hotel_id: hotelId.value },
  });
const editType = (id: number) =>
  router.push({
    path: "/hotel/shop/room_type/edit",
    query: { id },
  });

const confirmDelete = (index: number) =>
  showConfirmDialog({ title: "确定删除该房间类型吗？" })
    .then(async () => {
      try {
        await deleteRoomType(typeList.value[index].id);
        typeList.value.splice(index, 1);
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);
</script>

<style lang="scss" scoped>
.limit {
  display: -webkit-box;
  overflow: hidden;
  line-height: 1;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.row {
  display: flex;
  align-items: center;
}
.type-list {
  padding-bottom: 1.52rem;
  font-size: 0;
  .type {
    margin-bottom: 1px;
    padding: 0 0.24rem;
    height: 1.2rem;
    background: #fff;
    .name {
      position: relative;
      flex: 1;
      color: #333;
      font-size: 0.28rem;
    }
  }
  .delete-btn {
    height: 100%;
  }
}
.add-btn {
  position: fixed;
  left: 0.32rem;
  bottom: 0.32rem;
  width: calc(100vw - 0.64rem);
  height: 0.88rem;
  color: #fff;
  font-size: 0.3rem;
  font-weight: 550;
  border-radius: 0.18rem;
  background: #212121;
}
</style>
