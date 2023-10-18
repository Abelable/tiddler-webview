<template>
  <div
    class="status"
    :class="{
      ing: authInfo?.status === 0,
      done: authInfo?.status === 1,
      fail: authInfo?.status === 2,
    }"
    v-if="authInfo?.status"
  >
    {{
      authInfo?.status === 0
        ? "实名认证审核中"
        : authInfo?.status === 1
        ? "实名认证审核成功过"
        : "实名认证失败"
    }}
  </div>
  <div class="fail-reason" v-if="authInfo?.status === 2">
    <div>失败原因：</div>
    <div>{{ authInfo?.failureReason }}</div>
  </div>

  <div class="container">
    <div class="title">信息填写</div>
    <div class="form">
      <div class="form-item">
        <div class="label">真实姓名</div>
        <div
          class="input"
          v-if="authInfo && (authInfo?.status === 0 || authInfo?.status === 1)"
        >
          {{ authInfo?.name }}
        </div>
        <input
          class="input"
          v-if="
            !authInfo ||
            (authInfo && (!authInfo?.status || authInfo?.status === 2))
          "
          v-model="authInfo.name"
          placeholder="请输入真实姓名"
        />
      </div>
      <div class="form-item">
        <div class="label">身份证号</div>
        <div
          class="input"
          v-if="authInfo && (authInfo?.status === 0 || authInfo?.status === 1)"
        >
          {{ authInfo?.idCardNumber }}
        </div>
        <input
          class="input"
          v-if="
            !authInfo ||
            (authInfo && (!authInfo?.status || authInfo?.status === 2))
          "
          v-model="authInfo.idCardNumber"
          placeholder="请输入身份证号"
        />
      </div>
      <div class="form-item">
        <div class="label">手机号码</div>
        <div
          class="input"
          v-if="authInfo && (authInfo?.status === 0 || authInfo?.status === 1)"
        >
          {{ authInfo?.mobile }}
        </div>
        <input
          class="input"
          v-if="
            !authInfo ||
            (authInfo && (!authInfo?.status || authInfo?.status === 2))
          "
          v-model="authInfo.mobile"
          placeholder="请输入手机号码"
        />
      </div>
    </div>

    <div class="title">上传身份证照片</div>
    <div class="card">
      <div class="upload-wrap">
        <div class="upload">
          <div
            class="upload-bg"
            v-if="
              authInfo && (authInfo?.status === 0 || authInfo?.status === 1)
            "
            :style="`background: url(${authInfo?.idCardFrontPhoto} no-repeat center;`"
          ></div>
          <Uploader
            v-if="
              !authInfo ||
              (authInfo && (!authInfo?.status || authInfo?.status === 2))
            "
            width="3rem"
            height="2rem"
            :default-img="
              authInfo.idCardFrontPhoto ||
              'https://img.ubo.vip/youbo_plus/auth/front.png'
            "
            @finish="uploadIdCardFrontPhoto"
          />
          <div class="upload-desc">点击上传身份证正面</div>
        </div>
        <div class="upload">
          <div
            class="upload-bg"
            v-if="
              authInfo && (authInfo?.status === 0 || authInfo?.status === 1)
            "
            :style="`background: url(${authInfo?.idCardBackPhoto} no-repeat center;`"
          ></div>
          <Uploader
            v-if="
              !authInfo ||
              (authInfo && (!authInfo?.status || authInfo?.status === 2))
            "
            width="3rem"
            height="2rem"
            :default-img="
              authInfo.idCardBackPhoto ||
              'https://img.ubo.vip/youbo_plus/auth/backend.png'
            "
            @finish="uploadIdCardBackPhoto"
          />
          <div class="upload-desc">点击上传身份证反面</div>
        </div>
      </div>
    </div>

    <div class="title">上传手持身份证照片</div>
    <div class="card">
      <div class="upload-wrap">
        <div class="example">
          <img
            class="upload-bg"
            src="https://img.ubo.vip/youbo_plus/id-card-example.png"
          />
          <div class="example-tag">参考事例</div>
        </div>
        <div
          class="upload-bg"
          v-if="authInfo && (authInfo?.status === 0 || authInfo?.status === 1)"
          :style="`background: url(${authInfo?.holdIdCardPhoto} no-repeat center;`"
        ></div>
        <Uploader
          v-if="
            !authInfo ||
            (authInfo && (!authInfo?.status || authInfo?.status === 2))
          "
          width="3rem"
          height="2rem"
          :default-img="
            authInfo.holdIdCardPhoto ||
            'https://img.ubo.vip/youbo_plus/auth/id_card.png'
          "
          @finish="uploadHoldIdCardPhoto"
        />
      </div>
      <div class="card-tips">请保证照片中身份证信息清晰，漏出手臂。</div>
    </div>

    <div class="warning">温馨提示：小鱼游承诺所有信息严格保密</div>

    <div
      class="submit-btn"
      v-if="
        !authInfo || (authInfo && (!authInfo?.status || authInfo?.status === 2))
      "
      @click="submit"
    >
      提交审核
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuthInfo, addAuthInfo, editAuthInfo } from "./utils/api";
import { ref, onMounted } from "vue";
import { Toast, showLoadingToast, closeToast } from "vant";
import Uploader from "@/components/uploader.vue";

import type { AuthInfo } from "./utils/type";

const authInfo = ref<AuthInfo>({
  id: undefined,
  status: undefined,
  name: "",
  idCardNumber: "",
  mobile: "",
  idCardFrontPhoto: "",
  idCardBackPhoto: "",
  holdIdCardPhoto: "",
});

const uploadIdCardFrontPhoto = (photo: string) => {
  authInfo.value.idCardFrontPhoto = photo;
};
const uploadIdCardBackPhoto = (photo: string) => {
  authInfo.value.idCardBackPhoto = photo;
};
const uploadHoldIdCardPhoto = (photo: string) => {
  authInfo.value.holdIdCardPhoto = photo;
};

onMounted(() => {
  setAuthInfo();
});

const setAuthInfo = async () => {
  const info = await getAuthInfo();
  if (info) {
    authInfo.value = info;
  }
};

const submit = async () => {
  if (!authInfo.value.name) {
    Toast("姓名不能为空");
    return;
  }
  if (!authInfo.value.idCardNumber) {
    Toast("身份证号不能为空");
    return;
  }
  const mobile = authInfo.value.mobile;
  if (!mobile || (mobile && !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile))) {
    Toast("请输入正确手机号");
    return;
  }
  if (!authInfo.value.idCardFrontPhoto) {
    Toast("请上传身份证正面照片");
    return;
  }
  if (!authInfo.value.idCardBackPhoto) {
    Toast("请上传身份证反面照片");
    return;
  }
  if (!authInfo.value.holdIdCardPhoto) {
    Toast("请上传手持身份证照片");
    return;
  }

  showLoadingToast({
    message: "信息上传中...",
    duration: 0,
    forbidClick: true,
  });
  try {
    if (authInfo.value.status === 2) {
      await editAuthInfo(authInfo.value);
    } else {
      await addAuthInfo(authInfo.value);
    }
    await setAuthInfo();
    closeToast();
  } catch (error) {
    closeToast();
    if ((error as { message: string })?.message) {
      Toast((error as { message: string }).message);
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
  padding: 0 0.24rem 0.8rem;
}

.title {
  margin: 0.24rem 0 0.2rem;
  color: #333;
  font-size: 0.32rem;
}

.form {
  padding: 0 0.3rem;
  border-radius: 0.12rem;
  background: #fff;
}
.form-item {
  display: flex;
  align-items: center;
  height: 1rem;
  border-bottom: 1px solid #e8e8e8;
}
.form-item:last-child {
  border-bottom: none;
}
.label {
  color: #242424;
  font-size: 0.28rem;
}
.input {
  margin-left: 0.8rem;
  flex: 1;
  font-size: 0.28rem;
}

.card {
  padding: 0.3rem;
  border-radius: 0.12rem;
  background: #fff;
}

.upload-wrap {
  display: flex;
  justify-content: space-between;
  font-size: 0;
}
.upload {
  text-align: center;
}
.upload-bg {
  width: 3rem;
  height: 2rem;
  background-size: cover;
}
.upload-desc {
  margin-top: 0.16rem;
  color: #242424;
  font-size: 0.28rem;
}

.example {
  position: relative;
  width: 3.3rem;
  height: 2.14rem;
  font-size: 0;
  border-radius: 5px;
  overflow: hidden;
}
.example-tag {
  position: absolute;
  left: 0;
  top: 0.16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 0.38rem;
  color: #333;
  font-size: 0.24rem;
  background: #fdcc87;
  border-radius: 0 0.2rem 0.2rem 0;
}

.card-tips {
  margin-top: 0.2rem;
  color: #999;
  font-size: 0.24rem;
}

.warning {
  margin-top: 0.24rem;
  color: #ba9243;
  font-size: 0.28rem;
  text-align: center;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem auto 0;
  width: 6rem;
  height: 0.88rem;
  color: #ffe5bd;
  font-size: 0.32rem;
  font-weight: 500;
  background: linear-gradient(128deg, #404a5c 0%, #0f131a 100%);
  border-radius: 0.44rem;
}
</style>
