<template>
  <Popup
    :show="visible"
    @click-overlay="cancel"
    position="bottom"
    round
    safe-area-inset-bottom
  >
    <div class="container">
      <div class="title">选择商品</div>
      <div class="goods-options" v-if="goodsOptions.length">
        <RadioGroup v-model="goodsId">
          <Radio
            v-for="(goods, index) in goodsOptions"
            :key="index"
            :name="goods.goodsId"
            label-position="left"
          >
            <div class="goods-option">
              <img class="goods-cover" :src="goods.cover" alt="" />
              <div class="goods-name">{{ goods.name }}</div>
              <div class="goods-number">x{{ goods.number }}</div>
            </div>
          </Radio>
        </RadioGroup>
      </div>
      <Empty
        v-if="!goodsOptions.length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂无商品"
      />
      <div class="btns-wrap row">
        <div class="cancel-btn row center" @click="cancel">取消</div>
        <div
          class="confirm-btn row center"
          :class="{ active: goodsId }"
          @click="confirm"
        >
          确定
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, RadioGroup, Radio, Empty } from "vant";

import { ref, watch } from "vue";

import type { Goods } from "../utils/type";

const props = defineProps<{
  visible: boolean;
  goodsOptions: Goods[];
}>();
const emit = defineEmits(["confirm", "cancel"]);

// const goodsOptions = ref<Goods[]>([]);
const goodsId = ref(0);

watch(props, (props) => {
  if (!props.visible) {
    goodsId.value = 0;
  }
});

const confirm = () => {
  if (goodsId.value === 0) {
    return;
  }
  const goods = props.goodsOptions.find(
    (goods) => goods.goodsId === goodsId.value
  );
  emit("confirm", goods);
};
const cancel = () => {
  emit("cancel");
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  &.center {
    justify-content: center;
  }
}
.container {
  padding: 0.32rem;
  .title {
    margin-bottom: 0.32rem;
    color: #333;
    font-size: 0.32rem;
    text-align: center;
    font-weight: 500;
    line-height: 1;
  }
  .goods-options {
    margin-top: 0.2rem;
    height: 6.8rem;
    overflow-y: scroll;
    .goods-option {
      display: flex;
      align-items: center;
      padding: 0.18rem 0;
      border-bottom: 1px solid #eee;
      .goods-cover {
        width: 0.48rem;
        height: 0.48rem;
        border-radius: 0.08rem;
      }
      .goods-name {
        margin-left: 0.24rem;
        flex: 1;
        color: #333;
        font-size: 0.28rem;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .goods-number {
        margin-left: 0.24rem;
        color: #999;
        font-size: 0.28rem;
      }
    }
  }
  .btns-wrap {
    margin-top: 0.24rem;
    .cancel-btn,
    .confirm-btn {
      flex: 1;
      height: 0.88rem;
      font-size: 0.3rem;
      font-weight: 550;
      border-radius: 0.44rem;
    }
    .cancel-btn {
      margin-right: 0.12rem;
      color: #333;
      border: 1px solid #ddd;
    }
    .confirm-btn {
      margin-left: 0.12rem;
      color: #fff;
      background: #212121;
      opacity: 0.2;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
<style>
.van-search {
  padding: 0 !important;
}
.van-radio__label--left {
  width: 100% !important;
}
</style>
