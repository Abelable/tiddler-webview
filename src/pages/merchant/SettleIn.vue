<template>
  <div class="container">
    <div class="home" v-if="step === 0">
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
            class="btn confirm"
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
    <div class="information-filling" v-if="step !== 0 && step !== 4">
      <div class="header">
        <div class="title">信息填写</div>
        <div class="sub-title">真实有效的信息有助于您快速通过审核</div>
        <div class="steps">
          <div
            class="step"
            v-for="(item, index) in ['个人信息', '银行信息', '店铺信息']"
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
          <div class="title">请完善个人相关信息</div>
          <div class="form-wrap">
            <div class="form-item">
              <div class="form-title">请点击上传身份证正反面照片</div>
              <div class="uploader-wrap">
                <Uploader max-count="1" :after-read="uploadIdCardFrontPhoto">
                  <img
                    class="photo"
                    :src="idCardFrontPhoto || require('./images/front.png')"
                    alt=""
                  />
                </Uploader>
                <Uploader max-count="1" :after-read="uploadIdCardBehindPhoto">
                  <img
                    class="photo"
                    :src="idCardFrontPhoto || require('./images/behind.png')"
                    alt=""
                  />
                </Uploader>
              </div>
            </div>
            <div class="form-item">
              <div class="form-title">请点击上传手持身份证照片</div>
              <div class="uploader-wrap">
                <Uploader max-count="1" :after-read="uploadPersonalPhoto">
                  <img
                    class="photo"
                    v-if="personalPhoto"
                    :src="personalPhoto"
                    alt=""
                  />
                  <div class="default-img" v-else>
                    <div class="img-wrap">
                      <img
                        style="width: 0.5rem; height: 0.5rem"
                        src="./images/camera.png"
                        alt=""
                      />
                    </div>
                    <div class="desc">手持身份证照片</div>
                  </div>
                </Uploader>
                <img class="photo" src="./images/person-example.png" alt="" />
              </div>
            </div>
            <div class="form-item">
              <div class="form-title">姓名</div>
              <input class="input" type="text" placeholder="例：小明" />
            </div>
            <div class="form-item">
              <div class="form-title">身份证号</div>
              <input
                class="input"
                type="text"
                placeholder="请输入18位身份证号"
              />
            </div>
            <div class="form-item">
              <div class="form-title">联系地址</div>
              <div
                class="picker"
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
          <div class="title">请完善银行相关信息</div>
          <div class="form-wrap">
            <div class="form-item">
              <div class="form-title">持卡人姓名</div>
              <input class="input" type="text" placeholder="例：小明" />
            </div>
            <div class="form-item">
              <div class="form-title">个人银行账号</div>
              <input
                class="input"
                type="number"
                placeholder="例：622123456789012345"
              />
            </div>
            <div class="form-item">
              <div class="form-title">开户银行及支行名称</div>
              <input
                class="input"
                type="text"
                placeholder="例：中国招商银行城西支行"
              />
            </div>
          </div>
        </div>
        <div class="part" v-show="step === 3">
          <div class="title">请完善店铺相关信息</div>
          <div class="form-wrap">
            <div class="form-item">
              <div class="form-title">店铺名称</div>
              <input class="input" type="text" placeholder="例：小明的店" />
            </div>
            <div class="form-item">
              <div class="form-title">店铺分类</div>
              <div
                class="picker"
                :class="{ active: pickedCategoryDesc }"
                @click="categoryPickerPopupVisible = true"
              >
                {{ pickedCategoryDesc || "请选择店铺分类" }}
              </div>
              <Popup
                v-model:show="categoryPickerPopupVisible"
                position="bottom"
                round
              >
                <Picker
                  :columns="[
                    { text: '水果生鲜', value: 1 },
                    { text: '服饰箱包', value: 2 },
                    { text: '美妆个护', value: 3 },
                    { text: '数码电器', value: 4 },
                    { text: '居家日用', value: 5 },
                    { text: '食品饮料', value: 6 },
                    { text: '母婴玩具', value: 7 },
                    { text: '宠物生活', value: 8 },
                    { text: '特殊类目', value: 9 },
                  ]"
                  @confirm="categoryConfirm"
                  @cancel="categoryPickerPopupVisible = false"
                />
              </Popup>
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
    <div class="status" v-if="step === 4">
      <div class="status-illus" v-if="status !== 2">
        <img
          class="illus"
          :src="
            status === 1
              ? require('./images/wait.png')
              : status === 3
              ? require('./images/success.png')
              : require('./images/fail.png')
          "
          alt=""
        />
        <div class="title">
          {{
            status === 1 ? "等待审核" : status === 3 ? "缴纳成功" : "审核失败"
          }}
        </div>
        <div class="desc" :class="{ err: status === 4 }">
          {{
            status === 1
              ? "已提交申请，请耐心等待平台人员处理"
              : status === 3
              ? "店铺已开通"
              : "失败原因：身份证照片不够清晰"
          }}
        </div>
        <div class="btn back">{{ status === 4 ? "重新申请" : "返回" }}</div>
      </div>
      <div class="payment" v-else>
        <div class="title">审核通过</div>
        <div class="pay-amount">
          缴纳保证金：<span style="color: #eaab63">1000元</span>
        </div>
        <div class="agreement">
          <p>缴纳保证金默认接受以下条款:</p>
          <p>
            1.
            商家在小鱼游参与经营活动必须缴纳服务保证金，保证金主要用于保证商家直播带货符合法律法规及小鱼游的平台规定。
          </p>
          <p>
            2.
            商家在入驻申请通过后需一次性足额缴纳保证金，保证金金额统一为人民币壹仟元。
          </p>
          <p>
            3.
            小鱼游有权根据商家的业务变化及实际违约赔付情况通知商家调整保证金金额，商家应在收到小鱼游通知后的3个工作日内补足保证金，如果没有及时补足保证金金额的，小鱼游有权中止合作。
          </p>
          <p>
            4.
            商家缴纳的保证金将冻结在商家的小鱼游企业账户中，在冻结期内保证金不产生利息，小鱼游不开具发票。
          </p>
          <p>
            5.
            商家需要退出小鱼游，终止合作，需向小鱼游提出保证金退还申请，小鱼游审核通过后会在30天内将保证金原路退回到您缴纳保证金时的支付账户。商家退出时存在前期违约金尚未支付的情况的，小鱼游从保证金余额中扣取。
          </p>
          <p>
            6.
            因重大违规被清退的商家将不退还保证金，因违规行为扣取的保证金不退还，作为商家违约金赔偿给用户及小鱼游，具体保证金扣取情况参见《平台商家违规管理规则》。
          </p>
          <p>
            7.
            小鱼游将根据国家经济情况、市场状况及小鱼游经营情况，适时适当调整保证金制度。保证金制度的调整会按相关规定提前公示予以所有商家。
          </p>
        </div>
        <div class="btn pay">点击缴纳</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox, Area, Popup, Uploader, Picker } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data";

const router = useRouter();
const step = ref(0);
const agreementsChecked = ref(false);
const curTypeOptionIdx = ref(-1);
const areaPickerPopupVisible = ref(false);
const pickedArea = ref<string[]>([]);
const pickedAreaDesc = ref("");
const idCardFrontPhoto = ref("");
const idCardBehindPhoto = ref("");
const personalPhoto = ref("");
const categoryPickerPopupVisible = ref(false);
const pickedCategory = ref(0);
const pickedCategoryDesc = ref("");
const status = ref(1);

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
const uploadIdCardFrontPhoto = (file: any) => {
  idCardFrontPhoto.value = file.content;
};
const uploadIdCardBehindPhoto = (file: any) => {
  idCardBehindPhoto.value = file.content;
};
const uploadPersonalPhoto = (file: any) => {
  personalPhoto.value = file.content;
};
const categoryConfirm = ({
  selectedValues,
  selectedOptions,
}: {
  selectedValues: number[];
  selectedOptions: RegionOption[];
}) => {
  pickedCategory.value = selectedValues[0];
  pickedCategoryDesc.value = selectedOptions[0].text;
  categoryPickerPopupVisible.value = false;
};
const checkAgreement = () => router.push("/agreement/merchant_agreement");
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
            margin-bottom: 0.42rem;
            font-size: 0;
            .form-title {
              padding-left: 0.12rem;
              color: #a3a3a3;
              font-size: 0.26rem;
              font-weight: 550;
            }
            .input,
            .picker {
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
            .picker {
              display: flex;
              align-items: center;
              color: #777;
              &.active {
                color: #333;
              }
            }
            .uploader-wrap {
              margin-top: 0.2rem;
              display: flex;
              justify-content: space-between;
              .photo,
              .default-img {
                width: 3.3rem;
                height: 2.14rem;
                box-shadow: 0 0 10px 0 #e6e6e6;
                border-radius: 0.24rem;
              }
              .default-img {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .img-wrap {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 1rem;
                  height: 1rem;
                  background: rgba(0, 0, 0, 0.6);
                  border-radius: 50%;
                }
                .desc {
                  margin-top: 0.3rem;
                  color: #000;
                  font-size: 0.2rem;
                }
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
        .previous-step {
          margin-right: 0.32rem;
          flex: 1;
          color: #333;
          font-weight: 600;
          border: 1px solid #ddd;
        }
        .next-step {
          flex: 3;
          color: #fff;
          font-weight: 550;
          background: #212121;
        }
      }
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
    .payment {
      height: 100%;
      overflow-y: scroll;
      .title {
        color: #333;
        font-size: 0.36rem;
        font-weight: 550;
      }
      .pay-amount {
        margin-top: 0.12rem;
        color: #333;
        font-size: 0.3rem;
      }
      .agreement {
        margin-top: 0.24rem;
        color: #666;
        font-size: 0.26rem;
        line-height: 1.6;
      }
    }
  }
}
</style>
