<template>
  <div class="container">
    <div class="home" v-show="step === 0">
      <div class="main">
        <div class="title">商家入驻</div>
        <div class="sub-title">请选择店铺类型:</div>
        <div class="selection">
          <div
            class="option"
            :class="{ selected: curTypeOptionIdx === index }"
            v-for="(item, index) in ['personal', 'enterprise']"
            :key="index"
            @click="curTypeOptionIdx = index"
          >
            <img class="icon" :src="require(`./images/${item}.png`)" alt="" />
            <div class="name">
              {{ item === "enterprise" ? "企业店铺" : "个人店铺" }}
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <div
            class="confirm-btn"
            :class="{ active: curTypeOptionIdx !== -1 && agreementsChecked }"
            @click="step = 1"
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
    <div class="information-filling" v-show="step !== 0">
      <div class="header">
        <div class="title">信息填写</div>
        <div class="sub-title">真实有效的信息有助于您快速通过审核</div>
        <div class="steps">
          <div
            class="step"
            v-for="(item, index) in [
              '店铺信息',
              '个人信息',
              '银行信息',
              '其他信息',
            ]"
            :key="index"
          >
            <div
              class="name"
              :class="{
                active: step === index + 1,
                finished: step > index + 1,
              }"
            >
              {{ item }}
            </div>
            <div
              class="progress-bar"
              :class="{ finished: step >= index + 1 }"
            ></div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="part" v-show="step === 1">
          <div class="title">请输入实体店铺相关信息</div>
          <div class="form-wrap">
            <div class="form-item">
              <div class="form-title">店铺名称</div>
              <input
                class="input"
                type="text"
                placeholder="请输入实体店铺名称"
              />
            </div>
            <div class="form-item">
              <div class="form-title">联系地址</div>
              <div
                class="area-picker"
                :class="{ active: pickedAreaDesc }"
                @click="areaPickerPopupVisible = true"
              >
                {{ pickedAreaDesc || "请选择省、市、区" }}
              </div>
              <Popup
                v-model:show="areaPickerPopupVisible"
                position="bottom"
                round
              >
                <Area
                  :area-list="areaList"
                  @confirm="areaConfirm"
                  @cancel="areaPickerPopupVisible = false"
                />
              </Popup>
            </div>
            <div class="form-item">
              <div class="form-title">详细地址</div>
              <input class="input" type="text" placeholder="请输入详细地址" />
            </div>
            <div class="form-item">
              <div class="form-title">联系电话</div>
              <input class="input" type="tel" placeholder="请输入联系电话" />
            </div>
            <div class="form-item">
              <div class="form-title">电子邮箱</div>
              <input class="input" type="email" placeholder="请输入电子邮箱" />
            </div>
          </div>
        </div>
        <div class="part" v-show="step === 2">
          <div class="title">请上传个人身份相关信息</div>
          <div class="form-wrap">
            <div class="form-item">
              <div class="form-title">姓名</div>
              <input class="input" type="text" placeholder="请输入姓名" />
            </div>
            <div class="form-item">
              <div class="form-title">身份证号</div>
              <input class="input" type="text" placeholder="请输入身份证号" />
            </div>
          </div>
        </div>
        <div class="btns">
          <div class="btn previous-step" @click="step = step - 1">上一步</div>
          <div class="btn next-step" @click="step = step + 1">
            {{ step === 4 ? "提交审核" : "下一步" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox, Area, Popup } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data";

const router = useRouter();
const step = ref(1);
const agreementsChecked = ref(false);
const curTypeOptionIdx = ref(-1);
const areaPickerPopupVisible = ref(false);
const pickedArea = ref<string[]>([]);
const pickedAreaDesc = ref("");

interface RegionOption {
  text: string;
  value: string;
  children?: RegionOption[];
}
const areaConfirm = ({
  selectedValues,
  selectedOptions,
}: {
  selectedValues: string[];
  selectedOptions: RegionOption[];
}) => {
  pickedArea.value = selectedValues;
  pickedAreaDesc.value = `${selectedOptions[0].text} ${selectedOptions[1].text} ${selectedOptions[2].text}`;
  areaPickerPopupVisible.value = false;
};
const checkAgreement = () => router.push("/agreement/merchant_agreement");
</script>

<style lang="scss" scoped>
.container {
  .home {
    display: flex;
    flex-direction: column;
    padding-top: 3.5rem;
    height: 100vh;
    background-color: #fff;
    background-image: url("./images/bg.jpeg");
    background-size: 100% 5.62rem;
    background-position-y: -1rem;
    background-repeat: no-repeat;
    .main {
      position: relative;
      padding: 0.32rem;
      flex: 1;
      background: #fff;
      border-radius: 0.24rem 0.24rem 0 0;
      .title {
        color: #333;
        font-size: 0.5rem;
        font-weight: 550;
      }
      .sub-title {
        margin-top: 0.1rem;
        color: #666;
        font-size: 0.28rem;
        font-weight: 500;
      }
      .selection {
        display: flex;
        justify-content: space-between;
        margin-top: 0.8rem;
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
      .btn-wrap {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 0 0.32rem 0.48rem;
        width: 100%;
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
  .information-filling {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .header {
      padding-top: 0.24rem;
      .title {
        padding: 0 0.24rem;
        color: #222;
        font-size: 0.42rem;
        font-weight: 550;
      }
      .sub-title {
        margin-top: 0.05rem;
        padding: 0 0.24rem;
        color: #999;
        font-size: 0.24rem;
      }
      .steps {
        display: flex;
        margin-top: 0.36rem;
        padding: 0 0.16rem;
        .step {
          margin: 0 0.08em;
          flex: 1;
          .name {
            color: #999;
            font-size: 0.26rem;
            text-align: center;
            font-weight: 550;
            &.active {
              color: #19a0fa;
            }
            &.finished {
              color: #333;
            }
          }
          .progress-bar {
            margin-top: 0.12rem;
            height: 0.1rem;
            background: #ddd;
            border-radius: 0.05rem;
            &.finished {
              background: #19a0fa;
            }
          }
        }
      }
    }
    .main {
      position: relative;
      margin-top: 0.48rem;
      flex: 1;
      border-radius: 0.32rem 0.32rem 0 0;
      overflow: hidden;
      background: #fff;
      .part {
        display: flex;
        flex-direction: column;
        padding-bottom: 1.52rem;
        height: 100%;
        .title {
          padding: 0.32rem;
          color: #333;
          font-size: 0.32rem;
          font-weight: 550;
          background: #fff;
        }
        .form-wrap {
          padding: 0 0.32rem;
          flex: 1;
          overflow-y: scroll;
          .form-item {
            margin-bottom: 0.32rem;
            font-size: 0;
            .form-title {
              padding-left: 0.12rem;
              color: #a3a3a3;
              font-size: 0.26rem;
              font-weight: 550;
            }
            .input,
            .area-picker {
              margin-top: 0.12rem;
              padding: 0 0.24rem;
              height: 1rem;
              font-size: 0.26rem;
              border-radius: 0.24rem;
              background: #e7f2fa;
            }
            .input {
              width: 100%;
            }
            .area-picker {
              display: flex;
              align-items: center;
              color: #777;
              &.active {
                color: #333;
              }
            }
          }
        }
      }
      .btns {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        padding: 0.32rem;
        width: 100%;
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0.88rem;
          font-size: 0.3rem;
          border-radius: 0.18rem;
          &.previous-step {
            margin-right: 0.32rem;
            flex: 1;
            color: #333;
            font-weight: 600;
            border: 1px solid #ddd;
          }
          &.next-step {
            flex: 3;
            color: #fff;
            font-weight: 550;
            background: #212121;
          }
        }
      }
    }
  }
}
</style>
