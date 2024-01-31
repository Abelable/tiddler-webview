<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">酒店名称</div>
          <input
            class="input"
            v-model="hotelInfo.name"
            type="text"
            placeholder="请输入酒店名称"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">酒店英文名称</div>
          <input
            class="input"
            v-model="hotelInfo.name"
            type="text"
            placeholder="请输入酒店英文名称"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">酒店档次</div>
          <div class="picker" @click="gradePickerPopupVisible = true">
            <div class="content" :class="{ active: selectedGradeName }">
              {{ selectedGradeName || "请选择酒店档次" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">酒店分类</div>
          <div class="picker" @click="categoryPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedCategoryName }">
              {{ selectedCategoryName || "请选择酒店分类" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">房间最低价格</div>
          <input
            class="input"
            v-model="hotelInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入房间最低价格"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">开业年份</div>
          <input
            class="input"
            v-model="hotelInfo.openingYear"
            type="number"
            placeholder="请输入开业年份"
          />
        </li>
        <li class="form-item flex">
          <div class="name">装修年份</div>
          <input
            class="input"
            v-model="hotelInfo.lastDecorationYear"
            type="number"
            placeholder="请输入装修年份"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">房间数量</div>
          <input
            class="input"
            v-model="hotelInfo.roomNum"
            type="number"
            placeholder="请输入房间数量"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">联系电话</div>
          <input
            class="input"
            v-model="hotelInfo.tel"
            type="tel"
            placeholder="请输入联系电话"
          />
        </li>
        <li class="form-item">
          <div class="name required">特色标签</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.featureTagList"
              title="特色标签"
              @addTag="addFeatureTag"
              @deleteTag="deleteFeatureTag"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">酒店简介</div>
          <textarea
            class="textarea"
            v-model="hotelInfo.brief"
            placeholder="请输入酒店简介"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">经纬度</div>
          <div class="picker" @click="mapPopupVisible = true">
            <div class="content" :class="{ active: hotelInfo.longitude }">
              {{
                hotelInfo.longitude
                  ? `${hotelInfo.longitude},${hotelInfo.latitude}`
                  : "打开地图选择"
              }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">具体地址</div>
          <input
            class="input"
            v-model="hotelInfo.address"
            type="text"
            placeholder="请输入酒店具体地址"
          />
        </li>
      </ul>
    </div>

    <div class="title">上传视频及照片</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name flex">
            <div>酒店视频</div>
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
                <p>内容：建议突出酒店1-2个核心卖点</p>
              </div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="hotelInfo.video"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
            accept="video/*"
          />
        </li>
        <li class="form-item">
          <div class="name flex">
            <div>酒店封面照片</div>
            <Popover
              v-model:show="imageListTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">图片大小不能超过10M</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="hotelInfo.cover"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
          />
        </li>
        <li class="form-item">
          <div class="name">酒店外观照片</div>
          <Uploader
            v-model="hotelInfo.appearanceImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name">酒店内景照片</div>
          <Uploader
            v-model="hotelInfo.interiorImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name">酒店房间照片</div>
          <Uploader
            v-model="hotelInfo.roomImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name">酒店餐厅照片</div>
          <Uploader
            v-model="hotelInfo.restaurantImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name">酒店环境照片</div>
          <Uploader
            v-model="hotelInfo.environmentImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
      </ul>
    </div>

    <div class="title">酒店设施</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name">娱乐设施</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.recreationFacility"
              title="娱乐设施"
              @addTag="addRecreationFacility"
              @deleteTag="deleteRecreationFacility"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">康体设施</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.healthFacility"
              title="康体设施"
              @addTag="addHealthFacility"
              @deleteTag="deleteHealthFacility"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">儿童设施</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.childrenFacility"
              title="儿童设施"
              @addTag="addChildrenFacility"
              @deleteTag="deleteChildrenFacility"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">通用设施</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.commonFacility"
              title="通用设施"
              @addTag="addCommonFacility"
              @deleteTag="deleteCommonFacility"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">公共区设施</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.publicAreaFacility"
              title="公共区设施"
              @addTag="addPublicAreaFacility"
              @deleteTag="deletePublicAreaFacility"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="title">酒店服务</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name">交通服务</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.trafficService"
              title="交通服务"
              @addTag="addTrafficService"
              @deleteTag="deleteTrafficService"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">餐饮服务</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.cateringService"
              title="餐饮服务"
              @addTag="addCateringService"
              @deleteTag="deleteCateringService"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">前台服务</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.receptionService"
              title="前台服务"
              @addTag="addReceptionService"
              @deleteTag="deleteReceptionService"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">清洁服务</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.cleanService"
              title="清洁服务"
              @addTag="addCleanService"
              @deleteTag="deleteCleanService"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">商务服务</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.businessService"
              title="商务服务"
              @addTag="addBusinessService"
              @deleteTag="deleteBusinessService"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">其他服务</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.otherService"
              title="其他服务"
              @addTag="addOtherService"
              @deleteTag="deleteOtherService"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="title">酒店政策</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name">重要提醒</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.remindList"
              title="重要提醒"
              @addTag="addRemindList"
              @deleteTag="deleteRemindList"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">入住必读</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.checkInTipList"
              title="入住必读"
              @addTag="addCheckInTipList"
              @deleteTag="deleteCheckInTipList"
            />
          </div>
        </li>
        <li class="form-item">
          <div class="name">预定须知</div>
          <div class="tags">
            <TagList
              :list="hotelInfo.preorderTipList"
              title="预定须知"
              @addTag="addPreorderTipList"
              @deleteTag="deletePreorderTipList"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <PickerPopup
    :visible="gradePickerPopupVisible"
    :options="gradeOptions"
    @confirm="selectCategory"
    @cancel="gradePickerPopupVisible = false"
  />
  <PickerPopup
    :visible="categoryPickerPopupVisible"
    :options="
      categoryOptions.map((item) => ({ text: item.name, value: item.id }))
    "
    @confirm="selectCategory"
    @cancel="categoryPickerPopupVisible = false"
  />
  <MapPopup
    :visible="mapPopupVisible"
    @confirm="setLnglat"
    @cancel="mapPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { Uploader, Icon, Popover } from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import MapPopup from "@/components/MapPopup.vue";
import TagList from "@/components/TagList.vue";

import { ref, computed, onMounted, watch } from "vue";
import { uploadFile } from "@/utils/upload";
import {
  gradeOptions,
  initialHotelInfo,
  categoryOptions,
  setCategoryOptions,
  checkHotelInfo,
} from "../utils/index";

import type { FormHotel } from "../utils/type";

const props = defineProps<{
  editingScenicInfo?: FormHotel;
}>();
const emit = defineEmits(["save"]);

const hotelInfo = ref<FormHotel>(initialHotelInfo);
const videoTipsVisible = ref(false);
const imageListTipsVisible = ref(false);
const gradePickerPopupVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const mapPopupVisible = ref(false);

// 计算属性
const selectedGradeName = computed(
  () => gradeOptions.find((item) => item.value === hotelInfo.value.grade)?.text
);
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find((item) => item.id === hotelInfo.value.categoryId)
      ?.name
);

watch(props, (props) => {
  if (props.editingScenicInfo) {
    hotelInfo.value = props.editingScenicInfo;
  }
});

onMounted(() => {
  setCategoryOptions();
});

const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  hotelInfo.value.categoryId = selectedValues[0];
  categoryPickerPopupVisible.value = false;
};

const setLnglat = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  hotelInfo.value.longitude = longitude;
  hotelInfo.value.latitude = latitude;
  mapPopupVisible.value = false;
};

const addFeatureTag = (tag: string) => hotelInfo.value.featureTagList.push(tag);
const deleteFeatureTag = (index: number) =>
  hotelInfo.value.featureTagList.splice(index, 1);

const addRecreationFacility = (tag: string) =>
  hotelInfo.value.recreationFacility.push(tag);
const deleteRecreationFacility = (index: number) =>
  hotelInfo.value.recreationFacility.splice(index, 1);
const addHealthFacility = (tag: string) =>
  hotelInfo.value.healthFacility.push(tag);
const deleteHealthFacility = (index: number) =>
  hotelInfo.value.healthFacility.splice(index, 1);
const addChildrenFacility = (tag: string) =>
  hotelInfo.value.childrenFacility.push(tag);
const deleteChildrenFacility = (index: number) =>
  hotelInfo.value.childrenFacility.splice(index, 1);
const addCommonFacility = (tag: string) =>
  hotelInfo.value.commonFacility.push(tag);
const deleteCommonFacility = (index: number) =>
  hotelInfo.value.commonFacility.splice(index, 1);
const addPublicAreaFacility = (tag: string) =>
  hotelInfo.value.publicAreaFacility.push(tag);
const deletePublicAreaFacility = (index: number) =>
  hotelInfo.value.publicAreaFacility.splice(index, 1);

const addTrafficService = (tag: string) =>
  hotelInfo.value.trafficService.push(tag);
const deleteTrafficService = (index: number) =>
  hotelInfo.value.trafficService.splice(index, 1);
const addCateringService = (tag: string) =>
  hotelInfo.value.cateringService.push(tag);
const deleteCateringService = (index: number) =>
  hotelInfo.value.cateringService.splice(index, 1);
const addReceptionService = (tag: string) =>
  hotelInfo.value.receptionService.push(tag);
const deleteReceptionService = (index: number) =>
  hotelInfo.value.receptionService.splice(index, 1);
const addCleanService = (tag: string) => hotelInfo.value.cleanService.push(tag);
const deleteCleanService = (index: number) =>
  hotelInfo.value.cleanService.splice(index, 1);
const addBusinessService = (tag: string) =>
  hotelInfo.value.businessService.push(tag);
const deleteBusinessService = (index: number) =>
  hotelInfo.value.businessService.splice(index, 1);
const addOtherService = (tag: string) => hotelInfo.value.otherService.push(tag);
const deleteOtherService = (index: number) =>
  hotelInfo.value.otherService.splice(index, 1);

const addRemindList = (tag: string) => hotelInfo.value.remindList.push(tag);
const deleteRemindList = (index: number) =>
  hotelInfo.value.remindList.splice(index, 1);
const addCheckInTipList = (tag: string) =>
  hotelInfo.value.checkInTipList.push(tag);
const deleteCheckInTipList = (index: number) =>
  hotelInfo.value.checkInTipList.splice(index, 1);
const addPreorderTipList = (tag: string) =>
  hotelInfo.value.preorderTipList.push(tag);
const deletePreorderTipList = (index: number) =>
  hotelInfo.value.preorderTipList.splice(index, 1);

const save = async () => {
  if (checkHotelInfo(hotelInfo.value)) {
    const {
      video,
      cover,
      appearanceImageList,
      interiorImageList,
      roomImageList,
      environmentImageList,
      restaurantImageList,
      ...rest
    } = hotelInfo.value;
    emit("save", {
      hotelInfo: {
        ...rest,
        video: video ? video[0].url : "",
        cover: cover ? cover[0].url : "",
        appearanceImageList: appearanceImageList.map((item) => item.url || ""),
        interiorImageList: interiorImageList.map((item) => item.url || ""),
        roomImageList: roomImageList.map((item) => item.url || ""),
        environmentImageList: environmentImageList.map(
          (item) => item.url || ""
        ),
        restaurantImageList: restaurantImageList.map((item) => item.url || ""),
      },
    });
  }
};
</script>

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
        .textarea {
          margin-top: 0.24rem;
          padding: 0.24rem;
          width: 100%;
          height: 3rem;
          background: #f7f8fa;
          border-radius: 0.12rem;
          border-color: #eee;
          box-sizing: border-box;
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
        .tags {
          .tag {
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
.dialog-input {
  margin: 0.32rem 0.32rem 0.5rem;
  padding: 0.24rem;
  width: calc(100% - 0.64rem);
  height: 0.88rem;
  font-size: 0.26rem;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
}
</style>
<style>
.van-empty__description {
  font-size: 0.24rem;
}
.van-collapse-item__title {
  font-size: 0.26rem;
  font-weight: 500;
}
</style>
