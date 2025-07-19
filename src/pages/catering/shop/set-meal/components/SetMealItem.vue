<template>
  <SwipeCell class="set-meal-item">
    <div class="inner" @click="editSetMeal">
      <img class="image" :src="item.cover" alt="" />
      <div class="content">
        <div class="name">{{ item.name }}</div>
        <div class="restaurant-list row">
          <div class="label">关联门店：</div>
          <div
            class="restaurant"
            v-for="(restaurantId, index) in item.restaurantIds"
            :key="index"
          >
            {{
              restaurantOptions.find((option) => option.id === restaurantId)
                ?.name
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
        @click.stop="deleteCurSetMeal"
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
import { deleteSetMeal, offShelfSetMeal, onShelfSetMeal } from "../utils/api";

import type { ApiOption } from "@/utils/type";
import type { SetMealListItem } from "../utils/type";

const router = useRouter();

const props = defineProps<{
  shopId: number;
  status: number;
  item: SetMealListItem;
  restaurantOptions: ApiOption[];
}>();
const emit = defineEmits(["refresh"]);

const offShelf = () =>
  showConfirmDialog({ title: "确定下架该门票吗？" })
    .then(async () => {
      try {
        await offShelfSetMeal(props.shopId, props.item.id);
        emit("refresh");
      } catch (error) {
        showToast("下架失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const onShelf = async () => {
  try {
    await onShelfSetMeal(props.shopId, props.item.id);
    emit("refresh");
  } catch (error) {
    showToast("上架失败，请重试");
  }
  return true;
};

const deleteCurSetMeal = () =>
  showConfirmDialog({ title: "确定删除该门票吗？" })
    .then(async () => {
      try {
        await deleteSetMeal(props.shopId, props.item.id);
        emit("refresh");
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const editSetMeal = () => {
  if (props.status === 2 || props.status === 3) {
    router.push({
      path: "/catering/shop/set_meal/edit",
      query: { shop_id: props.shopId, id: props.item.id },
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
.set-meal-item {
  position: relative;
  margin-bottom: 0.24rem;
  border-radius: 0.24rem;
  background: #fff;
  .inner {
    display: flex;
    padding: 0.24rem;
    .image {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 0.24rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 0.2rem;
      flex: 1;
      height: 1.8rem;
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
  }
  .down-btn,
  .up-btn,
  .delete-btn {
    height: 100%;
  }
}
</style>
