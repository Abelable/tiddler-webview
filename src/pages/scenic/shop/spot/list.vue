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
    <div class="warning-tips" v-show="curMenuIndex === 1">
      温馨提示：审核时间是3个工作日
    </div>
    <List
      class="spot-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadMore"
      :finished-text="spotLists[curMenuIndex].length ? '没有更多了' : ''"
    >
      <SwipeCell
        class="spot-item"
        v-for="(item, index) in spotLists[0]"
        :key="index"
        v-show="curMenuIndex === 0"
      >
        <div class="inner" @click="editScenic(item.scenicId)">
          <img class="image" :src="item.scenicImage" alt="" />
          <div class="content">
            <div class="row">
              <div class="name">{{ item.scenicName }}</div>
              <div class="level row" v-if="item.scenicLevel">
                {{ item.scenicLevel }}
              </div>
            </div>
            <div class="address row">
              <Icon name="location-o" size="0.24rem" />
              <div>{{ item.scenicAddress }}</div>
            </div>
          </div>
        </div>
        <template #right>
          <Button
            class="delete-btn"
            @click.stop="deleteSpot(index)"
            square
            text="删除"
            type="danger"
          />
        </template>
      </SwipeCell>

      <SwipeCell
        class="spot-item"
        v-for="(item, index) in spotLists[1]"
        :key="index"
        v-show="curMenuIndex === 1"
      >
        <div class="inner">
          <img class="image" :src="item.scenicImage" alt="" />
          <div class="content">
            <div class="row">
              <div class="name">{{ item.scenicName }}</div>
              <div class="level row" v-if="item.scenicLevel">
                {{ item.scenicLevel }}
              </div>
            </div>
            <div class="time">
              提交时间：{{
                dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
              }}
            </div>
          </div>
        </div>
        <template #right>
          <Button
            class="delete-btn"
            @click.stop="deleteSpot(index)"
            square
            text="删除"
            type="danger"
          />
        </template>
      </SwipeCell>

      <SwipeCell
        class="spot-item"
        v-for="(item, index) in spotLists[2]"
        :key="index"
        v-show="curMenuIndex === 2"
      >
        <div class="inner">
          <img class="image" :src="item.scenicImage" alt="" />
          <div class="content">
            <div class="row">
              <div class="name">{{ item.scenicName }}</div>
              <div class="level row" v-if="item.scenicLevel">
                {{ item.scenicLevel }}
              </div>
            </div>
            <div class="failure-reason">
              未通过原因：{{ item.failureReason }}
            </div>
          </div>
        </div>
        <template #right>
          <Button
            class="delete-btn"
            @click.stop="deleteSpot(index)"
            square
            text="删除"
            type="danger"
          />
        </template>
      </SwipeCell>

      <Empty
        v-if="!spotLists[curMenuIndex].length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂无景点列表"
      />
    </List>
  </PullRefresh>

  <button class="add-btn" @click="scenicPickerPopupVisible = true">
    添加景点
  </button>

  <ScenicPickerPopup
    v-if="shopId"
    :visible="scenicPickerPopupVisible"
    :shopId="shopId"
    @confirm="selectScenic"
    @cancel="scenicPickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import {
  PullRefresh,
  List,
  SwipeCell,
  Button,
  Icon,
  showConfirmDialog,
  Empty,
  showToast,
} from "vant";
import ScenicPickerPopup from "./components/ScenicPickerPopup.vue";

import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import {
  getShopScenicSpotList,
  deleteShopScenicSpot,
  applyScenicSpot,
  getScenicListTotals,
} from "./utils/api";

import type { ShopScenicSpot } from "./utils/type";

const shopId = ref(0);
const menuList = ref([
  {
    name: "已过审",
    status: 1,
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
const spotLists = reactive<ShopScenicSpot[][]>([[], [], []]);
const pageList = [0, 0, 0];
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const scenicPickerPopupVisible = ref(false);

const route = useRoute();
const router = useRouter();

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
  setTotals();
});

const onRefresh = () => {
  setTotals();
  setSpotLists(true);
};

const onLoadMore = () => setSpotLists();

const selectMenu = (index: number) => {
  curMenuIndex.value = index;
  setSpotLists(true);
};

const setTotals = async () => {
  const totals = await getScenicListTotals(shopId.value);
  totals.forEach((item, index) => (menuList.value[index].total = item));
};

const setSpotLists = async (init = false) => {
  if (init) {
    pageList[curMenuIndex.value] = 0;
    finished.value = false;
  }
  const list =
    (await getShopScenicSpotList(
      shopId.value,
      menuList.value[curMenuIndex.value].status,
      ++pageList[curMenuIndex.value]
    )) || {};

  spotLists[curMenuIndex.value] = init
    ? list
    : [...spotLists[curMenuIndex.value], ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
};

const selectScenic = async ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  try {
    await applyScenicSpot(shopId.value, selectedValues);
    setTotals();
  } catch (error) {
    showToast((error as { code: number; message: string }).message);
  }
  scenicPickerPopupVisible.value = false;
};

const deleteSpot = (index: number) =>
  showConfirmDialog({ title: "确定删除景点吗？" })
    .then(async () => {
      try {
        await deleteShopScenicSpot(
          shopId.value,
          spotLists[curMenuIndex.value][index].id
        );
        spotLists[curMenuIndex.value].splice(index, 1);
        setTotals();
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const editScenic = (id: number) =>
  router.push({
    path: "/scenic/spot/edit",
    query: { id },
  });
</script>

<style lang="scss" scoped>
.limit {
  display: -webkit-box;
  overflow: hidden;
  line-height: 1;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.row {
  display: flex;
  align-items: center;
  &.center {
    justify-content: center;
  }
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
  .spot-list {
    padding: 0.24rem;
    .spot-item {
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
            font-size: 0.28rem;
            font-weight: 500;
          }
          .level {
            margin-left: 0.08rem;
            padding: 0 0.12rem;
            height: 0.32rem;
            color: #5dce86;
            font-size: 0.2rem;
            font-weight: bold;
            line-height: 1;
            border-radius: 0.08rem;
            background: #d1f7e5;
          }
          .address,
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
.no-tips {
  height: 1.2rem;
  color: #333;
  font-size: 0.26rem;
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
<style>
.van-empty {
  padding: 4.18rem 0;
}
</style>
