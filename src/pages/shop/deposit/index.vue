<template>
  <div class="container">
    <div class="bond-overview">
      <div class="overview-title">保证金(元)</div>
      <div class="bond-amount">
        {{ depositInfo ? depositInfo.balance.toFixed(2) : "0.00" }}
      </div>
      <div class="supplement">
        <div class="supplement-tips">还需补缴(元)</div>
        <div>{{ depositInfo ? depositInfo?.dueAmount : "0.00" }}</div>
      </div>
    </div>

    <div class="btn-wrap">
      <div class="pay-btn">点击补缴</div>
      <div class="refund-btn">申请退款</div>
    </div>

    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List
        v-model="loading"
        :finished="finished"
        @load="onLoadMore"
        :finished-text="recordList.length ? '没有更多了' : ''"
      >
        <div
          class="change-log row"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <div class="log-info">
            <div class="log-title">
              {{ ["商家缴纳", "平台代扣"][item.changeType - 1] }}
            </div>
            <div class="log-content" v-if="item.referenceId">
              订单号：{{ item.referenceId }}
            </div>
            <div class="log-time">
              {{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
          </div>
          <div class="change-amount" :class="{ income: item.changeAmount > 0 }">
            {{
              item.changeAmount > 0
                ? "+" + item.changeAmount.toFixed(2)
                : item.changeAmount.toFixed(2)
            }}
          </div>
        </div>
      </List>
      <Empty
        v-if="!recordList.length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂无记录"
      />
    </PullRefresh>
  </div>
</template>

<script setup lang="ts">
import { Empty, PullRefresh, List, showLoadingToast, closeToast } from "vant";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { getDepositInfo, getDepositLogList } from "./utils/api";

import type { Deposit, DepositLog } from "./utils/type";

const route = useRoute();

const shopId = ref(0);
const depositInfo = ref<Deposit>();
const recordList = ref<DepositLog[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
  setDepositInfo();
});

const onRefresh = () => setLogList(true);
const onLoadMore = () => setLogList();

const setDepositInfo = async () => {
  depositInfo.value = await getDepositInfo(shopId.value);
};

let page = 0;
const setLogList = async (init = true) => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  if (init) {
    page = 0;
    finished.value = false;
  }
  const list = await getDepositLogList(shopId.value, ++page);
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
}
.container {
  padding: 0.24rem;
  min-height: 100vh;
  background-image: url("https://static.tiddler.cn/mp/promoter/account/bg.png"),
    linear-gradient(180deg, #edf6fe 20%, #f6f6f6 55%);
  background-size: 5.5rem 5.5rem, 100% 100vh;
  background-repeat: no-repeat, no-repeat;
  background-position: top left, top;
  .bond-overview {
    padding: 0.24rem;
    height: 2.54rem;
    color: #110e4b;
    background-image: url("@/assets/images/card_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    .overview-title {
      font-size: 0.28rem;
      font-weight: 600;
    }
    .bond-amount {
      margin-top: 0.28rem;
      font-size: 0.68rem;
      font-weight: 500;
      text-align: center;
      line-height: 1;
    }
    .supplement {
      font-size: 0.36rem;
      font-weight: 500;
    }
    .supplement-tips {
      font-size: 0.2rem;
      font-weight: 400;
    }
  }
  .btn-wrap {
    display: flex;
    margin-top: 0.24rem;
    .pay-btn,
    .refund-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 0.8rem;
      font-size: 0.28rem;
      border-radius: 0.24rem;
    }
    .pay-btn {
      margin-right: 0.12rem;
      color: #fff;
      background: #09afff;
    }
    .refund-btn {
      margin-left: 0.12rem;
      color: #333;
      background: #fff;
    }
  }
  .change-log {
    margin-top: 0.24rem;
    padding: 0.24rem;
    background: #fff;
    border-radius: 0.24rem;
    .log-info {
      flex: 1;
      .log-title {
        color: #333;
        font-size: 0.32rem;
        font-weight: bold;
      }
      .log-content {
        margin-top: 0.04rem;
        color: #37588b;
        font-size: 0.26rem;
      }
      .log-time {
        margin-top: 0.24rem;
        color: #999;
        font-size: 0.24rem;
      }
    }
    .change-amount {
      color: #3abd85;
      font-size: 0.36rem;
      font-weight: bold;
      &.income {
        color: #09afff;
      }
    }
  }
}
</style>
