<template>
  <img class="bg" src="https://static.tiddler.cn/mp/promoter_bg.png" alt="" />
  <div class="menu">
    <div
      class="menu-item"
      :class="{ active: curMenuIndex === index }"
      v-for="(item, index) in ['爱心助农', '文创周边']"
      :key="index"
      @click="selectMenu(index)"
    >
      {{ item }}
    </div>
  </div>
  <PullRefresh class="container" v-model="refreshing" @refresh="onRefresh">
    <List
      class="goods-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadMore"
      :finished-text="goodsLists[curMenuIndex].length ? '没有更多了' : ''"
    >
      <Empty
        v-if="!goodsLists[curMenuIndex].length"
        description="暂无商品列表"
      />
    </List>
  </PullRefresh>
</template>

<script setup lang="ts">
import { PullRefresh, List, Empty } from "vant";
import { reactive, ref } from "vue";
import { GoodsListItem } from "./utils/type";
import { getGoodsList } from "./utils/api";

const curMenuIndex = ref(0);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const pageList = [0, 0];
const goodsLists = reactive<GoodsListItem[][]>([[], []]);

const onRefresh = () => {
  setGoodsList(true);
};

const onLoadMore = () => setGoodsList();

const selectMenu = (index: number) => {
  curMenuIndex.value = index;
  setGoodsList(true);
};

const setGoodsList = async (init = false) => {
  if (init) {
    pageList[curMenuIndex.value] = 0;
    finished.value = false;
  }
  const list =
    (await getGoodsList(
      curMenuIndex.value + 1,
      ++pageList[curMenuIndex.value]
    )) || {};

  goodsLists[curMenuIndex.value] = init
    ? list
    : [...goodsLists[curMenuIndex.value], ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
};
</script>

<style lang="scss" scoped>
.bg {
  display: block;
  width: 100%;
}
.menu {
  display: flex;
  background: #fff;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 0.88rem;
    color: #999;
    font-size: 0.28rem;
    &.active {
      position: relative;
      color: #333;
      font-weight: bold;
      &::after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.04rem;
        content: "";
        background: #77a9fd;
      }
    }
  }
}
</style>
