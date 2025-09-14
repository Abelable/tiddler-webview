<template>
  <div class="container">
    <div class="header row center">
      <img
        class="bg"
        :src="shopInfo?.bg || 'https://static.tiddler.cn/mp/shop_bg.png'"
      />
      <div class="avatar-wrap">
        <Uploader
          width="1.4rem"
          height="1.4rem"
          border-radius="50%"
          :default-img="shopInfo?.logo || require('./images/defaul_logo.png')"
          @finish="updateLogo"
        />
        <div class="avatar-edit-btn row center">
          <img class="edit-icon" src="./images/edit.png" />
        </div>
      </div>
      <Uploader :custom="true" @finish="updateBg">
        <div class="bg-edit-btn row center">设置背景</div>
      </Uploader>
    </div>

    <div class="form-list">
      <div class="form-item row">
        <div class="form-label">店铺名称：</div>
        <input
          class="form-input"
          v-model="shopInfo.name"
          placeholder="未设置"
        />
      </div>
      <div class="form-item row">
        <div class="form-label">店铺简介：</div>
        <input
          class="form-input"
          v-model="shopInfo.brief"
          placeholder="未设置"
        />
      </div>
      <div class="form-item row">
        <div class="form-label">店主姓名：</div>
        <input
          class="form-input"
          v-model="shopInfo.ownerName"
          placeholder="未设置"
        />
      </div>
      <div class="form-item row">
        <div class="form-label">联系方式：</div>
        <input
          class="form-input"
          v-model="shopInfo.mobile"
          placeholder="未设置"
        />
      </div>
    </div>
  </div>

  <div
    class="save-btn row center {{saveBtnActive ? 'active' : ''}}"
    @click="save"
  >
    保存
  </div>
</template>

<script setup lang="ts">
import Uploader from "@/components/Uploader.vue";
import { showToast } from "vant";

import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getShopInfo, updateShopInfo } from "./utils/api";

import type { ShopInfo } from "./utils/type";

const route = useRoute();

const shopInfo = reactive<ShopInfo>({
  id: undefined,
  bg: "",
  logo: "",
  name: "",
  brief: "",
  ownerName: "",
  mobile: "",
});

onMounted(() => {
  setShopInfo();
});

const setShopInfo = async () => {
  const shopId = +(route.query.shop_id as string);
  const info = await getShopInfo(shopId);
  Object.assign(shopInfo, info);
};

const updateLogo = (logo: string) => {
  shopInfo.logo = logo;
};
const updateBg = (bg: string) => {
  shopInfo.bg = bg;
};
const save = () => {
  try {
    updateShopInfo(shopInfo);
    showToast("保存成功");
    setTimeout(() => {
      window.wx.miniProgram.navigateBack();
    }, 2000);
  } catch (error) {
    showToast("信息保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
}
.row.center {
  justify-content: center;
}

.container {
  padding-bottom: 1.84rem;
  .header {
    position: relative;
    flex-direction: column;
    height: 4rem;
    font-size: 0;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .avatar-wrap {
      position: relative;
      width: 1.4rem;
      height: 1.4rem;
      .avatar {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
      }
      .avatar-edit-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        .edit-icon {
          width: 0.24rem;
          height: 0.24rem;
        }
      }
    }
    .bg-edit-btn {
      margin-top: 0.32rem;
      width: 2rem;
      height: 0.72rem;
      color: #333;
      font-size: 0.26rem;
      background: #fff;
      border-radius: 0.36rem;
    }
  }

  .form-list {
    padding: 0 0.24rem;
    font-weight: 300;
    background: #fff;
    .form-item {
      color: #333;
      font-size: 0.28rem;
      height: 1.2rem;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
      .form-label {
        margin-right: 0.24rem;
      }
      .form-input {
        flex: 1;
      }
    }
  }
}

.save-btn {
  position: fixed;
  left: 50%;
  bottom: 0.48rem;
  transform: translateX(-50%);
  width: calc(100vw - 0.48rem);
  height: 0.8rem;
  color: #fff;
  font-size: 0.28rem;
  border-radius: 0.24rem;
  background: #00b2ff;
}
</style>
