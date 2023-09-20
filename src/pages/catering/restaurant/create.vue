<template>
  <div class="container">
    <div class="title">上传视频及图片</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name flex required">
            <div>列表图片</div>
            <Popover
              v-model:show="imageTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">用于商品列表展示</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="restaurantInfo.cover"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
          />
        </li>
        <li class="form-item">
          <div class="name flex">
            <div>主图视频</div>
            <Popover
              v-model:show="videoTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">
                <p>时长：建议不超过60s</p>
                <p>大小：建议不超过50M</p>
                <p>尺寸：建议比例16:9或3:4</p>
                <p>格式：mp4</p>
                <p>内容：建议突出商品1-2个核心卖点</p>
              </div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="restaurantInfo.video"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
            accept="video/*"
          />
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>主图图片列表</div>
            <Popover
              v-model:show="imageListTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">数量：最多不超过10张</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="restaurantInfo.priceImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="10"
          />
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>详情图片列表</div>
            <Popover
              v-model:show="detailImageListTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">注意图片顺序</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="restaurantInfo.environmentImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>默认规格图片</div>
            <Popover
              v-model:show="defaultSpecImageTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">未设置或未选择规格时，展示的默认图片</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="restaurantInfo.priceImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
          />
        </li>
      </ul>
    </div>

    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">商品名称</div>
          <input
            class="input"
            v-model="restaurantInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">商品分类</div>
          <div class="picker" @click="categoryPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedCategoryName }">
              {{ selectedCategoryName || "请选择商品分类" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">店铺价格</div>
          <input
            class="input"
            v-model="restaurantInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入店铺价格"
          />
        </li>
      </ul>
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <Popup v-model:show="categoryPickerPopupVisible" position="bottom" round>
    <Picker
      :columns="categoryOptions"
      @confirm="selectCategory"
      @cancel="categoryPickerPopupVisible = false"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>
</template>

<script setup lang="ts">
import { Uploader, Icon, Popover, showToast, Popup, Picker } from "vant";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { uploadFile } from "@/utils/upload";
import { createRestaurant, getRestaurantCategoryOptions } from "./utils/api";

import type {
  RestaurantInfo,
  RestaurantCategoryOption,
  CreateRestaurantInfo,
} from "./utils/type";

const router = useRouter();

const categoryOptions = ref<RestaurantCategoryOption[]>([]);
const restaurantInfo = reactive<Omit<RestaurantInfo, "id">>({
  categoryId: undefined,
  name: "",
  price: undefined,
  logo: [],
  video: [],
  cover: [],
  foodImageList: [],
  environmentImageList: [],
  priceImageList: [],
  longitude: undefined,
  latitude: undefined,
  address: "",
  openTimeList: [],
  facilityList: [],
});
const categoryPickerPopupVisible = ref(false);
const imageTipsVisible = ref(false);
const videoTipsVisible = ref(false);
const imageListTipsVisible = ref(false);
const detailImageListTipsVisible = ref(false);
const defaultSpecImageTipsVisible = ref(false);

// 计算属性
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find((item) => item.id === restaurantInfo.categoryId)
      ?.name
);

onMounted(() => {
  setCategoryOptions();
});

const setCategoryOptions = async () =>
  (categoryOptions.value = await getRestaurantCategoryOptions());

const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  restaurantInfo.categoryId = selectedValues[0];
  categoryPickerPopupVisible.value = false;
};

const save = async () => {
  if (!restaurantInfo.cover.length) {
    showToast("请上传列表图片");
    return;
  }
  if (!restaurantInfo.foodImageList.length) {
    showToast("请上传至少一张主图图片");
    return;
  }
  if (!restaurantInfo.environmentImageList.length) {
    showToast("请上传至少一张详情图片");
    return;
  }
  if (!restaurantInfo.priceImageList.length) {
    showToast("请上传默认规格图片");
    return;
  }
  if (!restaurantInfo.name) {
    showToast("请输入商品名称");
    return;
  }
  if (!restaurantInfo.categoryId) {
    showToast("请选择商品分类");
    return;
  }
  if (!restaurantInfo.price) {
    showToast("请输入商品店铺价格");
    return;
  }
  const {
    logo,
    video,
    cover,
    foodImageList,
    environmentImageList,
    priceImageList,
    ...rest
  } = restaurantInfo;
  const createRestaurantInfo: CreateRestaurantInfo = {
    ...rest,
    logo: logo[0].url as string,
    cover: cover[0].url as string,
    foodImageList: JSON.stringify(foodImageList.map((item) => item.url)),
    environmentImageList: JSON.stringify(
      environmentImageList.map((item) => item.url)
    ),
    priceImageList: priceImageList[0].url as string,
  };
  if (video.length) createRestaurantInfo.video = video[0].url;
  try {
    await createRestaurant(createRestaurantInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
  }
};
</script>

<style>
.van-empty__description {
  font-size: 0.24rem;
}
.van-collapse-item__title {
  font-size: 0.26rem;
  font-weight: 500;
}
</style>
<style lang="scss" scoped>
.container {
  padding: 0.32rem 0.32rem 1.52rem;
  .title {
    margin-bottom: 0.32rem;
    color: #333;
    font-size: 0.3rem;
    font-weight: 550;
    line-height: 1;
    &.flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .card {
    margin-bottom: 0.32rem;
    padding: 0 0.32rem;
    background: #fff;
    border-radius: 0.32rem;
    overflow: hidden;
    .form {
      &.unit {
        padding: 0 0.32rem;
        border: 1px solid #eee;
        border-radius: 0.24rem;
      }
      .form-item {
        padding: 0.32rem 0;
        font-size: 0.26rem;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        &.flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .name {
          color: #333;
          font-weight: 500;
          line-height: 1;
          &.flex {
            display: flex;
            align-items: center;
            &.between {
              justify-content: space-between;
            }
          }
          &.required {
            position: relative;
            &::before {
              position: absolute;
              top: -0.06rem;
              left: -0.16rem;
              content: "*";
              color: #ee0d23;
              font-size: 0.24rem;
            }
          }
        }
        .input {
          margin-left: 0.2rem;
          color: #333;
          flex: 1;
          text-align: right;
        }
        .picker {
          display: flex;
          align-items: center;
          .content {
            color: #777;
            &.active {
              max-width: 3rem;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 1;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
        .sku-options {
          .sku-option {
            margin-top: 0.32rem;
            margin-right: 0.32rem;
          }
        }
      }
    }
  }
  .delete-btn {
    height: 100%;
    border: none;
    background-color: transparent;
  }
}
.upload-btn {
  position: fixed;
  left: 0.32rem;
  bottom: 0.32rem;
  width: calc(100vw - 0.64rem);
  height: 0.88rem;
  color: #fff;
  font-size: 0.3rem;
  font-weight: 550;
  border-radius: 0.18rem;
  background: #212121;
}
.warning {
  padding: 0.24rem;
  color: #fff;
  font-size: 0.24rem;
  line-height: 1.5;
  white-space: wrap;
}
.sku-option-input {
  margin: 0.32rem 0.32rem 0.5rem;
  padding: 0.24rem;
  width: calc(100% - 0.64rem);
  height: 0.88rem;
  font-size: 0.26rem;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
}
</style>
