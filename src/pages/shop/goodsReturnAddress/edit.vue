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

    <div class="btns">
      <button class="delete-btn" @click="deleteCurAddress">删除</button>
      <button class="save-btn" @click="save">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showConfirmDialog, showToast } from "vant";
import { editAddress, getAddress, deleteAddress } from "./utils/api";
import type { AddressDetail } from "./utils/type";

const route = useRoute();
const router = useRouter();
const addressInfo = ref<AddressDetail>({
  id: 0,
  consigneeName: "",
  mobile: "",
  address: "",
  supplement: "",
});

onMounted(async () => {
  addressInfo.value = await getAddress(+(route.query.id as string));
});

const save = async () => {
  if (!addressInfo.value.consigneeName) {
    showToast("请输入收件人姓名");
    return;
  }
  if (
    !addressInfo.value.mobile ||
    !/^1[345789][0-9]{9}$/.test(addressInfo.value.mobile)
  ) {
    showToast("请输入正确手机号");
    return;
  }
  if (!addressInfo.value.address) {
    showToast("请输入收货地址");
    return;
  }
  const { supplement, ...rest } = addressInfo.value;
  try {
    await editAddress(supplement ? addressInfo.value : rest);
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};

const deleteCurAddress = () =>
  showConfirmDialog({ title: "确定删除该退货地址吗？" })
    .then(async () => {
      try {
        await deleteAddress(addressInfo.value.id);
        router.back();
      } catch (error) {
        showToast("删除失败，请重试");
      }
    })
    .catch(() => true);
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
  .btns {
    display: flex;
    margin-top: 1.28rem;
    .save-btn,
    .delete-btn {
      flex: 1;
      height: 0.88rem;
      font-size: 0.3rem;
      font-weight: 550;
      border-radius: 0.18rem;
    }
    .save-btn {
      margin-left: 0.2rem;
      color: #fff;
      background: #212121;
    }
    .delete-btn {
      margin-right: 0.2rem;
      color: #333;
      border: 1px solid #ddd;
    }
  }
}
</style>
