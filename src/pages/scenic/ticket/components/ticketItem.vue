<template>
  <SwipeCell class="ticket-item">
    <div class="inner">
      <div class="row">
        <div class="name">{{ item.name }}</div>
        <div class="type">
          {{
            typeOptions.find((typeOptions) => typeOptions.value === item.type)
              ?.text
          }}
        </div>
      </div>
      <div class="row">
        <div class="price">价格：¥{{ item.price }}</div>
        <div class="sales-volume">销量：{{ item.salesVolume }}</div>
      </div>
    </div>
    <template #right>
      <Button
        class="down-btn"
        @click.stop="offShelf"
        square
        text="下架"
        type="danger"
      />
    </template>
  </SwipeCell>
</template>

<script setup lang="ts">
import { SwipeCell, Button, showConfirmDialog, showToast } from "vant";

import { typeOptions } from "../utils/index";
import { deleteTicket, offShelfTicket, onShelfTicket } from "../utils/api";

import type { TicketListItem } from "../utils/type";

const props = defineProps<{ status: number; item: TicketListItem }>();
const emit = defineEmits(["update"]);

const offShelf = () =>
  showConfirmDialog({ title: "确定下架该门票吗？" })
    .then(async () => {
      try {
        await offShelfTicket(props.item.id);
        emit("update");
      } catch (error) {
        showToast("下架失败，请重试");
      }
      return true;
    })
    .catch(() => true);
</script>

<style lang="scss" scoped>
.ticket-item {
  margin-bottom: 0.24rem;
  border-radius: 0.24rem;
  background: #fff;
  .inner {
    padding: 0.24rem;
    .name {
      color: #333;
      font-size: 0.28rem;
      font-weight: 500;
    }
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
</style>
