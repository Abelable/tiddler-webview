<template>
  <div class="container">
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">收件人姓名</div>
          <input
            class="input"
            v-model="addressInfo.consigneeName"
            type="text"
            placeholder="请输入收件人姓名"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">手机号</div>
          <input
            class="input"
            v-model="addressInfo.mobile"
            type="tel"
            placeholder="请输入手机号"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">收货地址</div>
          <input
            class="input"
            v-model="addressInfo.address"
            type="text"
            placeholder="请输入收货地址"
          />
        </li>
        <li class="form-item flex">
          <div class="name">补充说明</div>
          <input
            class="input"
            v-model="addressInfo.supplement"
            type="text"
            placeholder="选填，例：只收顺丰快递"
          />
        </li>
      </ul>
    </div>

    <button class="save-btn" @click="save">保存</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { createAddress } from "./utils/api";
import type { AddressDetail } from "./utils/type";

const router = useRouter();
const addressInfo = reactive<Omit<AddressDetail, "id">>({
  consigneeName: "",
  mobile: "",
  address: "",
  supplement: "",
});

const save = async () => {
  if (!addressInfo.consigneeName) {
    showToast("请输入收件人姓名");
    return;
  }
  if (!addressInfo.mobile || !/^1[345789][0-9]{9}$/.test(addressInfo.mobile)) {
    showToast("请输入正确手机号");
    return;
  }
  if (!addressInfo.address) {
    showToast("请输入收货地址");
    return;
  }
  const { supplement, ...rest } = addressInfo;
  try {
    await createAddress(supplement ? addressInfo : rest);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0.32rem;
  .card {
    padding: 0 0.32rem;
    background: #fff;
    border-radius: 0.24rem;
    overflow: hidden;
    .form {
      .form-item {
        padding: 0.32rem 0;
        font-size: 0.26rem;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        &.flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .name {
          margin-right: 0.2rem;
          color: #333;
          font-weight: 500;
          line-height: 1;
          &.required {
            position: relative;
            &::before {
              position: absolute;
              top: -0.06rem;
              left: -0.16rem;
              content: "*";
              color: #ee0d23;
              font-size: 0.24rem;
            }
          }
        }
        .input {
          color: #333;
          flex: 1;
          text-align: right;
        }
      }
    }
  }
  .save-btn {
    margin-top: 1.28rem;
    width: calc(100vw - 0.64rem);
    height: 0.88rem;
    color: #fff;
    font-size: 0.3rem;
    font-weight: 550;
    border-radius: 0.18rem;
    background: #212121;
  }
}
</style>
