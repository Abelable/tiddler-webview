<template>
  <SwipeCell class="ticket-item">
    <div class="inner" @click="editTicket">
      <div class="name">
        {{ `${item.price}代${item.originalPrice}元代金券` }}
      </div>
      <div class="restaurant-list row">
        <div class="label">关联门店：</div>
        <div
          class="restaurant"
          v-for="(restaurantId, index) in item.restaurantIds"
          :key="index"
        >
          {{
            restaurantOptions.find((option) => option.id === restaurantId)?.name
          }}
        </div>
      </div>
      <div class="row between" v-if="status === 1">
        <div class="price">售价：¥{{ item.price }}</div>
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
        @click.stop="deleteCurTicket"
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
import { deleteTicket, offShelfTicket, onShelfTicket } from "../utils/api";

import type { ApiOption } from "@/utils/type";
import type { TicketListItem } from "../utils/type";

const router = useRouter();

const props = defineProps<{
  status: number;
  item: TicketListItem;
  restaurantOptions: ApiOption[];
}>();
const emit = defineEmits(["refresh"]);

const offShelf = () =>
  showConfirmDialog({ title: "确定下架该门票吗？" })
    .then(async () => {
      try {
        await offShelfTicket(props.item.id);
        emit("refresh");
      } catch (error) {
        showToast("下架失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const onShelf = async () => {
  try {
    await onShelfTicket(props.item.id);
    emit("refresh");
  } catch (error) {
    showToast("上架失败，请重试");
  }
  return true;
};

const deleteCurTicket = () =>
  showConfirmDialog({ title: "确定删除该门票吗？" })
    .then(async () => {
      try {
        await deleteTicket(props.item.id);
        emit("refresh");
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const editTicket = () => {
  if (props.status === 2 || props.status === 3) {
    router.push({
      path: "/catering/meal_ticket/edit",
      query: { id: props.item.id },
    });
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
.ticket-item {
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
    .type {
      margin-left: 0.12rem;
      padding: 0 0.08rem;
      height: 0.32rem;
      color: #4e92df;
      font-size: 0.2rem;
      line-height: 0.32rem;
      border-radius: 0.04rem;
      background: #e2edf9;
    }
    .restaurant-list {
      margin-top: 0.12rem;
      margin-bottom: 0.48rem;
      .restaurant {
        margin-right: 0.08rem;
        padding: 0 0.08rem;
        height: 0.26rem;
        color: #5dce86;
        font-size: 0.18rem;
        line-height: 0.26rem;
        border-radius: 0.04rem;
        background: #d1f7e5;
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
