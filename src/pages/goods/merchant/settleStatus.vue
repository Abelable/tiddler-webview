<template>
  <div class="container" v-if="mounted">
    <div class="status" v-if="statusInfo">
      <div class="status-illus">
        <img
          class="illus"
          :src="`https://static.tiddler.cn/mp/default_illus/${
            ['waiting', 'success', 'success', 'fail'][statusInfo.status]
          }.png`"
          alt=""
        />
        <div class="title">
          {{
            ["等待审核", "审核通过", "缴纳成功", "审核失败"][statusInfo.status]
          }}
        </div>
        <div
          class="desc"
          :class="{ err: statusInfo.status === 3 }"
          v-if="statusInfo.status !== 1"
        >
          {{
            [
              "已提交申请，请耐心等待平台人员处理",
              "",
              "店铺已开通",
              `失败原因：${statusInfo.failureReason}`,
            ][statusInfo.status]
          }}
        </div>
        <div class="pay-amount" v-if="statusInfo.status === 1">
          缴纳保证金：<span style="color: #eaab63"
            >{{ statusInfo.deposit }}元</span
          >
        </div>
        <div
          class="btn back"
          v-if="[0, 2].includes(statusInfo.status)"
          @click="back"
        >
          返回
        </div>
        <div class="btn back" v-if="statusInfo.status === 3" @click="reApply">
          重新申请
        </div>
        <div class="btn-wrap" v-if="statusInfo.status === 1">
          <div
            class="btn confirm"
            :class="{ active: bondAgreementsChecked }"
            @click="pay"
          >
            点击缴纳
          </div>
          <div class="agreements">
            <Checkbox v-model="bondAgreementsChecked" icon-size="16px" />
            <div style="margin-left: 0.1rem">
              阅读并同意
              <span style="color: #1b89fa" @click="checkDepositProtocol"
                >《小鱼游电商商家保证金协议》</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from "vant";

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { getMerchantStatusInfo, getShopDepositPayParams } from "./utils/api";

import type { MerchantStatusInfo } from "./utils/type";

const router = useRouter();

const statusInfo = ref<MerchantStatusInfo | undefined>();
const bondAgreementsChecked = ref(false);
const mounted = ref(false);

onMounted(async () => {
  await setStatusInfo();
  mounted.value = true;
});

onMounted(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});

const handleVisibilityChange = async () => {
  if (document.visibilityState === "visible") {
    await setStatusInfo();
    mounted.value = true;
  }
};

const setStatusInfo = async () => {
  statusInfo.value = await getMerchantStatusInfo();
};

const checkDepositProtocol = () => router.push("/protocol/deposit");

const pay = async () => {
  if (statusInfo.value) {
    const payParams = await getShopDepositPayParams(statusInfo.value.shopId);
    Object.keys(payParams).forEach(
      (key) => (payParams[key] = encodeURIComponent(payParams[key]))
    );
    window.wx.miniProgram.navigateTo({
      url: `/pages/subpages/common/pay/index?pay_params=${encodeURIComponent(
        JSON.stringify(payParams)
      )}`,
    });
  }
};

const reApply = async () => {
  router.push("/goods/merchant/settle_in");
};

const back = () => {
  window.wx.miniProgram.navigateBack();
};
</script>

<style lang="scss" scoped>
.container {
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.88rem;
    font-size: 0.3rem;
    font-weight: 550;
    border-radius: 0.18rem;
  }
  .btn-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 0.32rem 0.48rem;
    width: 100%;
    .confirm {
      margin-top: 1.6rem;
      color: #fff;
      background: #e6e6e6;
      &.active {
        background: #212121;
      }
    }
    .agreements {
      display: flex;
      justify-content: center;
      margin-top: 0.24rem;
      font-size: 0.24rem;
    }
  }
  .status {
    padding: 0.32rem;
    height: 100vh;
    background: #fff;
    .back,
    .pay {
      margin-top: 0.8rem;
      width: 100%;
      color: #fff;
      background: #212121;
    }
    .status-illus {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-bottom: 3rem;
      .illus {
        width: 3.2rem;
        height: 3.2rem;
      }
      .title {
        margin-top: 0.32rem;
        color: #333;
        font-size: 0.36rem;
        font-weight: 550;
      }
      .desc {
        margin-top: 0.2rem;
        color: #666;
        font-size: 0.24rem;
        &.err {
          color: #f22237;
        }
      }
    }
    .pay-amount {
      margin-top: 0.12rem;
      color: #333;
      font-size: 0.3rem;
    }
  }
}
</style>
