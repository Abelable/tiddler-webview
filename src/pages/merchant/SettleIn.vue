<template>
  <div class="container">
    <div class="step-one" v-if="step === 0">
      <div class="main">
        <div class="title">商家入驻</div>
        <div class="second-title">请选择店铺类型:</div>
        <div class="selection">
          <div
            class="option"
            :class="{ selected: curTypeOptionIdx === index }"
            v-for="(item, index) in ['enterprise', 'personal']"
            :key="index"
            @click="curTypeOptionIdx = index"
          >
            <img class="icon" :src="require(`./images/${item}.png`)" alt="" />
            <div class="name">
              {{ item === "enterprise" ? "企业店铺" : "个人店铺" }}
            </div>
          </div>
        </div>
        <div
          class="confirm-btn"
          :class="{ active: curTypeOptionIdx !== -1 && agreementsChecked }"
        >
          下一步
        </div>
        <div class="agreements">
          <Checkbox v-model="agreementsChecked" icon-size="16px" />
          <div style="margin-left: 0.1rem">
            我已阅读并同意
            <span style="color: #1b89fa" @click="checkAgreement"
              >《小鱼游商家服务协议》</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const step = ref(0);
const agreementsChecked = ref(false);
const curTypeOptionIdx = ref(-1);

const checkAgreement = () => router.push("/agreement/merchant_service");
</script>

<style lang="scss" scoped>
.container {
  .step-one {
    padding-top: 3.5rem;
    background-color: #fff;
    background-image: url("./images/bg.jpeg");
    background-size: 100% 5.62rem;
    background-position-y: -1rem;
    background-repeat: no-repeat;
    .main {
      padding: 0.32rem;
      height: calc(100vh - 3.6rem);
      background: #fff;
      border-radius: 0.24rem 0.24rem 0 0;
      .title {
        color: #333;
        font-size: 0.36rem;
        font-weight: 550;
      }
      .second-title {
        margin-top: 0.1rem;
        color: #666;
        font-size: 0.28rem;
        font-weight: 500;
      }
      .selection {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        .option {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.24rem;
          width: 3.3rem;
          border-radius: 0.24rem;
          border: 1px solid #eee;
          &.selected {
            border: 1px solid #a7c0fb;
          }
          .icon {
            margin: 1rem 0;
            width: 1.2rem;
            height: 1.2rem;
            opacity: 0.68;
          }
          .name {
            margin-top: 0.24rem;
            color: #333;
            font-size: 0.28rem;
            font-weight: 550;
          }
        }
      }
      .confirm-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.6rem;
        height: 0.88rem;
        color: #fff;
        font-size: 0.3rem;
        font-weight: 550;
        background: #e6e6e6;
        border-radius: 0.18rem;
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
  }
}
</style>
