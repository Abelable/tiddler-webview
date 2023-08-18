<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">房间类型</div>
          <div class="picker" @click="typePickerPopupVisible = true">
            <div class="content" :class="{ active: typeName }">
              {{ typeName || "请选择房间类型" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">关联酒店</div>
          <div class="picker" @click="showHotelPickerPopup">
            <div class="content" :class="{ active: hotelNames }">
              {{ hotelNames || "请选择关联酒店" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">房间名称</div>
          <input
            class="input"
            v-model="roomInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">房间简称</div>
          <input
            class="input"
            v-model="roomInfo.briefName"
            type="text"
            placeholder="请输入简称，最长30字"
          />
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
          <div class="name">市场价格</div>
          <input
            class="input"
            v-model="roomInfo.marketPrice"
            type="number"
            step="0.01"
            placeholder="请输入市场价格"
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
      <div>编辑房间规格</div>
      <Button
        @click="categoryPickerPopupVisible = true"
        icon="plus"
        text="新增规格"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in roomInfo.specList" :key="index">
      <div class="card">
        <div class="title flex" style="margin-top: 0.32rem">
          <div>
            {{
              typeOptions.find(
                (typeOption) => typeOption.id === item.categoryId
              )?.name
            }}
          </div>
          <Button
            @click="addPriceItem(index)"
            icon="plus"
            text="新增价格列表"
            type="primary"
            size="mini"
          />
        </div>
        <SwipeCell
          v-for="(_item, _index) in item.priceList"
          :key="_index"
          stop-propagation
        >
          <ul class="form unit">
            <li class="form-item flex">
              <div class="name required">日期范围</div>
              <div
                class="picker"
                @click="showDateRangePickerPopup(index, _index)"
              >
                <div class="content" :class="{ active: _item.startDate }">
                  {{
                    _item.startDate
                      ? `${dayjs(_item.startDate).format(
                          "YYYY-MM-DD"
                        )}至${dayjs(_item.endDate).format("YYYY-MM-DD")}`
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
                v-model="_item.price"
                type="number"
                step="0.01"
                placeholder="请输入价格"
              />
            </li>
            <li class="form-item flex">
              <div class="name">库存</div>
              <input
                class="input"
                v-model="_item.stock"
                type="number"
                placeholder="请输入库存"
              />
            </li>
          </ul>
          <template #right>
            <Button
              class="delete-btn"
              @click.stop="deletePriceItem(index, _index)"
              icon="delete"
              color="#EE0D23"
              plain
            />
          </template>
        </SwipeCell>
        <div class="card" v-if="!item.priceList.length">
          <Empty image-size="1.8rem" description="暂无价格列表" />
        </div>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteSpec(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!roomInfo.specList.length">
      <Empty image-size="1.8rem" description="暂无规格" />
    </div>

    <div class="title">填写费用说明</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">费用包含</div>
          <input
            class="input"
            v-model="roomInfo.feeIncludeTips"
            type="text"
            placeholder="请输入费用包含内容"
          />
        </li>
        <li class="form-item flex">
          <div class="name">费用不含</div>
          <input
            class="input"
            v-model="roomInfo.feeNotIncludeTips"
            type="text"
            placeholder="请输入费用不含内容"
          />
        </li>
      </ul>
    </div>

    <div class="title">填写预定说明</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">当天预定最晚时间</div>
          <div class="picker" @click="bookingTimePickerPopupVisible = true">
            <div class="content" :class="{ active: roomInfo.bookingTime }">
              {{ roomInfo.bookingTime || "请选择最晚预定时间" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name">生效时间</div>
          <input
            class="input"
            v-model="roomInfo.effectiveTime"
            type="number"
            placeholder="请输入生效时间"
          />
          <div class="unit">小时</div>
        </li>
        <li class="form-item flex">
          <div class="name">有效期</div>
          <input
            class="input"
            v-model="roomInfo.validityTime"
            type="number"
            placeholder="请输入有效期"
          />
          <div class="unit">天</div>
        </li>
        <li class="form-item flex">
          <div class="name">限购数量</div>
          <input
            class="input"
            v-model="roomInfo.limitNumber"
            type="number"
            placeholder="请输入限购数量"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">退票条件</div>
          <div class="picker" @click="refundStatusPickerPopupVisible = true">
            <div class="content" :class="{ active: refundStatusName }">
              {{ refundStatusName || "请选择退票条件" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name">退票说明</div>
          <input
            class="input"
            v-model="roomInfo.refundTips"
            type="text"
            placeholder="请输入退票说明"
          />
        </li>
      </ul>
    </div>

    <div class="title">填写使用说明</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">是否需要换票</div>
          <Switch v-model="roomInfo.needExchange" size="18px" />
        </li>
        <li class="form-item flex">
          <div class="name">换票说明</div>
          <input
            class="input"
            v-model="roomInfo.exchangeTips"
            type="text"
            placeholder="请输入换票说明"
          />
        </li>
        <li class="form-item flex" v-show="roomInfo.needExchange">
          <div class="name">换票时间</div>
          <div class="picker" @click="exchangeTimePickerPopupVisible = true">
            <div class="content" :class="{ active: roomInfo.exchangeTime }">
              {{ roomInfo.exchangeTime || "请选择换票时间" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex" v-show="roomInfo.needExchange">
          <div class="name">换票地点</div>
          <input
            class="input"
            v-model="roomInfo.exchangeLocation"
            type="text"
            placeholder="请输入换票地点"
          />
        </li>
        <li class="form-item flex">
          <div class="name">入园时间</div>
          <div class="picker" @click="enterTimePickerPopupVisible = true">
            <div class="content" :class="{ active: roomInfo.enterTime }">
              {{ roomInfo.enterTime || "请选择入园时间" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name">入园地点</div>
          <input
            class="input"
            v-model="roomInfo.enterLocation"
            type="text"
            placeholder="请输入入园地点"
          />
        </li>
      </ul>
    </div>

    <div class="title">填写其他说明</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">发票说明</div>
          <input
            class="input"
            v-model="roomInfo.invoiceTips"
            type="text"
            placeholder="请输入发票说明"
          />
        </li>
        <li class="form-item flex">
          <div class="name">特别提醒</div>
          <input
            class="input"
            v-model="roomInfo.reminderTips"
            type="text"
            placeholder="请输入特别提醒"
          />
        </li>
      </ul>
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <TypePickerPopup
    :visible="typePickerPopupVisible"
    @confirm="setType"
    @cancel="typePickerPopupVisible = false"
  />
  <HotelPickerPopup
    v-if="roomInfo.type === 1"
    :visible="hotelPickerPopupVisible"
    :hotel-options="hotelOptions"
    @confirm="setHotelIds"
    @cancel="hotelPickerPopupVisible = false"
  />
  <MultiHotelPickerPopup
    v-if="roomInfo.type === 2"
    :visible="hotelPickerPopupVisible"
    :hotel-options="hotelOptions"
    @confirm="setHotelIds"
    @cancel="hotelPickerPopupVisible = false"
  />
  <TimePickerPopup
    :visible="bookingTimePickerPopupVisible"
    @confirm="setBookTime"
    @cancel="bookingTimePickerPopupVisible = false"
  />
  <RefundStatusPickerPopup
    :visible="refundStatusPickerPopupVisible"
    @confirm="setRefundStatus"
    @cancel="refundStatusPickerPopupVisible = false"
  />
  <TimeRangePickerPopup
    :visible="exchangeTimePickerPopupVisible"
    @confirm="setExchangeTime"
    @cancel="exchangeTimePickerPopupVisible = false"
  />
  <TimeRangePickerPopup
    :visible="enterTimePickerPopupVisible"
    @confirm="setEnterTime"
    @cancel="enterTimePickerPopupVisible = false"
  />
  <TypePickerPopup
    :visible="categoryPickerPopupVisible"
    :category-options="typeOptions"
    @confirm="addSpec"
    @cancel="categoryPickerPopupVisible = false"
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
import TypePickerPopup from "./components/typePickerPopup.vue";
import HotelPickerPopup from "./components/hotelPickerPopup.vue";
import MultiHotelPickerPopup from "./components/multiHotelPickerPopup.vue";
import TimePickerPopup from "./components/timePickerPopup.vue";
import TimeRangePickerPopup from "./components/timeRangePickerPopup.vue";
import RefundStatusPickerPopup from "./components/refundStatusPickerPopup.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import dayjs from "dayjs";
import { cleanObject } from "@/utils/index";
import { createRoom } from "./utils/api";
import {
  refundStatusOptions,
  hotelOptions,
  setHotelOptions,
  typeOptions,
  setTypeOptions,
  checkRoomInfo,
} from "./utils/index";

import type { RoomInfo, CreateRoomInfo } from "./utils/type";

const router = useRouter();

const roomInfo = reactive<Omit<RoomInfo, "id">>({
  type: undefined,
  hotelIds: [],
  name: "",
  briefName: "",
  price: undefined,
  marketPrice: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
  specList: [],
  feeIncludeTips: "",
  feeNotIncludeTips: "",
  bookingTime: "",
  effectiveTime: undefined,
  validityTime: undefined,
  limitNumber: undefined,
  refundStatus: undefined,
  refundTips: "",
  needExchange: false,
  exchangeTips: "",
  exchangeTime: "",
  exchangeLocation: "",
  enterTime: "",
  enterLocation: "",
  invoiceTips: "",
  reminderTips: "",
});

const curSpecIndex = ref(0);
const curPriceItemIndex = ref(0);
const typePickerPopupVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const dateRangePickerPopupVisible = ref(false);
const bookingTimePickerPopupVisible = ref(false);
const refundStatusPickerPopupVisible = ref(false);
const exchangeTimePickerPopupVisible = ref(false);
const enterTimePickerPopupVisible = ref(false);
const hotelPickerPopupVisible = ref(false);
const salesCommissionRateTipsVisible = ref(false);
const promotionCommissionRateTipsVisible = ref(false);

// 计算属性
const hotelNames = computed(() =>
  roomInfo.hotelIds
    .map((id) => hotelOptions.value.find((item) => item.id === id)?.name)
    .join()
);
const typeName = computed(
  () =>
    typeOptions.value.find(({ id }: { id: number }) => id === roomInfo.type)
      ?.name
);
const refundStatusName = computed(
  () =>
    refundStatusOptions.find((item) => item.value === roomInfo.refundStatus)
      ?.text
);

onMounted(() => {
  setHotelOptions();
  setTypeOptions();
});

const setType = (type: number) => {
  if (roomInfo.type !== type) {
    roomInfo.hotelIds = [];
  }
  roomInfo.type = type;
  typePickerPopupVisible.value = false;
};

const showHotelPickerPopup = () => {
  if (!roomInfo.type) {
    showToast("请先选择房间类型");
    return;
  }
  hotelPickerPopupVisible.value = true;
};
const setHotelIds = (hotelIds: number[]) => {
  roomInfo.hotelIds = hotelIds;
  hotelPickerPopupVisible.value = false;
};

const setBookTime = (bookingTime: string) => {
  roomInfo.bookingTime = bookingTime;
  bookingTimePickerPopupVisible.value = false;
};

const setRefundStatus = (status: number) => {
  roomInfo.refundStatus = status;
  refundStatusPickerPopupVisible.value = false;
};

const setExchangeTime = (exchangeTime: string) => {
  roomInfo.exchangeTime = exchangeTime;
  exchangeTimePickerPopupVisible.value = false;
};

const setEnterTime = (enterTime: string) => {
  roomInfo.enterTime = enterTime;
  enterTimePickerPopupVisible.value = false;
};

const addSpec = (categoryId: number) => {
  typeOptions.value = typeOptions.value.map((item) =>
    item.id === categoryId
      ? {
          ...item,
          disabled: true,
        }
      : item
  );
  roomInfo.specList.push({ categoryId, priceList: [] });
  categoryPickerPopupVisible.value = false;
};
const deleteSpec = (index: number) =>
  showConfirmDialog({ title: "确定删除该房间规格吗？" })
    .then(() => {
      typeOptions.value = typeOptions.value.map((item) =>
        item.id === roomInfo.specList[index].categoryId
          ? { ...item, disabled: false }
          : item
      );
      roomInfo.specList.splice(index, 1);
    })
    .catch(() => true);

const addPriceItem = (index: number) => {
  curSpecIndex.value = index;
  roomInfo.specList[curSpecIndex.value].priceList.push({
    startDate: undefined,
    endDate: undefined,
    price: undefined,
    stock: undefined,
  });
  dateRangePickerPopupVisible.value = false;
};
const showDateRangePickerPopup = (
  specIndex: number,
  priceItemIndex: number
) => {
  curSpecIndex.value = specIndex;
  curPriceItemIndex.value = priceItemIndex;
  dateRangePickerPopupVisible.value = true;
};
const deletePriceItem = (index: number, priceItemIndex: number) =>
  showConfirmDialog({ title: "确定删除该房间规格吗？" })
    .then(() => roomInfo.specList[index].priceList.splice(priceItemIndex, 1))
    .catch(() => true);
const dateRangeConfirm = (dateList: Date[]) => {
  const priceItem = _.cloneDeep(
    roomInfo.specList[curSpecIndex.value].priceList[curPriceItemIndex.value]
  );
  roomInfo.specList[curSpecIndex.value].priceList[curPriceItemIndex.value] = {
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

  const {
    specList,
    salesCommissionRate,
    promotionCommissionRate,
    needExchange,
    ...rest
  } = roomInfo;
  const createRoomInfo = {
    ...cleanObject(rest),
    salesCommissionRate: (salesCommissionRate as number) / 100,
    promotionCommissionRate: (promotionCommissionRate as number) / 100,
    specList: specList.map((item) => ({
      ...item,
      priceList: JSON.stringify(item.priceList),
    })),
    needExchange: needExchange ? 1 : 0,
  };
  try {
    await createRoom(createRoomInfo as CreateRoomInfo);
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
