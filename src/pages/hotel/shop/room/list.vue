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
      <div class="total" v-if="item.total">（{{ item.total }}）</div>
    </li>
  </ul>

  <PullRefresh class="container" v-model="refreshing" @refresh="onRefresh">
    <div class="warning-tips" v-show="curMenuIndex === 2">
      温馨提示：审核时间是3个工作日
    </div>
    <List
      class="room-list"
      v-if="shopId"
      v-model="loading"
      :finished="finished"
      @load="onLoadMore"
      :finished-text="roomLists[curMenuIndex].length ? '没有更多了' : ''"
    >
      <RoomItem
        v-for="item in roomLists[curMenuIndex]"
        :shopId="shopId"
        :key="item.id"
        :item="item"
        :status="menuList[curMenuIndex].status"
        :hotel-options="hotelOptions"
        @refresh="onRefresh"
      />
    </List>
    <Empty
      v-if="!roomLists[curMenuIndex].length"
      image="https://static.tiddler.cn/mp/default_illus/empty.png"
      description="暂无房间列表"
    />
  </PullRefresh>

  <button class="add-btn" @click="addRoom">添加房间</button>
</template>

<script setup lang="ts">
import { PullRefresh, List, Empty } from "vant";
import RoomItem from "./components/RoomItem.vue";

import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getRoomTotals, getRoomList } from "./utils/api";
import { hotelOptions, setHotelOptions } from "./utils/index";

import type { RoomListItem } from "./utils/type";

const router = useRouter();
const route = useRoute();

const shopId = ref(0);
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
const roomLists = reactive<RoomListItem[][]>([[], [], [], []]);
const pageList = [0, 0, 0, 0];
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

onMounted(async () => {
  shopId.value = +(route.query.shop_id as string);
  setHotelOptions(shopId.value);
  setTotals();
  setRoomList(true);
});

const onRefresh = () => {
  setTotals();
  setRoomList(true);
};

const onLoadMore = () => setRoomList();

const selectMenu = (index: number) => {
  curMenuIndex.value = index;
  setRoomList(true);
};

const setTotals = async () => {
  const totals = await getRoomTotals(shopId.value);
  totals.forEach((item, index) => (menuList.value[index].total = item));
};

const setRoomList = async (init = false) => {
  if (init) {
    pageList[curMenuIndex.value] = 0;
    finished.value = false;
  }
  const list =
    (await getRoomList(
      shopId.value,
      menuList.value[curMenuIndex.value].status,
      ++pageList[curMenuIndex.value]
    )) || {};

  roomLists[curMenuIndex.value] = init
    ? list
    : [...roomLists[curMenuIndex.value], ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
};

const addRoom = () =>
  router.push({
    path: "/hotel/shop/room/create",
    query: { shop_id: shopId.value },
  });
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
  .room-list {
    padding: 0.24rem;
    .room-item {
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
