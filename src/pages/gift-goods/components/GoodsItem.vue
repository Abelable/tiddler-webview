<template>
  <div class="goods-item" @click="navToGoodsDetail">
    <img class="cover" :src="info?.cover" />
    <div class="content">
      <div class="title omit">{{ info?.name }}</div>
      <div class="info-wrap">
        <div class="price-wrap">
          <div class="price-symbol">¥</div>
          <div class="price">{{ info?.price }}</div>
          <div class="market-price">¥{{ info?.marketPrice }}</div>
        </div>
        <div class="sales-volume">
          <span>已售</span>
          <span style="font-weight: bold">{{ info?.salesVolume }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoodsListItem } from "../utils/type";

const props = defineProps<{
  info?: GoodsListItem;
}>();

const navToGoodsDetail = () =>
  window.wx.miniProgram.navigateTo({
    url: `/pages/subpages/mall/goods/subpages/goods-detail/index?id=${props.info?.id}`,
  });
</script>

<style scss scoped>
.goods-item {
  margin-bottom: 0.1rem;
  width: 3.5rem;
  font-size: 0;
  background: #fff;
  border-radius: 0.32rem;
  overflow: hidden;
  .cover {
    width: 3.5rem;
  }
  .content {
    padding: 0.12rem;
    .title {
      color: #333;
      font-size: 0.26rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .info-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.12rem;
      .price-wrap {
        display: flex;
        align-items: baseline;
        .price-symbol {
          color: #ff5040;
          font-size: 0.24rem;
        }
        .price {
          color: #ff5040;
          font-size: 0.32rem;
          font-weight: 550;
        }
        .market-price {
          margin-left: 0.08rem;
          color: #bbb;
          font-size: 0.22rem;
          text-decoration: line-through;
        }
      }
      .sales-volume {
        color: #888;
        font-size: 0.22rem;
      }
    }
  }
}
</style>
