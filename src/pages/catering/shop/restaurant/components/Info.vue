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
            <div class="name required">周开始时间</div>
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
            <div class="name required">周结束时间</div>
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
          @click.stop="confirmDelete(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!restaurantInfo.openTimeList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加营业时间"
      />
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
  <Dialog
    v-model:show="telModalVisible"
    title="新增联系电话"
    show-cancel-button
    :before-close="addTel"
  >
    <input
      class="dialog-input"
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
      class="dialog-input"
      v-model="facility"
      type="text"
      placeholder="请输入设施名称"
    />
  </Dialog>
  <PickerPopup
    :visible="weekDayPickerPopupVisible"
    :options="weekDayOptions"
    @confirm="selectWeekDay"
    @cancel="weekDayPickerPopupVisible = false"
  />
  <TimeRangePickerPopup
    :tabs="['开业时间', '休息时间']"
    :visible="timeFramePickerPopupVisible"
    @confirm="selectTimeFrame"
    @cancel="timeFramePickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import {
  Uploader,
  Icon,
  Popover,
  showToast,
  Dialog,
  Button,
  Tag,
  SwipeCell,
  Empty,
  showConfirmDialog,
} from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import TimeRangePickerPopup from "@/components/TimeRangePickerPopup.vue";
import MapPopup from "@/components/MapPopup.vue";

import { ref, computed, onMounted, watch } from "vue";
import { weekDayOptions } from "@/utils/index";
import { uploadFile } from "@/utils/upload";
import {
  initialRestaurantInfo,
  categoryOptions,
  setCategoryOptions,
  checkRestaurantInfo,
} from "../utils/index";

import type { FormRestaurantInfo } from "../utils/type";

const props = defineProps<{
  editingRestaurantInfo?: FormRestaurantInfo;
}>();
const emit = defineEmits(["save"]);

const restaurantInfo = ref<FormRestaurantInfo>(initialRestaurantInfo);
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

// 计算属性
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find(
      (item) => item.id === restaurantInfo.value.categoryId
    )?.name
);

watch(props, (props) => {
  if (props.editingRestaurantInfo) {
    restaurantInfo.value = props.editingRestaurantInfo;
  }
});

onMounted(() => {
  setCategoryOptions();
});

const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  restaurantInfo.value.categoryId = selectedValues[0];
  categoryPickerPopupVisible.value = false;
};

const setLnglat = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  restaurantInfo.value.longitude = longitude;
  restaurantInfo.value.latitude = latitude;
  mapPopupVisible.value = false;
};

const deleteTel = (index: number) =>
  restaurantInfo.value.telList.splice(index, 1);
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
  restaurantInfo.value.telList.push(tel.value);
  tel.value = "";
  telModalVisible.value = false;
};

const deleteFacility = (index: number) =>
  restaurantInfo.value.facilityList.splice(index, 1);
const addFacility = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (!facility.value) {
    showToast("请输入设施名称");
    return;
  }
  restaurantInfo.value.facilityList.push(facility.value);
  facility.value = "";
  facilityModalVisible.value = false;
};

const addOpenTime = () => {
  restaurantInfo.value.openTimeList.push({
    startWeekDay: undefined,
    endWeekDay: undefined,
    timeFrameList: [],
  });
};
const confirmDelete = (index: number) => {
  showConfirmDialog({ title: "确定删除该营业时间吗？" })
    .then(() => restaurantInfo.value.openTimeList.splice(index, 1))
    .catch(() => true);
};

const pickWeekDay = (index: number, type: number) => {
  curOpenTimeIdx.value = index;
  curWeekDayType.value = type;
  weekDayPickerPopupVisible.value = true;
};
const selectWeekDay = ({ selectedValues }: { selectedValues: number[] }) => {
  if (curWeekDayType.value) {
    restaurantInfo.value.openTimeList[curOpenTimeIdx.value].endWeekDay =
      selectedValues[0];
  } else {
    restaurantInfo.value.openTimeList[curOpenTimeIdx.value].startWeekDay =
      selectedValues[0];
  }
  weekDayPickerPopupVisible.value = false;
};

const showTimeFramePickerPopup = (index: number) => {
  curOpenTimeIdx.value = index;
  timeFramePickerPopupVisible.value = true;
};
const deleteTimeFrame = (index: number, timeFrameIndex: number) => {
  restaurantInfo.value.openTimeList[index].timeFrameList.splice(
    timeFrameIndex,
    1
  );
};
const selectTimeFrame = ({
  startTime,
  endTime,
}: {
  startTime: string[];
  endTime: string[];
}) => {
  restaurantInfo.value.openTimeList[curOpenTimeIdx.value].timeFrameList.push({
    openTime: startTime.join(":"),
    closeTime: endTime.join(":"),
  });
  timeFramePickerPopupVisible.value = false;
};

const save = async () => {
  if (checkRestaurantInfo(restaurantInfo.value)) {
    const {
      video,
      cover,
      foodImageList,
      environmentImageList,
      priceImageList,
      ...rest
    } = restaurantInfo.value;
    emit("save", {
      restaurantInfo: {
        ...rest,
        video: video.length ? (video[0].url as string) : "",
        cover: cover[0].url as string,
        foodImageList: foodImageList.map((item) => item.url || ""),
        environmentImageList: environmentImageList.map(
          (item) => item.url || ""
        ),
        priceImageList: priceImageList.map((item) => item.url || ""),
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
