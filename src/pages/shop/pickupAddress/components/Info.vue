<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">门店名称</div>
          <input
            class="input"
            v-model="pickupAddress.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">经纬度</div>
          <div class="picker" @click="mapPopupVisible = true">
            <div class="content" :class="{ active: pickupAddress.longitude }">
              {{
                pickupAddress.longitude
                  ? `${pickupAddress.longitude},${pickupAddress.latitude}`
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
            v-model="pickupAddress.addressDetail"
            type="text"
            placeholder="请输入门店具体地址"
          />
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
    <SwipeCell v-for="(item, index) in pickupAddress.openTimeList" :key="index">
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
          @click.stop="deleteOpenTime(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!pickupAddress.openTimeList.length">
      <Empty image-size="1.8rem" description="暂未添加营业时间" />
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <MapPopup
    :visible="mapPopupVisible"
    @confirm="setLnglat"
    @cancel="mapPopupVisible = false"
  />
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
import { Icon, Button, Tag, SwipeCell, Empty, showConfirmDialog } from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import TimeRangePickerPopup from "@/components/TimeRangePickerPopup.vue";
import MapPopup from "@/components/MapPopup.vue";

import { ref, watch } from "vue";
import { weekDayOptions } from "@/utils/index";
import { initialPickupAddress, checkPickupAddress } from "../utils/index";

import type { FormPickupAddress } from "../utils/type";

const props = defineProps<{
  editingPickupAddress?: FormPickupAddress;
}>();
const emit = defineEmits(["save"]);

const pickupAddress = ref<FormPickupAddress>(initialPickupAddress);
const mapPopupVisible = ref(false);
const curOpenTimeIdx = ref(0);
const weekDayPickerPopupVisible = ref(false);
const curWeekDayType = ref(0);
const timeFramePickerPopupVisible = ref(false);

watch(props, (props) => {
  if (props.editingPickupAddress) {
    pickupAddress.value = props.editingPickupAddress;
  }
});

const setLnglat = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  pickupAddress.value.longitude = longitude;
  pickupAddress.value.latitude = latitude;
  mapPopupVisible.value = false;
};

const addOpenTime = () => {
  pickupAddress.value.openTimeList.push({
    startWeekDay: undefined,
    endWeekDay: undefined,
    timeFrameList: [],
  });
};
const deleteOpenTime = (index: number) => {
  showConfirmDialog({ title: "确定删除该营业时间吗？" })
    .then(() => pickupAddress.value.openTimeList.splice(index, 1))
    .catch(() => true);
};

const pickWeekDay = (index: number, type: number) => {
  curOpenTimeIdx.value = index;
  curWeekDayType.value = type;
  weekDayPickerPopupVisible.value = true;
};
const selectWeekDay = ({ selectedValues }: { selectedValues: number[] }) => {
  if (curWeekDayType.value) {
    pickupAddress.value.openTimeList[curOpenTimeIdx.value].endWeekDay =
      selectedValues[0];
  } else {
    pickupAddress.value.openTimeList[curOpenTimeIdx.value].startWeekDay =
      selectedValues[0];
  }
  weekDayPickerPopupVisible.value = false;
};

const showTimeFramePickerPopup = (index: number) => {
  curOpenTimeIdx.value = index;
  timeFramePickerPopupVisible.value = true;
};
const deleteTimeFrame = (index: number, timeFrameIndex: number) => {
  pickupAddress.value.openTimeList[index].timeFrameList.splice(
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
  pickupAddress.value.openTimeList[curOpenTimeIdx.value].timeFrameList.push({
    openTime: startTime.join(":"),
    closeTime: endTime.join(":"),
  });
  timeFramePickerPopupVisible.value = false;
};

const save = async () => {
  if (checkPickupAddress(pickupAddress.value)) {
    emit("save", {
      pickupAddress: pickupAddress.value,
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
