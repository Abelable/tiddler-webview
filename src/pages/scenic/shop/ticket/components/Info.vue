<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">门票类型</div>
          <div class="picker" @click="typePickerPopupVisible = true">
            <div class="content" :class="{ active: typeName }">
              {{ typeName || "请选择门票类型" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">关联景点</div>
          <div class="picker" @click="showScenicPickerPopup">
            <div class="content" :class="{ active: scenicNames }">
              {{ scenicNames || "请选择关联景点" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">门票名称</div>
          <input
            class="input"
            v-model="ticketInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">门票简称</div>
          <input
            class="input"
            v-model="ticketInfo.briefName"
            type="text"
            placeholder="请输入简称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">起始价格</div>
          <input
            class="input"
            v-model="ticketInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入起始价格"
          />
        </li>
        <li class="form-item flex">
          <div class="name">市场价格</div>
          <input
            class="input"
            v-model="ticketInfo.marketPrice"
            type="number"
            step="0.01"
            placeholder="请输入市场价格"
          />
        </li>
        <li class="form-item flex">
          <div class="name flex required">
            <div>佣金比例</div>
            <Popover
              v-model:show="salesCommissionRateTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">范围：10%～50%</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <input
            class="input"
            v-model="ticketInfo.salesCommissionRate"
            type="number"
            placeholder="请输入佣金比例"
          />
          <div class="unit">%</div>
        </li>
      </ul>
    </div>

    <div class="title flex">
      <div>编辑门票规格</div>
      <Button
        @click="categoryPickerPopupVisible = true"
        icon="plus"
        text="新增规格"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in ticketInfo.specList" :key="index">
      <div class="card">
        <div class="title flex" style="margin-top: 0.32rem">
          <div>
            {{
              categoryOptions.find(
                (categoryOption) => categoryOption.id === item.categoryId
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
                    _item.startDate && _item.endDate
                      ? `${dayjs(_item.startDate * 1000).format(
                          "YYYY-MM-DD"
                        )}至${dayjs(_item.endDate * 1000).format("YYYY-MM-DD")}`
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
          <Empty
            image="https://static.tiddler.cn/mp/default_illus/empty.png"
            description="暂无价格列表"
          />
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
    <div class="card" v-if="!ticketInfo.specList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂无规格"
      />
    </div>

    <div class="title">填写费用说明</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">费用包含</div>
          <input
            class="input"
            v-model="ticketInfo.feeIncludeTips"
            type="text"
            placeholder="请输入费用包含内容"
          />
        </li>
        <li class="form-item flex">
          <div class="name">费用不含</div>
          <input
            class="input"
            v-model="ticketInfo.feeNotIncludeTips"
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
            <div class="content" :class="{ active: ticketInfo.bookingTime }">
              {{ ticketInfo.bookingTime || "请选择最晚预定时间" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name">生效时间</div>
          <input
            class="input"
            v-model="ticketInfo.effectiveTime"
            type="number"
            placeholder="请输入生效时间"
          />
          <div class="unit">小时</div>
        </li>
        <li class="form-item flex">
          <div class="name">有效期</div>
          <input
            class="input"
            v-model="ticketInfo.validityTime"
            type="number"
            placeholder="请输入有效期"
          />
          <div class="unit">天</div>
        </li>
        <li class="form-item flex">
          <div class="name">限购数量</div>
          <input
            class="input"
            v-model="ticketInfo.limitNumber"
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
            v-model="ticketInfo.refundTips"
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
          <Switch v-model="ticketInfo.needExchange" size="18px" />
        </li>
        <li class="form-item flex">
          <div class="name">换票说明</div>
          <input
            class="input"
            v-model="ticketInfo.exchangeTips"
            type="text"
            placeholder="请输入换票说明"
          />
        </li>
        <li class="form-item flex" v-show="ticketInfo.needExchange">
          <div class="name">换票时间</div>
          <div class="picker" @click="exchangeTimePickerPopupVisible = true">
            <div class="content" :class="{ active: ticketInfo.exchangeTime }">
              {{ ticketInfo.exchangeTime || "请选择换票时间" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex" v-show="ticketInfo.needExchange">
          <div class="name">换票地点</div>
          <input
            class="input"
            v-model="ticketInfo.exchangeLocation"
            type="text"
            placeholder="请输入换票地点"
          />
        </li>
        <li class="form-item flex">
          <div class="name">入园时间</div>
          <div class="picker" @click="enterTimePickerPopupVisible = true">
            <div class="content" :class="{ active: ticketInfo.enterTime }">
              {{ ticketInfo.enterTime || "请选择入园时间" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name">入园地点</div>
          <input
            class="input"
            v-model="ticketInfo.enterLocation"
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
            v-model="ticketInfo.invoiceTips"
            type="text"
            placeholder="请输入发票说明"
          />
        </li>
        <li class="form-item flex">
          <div class="name">特别提醒</div>
          <input
            class="input"
            v-model="ticketInfo.reminderTips"
            type="text"
            placeholder="请输入特别提醒"
          />
        </li>
      </ul>
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <PickerPopup
    :visible="typePickerPopupVisible"
    :options="typeOptions"
    @confirm="setType"
    @cancel="typePickerPopupVisible = false"
  />
  <PickerPopup
    v-if="ticketInfo.type === 1"
    :visible="scenicPickerPopupVisible"
    :options="
      scenicOptions.map((item) => ({ text: item.name, value: item.id }))
    "
    @confirm="setScenicIds"
    @cancel="scenicPickerPopupVisible = false"
  />
  <MultiPickerPopup
    v-if="ticketInfo.type === 2"
    :visible="scenicPickerPopupVisible"
    :options="
      scenicOptions.map((item) => ({ text: item.name, value: item.id }))
    "
    @confirm="setScenicIds"
    @cancel="scenicPickerPopupVisible = false"
  />
  <TimePickerPopup
    :visible="bookingTimePickerPopupVisible"
    @confirm="setBookTime"
    @cancel="bookingTimePickerPopupVisible = false"
  />
  <PickerPopup
    :visible="refundStatusPickerPopupVisible"
    :options="refundStatusOptions"
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
  <PickerPopup
    :visible="categoryPickerPopupVisible"
    :options="
      categoryOptions.map((item) => ({ text: item.name, value: item.id }))
    "
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
import PickerPopup from "@/components/PickerPopup.vue";
import MultiPickerPopup from "@/components/MultiPickerPopup.vue";
import TimePickerPopup from "@/components/TimePickerPopup.vue";
import TimeRangePickerPopup from "@/components/TimeRangePickerPopup.vue";

import { ref, computed, onMounted, watch } from "vue";
import _ from "lodash";
import dayjs from "dayjs";
import { cleanObject } from "@/utils/index";
import {
  typeOptions,
  refundStatusOptions,
  scenicOptions,
  setScenicOptions,
  categoryOptions,
  setCategoryOptions,
  checkTicketInfo,
  initialTicketInfo,
} from "../utils/index";

import type { FormTicketInfo } from "../utils/type";

const props = defineProps<{
  shopId: number;
  editingTicketInfo?: FormTicketInfo;
}>();
const emit = defineEmits(["save"]);

const ticketInfo = ref<FormTicketInfo>(initialTicketInfo);

const curSpecIndex = ref(0);
const curPriceItemIndex = ref(0);
const typePickerPopupVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const dateRangePickerPopupVisible = ref(false);
const bookingTimePickerPopupVisible = ref(false);
const refundStatusPickerPopupVisible = ref(false);
const exchangeTimePickerPopupVisible = ref(false);
const enterTimePickerPopupVisible = ref(false);
const scenicPickerPopupVisible = ref(false);
const salesCommissionRateTipsVisible = ref(false);

// 计算属性
const scenicNames = computed(() =>
  ticketInfo.value.scenicIds
    .map((id) => scenicOptions.value.find((item) => item.id === id)?.name)
    .join()
);
const typeName = computed(
  () => typeOptions.find((item) => item.value === ticketInfo.value.type)?.text
);
const refundStatusName = computed(
  () =>
    refundStatusOptions.find(
      (item) => item.value === ticketInfo.value.refundStatus
    )?.text
);

watch(props, (props) => {
  if (props.editingTicketInfo) {
    ticketInfo.value = props.editingTicketInfo;
  }
});

onMounted(() => {
  setScenicOptions(props.shopId);
  setCategoryOptions();
});

const setType = ({ selectedValues }: { selectedValues: number[] }) => {
  const type = selectedValues[0];
  if (ticketInfo.value.type !== type) {
    ticketInfo.value.scenicIds = [];
  }
  ticketInfo.value.type = type;
  typePickerPopupVisible.value = false;
};

const showScenicPickerPopup = () => {
  if (!ticketInfo.value.type) {
    showToast("请先选择门票类型");
    return;
  }
  scenicPickerPopupVisible.value = true;
};
const setScenicIds = ({ selectedValues }: { selectedValues: number[] }) => {
  ticketInfo.value.scenicIds = selectedValues;
  scenicPickerPopupVisible.value = false;
};

const setBookTime = (bookingTime: string) => {
  ticketInfo.value.bookingTime = bookingTime;
  bookingTimePickerPopupVisible.value = false;
};

const setRefundStatus = ({ selectedValues }: { selectedValues: number[] }) => {
  ticketInfo.value.refundStatus = selectedValues[0];
  refundStatusPickerPopupVisible.value = false;
};

const setExchangeTime = ({
  startTime,
  endTime,
}: {
  startTime: string[];
  endTime: string[];
}) => {
  ticketInfo.value.exchangeTime = `${startTime.join(":")}-${endTime.join(":")}`;
  exchangeTimePickerPopupVisible.value = false;
};

const setEnterTime = ({
  startTime,
  endTime,
}: {
  startTime: string[];
  endTime: string[];
}) => {
  ticketInfo.value.enterTime = `${startTime.join(":")}-${endTime.join(":")}`;
  enterTimePickerPopupVisible.value = false;
};

const addSpec = ({ selectedValues }: { selectedValues: number[] }) => {
  const categoryId = selectedValues[0];
  categoryOptions.value = categoryOptions.value.map((item) =>
    item.id === categoryId
      ? {
          ...item,
          disabled: true,
        }
      : item
  );
  ticketInfo.value.specList.push({ categoryId, priceList: [] });
  categoryPickerPopupVisible.value = false;
};
const deleteSpec = (index: number) =>
  showConfirmDialog({ title: "确定删除该门票规格吗？" })
    .then(() => {
      categoryOptions.value = categoryOptions.value.map((item) =>
        item.id === ticketInfo.value.specList[index].categoryId
          ? { ...item, disabled: false }
          : item
      );
      ticketInfo.value.specList.splice(index, 1);
    })
    .catch(() => true);

const addPriceItem = (index: number) => {
  curSpecIndex.value = index;
  ticketInfo.value.specList[curSpecIndex.value].priceList.push({
    startDate: undefined,
    endDate: undefined,
    price: undefined,
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
  showConfirmDialog({ title: "确定删除该门票规格吗？" })
    .then(() =>
      ticketInfo.value.specList[index].priceList.splice(priceItemIndex, 1)
    )
    .catch(() => true);
const dateRangeConfirm = (dateList: Date[]) => {
  const priceItem = _.cloneDeep(
    ticketInfo.value.specList[curSpecIndex.value].priceList[
      curPriceItemIndex.value
    ]
  );
  ticketInfo.value.specList[curSpecIndex.value].priceList[
    curPriceItemIndex.value
  ] = {
    ...priceItem,
    startDate: Math.floor(new Date(dateList[0]).getTime() / 1000),
    endDate: Math.floor(new Date(dateList[1]).getTime() / 1000),
  };
  dateRangePickerPopupVisible.value = false;
};

const save = async () => {
  if (!checkTicketInfo(ticketInfo.value)) {
    return;
  }
  const { needExchange, specList, ...rest } = ticketInfo.value;
  emit("save", {
    ticketInfo: {
      ...cleanObject(rest),
      needExchange: needExchange ? 1 : 0,
      specList: specList.map((item) => ({
        ...item,
        priceList: JSON.stringify(item.priceList),
      })),
    },
  });
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
.van-empty {
  padding: 1rem 0;
}
</style>
