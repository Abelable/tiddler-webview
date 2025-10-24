<template>
  <div class="settle-in">
    <div class="information-filling">
      <div class="header">
        <div class="title">信息填写</div>
        <div class="sub-title">真实有效的信息有助于您快速通过审核</div>
        <div class="steps">
          <div
            class="step"
            v-for="(item, index) in [
              merchantInfo.type === 2 ? '填写个体信息' : '填写企业信息',
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
          <template v-if="merchantInfo.type === 2">
            <div class="title">个体工商户信息</div>
            <div class="form-item">
              <div class="form-title">上传经营者身份证</div>
              <div class="uploader-wrap">
                <Uploader
                  :default-img="
                    merchantInfo.idCardFrontPhoto ||
                    require('@/assets/images/merchant/front.png')
                  "
                  @finish="uploadIdCardFrontPhoto"
                />
                <Uploader
                  :default-img="
                    merchantInfo.idCardBackPhoto ||
                    require('@/assets/images/merchant/behind.png')
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
                <img
                  class="photo"
                  src="@/assets/images/merchant/person-example.png"
                  alt=""
                />
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
                    require('@/assets/images/merchant/front.png')
                  "
                  @finish="uploadIdCardFrontPhoto"
                />
                <Uploader
                  :default-img="
                    merchantInfo.idCardBackPhoto ||
                    require('@/assets/images/merchant/behind.png')
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
                <img
                  class="photo"
                  src="@/assets/images/merchant/person-example.png"
                  alt=""
                />
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
          <div class="btn previous-step" @click="back">上一步</div>
          <div class="btn next-step" @click="next">
            {{ step === 3 ? "提交审核" : "下一步" }}
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
import { Uploader as VantUploader, showToast } from "vant";
import Uploader from "@/components/Uploader.vue";
import PickerPopup from "@/components/PickerPopup.vue";
import AreaPickerPopup from "@/components/AreaPickerPopup.vue";

import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { uploadFile } from "@/utils/upload";
import { uploadMerchantInfo, getMerchantInfo } from "./utils/api";

import type { Option } from "@/utils/type";
import type { CreateMerchantInfo, MerchantInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const typeOptions = [
  { id: 1, name: "门店官方", deposit: 10000 },
  { id: 2, name: "专营店", deposit: 10000 },
];

const inviterId = ref<number | undefined>();
const taskId = ref<number | undefined>();

const step = ref(1);
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

onMounted(() => {
  inviterId.value = route.query.inviter_id
    ? +route.query.inviter_id
    : undefined;
  taskId.value = route.query.task_id ? +route.query.task_id : undefined;

  const type = +(route.query.type as string);
  if (type) {
    merchantInfo.type = type;
  } else {
    setMerchantInfo();
  }
});

const back = () => {
  if (step.value > 1) {
    step.value = step.value - 1;
  } else {
    window.wx.miniProgram.navigateBack();
  }
};

const next = () => {
  switch (step.value) {
    case 1:
      if (merchantInfo.type === 2) {
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
          !/^1[3-9]\d{9}$/.test(merchantInfo.mobile)
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
          !/^1[3-9]\d{9}$/.test(merchantInfo.mobile)
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

const setMerchantInfo = async () => {
  const info = await getMerchantInfo();
  if (info) {
    const { shopLogo, shopBg, shopType, ...rest } = info;
    pickedCategoryDesc.value =
      typeOptions.find((item) => item.id === shopType)?.name || "";
    Object.assign(merchantInfo, {
      shopLogo: [{ url: shopLogo }],
      shopBg: [{ url: shopBg }],
      shopType,
      ...rest,
    });
  }
};

const submit = async () => {
  try {
    const { shopBg, shopLogo, ...rest } = merchantInfo;
    const createMerchantInfo: CreateMerchantInfo = {
      shopLogo: shopLogo[0].url as string,
      ...rest,
      inviterId: inviterId.value,
      taskId: taskId.value,
    };
    if (shopBg.length) {
      createMerchantInfo.shopBg = shopBg[0].url;
    }
    await uploadMerchantInfo(createMerchantInfo);
    router.push("/catering/merchant/settle_status");
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
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.88rem;
  font-size: 0.3rem;
  font-weight: 550;
  border-radius: 0.18rem;
}
.settle-in {
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
</style>
