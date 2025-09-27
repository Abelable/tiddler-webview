<template>
  <div class="container" v-if="mounted">
    <div class="settle-in" v-if="!statusInfo">
      <div class="home" v-if="step === 0">
        <div class="header">
          <div class="title">
            <p>入驻<span style="color: #00b2ff">小鱼游</span></p>
            <p>收入<span style="color: #e4b785">节节高</span></p>
          </div>
          <img
            class="illus"
            src="@/assets/images/merchant/trip_illus.png"
            alt=""
          />
        </div>
        <div class="main">
          <div class="title">
            <img
              class="icon"
              src="@/assets/images/merchant/title_decoration_left.png"
              alt=""
            />
            <div>景区商家入驻流程</div>
            <img
              class="icon"
              src="@/assets/images/merchant/title_decoration_right.png"
              alt=""
            />
          </div>
          <div class="course">
            <div class="step">
              <div class="index">1</div>
              <div>材料准备</div>
            </div>
            <div class="content">
              <div class="desc">证照需拍摄原件或复印件盖章，且在有效期内</div>
              <div class="material-list">
                <div class="material-item">
                  <div class="info">
                    <div class="name">营业执照</div>
                    <div class="desc">企业执照或个体户执照</div>
                  </div>
                  <img
                    class="material"
                    src="@/assets/images/merchant/business_license.webp"
                    alt=""
                  />
                </div>
                <div class="material-item">
                  <div class="info">
                    <div class="name">行业资质</div>
                    <div class="desc">部分行业需要，按行业补充</div>
                  </div>
                  <img
                    class="material"
                    src="@/assets/images/merchant/industry_qualification.webp"
                    alt=""
                  />
                </div>
                <div class="material-item">
                  <div class="info">
                    <div class="name">法人或经营者证件</div>
                    <div class="desc">身份证或护照等</div>
                  </div>
                  <img
                    class="material"
                    src="@/assets/images/merchant/id_card.webp"
                    alt=""
                  />
                </div>
                <div class="material-item">
                  <div class="info">
                    <div class="name">银行账户信息</div>
                    <div class="desc">企业对公银行开户信息</div>
                  </div>
                  <img
                    class="material"
                    src="@/assets/images/merchant/bank_card.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="step">
              <div class="index">2</div>
              <div>景区认领</div>
            </div>
            <div class="content">
              <div class="desc">提交资质信息，认领景区</div>
            </div>
          </div>
          <div
            class="btn confirm"
            :class="{ active: protocolChecked }"
            @click="nextStep"
          >
            立即入驻
          </div>
          <div class="protocol-tips">
            <Checkbox v-model="protocolChecked" icon-size="16px" />
            <div style="margin-left: 0.1rem">
              阅读并同意
              <span style="color: #00b2ff" @click="checkProtocol"
                >《小鱼游景区商家服务协议》</span
              >
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
                '填写公司信息',
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
            <div class="title">公司信息</div>
            <div class="form-item">
              <div class="form-title">公司名称</div>
              <input
                class="input"
                v-model="merchantInfo.companyName"
                type="text"
                placeholder="请输入公司名称"
              />
            </div>
            <div class="form-item">
              <div class="form-title">公司经营地址</div>
              <div
                class="picker"
                :class="{ active: merchantInfo.regionDesc }"
                @click="areaPickerPopupVisible = true"
              >
                {{ merchantInfo.regionDesc || "请选择省、市、区" }}
              </div>
            </div>
            <div class="form-item">
              <div class="form-title">公司地址详情</div>
              <input
                class="input"
                v-model="merchantInfo.addressDetail"
                type="text"
                placeholder="请输入详细地址"
              />
            </div>
            <div class="form-item">
              <div class="form-title">请点击上传公司营业执照照片</div>
              <div class="uploader-wrap">
                <Uploader
                  max-count="1"
                  :after-read="uploadBusinessLicensePhoto"
                >
                  <img
                    class="photo"
                    v-if="
                      !uploadBusinessLicensePhotoLoading &&
                      merchantInfo.businessLicensePhoto
                    "
                    :src="merchantInfo.businessLicensePhoto"
                    alt=""
                  />
                  <div
                    class="default-img"
                    v-if="
                      !uploadBusinessLicensePhotoLoading &&
                      !merchantInfo.businessLicensePhoto
                    "
                  >
                    <div class="img-wrap">
                      <img
                        style="width: 0.5rem; height: 0.5rem"
                        src="@/assets/images/merchant/camera.png"
                        alt=""
                      />
                    </div>
                    <div class="desc">营业执照照片</div>
                  </div>
                  <div
                    class="loading-wrap"
                    v-if="uploadBusinessLicensePhotoLoading"
                  >
                    <Loading vertical color="#fff">上传中...</Loading>
                  </div>
                </Uploader>
                <img
                  class="photo"
                  src="@/assets/images/merchant/enterprise-example.png"
                  alt=""
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
              <div class="form-title">请点击上传身份证正反面照片</div>
              <div class="uploader-wrap">
                <Uploader max-count="1" :after-read="uploadIdCardFrontPhoto">
                  <img
                    class="photo"
                    v-if="!uploadIdCardFrontPhotoLoading"
                    :src="
                      merchantInfo.idCardFrontPhoto ||
                      require('@/assets/images/merchant/front.png')
                    "
                    alt=""
                  />
                  <div
                    class="loading-wrap"
                    v-if="uploadIdCardFrontPhotoLoading"
                  >
                    <Loading vertical color="#fff">上传中...</Loading>
                  </div>
                </Uploader>
                <Uploader max-count="1" :after-read="uploadIdCardBackPhoto">
                  <img
                    class="photo"
                    v-if="!uploadIdCardBackPhotoLoading"
                    :src="
                      merchantInfo.idCardBackPhoto ||
                      require('@/assets/images/merchant/behind.png')
                    "
                    alt=""
                  />
                  <div class="loading-wrap" v-if="uploadIdCardBackPhotoLoading">
                    <Loading vertical color="#fff">上传中...</Loading>
                  </div>
                </Uploader>
              </div>
            </div>
            <div class="form-item">
              <div class="form-title">请点击上传手持身份证照片</div>
              <div class="uploader-wrap">
                <Uploader max-count="1" :after-read="uploadHoldIdCardPhoto">
                  <img
                    class="photo"
                    v-if="
                      !uploadHoldIdCardPhotoLoading &&
                      merchantInfo.holdIdCardPhoto
                    "
                    :src="merchantInfo.holdIdCardPhoto"
                    alt=""
                  />
                  <div
                    class="default-img"
                    v-if="
                      !uploadHoldIdCardPhotoLoading &&
                      !merchantInfo.holdIdCardPhoto
                    "
                  >
                    <div class="img-wrap">
                      <img
                        style="width: 0.5rem; height: 0.5rem"
                        src="@/assets/images/merchant/camera.png"
                        alt=""
                      />
                    </div>
                    <div class="desc">手持身份证照片</div>
                  </div>
                  <div class="loading-wrap" v-if="uploadHoldIdCardPhotoLoading">
                    <Loading vertical color="#fff">上传中...</Loading>
                  </div>
                </Uploader>
                <img
                  class="photo"
                  src="@/assets/images/merchant/person-example.png"
                  alt=""
                />
              </div>
            </div>
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
              <div class="form-title">店铺封面</div>
              <Uploader
                v-model="merchantInfo.shopBg"
                :after-read="uploadFile"
                style="margin-top: 0.32rem"
                max-count="1"
              />
            </div>
            <div class="form-item">
              <div class="form-title">店铺头像</div>
              <Uploader
                v-model="merchantInfo.shopLogo"
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
                placeholder="请输入店铺名称"
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
              阅读并同意
              <span style="color: #00b2ff" @click="checkDepositProtocol"
                >《小鱼游景区商家保证金协议》</span
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
import { Checkbox, Uploader, Loading, showToast } from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import AreaPickerPopup from "@/components/AreaPickerPopup.vue";

import { ref, onMounted, reactive, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { upload, uploadFile } from "@/utils/upload";
import {
  uploadMerchantInfo,
  getMerchantStatusInfo,
  getShopDepositPayParams,
  getMerchantInfo,
} from "./utils/api";

import type { UploaderAfterRead } from "vant/lib/uploader/types";
import type { Option } from "@/utils/type";
import type {
  MerchantInfo,
  MerchantStatusInfo,
  CreateMerchantInfo,
} from "./utils/type";

const router = useRouter();

const typeOptions = [
  { id: 1, name: "景区官方", deposit: 10000 },
  { id: 2, name: "旅行社", deposit: 10000 },
];
const mounted = ref(false);
const step = ref(0);
const protocolChecked = ref(false);
const merchantInfo = reactive<MerchantInfo>({
  companyName: "",
  businessLicensePhoto: "",
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
const uploadIdCardFrontPhotoLoading = ref(false);
const uploadIdCardBackPhotoLoading = ref(false);
const uploadHoldIdCardPhotoLoading = ref(false);
const uploadBusinessLicensePhotoLoading = ref(false);
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
      if (!merchantInfo.companyName) {
        showToast("请输入公司名称");
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
    const { shopLogo, shopBg, ...rest } = merchantInfo;
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

const uploadIdCardFrontPhoto = (async ({ file }: { file: File }) => {
  uploadIdCardFrontPhotoLoading.value = true;
  merchantInfo.idCardFrontPhoto = await upload(file);
  uploadIdCardFrontPhotoLoading.value = false;
}) as UploaderAfterRead;
const uploadIdCardBackPhoto = (async ({ file }: { file: File }) => {
  uploadIdCardBackPhotoLoading.value = true;
  merchantInfo.idCardBackPhoto = await upload(file);
  uploadIdCardBackPhotoLoading.value = false;
}) as UploaderAfterRead;
const uploadHoldIdCardPhoto = (async ({ file }: { file: File }) => {
  uploadHoldIdCardPhotoLoading.value = true;
  merchantInfo.holdIdCardPhoto = await upload(file);
  uploadHoldIdCardPhotoLoading.value = false;
}) as UploaderAfterRead;
const uploadBusinessLicensePhoto = (async ({ file }: { file: File }) => {
  uploadBusinessLicensePhotoLoading.value = true;
  merchantInfo.businessLicensePhoto = await upload(file);
  uploadBusinessLicensePhotoLoading.value = false;
}) as UploaderAfterRead;

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

const checkProtocol = () => router.push("/protocol/scenic_merchant");
const checkDepositProtocol = () => router.push("/protocol/scenic_deposit");

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

const reApply = () => {
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
      position: relative;
      height: 100vh;
      background-color: #f4f8fe;
      background-image: url("@/assets/images/merchant/bg.webp");
      background-size: 100% 5.5rem;
      background-repeat: no-repeat;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.68rem;
        padding-right: 0.32rem;
        .title {
          color: #141925;
          font-size: 0.58rem;
          font-weight: bolder;
        }
        .illus {
          width: 3rem;
          height: 3rem;
        }
      }
      .main {
        display: flex;
        flex-direction: column;
        padding: 0.32rem;
        padding-bottom: 0.64rem;
        height: calc(100vh - 3rem);
        background: #fff;
        border-radius: 0.4rem 0.4rem 0 0;
        .title {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #141925;
          font-size: 0.36rem;
          font-weight: bold;
          .icon {
            margin: 0 0.12rem;
            width: 0.4rem;
            height: 0.16rem;
          }
        }
        .course {
          margin-top: 0.32rem;
          flex: 1;
          overflow-y: scroll;
          .step {
            display: flex;
            align-items: center;
            color: #141925;
            font-size: 0.32rem;
            font-weight: bold;
            .index {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0.2rem;
              width: 0.36rem;
              height: 0.36rem;
              color: #fff;
              font-size: 0.24rem;
              background: linear-gradient(135deg, #76dcff 0%, #05a8ff 100%);
              border-radius: 50%;
            }
          }
          .content {
            margin: 0.08rem 0 0.48rem;
            padding-left: 0.56rem;
            .desc {
              color: #999;
              font-size: 0.26rem;
            }
            .material-list {
              margin-top: 0.48rem;
              .material-item {
                display: flex;
                align-items: center;
                margin-bottom: 0.24rem;
                padding: 0.24rem;
                background: #f5f6f8;
                border-radius: 0.24rem;
                .info {
                  flex: 1;
                  .name {
                    color: #333;
                    font-size: 0.28rem;
                    font-weight: bold;
                  }
                  .desc {
                    margin-top: 0.08rem;
                    color: #999;
                    font-size: 0.26rem;
                  }
                }
                .material {
                  width: 1.5rem;
                  height: 1rem;
                  border-radius: 0.08rem;
                }
              }
            }
          }
        }
        .confirm {
          margin-top: 0.32rem;
          height: 1rem;
          color: #fff;
          background: #e6e6e6;
          border-radius: 0.32rem;
          &.active {
            background: #00b2ff;
          }
        }
        .protocol-tips {
          display: flex;
          justify-content: center;
          margin-top: 0.36rem;
          color: #999;
          font-size: 0.24rem;
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
                color: #00b2ff;
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
                background: #00b2ff;
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
