<template>
  <div class="container">
    <div class="performance-data-wrap">
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
        <span>{{ achievementOptions[curTimeIdx] }}</span>
      </div>
      <div class="total-data">
        <span
          >近{{
            ["一", "二", "三"][achievementInfo?.monthDifference || 2]
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
        v-for="(item, index) in ['个人业绩', '团队业绩']"
        :key="index"
        @click="selectMenu(index)"
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
        :finished-text="orderList.length ? '没有更多了' : ''"
      >
        <div class="record-list" v-if="orderList.length">
          <div
            class="record-item"
            v-for="(item, index) in orderList"
            :key="index"
          >
            <div class="order-info" @click="checkOrderDetail(item.id)">
              <div>订单编号</div>
              <div class="order-sn">{{ item.orderSn }}</div>
              <img
                class="check-icon"
                v-if="curMenuIdx === 0"
                src="./images/arrow.png"
                alt=""
              />
            </div>
            <div class="record-amount">+{{ item.commissionBase }}</div>
          </div>
        </div>
      </List>
      <Empty
        v-if="!orderList.length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂无业绩记录"
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
import type { Achievement, Order } from "./utils/type";

const achievementInfo = ref<Achievement>();
const curMenuIdx = ref(0);
const orderList = ref<Order[]>([]);
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
  ].slice(-((monthDifference || 2) + 1));
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
  ].slice(-((achievementInfo.value?.monthDifference || 2) + 1));
};

const setCurTime = ({ selectedValues }: { selectedValues: number[] }) => {
  curTimeIdx.value = timeOptions.value.findIndex(
    (item) => item.value === selectedValues[0]
  );
  timePickerPopupVisible.value = false;
  setOrderList(true);
};
const selectMenu = (index: number) => {
  curMenuIdx.value = index;
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
    finished.value = false;
  }
  const list = await getCommissionOrderList(
    +timeOptions.value[curTimeIdx.value].value,
    curMenuIdx.value === 0 ? 1 : 4,
    ++page
  );
  orderList.value = init ? list : [...orderList.value, ...list];
  if (!list.length) {
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
.container {
  padding: 0.24rem;
  min-height: 100vh;
  background-image: url("https://static.tiddler.cn/mp/promoter/account/bg.png"),
    linear-gradient(180deg, #edf6fe 20%, #f6f6f6 55%);
  background-size: 5.5rem 5.5rem, 100% 100vh;
  background-repeat: no-repeat, no-repeat;
  background-position: top left, top;
}
.performance-data-wrap {
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
  margin: 0.24rem;
  padding: 0.24rem;
  background: #fff;
  border-radius: 0.16rem;
  .record-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.24rem;
    padding: 0 0.24rem;
    height: 0.8rem;
    background: #f8f8f8;
    border-radius: 0.16rem;
    &:last-child {
      margin-bottom: 0;
    }
    .order-info {
      display: flex;
      align-items: center;
      color: #6a6f75;
      font-size: 0.24rem;
      .order-sn {
        margin-left: 0.2rem;
      }
      .check-icon {
        margin-left: 0.04rem;
        width: 0.24rem;
        height: 0.24rem;
      }
    }
    .record-amount {
      color: #14191f;
      font-size: 0.32rem;
      font-weight: 500;
    }
  }
}
</style>
