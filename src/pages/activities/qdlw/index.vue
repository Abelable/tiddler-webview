<template>
  <div class="container">
    <img class="bg" src="./images/bg.webp" alt="" />
    <div class="main">
      <div class="title-wrap">
        <img class="title" src="./images/title_1.webp" alt="" />
        <div class="desc">(五选一)</div>
      </div>
      <div class="goods-selections">
        <div
          class="goods-selection"
          :class="{ selected: curXgIdx === index }"
          v-for="(item, index) in xgList"
          :key="index"
          @click="curXgIdx = index"
        >
          <img class="goods-cover" :src="item.cover" alt="" />
          <div class="goods-name">{{ item.name }}</div>
          <div class="selected-tag" v-if="curXgIdx === index">
            <img class="selected-icon" src="./images/selected.png" alt="" />
          </div>
        </div>
      </div>

      <div class="title-wrap">
        <img class="title" src="./images/title_2.webp" alt="" />
        <div class="desc">(五选一)</div>
      </div>
      <div class="goods-selections">
        <div
          class="goods-selection"
          :class="{ selected: curMrIdx === index }"
          v-for="(item, index) in mrList"
          :key="index"
          @click="curMrIdx = index"
        >
          <img class="goods-cover" :src="item.cover" alt="" />
          <div class="goods-name">{{ item.name }}</div>
          <div class="selected-tag" v-if="curMrIdx === index">
            <img class="selected-icon" src="./images/selected.png" alt="" />
          </div>
        </div>
      </div>

      <div class="title-wrap">
        <img
          class="title"
          style="width: 2rem"
          src="./images/title_3.webp"
          alt=""
        />
        <div class="desc">(二选一)</div>
      </div>
      <div class="red-bag-selections">
        <div
          class="red-bag-selection"
          :class="{ selected: curRbIdx === index }"
          v-for="(item, index) in 2"
          :key="index"
          @click="curRbIdx = index"
        >
          <img
            class="red-bag-cover"
            :src="require(`./images/rb_${index + 1}.webp`)"
            alt=""
          />
          <div class="selected-tag" v-if="curRbIdx === index">
            <img class="selected-icon" src="./images/selected.png" alt="" />
          </div>
        </div>
      </div>

      <div class="submit-btn" @click="submit">点击购买</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fastAddCart, getGoodsInfo } from "./utils/api";

import type { SkuItem, SpecItem } from "./utils/type";

const xgList = [
  {
    name: "金榜题名",
    cover: require("./images/xg_5.webp"),
  },
  {
    name: "如意顺遂",
    cover: require("./images/xg_2.webp"),
  },
  {
    name: "吉祥常临",
    cover: require("./images/xg_3.webp"),
  },
  {
    name: "青云直上",
    cover: require("./images/xg_4.webp"),
  },
  {
    name: "马到成功",
    cover: require("./images/xg_1.webp"),
  },
];
const mrList = [
  {
    name: "金榜题名",
    cover: require("./images/mr_5.webp"),
  },
  {
    name: "万事如意",
    cover: require("./images/mr_2.webp"),
  },
  {
    name: "吉祥如意",
    cover: require("./images/mr_3.webp"),
  },
  {
    name: "鹏程万里",
    cover: require("./images/mr_4.webp"),
  },
  {
    name: "马到成功",
    cover: require("./images/mr_1.webp"),
  },
];

const curXgIdx = ref(0);
const curMrIdx = ref(0);
const curRbIdx = ref(0);

const skuList = ref<SkuItem[]>([]);
const specList = ref<SpecItem[]>([]);

onMounted(() => {
  setGoodsInfo();
});

const setGoodsInfo = async () => {
  const goodsInfo = await getGoodsInfo(87);
  specList.value = goodsInfo.specList;
  skuList.value = goodsInfo.skuList;
};

const submit = async () => {
  if (!specList.value.length) {
    return;
  }
  const curSkuName = specList.value
    .map(
      (spec: SpecItem, index: number) =>
        spec.options[[curXgIdx.value, curMrIdx.value, curRbIdx.value][index]]
    )
    .join(",");
  const selectedSkuIndex = skuList.value.findIndex(
    (sku: SkuItem) => sku.name === curSkuName
  );

  const cartGoodsId = await fastAddCart(87, selectedSkuIndex, 1);
  window.wx.miniProgram.navigateTo({
    url: `/pages/subpages/mall/goods/subpages/order-check/index?pay_params=${JSON.stringify(
      [cartGoodsId]
    )}`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 0;
  .bg {
    width: 100%;
  }
  .main {
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 10rem;
    padding: 10rem 0.32rem 0.32rem;
    width: 100%;
    .title-wrap {
      display: flex;
      align-items: flex-end;
      margin-top: 0.68rem;
      .title {
        width: 1.6rem;
        .long {
          width: 3.2rem;
        }
      }
      .desc {
        margin-left: 0.18rem;
        color: #111;
        font-size: 0.24rem;
      }
    }
    .goods-selections {
      margin-top: 0.32rem;
      display: flex;
      gap: 0.24rem;
      flex-wrap: wrap;
      .goods-selection {
        position: relative;
        padding: 0.08rem;
        width: calc((100% - 0.24rem * 2) / 3);
        font-size: 0;
        background: #fff;
        border-radius: 0.24rem;
        border: 0.04rem solid transparent;
        overflow: hidden;
        &.selected {
          border-color: #f9d17a;
          .goods-name {
            color: #d4af37;
            font-weight: bolder;
          }
        }
        .selected-tag {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.32rem;
          height: 0.32rem;
          background: #f9d17a;
          border-top-left-radius: 0.12rem;
          .selected-icon {
            width: 100%;
            height: 100%;
          }
        }
        .goods-cover {
          width: 100%;
          border-radius: 0.18rem;
        }
        .goods-name {
          margin-top: 0.12rem;
          color: #333;
          font-size: 0.24rem;
          text-align: center;
          font-weight: bold;
        }
      }
    }
    .red-bag-selections {
      margin-top: 0.32rem;
      display: flex;
      gap: 0.24rem;
      .red-bag-selection {
        position: relative;
        padding: 0.08rem;
        width: calc((100% - 0.24rem) / 2);
        font-size: 0;
        background: #fff;
        border-radius: 0.24rem;
        border: 0.04rem solid transparent;
        overflow: hidden;
        &.selected {
          border-color: #f9d17a;
          .red-bag-name {
            color: #f9d17a;
            font-weight: bolder;
          }
        }
        .selected-tag {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.32rem;
          height: 0.32rem;
          background: #f9d17a;
          border-top-left-radius: 0.12rem;
          .selected-icon {
            width: 100%;
            height: 100%;
          }
        }
        .red-bag-cover {
          width: 100%;
          border-radius: 0.18rem;
        }
      }
    }
    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.8rem;
      width: 100%;
      height: 1rem;
      border-radius: 0.5rem;
      color: #d71402;
      font-size: 0.36rem;
      font-weight: bolder;
      background: #f9d17a;
    }
  }
}
</style>
