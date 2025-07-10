<template>
  <ul class="menu-list">
    <li
      class="menu-item"
      :class="{ selected: curMenuIndex === index }"
      v-for="(item, index) in menuList"
      :key="index"
      @click="selectMenu(index)"
    >
      <div class="name">{{ item.name }}</div>
      <div class="total">（{{ item.total }}）</div>
    </li>
  </ul>

  <PullRefresh class="container" v-model="refreshing" @refresh="onRefresh">
    <div class="warning-tips" v-show="curMenuIndex === 2">
      温馨提示：审核时间是3个工作日
    </div>
    <List
      class="ticket-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadMore"
      :finished-text="ticketLists[curMenuIndex].length ? '没有更多了' : ''"
    >
      <TicketItem
        v-for="item in ticketLists[curMenuIndex]"
        :key="item.id"
        :item="item"
        :status="menuList[curMenuIndex].status"
        :scenic-options="scenicOptions"
        @refresh="onRefresh"
      />
    </List>
    <Empty
      v-if="!ticketLists[curMenuIndex].length"
      image="https://static.tiddler.cn/mp/default_illus/empty.png"
      description="暂无门票列表"
    />
  </PullRefresh>

  <button class="add-btn" @click="addTicket">添加门票</button>
</template>

<script setup lang="ts">
import { PullRefresh, List, Empty } from "vant";
import TicketItem from "./components/TicketItem.vue";

import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getTicketTotals, getTicketList } from "./utils/api";
import { scenicOptions, setScenicOptions } from "./utils/index";

import type { TicketListItem } from "./utils/type";

const router = useRouter();

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const menuList = ref([
  {
    name: "出售中",
    status: 1,
    total: 0,
  },
  {
    name: "已下架",
    status: 3,
    total: 0,
  },
  {
    name: "审核中",
    status: 0,
    total: 0,
  },
  {
    name: "未过审",
    status: 2,
    total: 0,
  },
]);
const curMenuIndex = ref(0);
const ticketLists = reactive<TicketListItem[][]>([[], [], [], []]);
const pageList = [0, 0, 0, 0];

onMounted(async () => {
  setScenicOptions();
  setTotals();
  setTicketList(true);
});

const onRefresh = () => {
  setTotals();
  setTicketList(true);
};

const onLoadMore = () => setTicketList();

const selectMenu = (index: number) => {
  curMenuIndex.value = index;
  setTicketList(true);
};

const setTotals = async () => {
  const totals = await getTicketTotals();
  totals.forEach((item, index) => (menuList.value[index].total = item));
};

const setTicketList = async (init = false) => {
  if (init) {
    pageList[curMenuIndex.value] = 0;
    finished.value = false;
  }
  const list =
    (await getTicketList(
      menuList.value[curMenuIndex.value].status,
      ++pageList[curMenuIndex.value]
    )) || {};

  ticketLists[curMenuIndex.value] = init
    ? list
    : [...ticketLists[curMenuIndex.value], ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
};

const addTicket = () => router.push("/scenic/shop/ticket/create");
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.menu-list {
  position: fixed;
  width: 100%;
  display: flex;
  height: 0.88rem;
  background: #fff;
  z-index: 100;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 0.88rem;
    color: #999;
    font-size: 0.28rem;
    text-align: center;
    .total {
      margin-left: -0.1rem;
      margin-right: -0.2rem;
    }
    &.selected {
      position: relative;
      color: #333;
      &::after {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 100%;
        height: 0.05rem;
        content: "";
        background: #1b89fa;
      }
      .name {
        font-weight: 550;
      }
    }
  }
}
.container {
  padding: 0.88rem 0 1.52rem;
  .warning-tips {
    display: flex;
    padding: 0.24rem;
    color: #b97a01;
    font-size: 0.24rem;
    line-height: 1;
    background: #fffaed;
  }
  .ticket-list {
    padding: 0.24rem;
    .ticket-item {
      margin-bottom: 0.24rem;
      border-radius: 0.24rem;
      background: #fff;
      .inner {
        display: flex;
        padding: 0.24rem;
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          height: 1.8rem;
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
    }
    .down-btn,
    .up-btn,
    .delete-btn {
      height: 100%;
    }
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
