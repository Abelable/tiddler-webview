<template>
  <div class="container">
    <div class="achievement-data-wrap">
      <div
        class="month-picker"
        v-if="timeOptions.length"
        @click="timePickerPopupVisible = true"
      >
        <span>{{ timeOptions[curTimeIdx].text }}</span>
        <img class="picker-arrow" src="./images/down.png" alt="" />
      </div>
      <div class="month-data">
        <span style="font-size: 0.24rem">¥</span>
        <span>{{
          achievementOptions.length ? achievementOptions[curTimeIdx] : "0.00"
        }}</span>
      </div>
      <div class="total-data">
        <span
          >近{{
            ["一", "二", "三"][achievementInfo?.monthDifference || 0]
          }}月累计</span
        >
        <span style="font-weight: bold">{{
          achievementInfo ? (+achievementInfo?.totalGMV).toFixed(2) : "0.00"
        }}</span>
        <span>元</span>
      </div>
    </div>
    <div class="menu">
      <div
        class="menu-item"
        :class="{ active: curMenuIdx === index }"
        v-for="(item, index) in ['个人荣誉值', '团队荣誉值']"
        :key="index"
        @click="curMenuIdx = index"
      >
        <div class="menu-name">{{ item }}</div>
        <img
          class="selected-icon"
          v-if="curMenuIdx === index"
          src="https://static.tiddler.cn/mp/promoter/selected_sign.png"
          alt=""
        />
      </div>
    </div>
    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List
        v-model="loading"
        :finished="finished"
        @load="onLoadMore"
        :finished-text="orderLists[curMenuIdx].length ? '没有更多了' : ''"
      >
        <div class="record-list" v-if="orderLists[curMenuIdx].length">
          <div
            class="record-item"
            v-for="(item, index) in orderLists[curMenuIdx]"
            :key="index"
          >
            <div class="order-info">
              <div class="order-sn-wrap">
                <div class="order-sn" @click="checkOrderDetail(item.orderId)">
                  <div>订单编号：{{ item.orderSn }}</div>
                  <img
                    class="order-sn-arrow"
                    v-if="curMenuIdx === 0"
                    src="./images/arrow.png"
                  />
                </div>
                <div class="order-status-wrap">
                  <div class="order-status">
                    {{ item.status === 1 ? "待结算" : "已结算" }}
                  </div>
                  <div class="order-time">
                    下单时间：{{ dayjs(item.createdAt).format("YYYY.MM.DD") }}
                  </div>
                </div>
              </div>
              <div class="order-payment-amount">
                +{{ item.paymentAmount.toFixed(2) }}
              </div>
            </div>
            <div class="goods-list">
              <div
                class="goods-info-wrap"
                v-for="(goods, goodsIdx) in item.productList"
                :key="goodsIdx"
              >
                <img class="goods-cover" :src="goods.cover" />
                <div class="goods-info">
                  <div class="goods-name omit">{{ goods.name }}</div>
                  <div class="goods-spec omit single">
                    {{ goods.selectedSkuName }}
                  </div>
                  <div class="goods-payment-amount">
                    ¥{{ goods.paymentAmount.toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </List>
      <Empty
        v-if="!orderLists[curMenuIdx].length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂无荣誉值记录"
      />
    </PullRefresh>
  </div>

  <PickerPopup
    v-if="timeOptions.length"
    :visible="timePickerPopupVisible"
    :options="timeOptions"
    @confirm="setCurTime"
    @cancel="timePickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { Empty, PullRefresh, List, showLoadingToast, closeToast } from "vant";
import PickerPopup from "@/components/PickerPopup.vue";

import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { getCommissionOrderList, getPromoterAchievement } from "./utils/api";

import type { Option } from "@/utils/type";
import type { Achievement, CommissionOrder } from "./utils/type";

const achievementInfo = ref<Achievement>();
const curMenuIdx = ref(0);
const orderLists = ref<CommissionOrder[][]>([[], []]);
const timePickerPopupVisible = ref(false);
const timeOptions = ref<Option[]>([]);
const achievementOptions = ref<string[]>([]);
const curTimeIdx = ref(0);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

onMounted(async () => {
  const curYear = dayjs().year();
  const curMount = dayjs().month();
  timeOptions.value = [
    {
      text: `${curYear}年${curMount + 1}月`,
      value: 3,
    },

    {
      text: `${curYear}年${curMount}月`,
      value: 4,
    },
    {
      text: `${curYear}年${curMount - 1}月`,
      value: 5,
    },
  ];
  await setAchievementInfo();
  setTimeOptions();
});
const onRefresh = () => setOrderList(true);
const onLoadMore = () => setOrderList();

const setAchievementInfo = async () => {
  achievementInfo.value = await getPromoterAchievement();

  const { curMonthGMV, lastMonthGMV, beforeLastMonthGMV, monthDifference } =
    achievementInfo.value;
  achievementOptions.value = [
    curMonthGMV.toFixed(2),
    lastMonthGMV.toFixed(2),
    beforeLastMonthGMV.toFixed(2),
  ].slice(0, monthDifference + 1);
};

const setTimeOptions = () => {
  const curYear = dayjs().year();
  const curMount = dayjs().month();
  timeOptions.value = [
    {
      text: `${curYear}年${curMount + 1}月`,
      value: 3,
    },

    {
      text: `${curYear}年${curMount}月`,
      value: 4,
    },
    {
      text: `${curYear}年${curMount - 1}月`,
      value: 5,
    },
  ].slice(0, (achievementInfo.value?.monthDifference || 0) + 1);
};

const setCurTime = ({ selectedValues }: { selectedValues: number[] }) => {
  curTimeIdx.value = timeOptions.value.findIndex(
    (item) => item.value === selectedValues[0]
  );
  timePickerPopupVisible.value = false;
  setOrderList(true);
};

let page = 0;
const setOrderList = async (init = true) => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  if (init) {
    page = 0;
    orderLists.value[curMenuIdx.value] = [];
    finished.value = false;
  }

  const commissionList = await getCommissionOrderList(
    +timeOptions.value[curTimeIdx.value].value,
    curMenuIdx.value === 0 ? 1 : 4,
    ++page
  );

  const orderList = [...orderLists.value[curMenuIdx.value]];
  for (const item of commissionList) {
    const { orderId, productType, product, paymentAmount, ...rest } = item;
    const existingOrder = orderList.find(
      (order) => order.orderId === orderId && order.productType === productType
    );

    if (existingOrder) {
      existingOrder.paymentAmount += paymentAmount;
      existingOrder.productList.push({ ...product, paymentAmount });
    } else {
      orderList.push({
        ...rest,
        orderId,
        productType,
        paymentAmount,
        productList: [{ ...product, paymentAmount }],
      });
    }
  }

  orderLists.value[curMenuIdx.value] = orderList;
  if (!commissionList.length) {
    finished.value = true;
  }
  loading.value = false;
  refreshing.value = false;
  closeToast();
};

const checkOrderDetail = (id: number) => {
  if (curMenuIdx.value === 1) {
    return;
  }
  window.wx.miniProgram.navigateTo({
    url: `/pages/mine/subpages/order-center/subpages/order-detail/index?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  &.single {
    -webkit-line-clamp: 1;
  }
}
.container {
  padding: 0.24rem;
  min-height: 100vh;
  background-image: url("https://static.tiddler.cn/mp/promoter/account/bg.png"),
    linear-gradient(180deg, #edf6fe 20%, #f6f6f6 55%);
  background-size: 5.5rem 5.5rem, 100% 100vh;
  background-repeat: no-repeat, no-repeat;
  background-position: top left, top;
}
.achievement-data-wrap {
  position: relative;
  height: 2.54rem;
  background-image: url("@/assets/images/card_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  .month-picker {
    display: flex;
    align-items: center;
    margin-top: 0.68rem;
    margin-left: 0.68rem;
    color: #6a6f75;
    font-size: 0.24rem;
    .picker-arrow {
      margin-left: 0.06rem;
      width: 0.24rem;
      height: 0.24rem;
    }
  }
  .month-data {
    margin-top: 0.08rem;
    margin-left: 0.64rem;
    color: #110e4b;
    font-size: 0.56rem;
    font-weight: bold;
  }
  .total-data {
    position: absolute;
    top: 0.32rem;
    right: 0.32rem;
    padding: 0.02rem 0.12rem;
    color: #110e4b;
    font-size: 0.24rem;
    border: 1px solid #110e4b;
    border-radius: 0.08rem;
  }
}
.menu {
  display: flex;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 1rem;
    color: #6a6f75;
    font-size: 0.28rem;
    &.active {
      position: relative;
      color: #14191f;
      font-size: 0.32rem;
      font-weight: bold;
      .selected-icon {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 0.84rem;
        height: 0.16rem;
      }
    }
  }
}
.record-list {
  margin-top: 0.24rem;
}
.record-item {
  margin-bottom: 0.24rem;
  padding: 0.24rem;
  background: #fff;
  border-radius: 0.16rem;
}
.order-info {
  display: flex;
  align-items: center;
  padding: 0.24rem;
  background: #f8f8f8;
  border-radius: 0.16rem;
  .order-sn-wrap {
    flex: 1;
    color: #6a6f75;
    font-size: 0.24rem;
    .order-sn {
      display: flex;
      align-items: center;
      .order-sn-arrow {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
    .order-status-wrap {
      display: flex;
      margin-top: 0.12rem;
      .order-time {
        margin-left: 0.48rem;
      }
    }
  }
  .order-payment-amount {
    color: #14191f;
    font-size: 0.32rem;
    font-weight: 550;
  }
}
.goods-info-wrap {
  display: flex;
  align-items: center;
  margin-top: 0.24rem;
  .goods-cover {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.16rem;
  }
  .goods-info {
    display: flex;
    flex-direction: column;
    margin-left: 0.16rem;
    flex: 1;
    height: 1.5rem;
    .goods-name {
      color: #14191f;
      font-size: 0.26rem;
      font-weight: 550;
    }
    .goods-spec {
      margin: 0.04rem;
      flex: 1;
      color: #6a6f75;
      font-size: 0.22rem;
    }
    .goods-payment-amount {
      color: #09afff;
      font-size: 0.24rem;
    }
  }
}
</style>
