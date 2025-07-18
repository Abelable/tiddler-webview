<template>
  <div class="container" v-if="mounted">
    <div class="settle-in" v-if="!statusInfo">
      <div class="home" v-if="step === 0">
        <div class="main">
          <div class="title">餐饮商家入驻</div>
          <div class="sub-title">请选择商家类型:</div>
          <div class="selection">
            <div
              class="option"
              :class="{ selected: merchantInfo.type === index + 1 }"
              v-for="(item, index) in ['personal', 'enterprise']"
              :key="index"
              @click="merchantInfo.type = index + 1"
            >
              <img class="icon" :src="require(`./images/${item}.png`)" alt="" />
              <div class="name">
                {{ item === "enterprise" ? "企业" : "个体" }}
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <div
              class="btn confirm"
              :class="{ active: protocolChecked }"
              @click="nextStep"
            >
              下一步
            </div>
            <div class="agreements">
              <Checkbox v-model="protocolChecked" icon-size="16px" />
              <div style="margin-left: 0.1rem">
                我已阅读并同意
                <span style="color: #1b89fa" @click="checkProtocol"
                  >《小鱼游餐饮商家服务协议》</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="information-filling" v-else>
        <div class="header">
          <div class="title">信息填写</div>
          <div class="sub-title">真实有效的信息有助于您快速通过审核</div>
          <div class="steps">
            <div
              class="step"
              v-for="(item, index) in [
                merchantInfo.type === 1 ? '填写个体信息' : '填写企业信息',
                '填写银行信息',
                '填写店铺信息',
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
          <div class="form-wrap" v-show="step === 1">
            <template v-if="merchantInfo.type === 1">
              <div class="title">个体工商户信息</div>
              <div class="form-item">
                <div class="form-title">上传经营者身份证</div>
                <div class="uploader-wrap">
                  <Uploader
                    :default-img="
                      merchantInfo.idCardFrontPhoto ||
                      require('./images/front.png')
                    "
                    @finish="uploadIdCardFrontPhoto"
                  />
                  <Uploader
                    :default-img="
                      merchantInfo.idCardBackPhoto ||
                      require('./images/behind.png')
                    "
                    @finish="uploadIdCardBackPhoto"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-title">请点击上传手持身份证照片</div>
                <div class="uploader-wrap">
                  <Uploader
                    title="手持身份证照片"
                    :default-img="merchantInfo.holdIdCardPhoto || ''"
                    @finish="uploadHoldIdCardPhoto"
                  />
                  <img class="photo" src="./images/person-example.png" alt="" />
                </div>
              </div>
              <div class="form-item">
                <div class="form-title">经营者姓名</div>
                <input
                  class="input"
                  v-model="merchantInfo.name"
                  type="text"
                  placeholder="例：小明"
                />
              </div>
              <div class="form-item">
                <div class="form-title">经营者身份证号</div>
                <input
                  class="input"
                  v-model="merchantInfo.idCardNumber"
                  type="text"
                  placeholder="请输入18位身份证号"
                />
              </div>
              <div class="form-item">
                <div class="form-title">上传营业执照、卫生许可证</div>
                <div class="uploader-wrap">
                  <Uploader
                    title="营业执照照片"
                    :default-img="merchantInfo.businessLicensePhoto || ''"
                    @finish="uploadBusinessLicensePhoto"
                  />
                  <Uploader
                    title="卫生许可证照片"
                    :default-img="merchantInfo.hygienicLicensePhoto || ''"
                    @finish="uploadHygienicLicensePhoto"
                  />
                </div>
              </div>
              <div class="title">联系方式</div>
              <div class="form-item">
                <div class="form-title">手机号</div>
                <input
                  class="input"
                  v-model="merchantInfo.mobile"
                  type="tel"
                  placeholder="请输入手机号"
                />
              </div>
              <div class="form-item">
                <div class="form-title">电子邮箱</div>
                <input
                  class="input"
                  v-model="merchantInfo.email"
                  type="email"
                  placeholder="请输入电子邮箱"
                />
              </div>
              <div class="form-item">
                <div class="form-title">联系地址</div>
                <div
                  class="picker"
                  :class="{ active: merchantInfo.regionDesc }"
                  @click="areaPickerPopupVisible = true"
                >
                  {{ merchantInfo.regionDesc || "请选择省、市、区" }}
                </div>
              </div>
              <div class="form-item">
                <div class="form-title">详细地址</div>
                <input
                  class="input"
                  v-model="merchantInfo.addressDetail"
                  type="text"
                  placeholder="请输入详细地址"
                />
              </div>
            </template>
            <template v-else>
              <div class="title">企业信息</div>
              <div class="form-item">
                <div class="form-title">企业名称</div>
                <input
                  class="input"
                  v-model="merchantInfo.companyName"
                  type="text"
                  placeholder="请输入企业名称"
                />
              </div>
              <div class="form-item">
                <div class="form-title">企业经营地址</div>
                <div
                  class="picker"
                  :class="{ active: merchantInfo.regionDesc }"
                  @click="areaPickerPopupVisible = true"
                >
                  {{ merchantInfo.regionDesc || "请选择省、市、区" }}
                </div>
              </div>
              <div class="form-item">
                <div class="form-title">企业地址详情</div>
                <input
                  class="input"
                  v-model="merchantInfo.addressDetail"
                  type="text"
                  placeholder="请输入详细地址"
                />
              </div>
              <div class="form-item">
                <div class="form-title">上传营业执照、卫生许可证</div>
                <div class="uploader-wrap">
                  <Uploader
                    title="营业执照照片"
                    :default-img="merchantInfo.businessLicensePhoto || ''"
                    @finish="uploadBusinessLicensePhoto"
                  />
                  <Uploader
                    title="卫生许可证照片"
                    :default-img="merchantInfo.hygienicLicensePhoto || ''"
                    @finish="uploadHygienicLicensePhoto"
                  />
                </div>
              </div>
              <div class="title">法人信息</div>
              <div class="form-item">
                <div class="form-title">姓名</div>
                <input
                  class="input"
                  v-model="merchantInfo.name"
                  type="text"
                  placeholder="例：小明"
                />
              </div>
              <div class="form-item">
                <div class="form-title">手机号</div>
                <input
                  class="input"
                  v-model="merchantInfo.mobile"
                  type="tel"
                  placeholder="请输入手机号"
                />
              </div>
              <div class="form-item">
                <div class="form-title">电子邮箱</div>
                <input
                  class="input"
                  v-model="merchantInfo.email"
                  type="email"
                  placeholder="请输入电子邮箱"
                />
              </div>
              <div class="form-item">
                <div class="form-title">身份证号</div>
                <input
                  class="input"
                  v-model="merchantInfo.idCardNumber"
                  type="text"
                  placeholder="请输入18位身份证号"
                />
              </div>
              <div class="form-item">
                <div class="form-title">上传法人身份证</div>
                <div class="uploader-wrap">
                  <Uploader
                    :default-img="
                      merchantInfo.idCardFrontPhoto ||
                      require('./images/front.png')
                    "
                    @finish="uploadIdCardFrontPhoto"
                  />
                  <Uploader
                    :default-img="
                      merchantInfo.idCardBackPhoto ||
                      require('./images/behind.png')
                    "
                    @finish="uploadIdCardBackPhoto"
                  />
                </div>
              </div>
              <div class="form-item">
                <div class="form-title">请点击上传手持身份证照片</div>
                <div class="uploader-wrap">
                  <Uploader
                    title="手持身份证照片"
                    :default-img="merchantInfo.holdIdCardPhoto || ''"
                    @finish="uploadHoldIdCardPhoto"
                  />
                  <img class="photo" src="./images/person-example.png" alt="" />
                </div>
              </div>
            </template>
          </div>
          <div class="form-wrap" v-show="step === 2">
            <div class="title">银行信息</div>
            <div class="form-item">
              <div class="form-title">持卡人姓名</div>
              <input
                class="input"
                v-model="merchantInfo.bankCardOwnerName"
                type="text"
                placeholder="例：小明"
              />
            </div>
            <div class="form-item">
              <div class="form-title">银行账号</div>
              <input
                class="input"
                v-model="merchantInfo.bankCardNumber"
                type="tel"
                placeholder="例：622123456789012345"
              />
            </div>
            <div class="form-item">
              <div class="form-title">开户银行及支行名称</div>
              <input
                class="input"
                v-model="merchantInfo.bankName"
                type="text"
                placeholder="例：中国招商银行城西支行"
              />
            </div>
          </div>
          <div class="form-wrap" v-show="step === 3">
            <div class="title">店铺信息</div>
            <div class="form-item">
              <div class="form-title">店铺头像</div>
              <VantUploader
                v-model="merchantInfo.shopLogo"
                :after-read="uploadFile"
                style="margin-top: 0.32rem"
                max-count="1"
              />
            </div>
            <div class="form-item">
              <div class="form-title">店铺封面</div>
              <VantUploader
                v-model="merchantInfo.shopBg"
                :after-read="uploadFile"
                style="margin-top: 0.32rem"
                max-count="1"
              />
            </div>
            <div class="form-item">
              <div class="form-title">店铺名称</div>
              <input
                class="input"
                v-model="merchantInfo.shopName"
                type="text"
                placeholder="例：小明的店"
              />
            </div>
            <div class="form-item">
              <div class="form-title">店铺类型</div>
              <div
                class="picker"
                :class="{ active: pickedCategoryDesc }"
                @click="typePickerPopupVisible = true"
              >
                {{ pickedCategoryDesc || "请选择店铺类型" }}
              </div>
            </div>
          </div>
          <div class="btns">
            <div class="btn previous-step" @click="step = step - 1">上一步</div>
            <div class="btn next-step" @click="nextStep">
              {{ step === 3 ? "提交审核" : "下一步" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="status" v-else>
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
            :class="{ active: depositProtocolChecked }"
            @click="pay"
          >
            点击缴纳
          </div>
          <div class="protocol-tips">
            <Checkbox v-model="depositProtocolChecked" icon-size="16px" />
            <div style="margin-left: 0.1rem">
              我已阅读并同意
              <span style="color: #1b89fa" @click="checkDepositProtocol"
                >《小鱼游酒店商家保证金协议》</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <PickerPopup
    :visible="typePickerPopupVisible"
    :options="typeOptions.map((item) => ({ text: item.name, value: item.id }))"
    @confirm="typeConfirm"
    @cancel="typePickerPopupVisible = false"
  />
  <AreaPickerPopup
    :visible="areaPickerPopupVisible"
    @confirm="areaConfirm"
    @cancel="areaPickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { Checkbox, Uploader as VantUploader, showToast } from "vant";
import Uploader from "@/components/Uploader.vue";
import PickerPopup from "@/components/PickerPopup.vue";
import AreaPickerPopup from "@/components/AreaPickerPopup.vue";

import { ref, onMounted, reactive, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { uploadFile } from "@/utils/upload";
import {
  uploadMerchantInfo,
  getMerchantStatusInfo,
  getShopDepositPayParams,
  getMerchantInfo,
} from "./utils/api";

import type { Option } from "@/utils/type";
import type {
  CreateMerchantInfo,
  MerchantInfo,
  MerchantStatusInfo,
} from "./utils/type";

const router = useRouter();

const typeOptions = [
  { id: 1, name: "门店官方", deposit: 10000 },
  { id: 2, name: "专营店", deposit: 10000 },
];

const mounted = ref(false);
const step = ref(0);
const protocolChecked = ref(false);
const merchantInfo = reactive<MerchantInfo>({
  type: 1,
  companyName: "",
  businessLicensePhoto: "",
  hygienicLicensePhoto: "",
  regionDesc: "",
  regionCodeList: "",
  addressDetail: "",
  name: "",
  mobile: "",
  email: "",
  idCardNumber: "",
  idCardFrontPhoto: "",
  idCardBackPhoto: "",
  holdIdCardPhoto: "",
  bankCardOwnerName: "",
  bankCardNumber: "",
  bankName: "",
  shopType: 0,
  deposit: 0,
  shopBg: [],
  shopLogo: [],
  shopName: "",
});
const areaPickerPopupVisible = ref(false);
const typePickerPopupVisible = ref(false);
const pickedCategoryDesc = ref("");
const statusInfo = ref<MerchantStatusInfo | undefined>();
const depositProtocolChecked = ref(false);

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

const nextStep = () => {
  switch (step.value) {
    case 0:
      if (!protocolChecked.value) {
        showToast("请阅读并同意商家协议");
        return;
      }
      step.value = 1;
      break;

    case 1:
      if (merchantInfo.type === 1) {
        if (!merchantInfo.name) {
          showToast("请输入姓名");
          return;
        }
        if (
          !merchantInfo.idCardNumber ||
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
            merchantInfo.idCardNumber
          )
        ) {
          showToast("请输入正确身份证号");
          return;
        }
        if (!merchantInfo.idCardFrontPhoto) {
          showToast("请上传身份证正面照片");
          return;
        }
        if (!merchantInfo.idCardBackPhoto) {
          showToast("请上传身份证反面照片");
          return;
        }
        if (
          !merchantInfo.mobile ||
          !/^1[345789][0-9]{9}$/.test(merchantInfo.mobile)
        ) {
          showToast("请输入正确手机号");
          return;
        }
        if (
          !merchantInfo.email ||
          !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            merchantInfo.email
          )
        ) {
          showToast("请输入正确电子邮箱");
          return;
        }
        if (!merchantInfo.regionCodeList) {
          showToast("请选择省市区");
          return;
        }
        if (!merchantInfo.addressDetail) {
          showToast("请输入详细地址");
          return;
        }
      } else {
        if (!merchantInfo.companyName) {
          showToast("请输入企业名称");
          return;
        }
        if (!merchantInfo.regionCodeList) {
          showToast("请选择省市区");
          return;
        }
        if (!merchantInfo.addressDetail) {
          showToast("请输入详细地址");
          return;
        }
        if (!merchantInfo.businessLicensePhoto) {
          showToast("请上传营业执照照片");
          return;
        }
        if (!merchantInfo.name) {
          showToast("请输入法人姓名");
          return;
        }
        if (
          !merchantInfo.mobile ||
          !/^1[345789][0-9]{9}$/.test(merchantInfo.mobile)
        ) {
          showToast("请输入正确手机号");
          return;
        }
        if (
          !merchantInfo.email ||
          !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            merchantInfo.email
          )
        ) {
          showToast("请输入正确电子邮箱");
          return;
        }
        if (
          !merchantInfo.idCardNumber ||
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
            merchantInfo.idCardNumber
          )
        ) {
          showToast("请输入正确身份证号");
          return;
        }
        if (!merchantInfo.idCardFrontPhoto) {
          showToast("请上传身份证正面照片");
          return;
        }
        if (!merchantInfo.idCardBackPhoto) {
          showToast("请上传身份证反面照片");
          return;
        }
        if (!merchantInfo.holdIdCardPhoto) {
          showToast("请上传手持身份证照片");
          return;
        }
      }
      step.value = 2;
      break;

    case 2:
      if (!merchantInfo.bankCardOwnerName) {
        showToast("请输入持卡人姓名");
        return;
      }
      if (
        !merchantInfo.bankCardNumber ||
        !/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(merchantInfo.bankCardNumber)
      ) {
        showToast("请输入正确银行卡号");
        return;
      }
      if (!merchantInfo.bankName) {
        showToast("请输入开户银行及支行名称");
        return;
      }
      step.value = 3;
      break;

    case 3:
      if (!merchantInfo.shopLogo.length) {
        showToast("请上传店铺头像");
        return;
      }
      if (!merchantInfo.shopName) {
        showToast("请输入店铺名称");
        return;
      }
      if (!merchantInfo.shopType) {
        showToast("请选择店铺类型");
        return;
      }
      submit();
      break;
  }
};

const setStatusInfo = async () => {
  statusInfo.value = await getMerchantStatusInfo();
};

const setMerchantInfo = async () => {
  const { shopLogo, shopBg, shopType, ...rest } = await getMerchantInfo();
  pickedCategoryDesc.value =
    typeOptions.find((item) => item.id === shopType)?.name || "";
  Object.assign(merchantInfo, {
    shopLogo: [{ url: shopLogo }],
    shopBg: [{ url: shopBg }],
    shopType,
    ...rest,
  });
};

const submit = async () => {
  try {
    const { shopBg, shopLogo, ...rest } = merchantInfo;
    const createMerchantInfo: CreateMerchantInfo = {
      shopLogo: shopLogo[0].url as string,
      ...rest,
    };
    if (shopBg.length) {
      createMerchantInfo.shopBg = shopBg[0].url;
    }
    await uploadMerchantInfo(createMerchantInfo);
    setStatusInfo();
  } catch (error) {
    showToast("审核提交失败，请重试");
  }
};

const typeConfirm = ({
  selectedValues,
  selectedOptions,
}: {
  selectedValues: number[];
  selectedOptions: Option[];
}) => {
  const type = selectedValues[0];
  merchantInfo.shopType = type;
  merchantInfo.deposit =
    typeOptions.find((item) => item.id === type)?.deposit || 0;
  pickedCategoryDesc.value = selectedOptions[0].text;
  typePickerPopupVisible.value = false;
};

const areaConfirm = ({
  selectedValues,
  selectedOptions,
}: {
  selectedValues: string[];
  selectedOptions: Option[];
}) => {
  merchantInfo.regionCodeList = JSON.stringify(selectedValues);
  merchantInfo.regionDesc = `${selectedOptions[0].text} ${selectedOptions[1].text} ${selectedOptions[2].text}`;
  areaPickerPopupVisible.value = false;
};

const uploadIdCardFrontPhoto = (photo: string) => {
  merchantInfo.idCardFrontPhoto = photo;
};
const uploadIdCardBackPhoto = (photo: string) => {
  merchantInfo.idCardBackPhoto = photo;
};
const uploadHoldIdCardPhoto = (photo: string) => {
  merchantInfo.holdIdCardPhoto = photo;
};
const uploadBusinessLicensePhoto = (photo: string) => {
  merchantInfo.businessLicensePhoto = photo;
};
const uploadHygienicLicensePhoto = (photo: string) => {
  merchantInfo.hygienicLicensePhoto = photo;
};

const checkProtocol = () => router.push("/protocol/catering_merchant");
const checkDepositProtocol = () => router.push("/protocol/catering_deposit");

const pay = async () => {
  if (statusInfo.value) {
    const payParams = await getShopDepositPayParams(statusInfo.value.orderId);
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
  try {
    setMerchantInfo();
    statusInfo.value = undefined;
    step.value = 1;
  } catch (error) {
    showToast("操作失败请重试");
  }
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
    .protocol-tips {
      display: flex;
      justify-content: center;
      margin-top: 0.24rem;
      font-size: 0.24rem;
    }
  }
  .settle-in {
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
              border: 1px solid #1b89fa;
            }
            .icon {
              margin: 1rem 0;
              width: 1.2rem;
              height: 1.2rem;
              opacity: 0.8;
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
                color: #1b89fa;
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
                background: #1b89fa;
              }
            }
          }
        }
      }
      .main {
        position: relative;
        margin-top: 0.48rem;
        padding-bottom: 1.52rem;
        flex: 1;
        border-radius: 0.32rem 0.32rem 0 0;
        overflow: hidden;
        background: #fff;
        .form-wrap {
          padding: 0.32rem;
          height: 100%;
          overflow-y: scroll;
          .title {
            margin-bottom: 0.32rem;
            color: #333;
            font-size: 0.32rem;
            font-weight: 550;
            background: #fff;
          }
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
              background: #eaf6ff;
            }
            .input {
              width: 100%;
            }
            .picker {
              display: flex;
              align-items: center;
              color: #999;
              &.active {
                color: #333;
              }
            }
            .uploader-wrap {
              margin-top: 0.2rem;
              display: flex;
              justify-content: space-between;
              .photo,
              .default-img,
              .loading-wrap {
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
              .loading-wrap {
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.6);
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
            font-weight: 550;
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
