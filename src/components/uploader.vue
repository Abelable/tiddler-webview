<template>
  <Uploader :max-count="maxCount" :after-read="uploadPhoto">
    <img
      class="photo"
      v-if="defaultImg ? !loading : !loading && photo"
      :src="photo || defaultImg"
      alt=""
    />
    <div class="default-img" v-if="!defaultImg && !loading && !photo">
      <div class="img-wrap">
        <img
          style="width: 0.5rem; height: 0.5rem"
          :src="require(`@/assets/images/camera.png`)"
          alt=""
        />
      </div>
      <div class="desc">{{ title }}</div>
    </div>
    <div class="loading-wrap" v-if="loading">
      <Loading vertical color="#fff">上传中...</Loading>
    </div>
  </Uploader>
</template>

<script setup lang="ts">
import { Uploader, Loading } from "vant";
import { ref } from "vue";
import { upload } from "@/utils/upload";
import type { UploaderAfterRead } from "vant/lib/uploader/types";

withDefaults(
  defineProps<{
    maxCount?: number;
    title?: string;
    defaultImg?: string;
  }>(),
  { maxCount: 1 }
);

const emit = defineEmits(["finish"]);

const loading = ref(false);
const photo = ref("");

const uploadPhoto = (async ({ file }: { file: File }) => {
  loading.value = true;
  photo.value = await upload(file);
  loading.value = false;

  emit("finish", photo.value);
}) as UploaderAfterRead;
</script>

<style lang="scss" scoped>
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
</style>
