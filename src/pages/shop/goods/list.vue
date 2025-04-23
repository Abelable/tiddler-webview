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
      class="goods-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadMore"
      :finished-text="goodsLists[curMenuIndex].length ? '没有更多了' : ''"
    >
      <SwipeCell
        class="goods-item"
        v-for="(item, index) in goodsLists[0]"
        :key="index"
        v-show="curMenuIndex === 0"
      >
        <div class="inner">
          <img class="image" :src="item.cover" alt="" />
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="row">
              <div class="price">价格：¥{{ item.price }}</div>
              <div class="sales-volume">销量：{{ item.salesVolume }}</div>
            </div>
          </div>
        </div>
        <template #right>
          <Button
            class="down-btn"
            @click.stop="offShelf(index)"
            square
            text="下架"
            type="primary"
          />
        </template>
      </SwipeCell>

      <SwipeCell
        class="goods-item"
        v-for="(item, index) in goodsLists[1]"
        :key="index"
        v-show="curMenuIndex === 1"
      >
        <div class="inner" @click="editGoods(item.id)">
          <img class="image" :src="item.cover" alt="" />
          <div class="content">
            <div class="name omit">{{ item.name }}</div>
            <div class="time">
              下架时间：{{
                dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")
              }}
            </div>
          </div>
        </div>
        <template #right>
          <Button
            class="up-btn"
            @click.stop="onShelf(index)"
            square
            text="上架"
            type="primary"
          />
          <Button
            class="delete-btn"
            @click.stop="deleteCurGoods(index)"
            square
            text="删除"
            type="danger"
          />
        </template>
      </SwipeCell>

      <div
        class="goods-item"
        v-for="(item, index) in goodsLists[2]"
        :key="index"
        v-show="curMenuIndex === 2"
      >
        <div class="inner">
          <img class="image" :src="item.cover" alt="" />
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="time">
              提交时间：{{
                dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
              }}
            </div>
          </div>
        </div>
      </div>

      <SwipeCell
        class="goods-item"
        v-for="(item, index) in goodsLists[3]"
        :key="index"
        v-show="curMenuIndex === 3"
      >
        <div class="inner" @click="editGoods(item.id)">
          <img class="image" :src="item.cover" alt="" />
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="failure-reason">
              未通过原因：{{ item.failureReason }}
            </div>
          </div>
        </div>
        <template #right>
          <Button
            class="delete-btn"
            @click.stop="deleteCurGoods(index)"
            square
            text="删除"
            type="danger"
          />
        </template>
      </SwipeCell>
    </List>
  </PullRefresh>

  <Empty v-if="!goodsLists[curMenuIndex].length" description="暂无商品列表" />

  <button class="add-btn" @click="addGoods">添加商品</button>
</template>

<script setup lang="ts">
import {
  PullRefresh,
  List,
  SwipeCell,
  Empty,
  Button,
  showConfirmDialog,
  showToast,
} from "vant";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";
import {
  getGoodsTotals,
  deleteGoods,
  offShelfGoods,
  onShelfGoods,
  getGoodsList,
} from "./utils/api";

import type { GoodsListItem } from "./utils/type";

const route = useRoute();
const router = useRouter();

const shopId = ref(0);
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
const goodsLists = reactive<GoodsListItem[][]>([[], [], [], []]);
const pageList = [0, 0, 0, 0];

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
  setTotals();
});

const onRefresh = () => {
  setTotals();
  setGoodsList(true);
};

const onLoadMore = () => setGoodsList();

const selectMenu = (index: number) => {
  curMenuIndex.value = index;
  setGoodsList(true);
};

const setTotals = async () => {
  const totals = await getGoodsTotals(shopId.value);
  totals.forEach((item, index) => (menuList.value[index].total = item));
};

const setGoodsList = async (init = false) => {
  if (init) {
    pageList[curMenuIndex.value] = 0;
    finished.value = false;
  }
  const list =
    (await getGoodsList(
      shopId.value,
      menuList.value[curMenuIndex.value].status,
      ++pageList[curMenuIndex.value]
    )) || {};

  goodsLists[curMenuIndex.value] = init
    ? list
    : [...goodsLists[curMenuIndex.value], ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
};

const offShelf = (index: number) =>
  showConfirmDialog({ title: "确定下架该商品吗？" })
    .then(async () => {
      try {
        await offShelfGoods(goodsLists[curMenuIndex.value][index].id);
        goodsLists[curMenuIndex.value].splice(index, 1);
        setTotals();
      } catch (error) {
        showToast("下架失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const onShelf = async (index: number) => {
  try {
    await onShelfGoods(goodsLists[curMenuIndex.value][index].id);
    goodsLists[curMenuIndex.value].splice(index, 1);
    setTotals();
  } catch (error) {
    showToast("上架失败，请重试");
  }
};

const deleteCurGoods = (index: number) =>
  showConfirmDialog({ title: "确定删除该商品吗？" })
    .then(async () => {
      try {
        await deleteGoods(goodsLists[curMenuIndex.value][index].id);
        goodsLists[curMenuIndex.value].splice(index, 1);
        setTotals();
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);

const editGoods = (id: number) =>
  router.push({
    path: "/shop/goods/edit",
    query: { id, shop_id: route.query.shop_id },
  });

const addGoods = () =>
  router.push({
    path: "/shop/goods/create",
    query: { shop_id: route.query.shop_id },
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
  .goods-list {
    padding: 0.24rem;
    .goods-item {
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
