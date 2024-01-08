<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">关联酒店</div>
          <div class="picker" @click="hotelPickerPopupVisible = true">
            <div class="content" :class="{ active: hotelName }">
              {{ hotelName || "请选择关联酒店" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">房间类型</div>
          <div class="picker" @click="showTypePickerPopup">
            <div class="content" :class="{ active: typeName }">
              {{ typeName || "请选择房间类型" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">起始价格</div>
          <input
            class="input"
            v-model="roomInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入起始价格"
          />
        </li>
        <li class="form-item flex">
          <div class="name flex required">
            <div>销售佣金比例</div>
            <Popover
              v-model:show="salesCommissionRateTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">范围：10%～70%</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <input
            class="input"
            v-model="roomInfo.salesCommissionRate"
            type="number"
            placeholder="请输入销售佣金比例"
          />
          <div class="unit">%</div>
        </li>
        <li class="form-item flex">
          <div class="name flex required">
            <div>推广佣金比例</div>
            <Popover
              v-model:show="promotionCommissionRateTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">范围：2%～70%</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <input
            class="input"
            v-model="roomInfo.promotionCommissionRate"
            type="number"
            placeholder="请输入推广佣金比例"
          />
          <div class="unit">%</div>
        </li>
      </ul>
    </div>

    <div class="title flex">
      <div>编辑房间价格</div>
      <Button
        @click="addPriceItem"
        icon="plus"
        text="新增价格列表"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in roomInfo.priceList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">日期范围</div>
            <div class="picker" @click="showDateRangePickerPopup(index)">
              <div class="content" :class="{ active: item.startDate }">
                {{
                  item.startDate && item.endDate
                    ? `${dayjs(item.startDate * 1000).format(
                        "YYYY-MM-DD"
                      )}至${dayjs(item.endDate * 1000).format("YYYY-MM-DD")}`
                    : "请选择日期范围"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name required">价格</div>
            <input
              class="input"
              v-model="item.price"
              type="number"
              step="0.01"
              placeholder="请输入价格"
            />
          </li>
          <li class="form-item flex">
            <div class="name required">房间数量</div>
            <input
              class="input"
              v-model="item.num"
              type="number"
              placeholder="请输入房间数量"
            />
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deletePriceItem(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!roomInfo.priceList.length">
      <Empty image-size="1.8rem" description="暂无价格列表" />
    </div>

    <div class="title">填写预定说明</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">早餐数量</div>
          <input
            class="input"
            v-model="roomInfo.breakfastNum"
            type="number"
            placeholder="请输入早餐数量"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">入住人数</div>
          <input
            class="input"
            v-model="roomInfo.guestNum"
            type="number"
            placeholder="请输入入住人数"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">免费取消</div>
          <Switch v-model="roomInfo.cancellable" size="18px" />
        </li>
      </ul>
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <PickerPopup
    :visible="hotelPickerPopupVisible"
    :options="hotelOptions.map((item) => ({ text: item.name, value: item.id }))"
    @confirm="setHotelId"
    @cancel="hotelPickerPopupVisible = false"
  />
  <PickerPopup
    :visible="typePickerPopupVisible"
    :options="typeOptions.map((item) => ({ text: item.name, value: item.id }))"
    @confirm="setType"
    @cancel="typePickerPopupVisible = false"
  />
  <Calendar
    v-model:show="dateRangePickerPopupVisible"
    type="range"
    @confirm="dateRangeConfirm"
  />
</template>

<script setup lang="ts">
import {
  Icon,
  Empty,
  Popover,
  Button,
  showConfirmDialog,
  showToast,
  Switch,
  SwipeCell,
  Calendar,
} from "vant";
import PickerPopup from "@/components/pickerPopup.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import dayjs from "dayjs";
import { cleanObject } from "@/utils/index";
import { createRoom } from "./utils/api";
import {
  hotelOptions,
  setHotelOptions,
  typeOptions,
  setTypeOptions,
  checkRoomInfo,
} from "./utils/index";

import type { RoomInfo, CreateRoomInfo } from "./utils/type";

const router = useRouter();

const roomInfo = reactive<Omit<RoomInfo, "id">>({
  hotelId: undefined,
  typeId: undefined,
  price: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
  priceList: [],
  breakfastNum: 0,
  guestNum: undefined,
  cancellable: true,
});
const curPriceItemIndex = ref(0);
const typePickerPopupVisible = ref(false);
const dateRangePickerPopupVisible = ref(false);
const hotelPickerPopupVisible = ref(false);
const salesCommissionRateTipsVisible = ref(false);
const promotionCommissionRateTipsVisible = ref(false);

// 计算属性
const hotelName = computed(
  () => hotelOptions.value.find((item) => item.id === roomInfo.hotelId)?.name
);
const typeName = computed(
  () => typeOptions.value.find((item) => item.id === roomInfo.typeId)?.name
);

onMounted(() => {
  setHotelOptions();
});

const setHotelId = ({ selectedValues }: { selectedValues: number[] }) => {
  const hotelId = selectedValues[0];
  if (roomInfo.hotelId !== hotelId) {
    roomInfo.typeId = undefined;
    setTypeOptions(hotelId);
  }
  roomInfo.hotelId = hotelId;
  hotelPickerPopupVisible.value = false;
};

const setType = ({ selectedValues }: { selectedValues: number[] }) => {
  roomInfo.typeId = selectedValues[0];
  typePickerPopupVisible.value = false;
};
const showTypePickerPopup = () => {
  if (!roomInfo.hotelId) {
    showToast("请先选择关联酒店");
    return;
  }
  typePickerPopupVisible.value = true;
};

const addPriceItem = () => {
  roomInfo.priceList.push({
    startDate: undefined,
    endDate: undefined,
    price: undefined,
    num: undefined,
  });
  dateRangePickerPopupVisible.value = false;
};
const showDateRangePickerPopup = (priceItemIndex: number) => {
  curPriceItemIndex.value = priceItemIndex;
  dateRangePickerPopupVisible.value = true;
};
const deletePriceItem = (priceItemIndex: number) =>
  showConfirmDialog({ title: "确定删除该房间价格吗？" })
    .then(() => roomInfo.priceList.splice(priceItemIndex, 1))
    .catch(() => true);
const dateRangeConfirm = (dateList: Date[]) => {
  const priceItem = _.cloneDeep(roomInfo.priceList[curPriceItemIndex.value]);
  roomInfo.priceList[curPriceItemIndex.value] = {
    ...priceItem,
    startDate: Math.floor(new Date(dateList[0]).getTime() / 1000),
    endDate: Math.floor(new Date(dateList[1]).getTime() / 1000),
  };
  dateRangePickerPopupVisible.value = false;
};

const save = async () => {
  if (!checkRoomInfo(roomInfo)) {
    return;
  }

  const { cancellable, ...rest } = roomInfo;
  const createRoomInfo = {
    ...cleanObject(rest),
    cancellable: cancellable ? 1 : 0,
  };
  try {
    await createRoom(createRoomInfo as CreateRoomInfo);
    router.back();
  } catch (error) {
    showToast("上传失败，请重试");
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
        margin-bottom: 0.32rem;
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
              max-width: 3.6rem;
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
        .unit {
          margin-left: 0.06rem;
          font-weight: 500;
          line-height: 1;
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
</style>
<style>
.van-empty__description {
  font-size: 0.24rem;
}
</style>
