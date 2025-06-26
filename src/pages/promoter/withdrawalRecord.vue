<template>
  <PullRefresh class="container" v-model="refreshing" @refresh="onRefresh">
    <List
      v-model="loading"
      :finished="finished"
      @load="onLoadMore"
      :finished-text="recordList.length ? '没有更多了' : ''"
    >
      <div class="withdraw-record-list" v-if="recordList.length">
        <div
          class="withdraw-record-item"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <div class="record-content">
            <div class="record-status-wrap">
              <div class="record-path">
                提现至{{ ["微信", "银行卡", "余额"][item.path - 1] }}
              </div>
              <img
                class="record-status"
                :class="{
                  waiting: item.status === 0,
                  success: item.status === 1,
                  fail: item.status === 2,
                }"
                :src="
                  require(`./images/status_${
                    ['waiting', 'success', 'fail'][item.status]
                  }.png`)
                "
              />
            </div>
            <div class="record-time">
              {{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
          </div>
          <div class="record-amount-wrap">
            <div class="row end">
              <div class="record-amount">
                <text style="font-size: 0.24rem">¥</text>
                <text>{{ item.withdrawAmount.toFixed(2) }}</text>
              </div>
              <div class="amount-type">
                {{ ["自购", "分享", "礼包"][item.scene - 1] }}
              </div>
            </div>
            <div class="record-commission">
              <text>手续费¥{{ item.handlingFee.toFixed(2) }}，</text>
              <text>税费¥{{ item.taxFee.toFixed(2) }}，</text>
              <text>到账¥{{ item.actualAmount.toFixed(2) }}</text>
            </div>
          </div>
        </div>
      </div>
    </List>
    <Empty
      v-if="!recordList.length"
      image="https://static.tiddler.cn/mp/default_illus/empty.png"
      description="暂无提现记录"
    />
  </PullRefresh>
</template>

<script setup lang="ts">
import { closeToast, Empty, List, PullRefresh, showLoadingToast } from "vant";

import { ref } from "vue";
import dayjs from "dayjs";
import type { WithdrawRecord } from "./utils/type";
import { getWithdrawRecordList } from "./utils/api";

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const recordList = ref<WithdrawRecord[]>([]);

const onRefresh = () => setRecordList(true);
const onLoadMore = () => setRecordList();

let page = 0;
const setRecordList = async (init = true) => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  if (init) {
    page = 0;
    finished.value = false;
  }
  const list = await getWithdrawRecordList(++page);
  recordList.value = init ? list : [...recordList.value, ...list];
  if (!list.length) {
    finished.value = true;
  }
  loading.value = false;
  refreshing.value = false;
  closeToast();
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  &.end {
    justify-content: flex-end;
  }
}
.withdraw-record-list {
  margin: 0.24rem;
  background: #fff;
  border-radius: 0.2rem;
  .withdraw-record-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.24rem;
    height: 1.46rem;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .record-status-wrap {
      display: flex;
      align-items: center;
      .record-path {
        color: #111;
        font-size: 0.28rem;
      }
      .record-status {
        margin-left: 0.08rem;
        height: 0.36rem;
        &.waiting {
          width: 0.72rem;
        }
        &.success {
          width: 0.74rem;
        }
        &.fail {
          width: 0.92rem;
        }
      }
    }
    .record-time {
      margin-top: 0.06rem;
      color: #999;
      font-size: 0.24rem;
    }
    .record-amount {
      color: #111;
      font-size: 0.32rem;
      text-align: right;
    }
    .amount-type {
      margin-left: 0.08rem;
      padding: 0 6rem;
      color: var(--blue-1);
      font-size: 0.2rem;
      border: 1px solid var(--blue-1);
      border-radius: 0.08rem;
    }
    .record-commission {
      margin-top: 0.07rem;
      color: #6a6f75;
      font-size: 0.2rem;
      text-align: right;
    }
  }
}
</style>
