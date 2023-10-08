<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">关联门店</div>
          <div class="picker" @click="restaurantPickerPopupVisible = true">
            <div class="content" :class="{ active: restaurantNames }">
              {{ restaurantNames || "请选择关联门店" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">代金券名称</div>
          <input
            class="input"
            v-model="ticketInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">代金券售价</div>
          <input
            class="input"
            v-model="ticketInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入售价"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">抵扣价格</div>
          <input
            class="input"
            v-model="ticketInfo.originalPrice"
            type="number"
            step="0.01"
            placeholder="请输入抵扣价格"
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
            v-model="ticketInfo.salesCommissionRate"
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
            v-model="ticketInfo.promotionCommissionRate"
            type="number"
            placeholder="请输入推广佣金比例"
          />
          <div class="unit">%</div>
        </li>
      </ul>
    </div>

    <div class="title">设置有效期</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">有效期类型</div>
          <div class="picker" @click="validityTypePickerPopupVisible = true">
            <div class="content" :class="{ active: validityTypeDesc }">
              {{ validityTypeDesc || "请选择有效期类型" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex" v-if="validityType === 1">
          <div class="name required">有效天数</div>
          <input
            class="input"
            v-model="ticketInfo.validityDays"
            type="number"
            placeholder="请输入有效天数"
          />
        </li>
        <li class="form-item flex" v-if="validityType === 2">
          <div class="name required">有效期范围</div>
          <div class="picker" @click="dateRangePickerPopupVisible = true">
            <div class="content" :class="{ active: validityPeriod }">
              {{ validityPeriod || "请选择有效期范围" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
      </ul>
    </div>

    <div class="title">填写购买须知</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">限购数量</div>
          <input
            class="input"
            v-model="ticketInfo.buyLimitNumber"
            type="number"
            placeholder="请输入限购数量"
          />
        </li>
        <li class="form-item flex">
          <div class="name">使用数量限制</div>
          <input
            class="input"
            v-model="ticketInfo.useLimitNumber"
            type="number"
            placeholder="请输入使用数量限制"
          />
        </li>
        <li class="form-item flex">
          <div class="name">是否需要预定</div>
          <Switch v-model="ticketInfo.needPreBook" size="18px" />
        </li>
        <li class="form-item flex">
          <div class="name">是否包含酒水饮料</div>
          <Switch v-model="ticketInfo.includingDrink" size="18px" />
        </li>
        <li class="form-item flex">
          <div class="name">能否用于包间消费</div>
          <Switch v-model="ticketInfo.boxAvailable" size="18px" />
        </li>
        <li class="form-item flex">
          <div class="name">自定义使用时间</div>
          <Switch v-model="customUseTime" size="18px" />
        </li>
        <li class="form-item">
          <div class="name">使用规则</div>
          <div class="tags">
            <Tag
              v-for="(item, index) in ticketInfo.useRules"
              :key="index"
              @close="deleteUseRule(index)"
              class="tag"
              color="#DBEFFD"
              text-color="#2A3664"
              closeable
              size="medium"
              >{{ item }}</Tag
            >
            <Tag
              class="tag"
              @click="useRuleModalVisible = true"
              type="primary"
              size="medium"
              >+ 新增使用规则</Tag
            >
          </div>
        </li>
      </ul>
    </div>

    <div class="title flex" v-if="customUseTime">
      <div>编辑使用时间</div>
      <Button
        @click="addUseTime"
        icon="plus"
        text="新增使用时间"
        type="primary"
        size="mini"
      />
    </div>
    <template v-if="customUseTime">
      <SwipeCell v-for="(item, index) in ticketInfo.useTimeList" :key="index">
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
              <div class="name required">使用时间段</div>
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
                  >{{ `${timeFrame.startTime}-${timeFrame.endTime}` }}</Tag
                >
                <Tag
                  class="tag"
                  @click="showTimeFramePickerPopup(index)"
                  type="primary"
                  size="medium"
                  >+ 新增使用时间段</Tag
                >
              </div>
            </li>
          </ul>
        </div>
        <template #right>
          <Button
            class="delete-btn"
            @click.stop="deleteUseTime(index)"
            icon="delete"
            color="#EE0D23"
            plain
          />
        </template>
      </SwipeCell>
    </template>
    <div class="card" v-if="customUseTime && !ticketInfo.useTimeList.length">
      <Empty image-size="1.8rem" description="暂未添加使用时间" />
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <RestaurantPickerPopup
    :visible="restaurantPickerPopupVisible"
    :restaurant-options="restaurantOptions"
    @confirm="setRestaurantIds"
    @cancel="restaurantPickerPopupVisible = false"
  />
  <validityTypePickerPopup
    :visible="validityTypePickerPopupVisible"
    @confirm="setValidityType"
    @cancel="validityTypePickerPopupVisible = false"
  />
  <DateRangePickerPopup
    :visible="dateRangePickerPopupVisible"
    @confirm="setValidityDateRange"
    @cancel="dateRangePickerPopupVisible = false"
  />
  <Dialog
    v-model:show="useRuleModalVisible"
    title="新增使用规则"
    show-cancel-button
    :before-close="addUseRule"
  >
    <input
      class="sku-option-input"
      v-model="useRule"
      type="text"
      placeholder="请输入规则名称"
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
      :tabs="['开始时间', '结束时间']"
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
  Icon,
  Empty,
  Tag,
  Popover,
  Button,
  showConfirmDialog,
  showToast,
  Switch,
  SwipeCell,
  Dialog,
  Popup,
  PickerGroup,
  Picker,
  TimePicker,
} from "vant";
import RestaurantPickerPopup from "./components/restaurantPickerPopup.vue";
import DateRangePickerPopup from "./components/dateRangePickerPopup.vue";
import validityTypePickerPopup from "./components/validityTypePickerPopup.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { cleanObject, weekDayOptions } from "@/utils/index";
import { createTicket } from "./utils/api";
import {
  validityTypeOptions,
  restaurantOptions,
  setRestaurantOptions,
  checkTicketInfo,
} from "./utils/index";

import type { TicketInfo, CreateTicketInfo } from "./utils/type";

const router = useRouter();

const ticketInfo = reactive<Omit<TicketInfo, "id">>({
  restaurantIds: [],
  name: "",
  price: undefined,
  originalPrice: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
  validityDays: undefined,
  validityStartTime: "",
  validityEndTime: "",
  buyLimitNumber: undefined,
  useLimitNumber: undefined,
  useTimeList: [],
  includingDrink: false,
  boxAvailable: false,
  needPreBook: false,
  useRules: [],
});

const restaurantPickerPopupVisible = ref(false);
const validityType = ref(0);
const validityTypePickerPopupVisible = ref(false);
const dateRangePickerPopupVisible = ref(false);
const validityPeriod = ref("");
const salesCommissionRateTipsVisible = ref(false);
const promotionCommissionRateTipsVisible = ref(false);
const useRuleModalVisible = ref(false);
const useRule = ref("");
const customUseTime = ref(false);
const curUseTimeIdx = ref(0);
const weekDayPickerPopupVisible = ref(false);
const curWeekDayType = ref(0);
const timeFramePickerPopupVisible = ref(false);
const openTime = ref(["12", "00"]);
const closeTime = ref(["12", "00"]);

// 计算属性
const restaurantNames = computed(() =>
  ticketInfo.restaurantIds
    .map((id) => restaurantOptions.value.find((item) => item.id === id)?.name)
    .join()
);
const validityTypeDesc = computed(
  () =>
    validityTypeOptions.find((item) => item.value === validityType.value)?.text
);

onMounted(() => {
  setRestaurantOptions();
});

const setRestaurantIds = (restaurantIds: number[]) => {
  ticketInfo.restaurantIds = restaurantIds;
  restaurantPickerPopupVisible.value = false;
};

const setValidityType = (type: number) => {
  validityType.value = type;
  validityTypePickerPopupVisible.value = false;
};

const setValidityDateRange = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  ticketInfo.validityStartTime = startDate;
  ticketInfo.validityEndTime = endDate;
  validityPeriod.value = `${startDate}至${endDate}`;
  dateRangePickerPopupVisible.value = false;
};

const deleteUseRule = (index: number) => ticketInfo.useRules.splice(index, 1);
const addUseRule = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (!useRule.value) {
    showToast("请输入设施名称");
    return;
  }
  ticketInfo.useRules.push(useRule.value);
  useRule.value = "";
  useRuleModalVisible.value = false;
};

const addUseTime = () => {
  ticketInfo.useTimeList.push({
    startWeekDay: undefined,
    endWeekDay: undefined,
    timeFrameList: [],
  });
};
const deleteUseTime = (index: number) => {
  showConfirmDialog({ title: "确定删除该使用时间吗？" })
    .then(() => ticketInfo.useTimeList.splice(index, 1))
    .catch(() => true);
};

const pickWeekDay = (index: number, type: number) => {
  curUseTimeIdx.value = index;
  curWeekDayType.value = type;
  weekDayPickerPopupVisible.value = true;
};
const selectWeekDay = ({ selectedValues }: { selectedValues: number[] }) => {
  if (curWeekDayType.value) {
    ticketInfo.useTimeList[curUseTimeIdx.value].endWeekDay = selectedValues[0];
  } else {
    ticketInfo.useTimeList[curUseTimeIdx.value].startWeekDay =
      selectedValues[0];
  }
  weekDayPickerPopupVisible.value = false;
};

const showTimeFramePickerPopup = (index: number) => {
  curUseTimeIdx.value = index;
  timeFramePickerPopupVisible.value = true;
};
const deleteTimeFrame = (index: number, timeFrameIndex: number) => {
  ticketInfo.useTimeList[index].timeFrameList.splice(timeFrameIndex, 1);
};
const selectTimeFrame = () => {
  ticketInfo.useTimeList[curUseTimeIdx.value].timeFrameList.push({
    startTime: openTime.value.join(":"),
    endTime: closeTime.value.join(":"),
  });
  timeFramePickerPopupVisible.value = false;
};

const save = async () => {
  if (!checkTicketInfo(ticketInfo)) {
    return;
  }

  const {
    includingDrink,
    boxAvailable,
    needPreBook,
    salesCommissionRate,
    promotionCommissionRate,
    ...rest
  } = ticketInfo;
  const createTicketInfo = {
    ...cleanObject(rest),
    salesCommissionRate: (salesCommissionRate as number) / 100,
    promotionCommissionRate: (promotionCommissionRate as number) / 100,
    includingDrink: includingDrink ? 1 : 0,
    boxAvailable: boxAvailable ? 1 : 0,
    needPreBook: needPreBook ? 1 : 0,
  };
  try {
    await createTicket(createTicketInfo as CreateTicketInfo);
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
</style>
