<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">门店名称</div>
          <input
            class="input"
            v-model="restaurantInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">门店分类</div>
          <div class="picker" @click="categoryPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedCategoryName }">
              {{ selectedCategoryName || "请选择门店分类" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">人均价格</div>
          <input
            class="input"
            v-model="restaurantInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入人均价格"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">经纬度</div>
          <div class="picker" @click="mapPopupVisible = true">
            <div class="content" :class="{ active: restaurantInfo.longitude }">
              {{
                restaurantInfo.longitude
                  ? `${restaurantInfo.longitude},${restaurantInfo.latitude}`
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
            v-model="restaurantInfo.address"
            type="text"
            placeholder="请输入门店具体地址"
          />
        </li>
        <li class="form-item">
          <div class="name required">联系电话</div>
          <div class="tags">
            <Tag
              v-for="(item, index) in restaurantInfo.telList"
              :key="index"
              @close="deleteTel(index)"
              class="tag"
              color="#DBEFFD"
              text-color="#2A3664"
              closeable
              size="medium"
              >{{ item }}</Tag
            >
            <Tag
              class="tag"
              @click="telModalVisible = true"
              type="primary"
              size="medium"
              >+ 新增联系电话</Tag
            >
          </div>
        </li>
        <li class="form-item">
          <div class="name">服务设施</div>
          <div class="tags">
            <Tag
              v-for="(item, index) in restaurantInfo.facilityList"
              :key="index"
              @close="deleteFacility(index)"
              class="tag"
              color="#DBEFFD"
              text-color="#2A3664"
              closeable
              size="medium"
              >{{ item }}</Tag
            >
            <Tag
              class="tag"
              @click="facilityModalVisible = true"
              type="primary"
              size="medium"
              >+ 新增服务设施</Tag
            >
          </div>
        </li>
      </ul>
    </div>

    <div class="title flex">
      <div>编辑营业时间</div>
      <Button
        @click="addOpenTime"
        icon="plus"
        text="新增营业时间"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell
      v-for="(item, index) in restaurantInfo.openTimeList"
      :key="index"
    >
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">开始时间</div>
            <div class="picker" @click="pickWeekDay(index, 0)">
              <div class="content" :class="{ active: item.startWeekDay }">
                {{
                  item.startWeekDay
                    ? weekDayOptions[item.startWeekDay - 1].text
                    : "请选择开始时间"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name required">结束时间</div>
            <div class="picker" @click="pickWeekDay(index, 1)">
              <div class="content" :class="{ active: item.endWeekDay }">
                {{
                  item.endWeekDay
                    ? weekDayOptions[item.endWeekDay - 1].text
                    : "请选择结束时间"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item">
            <div class="name required">营业时间段</div>
            <div class="tags">
              <Tag
                v-for="(timeFrame, timeFrameIndex) in item.timeFrameList"
                :key="timeFrameIndex"
                @close="deleteTimeFrame(index, timeFrameIndex)"
                class="tag"
                color="#DBEFFD"
                text-color="#2A3664"
                closeable
                size="medium"
                >{{ `${timeFrame.openTime}-${timeFrame.closeTime}` }}</Tag
              >
              <Tag
                class="tag"
                @click="showTimeFramePickerPopup(index)"
                type="primary"
                size="medium"
                >+ 新增营业时间段</Tag
              >
            </div>
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteOpenTime(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!restaurantInfo.openTimeList.length">
      <Empty image-size="1.8rem" description="暂未设置营业时间" />
    </div>

    <div class="title">上传视频及图片</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name flex">
            <div>门店视频</div>
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
                <p>内容：建议突出门店1-2个核心卖点</p>
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
          <div class="name required">门店封面</div>
          <Uploader
            v-model="restaurantInfo.cover"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
          />
        </li>
        <li class="form-item">
          <div class="name flex">菜品图片列表</div>
          <Uploader
            v-model="restaurantInfo.foodImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name flex">环境图片列表</div>
          <Uploader
            v-model="restaurantInfo.environmentImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name flex">价目表图片列表</div>
          <Uploader
            v-model="restaurantInfo.priceImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
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
  <MapPopup
    :visible="mapPopupVisible"
    @confirm="setLnglat"
    @cancel="mapPopupVisible = false"
  />
  <Dialog
    v-model:show="telModalVisible"
    title="新增联系电话"
    show-cancel-button
    :before-close="addTel"
  >
    <input
      class="sku-option-input"
      v-model="tel"
      type="text"
      placeholder="请输入联系电话"
    />
  </Dialog>
  <Dialog
    v-model:show="facilityModalVisible"
    title="新增服务设施"
    show-cancel-button
    :before-close="addFacility"
  >
    <input
      class="sku-option-input"
      v-model="facility"
      type="text"
      placeholder="请输入设施名称"
    />
  </Dialog>
  <Popup v-model:show="weekDayPickerPopupVisible" position="bottom" round>
    <Picker
      :columns="weekDayOptions"
      @confirm="selectWeekDay"
      @cancel="weekDayPickerPopupVisible = false"
    />
  </Popup>
  <Popup v-model:show="timeFramePickerPopupVisible" position="bottom" round>
    <PickerGroup
      :tabs="['开业时间', '休息时间']"
      @confirm="selectTimeFrame"
      @cancel="timeFramePickerPopupVisible = false"
    >
      <TimePicker v-model="openTime" />
      <TimePicker v-model="closeTime" />
    </PickerGroup>
  </Popup>
</template>

<script setup lang="ts">
import {
  Uploader,
  Icon,
  Popover,
  showToast,
  Popup,
  PickerGroup,
  Picker,
  TimePicker,
  Dialog,
  Button,
  Tag,
  SwipeCell,
  Empty,
  showConfirmDialog,
} from "vant";
import MapPopup from "./components/mapPopup.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { uploadFile } from "@/utils/upload";
import { getRestaurantInfo, editRestaurant } from "./utils/api";
import {
  weekDayOptions,
  categoryOptions,
  setCategoryOptions,
  checkRestaurantInfo,
} from "./utils/index";

import type { RestaurantInfo, OriginalRestaurantInfo } from "./utils/type";

const route = useRoute();
const router = useRouter();

const restaurantInfo = reactive<RestaurantInfo>({
  id: 0,
  name: "",
  categoryId: undefined,
  price: undefined,
  longitude: undefined,
  latitude: undefined,
  address: "",
  telList: [],
  facilityList: [],
  openTimeList: [],
  video: [],
  cover: [],
  foodImageList: [],
  environmentImageList: [],
  priceImageList: [],
});
const videoTipsVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const mapPopupVisible = ref(false);
const telModalVisible = ref(false);
const tel = ref("");
const facilityModalVisible = ref(false);
const facility = ref("");
const curOpenTimeIdx = ref(0);
const weekDayPickerPopupVisible = ref(false);
const curWeekDayType = ref(0);
const timeFramePickerPopupVisible = ref(false);
const openTime = ref(["12", "00"]);
const closeTime = ref(["12", "00"]);

// 计算属性
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find((item) => item.id === restaurantInfo.categoryId)
      ?.name
);

onMounted(async () => {
  await setCategoryOptions();
  setRestaurantInfo();
});

const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  restaurantInfo.categoryId = selectedValues[0];
  categoryPickerPopupVisible.value = false;
};
const setRestaurantInfo = async () => {
  const {
    id,
    name,
    categoryId,
    price,
    longitude,
    latitude,
    address,
    telList,
    facilityList,
    openTimeList,
    video,
    cover,
    foodImageList,
    environmentImageList,
    priceImageList,
  } = await getRestaurantInfo(+(route.query.id as string));
  restaurantInfo.id = id;
  restaurantInfo.name = name;
  restaurantInfo.categoryId = categoryId;
  restaurantInfo.price = price;
  restaurantInfo.longitude = longitude;
  restaurantInfo.latitude = latitude;
  restaurantInfo.address = address;
  restaurantInfo.telList = telList;
  restaurantInfo.facilityList = facilityList;
  restaurantInfo.openTimeList = openTimeList;
  restaurantInfo.video = video ? [{ url: video }] : [];
  restaurantInfo.cover = [{ url: cover }];
  restaurantInfo.foodImageList = foodImageList.map((item) => ({ url: item }));
  restaurantInfo.environmentImageList = environmentImageList.map((item) => ({
    url: item,
  }));
  restaurantInfo.priceImageList = priceImageList.map((item) => ({ url: item }));
};

const setLnglat = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  restaurantInfo.longitude = longitude;
  restaurantInfo.latitude = latitude;
  mapPopupVisible.value = false;
};

const deleteTel = (index: number) => restaurantInfo.telList.splice(index, 1);
const addTel = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (
    !tel.value ||
    (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(tel.value) &&
      !/^0\d{2,3}-?\d{7,8}$/.test(tel.value))
  ) {
    showToast("请输入正确联系电话");
    return;
  }
  restaurantInfo.telList.push(tel.value);
  tel.value = "";
  telModalVisible.value = false;
};

const deleteFacility = (index: number) =>
  restaurantInfo.facilityList.splice(index, 1);
const addFacility = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (!facility.value) {
    showToast("请输入设施名称");
    return;
  }
  restaurantInfo.facilityList.push(facility.value);
  facility.value = "";
  facilityModalVisible.value = false;
};

const addOpenTime = () => {
  restaurantInfo.openTimeList.push({
    startWeekDay: undefined,
    endWeekDay: undefined,
    timeFrameList: [],
  });
};
const deleteOpenTime = (index: number) => {
  showConfirmDialog({ title: "确定删除该营业时间吗？" })
    .then(() => restaurantInfo.openTimeList.splice(index, 1))
    .catch(() => true);
};

const pickWeekDay = (index: number, type: number) => {
  curOpenTimeIdx.value = index;
  curWeekDayType.value = type;
  weekDayPickerPopupVisible.value = true;
};
const selectWeekDay = ({ selectedValues }: { selectedValues: number[] }) => {
  if (curWeekDayType.value) {
    restaurantInfo.openTimeList[curOpenTimeIdx.value].endWeekDay =
      selectedValues[0];
  } else {
    restaurantInfo.openTimeList[curOpenTimeIdx.value].startWeekDay =
      selectedValues[0];
  }
  weekDayPickerPopupVisible.value = false;
};

const showTimeFramePickerPopup = (index: number) => {
  curOpenTimeIdx.value = index;
  timeFramePickerPopupVisible.value = true;
};
const deleteTimeFrame = (index: number, timeFrameIndex: number) => {
  restaurantInfo.openTimeList[index].timeFrameList.splice(timeFrameIndex, 1);
};
const selectTimeFrame = () => {
  restaurantInfo.openTimeList[curOpenTimeIdx.value].timeFrameList.push({
    openTime: openTime.value.join(":"),
    closeTime: closeTime.value.join(":"),
  });
  timeFramePickerPopupVisible.value = false;
};

const save = async () => {
  if (checkRestaurantInfo(restaurantInfo)) {
    const {
      categoryId,
      price,
      longitude,
      latitude,
      video,
      cover,
      foodImageList,
      environmentImageList,
      priceImageList,
      ...rest
    } = restaurantInfo;
    const editRestaurantInfo: OriginalRestaurantInfo = {
      ...rest,
      categoryId: categoryId as number,
      price: price as number,
      longitude: longitude as number,
      latitude: latitude as number,
      cover: cover[0].url || "",
      foodImageList: foodImageList.map((item) => item.url || ""),
      environmentImageList: environmentImageList.map((item) => item.url || ""),
      priceImageList: priceImageList.map((item) => item.url || ""),
    };
    if (video.length) editRestaurantInfo.video = video[0].url;
    try {
      await editRestaurant(editRestaurantInfo);
      router.back();
    } catch (error) {
      showToast("上传失败，请重试");
    }
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
