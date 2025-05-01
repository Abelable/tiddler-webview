<template>
  <div
    class="status"
    :class="{
      ing: enterpriseInfo?.status === 0,
      done: enterpriseInfo?.status === 1,
      fail: enterpriseInfo?.status === 2,
    }"
    v-if="enterpriseInfo?.status !== undefined"
  >
    {{
      enterpriseInfo?.status === 0
        ? "企业认证审核中"
        : enterpriseInfo?.status === 1
        ? "企业认证审核成功过"
        : "企业认证失败"
    }}
  </div>
  <div class="fail-reason" v-if="enterpriseInfo?.status === 2">
    <div>失败原因：</div>
    <div>{{ enterpriseInfo?.failureReason }}</div>
  </div>
  <div class="container">
    <div class="title">成为乡村振兴服务商</div>
    <div class="form">
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">姓名：</div>
          <div
            class="form-input"
            v-if="enterpriseInfo?.status === 0 || enterpriseInfo?.status === 1"
          >
            {{ enterpriseInfo?.name }}
          </div>
          <input
            class="form-input"
            v-if="
              enterpriseInfo?.status === undefined ||
              enterpriseInfo?.status === 2
            "
            v-model="enterpriseInfo.name"
            placeholder="请输入姓名"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">银行名称：</div>
          <div
            class="form-input"
            v-if="enterpriseInfo?.status === 0 || enterpriseInfo?.status === 1"
          >
            {{ enterpriseInfo?.bankName }}
          </div>
          <input
            class="form-input"
            v-if="
              enterpriseInfo?.status === undefined ||
              enterpriseInfo?.status === 2
            "
            v-model="enterpriseInfo.bankName"
            placeholder="请输入银行名称"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">银行卡号：</div>
          <div
            class="form-input"
            v-if="enterpriseInfo?.status === 0 || enterpriseInfo?.status === 1"
          >
            {{ enterpriseInfo?.bankCardCode }}
          </div>
          <input
            class="form-input"
            v-if="
              enterpriseInfo?.status === undefined ||
              enterpriseInfo?.status === 2
            "
            v-model="enterpriseInfo.bankCardCode"
            placeholder="请输入银行卡号"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">银行地址：</div>
          <div
            class="form-input"
            v-if="enterpriseInfo?.status === 0 || enterpriseInfo?.status === 1"
          >
            {{ enterpriseInfo?.bankAddress }}
          </div>
          <input
            class="form-input"
            v-if="
              enterpriseInfo?.status === undefined ||
              enterpriseInfo?.status === 2
            "
            v-model="enterpriseInfo.bankAddress"
            placeholder="请输入银行地址"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-label" style="margin-bottom: 0.2rem">
          请上传营业执照
        </div>
        <img
          class="photo"
          v-if="enterpriseInfo?.status === 0 || enterpriseInfo?.status === 1"
          :src="enterpriseInfo?.businessLicensePhoto"
          alt=""
        />
        <Uploader
          v-if="
            enterpriseInfo?.status === undefined || enterpriseInfo?.status === 2
          "
          width="2.4rem"
          height="1.6rem"
          @finish="uploadBusinessLicense"
        />
        <div class="form-label" style="margin: 0.2rem 0">请上传法人信息</div>
        <div class="uploader-wrap">
          <img
            class="photo"
            v-if="enterpriseInfo?.status === 0 || enterpriseInfo?.status === 1"
            :src="enterpriseInfo?.idCardFrontPhoto"
            alt=""
          />
          <Uploader
            v-if="
              enterpriseInfo?.status === undefined ||
              enterpriseInfo?.status === 2
            "
            width="2.4rem"
            height="1.6rem"
            title="法人身份证正面"
            @finish="uploadIdCardFront"
          />
          <img
            class="photo"
            v-if="enterpriseInfo?.status === 0 || enterpriseInfo?.status === 1"
            :src="enterpriseInfo?.idCardBackPhoto"
            alt=""
          />
          <Uploader
            v-if="
              enterpriseInfo?.status === undefined ||
              enterpriseInfo?.status === 2
            "
            width="2.4rem"
            height="1.6rem"
            title="法人身份证反面"
            @finish="uploadIdCardBack"
          />
        </div>
      </div>
      <div
        class="submit-btn"
        v-if="
          enterpriseInfo?.status === undefined || enterpriseInfo?.status === 2
        "
        :class="{ active: btnActive }"
        @click="submit"
      >
        提交
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Uploader from "@/components/Uploader.vue";
import { closeToast, showLoadingToast, showToast } from "vant";
import { computed, onMounted, reactive } from "vue";

import type { EnterpriseInfo } from "./utils/type";
import {
  addEnterpriseInfo,
  editEnterpriseInfo,
  getEnterpriseInfo,
} from "./utils/api";

const enterpriseInfo = reactive<EnterpriseInfo>({
  id: undefined,
  status: undefined,
  failureReason: "",
  name: "",
  bankName: "",
  bankCardCode: "",
  bankAddress: "",
  businessLicensePhoto: "",
  idCardFrontPhoto: "",
  idCardBackPhoto: "",
});

const btnActive = computed(() => {
  const {
    name,
    bankName,
    bankCardCode,
    bankAddress,
    businessLicensePhoto,
    idCardFrontPhoto,
    idCardBackPhoto,
  } = enterpriseInfo;
  return (
    name &&
    bankName &&
    bankCardCode &&
    bankAddress &&
    businessLicensePhoto &&
    idCardFrontPhoto &&
    idCardBackPhoto
  );
});

onMounted(() => {
  setEnterpriseInfo();
});

const setEnterpriseInfo = async () => {
  const {
    id,
    status,
    failureReason,
    name,
    bankName,
    bankCardCode,
    bankAddress,
    businessLicensePhoto,
    idCardFrontPhoto,
    idCardBackPhoto,
  } = (await getEnterpriseInfo()) || {};
  if (id) {
    enterpriseInfo.id = id;
    enterpriseInfo.status = status;
    enterpriseInfo.failureReason = failureReason;
    enterpriseInfo.name = name;
    enterpriseInfo.bankName = bankName;
    enterpriseInfo.bankCardCode = bankCardCode;
    enterpriseInfo.bankAddress = bankAddress;
    enterpriseInfo.businessLicensePhoto = businessLicensePhoto;
    enterpriseInfo.idCardFrontPhoto = idCardFrontPhoto;
    enterpriseInfo.idCardBackPhoto = idCardBackPhoto;
  }
};

const uploadBusinessLicense = (photo: string) => {
  enterpriseInfo.businessLicensePhoto = photo;
};
const uploadIdCardFront = (photo: string) => {
  enterpriseInfo.idCardFrontPhoto = photo;
};
const uploadIdCardBack = (photo: string) => {
  enterpriseInfo.idCardBackPhoto = photo;
};

const submit = async () => {
  const {
    name,
    bankName,
    bankCardCode,
    bankAddress,
    businessLicensePhoto,
    idCardFrontPhoto,
    idCardBackPhoto,
  } = enterpriseInfo;
  if (!name) {
    showToast("请输入姓名");
    return;
  }
  if (!bankName) {
    showToast("请输入银行名称");
    return;
  }
  if (!bankCardCode) {
    showToast("请输入银行卡号");
    return;
  }
  if (!bankAddress) {
    showToast("请输入银行地址");
    return;
  }
  if (!businessLicensePhoto) {
    showToast("请上传营业执照");
    return;
  }
  if (!idCardFrontPhoto) {
    showToast("请上传正面身份证照片");
    return;
  }
  if (!idCardBackPhoto) {
    showToast("请上传反面身份证照片");
    return;
  }

  showLoadingToast({
    message: "信息上传中...",
    duration: 0,
    forbidClick: true,
  });
  try {
    if (enterpriseInfo.status === 2) {
      await editEnterpriseInfo(enterpriseInfo);
    } else {
      await addEnterpriseInfo(enterpriseInfo);
    }
    await setEnterpriseInfo();
    closeToast();
  } catch (error) {
    closeToast();
    if ((error as { message: string })?.message) {
      showToast((error as { message: string }).message);
    }
  }
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.88rem;
  color: #fff;
  font-size: 0.3rem;
  &.ing {
    background: #ff7548;
  }
  &.done {
    background: #6ed29b;
  }
  &.fail {
    background: #fb6155;
  }
}
.fail-reason {
  padding: 0.24rem;
  color: #fb6155;
  font-size: 0.3rem;
}
.container {
  padding-bottom: 0.6rem;
  min-height: 100vh;
  background-image: url("./images/certification_bg.png");
  background-size: 100% calc(100% + 1.2rem);
  background-position: 0 -1.2rem;
  background-repeat: no-repeat;
  overflow: hidden;
  .title {
    margin-top: 2rem;
    color: #633800;
    font-size: 0.44rem;
    text-align: center;
  }
  .form {
    margin: 0.68rem auto 0;
    padding: 0.32rem;
    width: 6.46rem;
    background: #fff;
    border-radius: 0.24rem;
    .form-item {
      margin-bottom: 0.16rem;
      padding: 0.32rem;
      background: #f8f8f8;
      border-radius: 0.24rem;
      .form-label {
        color: #14191f;
        font-size: 0.24rem;
      }
      .form-input-wrap {
        display: flex;
        align-items: center;
        .form-input {
          flex: 1;
          font-size: 0.24rem;
        }
      }
      .photo {
        width: 2.4rem;
        height: 1.6rem;
        border-radius: 0.24rem;
      }
      .uploader-wrap {
        display: flex;
        justify-content: space-between;
      }
    }
    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.94rem;
      color: #fff;
      font-size: 0.36rem;
      background: #ff7621;
      border-radius: 0.47rem;
      opacity: 0.5;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
