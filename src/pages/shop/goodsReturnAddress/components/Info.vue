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
            v-model="addressInfo.addressDetail"
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
      <button class="delete-btn" v-if="editingAddressInfo" @click="_delete">
        删除
      </button>
      <button
        class="save-btn"
        :class="{ 'create-mode': !editingAddressInfo }"
        @click="save"
      >
        保存
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { showToast } from "vant";
import { initialAddressInfo } from "../utils/index";
import type { AddressDetail } from "../utils/type";

const props = defineProps<{
  editingAddressInfo?: Omit<AddressDetail, "id">;
}>();
const emit = defineEmits(["save", "delete"]);

const addressInfo = ref<Omit<AddressDetail, "id">>(initialAddressInfo);

watch(props, (props) => {
  if (props.editingAddressInfo) {
    addressInfo.value = props.editingAddressInfo;
  }
});

const save = () => {
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
  if (!addressInfo.value.addressDetail) {
    showToast("请输入收货地址");
    return;
  }
  emit("save", { addressInfo: addressInfo.value });
};

const _delete = () => emit("delete");
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
      &.create-mode {
        margin-left: 0;
      }
    }
    .delete-btn {
      margin-right: 0.2rem;
      color: #333;
      border: 1px solid #ddd;
    }
  }
}
</style>
