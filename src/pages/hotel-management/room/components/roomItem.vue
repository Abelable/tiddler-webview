<template>
  <SwipeCell class="room-item">
    <div class="inner" @click="editRoom">
      <div class="row">
        <div class="name">{{ item.typeName }}</div>
        <div
          class="status"
          :class="{ valid: item.cancellable, unvalid: !item.cancellable }"
        >
          {{ item.cancellable ? "免费取消" : "不可取消" }}
        </div>
        <div class="status">
          {{ item.breakfastNum ? `${item.breakfastNum}份早餐` : "无早餐" }}
        </div>
        <div class="status">{{ item.guestNum }}人入住</div>
      </div>
      <div class="hotel-list row">
        <div class="label">关联酒店：</div>
        <div class="hotel">
          {{ hotelOptions.find((option) => option.id === item.hotelId)?.name }}
        </div>
      </div>
      <div class="row between" v-if="status === 1">
        <div class="price">价格：¥{{ item.price }}起</div>
        <div class="sales-volume">销量：{{ item.salesVolume }}</div>
      </div>
      <div class="row between" v-if="status === 3">
        <div class="time">
          下架时间：{{ dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </div>
      <div class="row between" v-if="status === 0">
        <div class="time">
          提交时间：{{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </div>
      <div class="row between" v-if="status === 2">
        <div class="failure-reason">未通过原因：{{ item.failureReason }}</div>
      </div>
    </div>
    <template #right>
      <Button
        class="down-btn"
        v-if="status === 1"
        @click.stop="offShelf"
        text="下架"
        type="primary"
        square
      />
      <Button
        class="up-btn"
        v-if="status === 3"
        @click.stop="onShelf"
        text="上架"
        type="primary"
        square
      />
      <Button
        class="delete-btn"
        @click.stop="deleteCurRoom"
        text="删除"
        type="danger"
        square
      />
    </template>
  </SwipeCell>
</template>

<script setup lang="ts">
import { SwipeCell, Button, showConfirmDialog, showToast } from "vant";

import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { deleteRoom, offShelfRoom, onShelfRoom } from "../utils/api";

import type { Option } from "@/utils/type";
import type { RoomListItem } from "../utils/type";

const router = useRouter();

const props = defineProps<{
  status: number;
  item: RoomListItem;
  hotelOptions: Option[];
}>();
const emit = defineEmits(["refresh"]);

const offShelf = () =>
  showConfirmDialog({ title: "确定下架该房间吗？" })
    .then(async () => {
      try {
        await offShelfRoom(props.item.id);
        emit("refresh");
      } catch (error) {
        showToast("下架失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const onShelf = async () => {
  try {
    await onShelfRoom(props.item.id);
    emit("refresh");
  } catch (error) {
    showToast("上架失败，请重试");
  }
  return true;
};

const deleteCurRoom = () =>
  showConfirmDialog({ title: "确定删除该房间吗？" })
    .then(async () => {
      try {
        await deleteRoom(props.item.id);
        emit("refresh");
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const editRoom = () => {
  if (props.status === 2 || props.status === 3) {
    router.push({ path: "/hotel/room/edit", query: { id: props.item.id } });
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
}
.room-item {
  position: relative;
  margin-bottom: 0.24rem;
  border-radius: 0.24rem;
  background: #fff;
  .inner {
    padding: 0.24rem;
    .name {
      color: #333;
      font-size: 0.32rem;
      font-weight: 550;
    }
    .status {
      margin-left: 0.12rem;
      padding: 0 0.08rem;
      height: 0.32rem;
      color: #999;
      font-size: 0.2rem;
      line-height: 0.32rem;
      border-radius: 0.04rem;
      background: #f1f1f1;
      &.valid {
        color: #5dce86;
        background: #d1f7e5;
      }
      &.unvalid {
        color: #f00c10;
        background: #fac5c5;
      }
    }
    .hotel-list {
      margin-top: 0.12rem;
      margin-bottom: 0.48rem;
      .hotel {
        margin-right: 0.08rem;
        padding: 0 0.08rem;
        height: 0.26rem;
        color: #4e92df;
        font-size: 0.18rem;
        line-height: 0.26rem;
        border-radius: 0.04rem;
        background: #e2edf9;
      }
    }
    .label,
    .price,
    .sales-volume,
    .time {
      color: #666;
      font-size: 0.26rem;
    }
    .failure-reason {
      color: #fd0b0a;
      font-size: 0.26rem;
    }
  }
  .down-btn,
  .up-btn,
  .delete-btn {
    height: 100%;
  }
}
</style>
