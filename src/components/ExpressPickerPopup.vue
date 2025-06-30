<template>
  <Popup
    :show="visible"
    @click-overlay="cancel"
    position="bottom"
    round
    safe-area-inset-bottom
  >
    <div class="container">
      <div class="title">选择物流</div>
      <form action="/">
        <Search
          v-model="keywords"
          @search="setExpressOptions"
          placeholder="搜索物流"
        />
      </form>
      <div class="express-options" v-if="expressOptions.length">
        <RadioGroup v-model="expressId">
          <Radio
            v-for="(express, index) in expressOptions"
            :key="index"
            :name="express.id"
            label-position="left"
          >
            <div class="express-option">{{ express.name }}</div>
          </Radio>
        </RadioGroup>
      </div>
      <Empty
        v-if="!expressOptions.length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="未搜索到相关物流"
      />
      <div class="btns-wrap row">
        <div class="cancel-btn row center" @click="cancel">取消</div>
        <div
          class="confirm-btn row center"
          :class="{ active: expressId }"
          @click="confirm"
        >
          确定
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Search, RadioGroup, Radio, Empty } from "vant";

import { onMounted, ref, watch } from "vue";
import { getExpressOptions } from "@/utils/api";

import type { Express } from "@/utils/type";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const keywords = ref("");
const expressOptions = ref<Express[]>([]);
const expressId = ref(0);

watch(props, (props) => {
  if (!props.visible) {
    expressId.value = 0;
  }
});

onMounted(() => {
  setExpressOptions();
});

const setExpressOptions = async () => {
  expressOptions.value = await getExpressOptions(keywords.value);
};

const confirm = () => {
  if (expressId.value === 0) {
    return;
  }
  const express = expressOptions.value.find(
    (express) => express.id === expressId.value
  );
  emit("confirm", {
    expressCode: express?.code,
    expressName: express?.name,
  });
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
  .express-options {
    margin-top: 0.2rem;
    height: 6.8rem;
    overflow-y: scroll;
    .express-option {
      display: flex;
      align-items: center;
      padding: 0.18rem 0;
      color: #333;
      font-size: 0.28rem;
      font-weight: 500;
      border-bottom: 1px solid #eee;
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
