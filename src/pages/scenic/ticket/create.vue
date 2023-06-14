<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">门票类型</div>
          <div class="picker" @click="typePickerPopupVisible = true">
            <div class="content" :class="{ active: selectedTypeName }">
              {{ selectedTypeName || "请选择门票类型" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">关联景点</div>
          <div class="picker" @click="showScenicPickerPopup">
            <div class="content" :class="{ active: selectedScenicNames }">
              {{ selectedScenicNames || "请选择关联景点" }}
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
    <div class="card" v-if="!ticketInfo.specList.length">
      <Empty image-size="1.8rem" description="暂无规格" />
    </div>

    <div class="title">信息补充及说明</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">费用包含说明</div>
          <input
            class="input"
            v-model="ticketInfo.feeIncludeTips"
            type="text"
            placeholder="请输入费用包含说明"
          />
        </li>
        <li class="form-item flex">
          <div class="name">费用不含说明</div>
          <input
            class="input"
            v-model="ticketInfo.feeNotIncludeTips"
            type="text"
            placeholder="请输入费用不含说明"
          />
        </li>
        <li class="form-item flex">
          <div class="name">预定时间</div>
          <div class="picker" @click="bookingTimePickerPopupVisible = true">
            <div class="content" :class="{ active: ticketInfo.bookingTime }">
              {{ ticketInfo.bookingTime || "请选择预定时间" }}
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
            <div class="content" :class="{ active: selectedRefundStatusName }">
              {{ selectedRefundStatusName || "请选择退票条件" }}
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
        <li class="form-item flex">
          <div class="name">换票时间</div>
          <div class="picker" @click="exchangeTimePickerPopupVisible = true">
            <div class="content" :class="{ active: ticketInfo.exchangeTime }">
              {{ ticketInfo.exchangeTime || "请选择换票时间" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name">换票地点</div>
          <input
            class="input"
            v-model="ticketInfo.exchangeLocation"
            type="text"
            placeholder="请输入换票地点"
          />
        </li>
        <li class="form-item flex">
          <div class="name">其他说明</div>
          <input
            class="input"
            v-model="ticketInfo.otherTips"
            type="text"
            placeholder="请输入其他说明"
          />
        </li>
      </ul>
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <Popup v-model:show="typePickerPopupVisible" position="bottom" round>
    <Picker
      :columns="typeOptions"
      @confirm="selectType"
      @cancel="typePickerPopupVisible = false"
    />
  </Popup>

  <Popup
    v-if="ticketInfo.type === 1"
    v-model:show="scenicPickerPopupVisible"
    position="bottom"
    round
  >
    <Picker
      :columns="scenicOptions"
      @confirm="selectScenic"
      @cancel="scenicPickerPopupVisible = false"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>

  <Popup
    v-if="ticketInfo.type === 2"
    v-model:show="scenicPickerPopupVisible"
    position="bottom"
    round
  >
    <div class="tool-bar">
      <button class="cancel-btn" @click="scenicPickerPopupVisible = false">
        取消
      </button>
      <button class="confirm-btn" @click="selectScenicList">确认</button>
    </div>
    <CheckboxGroup class="scenic-options" v-model="selectedScenicIds">
      <CellGroup>
        <Cell
          v-for="(item, index) in scenicOptions"
          :key="item.id"
          :title="item.name"
          @click="toggleScenicOptionSelected(index)"
        >
          <template #right-icon>
            <Checkbox
              :name="item.id"
              :ref="(el: CheckboxInstance) => (scenicOptionRefs[index] = el)"
              @click.stop
            />
          </template>
        </Cell>
      </CellGroup>
    </CheckboxGroup>
  </Popup>

  <Popup v-model:show="bookingTimePickerPopupVisible" position="bottom" round>
    <PickerGroup
      :tabs="['开始时间', '结束时间']"
      @confirm="bookTimeConfirm"
      @cancel="bookingTimePickerPopupVisible = false"
    >
      <TimePicker v-model="startBookTime" />
      <TimePicker v-model="endBookTime" />
    </PickerGroup>
  </Popup>

  <Popup v-model:show="refundStatusPickerPopupVisible" position="bottom" round>
    <Picker
      :columns="refundStatusOptions"
      @confirm="selectRefundStatus"
      @cancel="refundStatusPickerPopupVisible = false"
    />
  </Popup>

  <Popup v-model:show="exchangeTimePickerPopupVisible" position="bottom" round>
    <PickerGroup
      :tabs="['开始时间', '结束时间']"
      @confirm="exchangeTimeConfirm"
      @cancel="exchangeTimePickerPopupVisible = false"
    >
      <TimePicker v-model="startExchangeTime" />
      <TimePicker v-model="endExchangeTime" />
    </PickerGroup>
  </Popup>

  <Popup v-model:show="categoryPickerPopupVisible" position="bottom" round>
    <Picker
      :columns="categoryOptions"
      @confirm="addSpec"
      @cancel="categoryPickerPopupVisible = false"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>

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
  Popup,
  Picker,
  CheckboxGroup,
  Checkbox,
  CellGroup,
  Cell,
  PickerGroup,
  TimePicker,
  Switch,
  SwipeCell,
  Calendar,
} from "vant";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import dayjs from "dayjs";
import { cleanObject } from "@/utils/index";
import { getScenicOptions } from "@/utils/api";
import { createTicket, getTicketCategoryOptions } from "./utils/api";

import type { CheckboxInstance } from "vant";
import type { Option } from "@/utils/type";
import type {
  TicketCategoryOption,
  TicketInfo,
  CreateTicketInfo,
} from "./utils/type";

const router = useRouter();

const ticketInfo = reactive<Omit<TicketInfo, "id">>({
  type: undefined,
  scenicIds: [],
  name: "",
  price: undefined,
  marketPrice: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
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
  otherTips: "",
  specList: [],
});
const typeOptions = [
  { text: "单景点门票", value: 1 },
  { text: "多景点联票", value: 2 },
];
const refundStatusOptions = [
  { text: "随时可退", value: 1 },
  { text: "有条件退", value: 2 },
  { text: "不可退", value: 3 },
];
const categoryOptions = ref<TicketCategoryOption[]>([]);
const curSpecIndex = ref(0);
const curPriceItemIndex = ref(0);
const typePickerPopupVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const dateRangePickerPopupVisible = ref(false);

const startBookTime = ref([]);
const endBookTime = ref([]);
const bookingTimePickerPopupVisible = ref(false);

const refundStatusPickerPopupVisible = ref(false);

const startExchangeTime = ref([]);
const endExchangeTime = ref([]);
const exchangeTimePickerPopupVisible = ref(false);

const scenicOptions = ref<Option[]>([]);
const scenicPickerPopupVisible = ref(false);
const selectedScenicIds = ref([]);
const scenicOptionRefs = ref<CheckboxInstance[]>([]);
const salesCommissionRateTipsVisible = ref(false);
const promotionCommissionRateTipsVisible = ref(false);

// 计算属性
const selectedTypeName = computed(
  () => typeOptions.find((item) => item.value === ticketInfo.type)?.text
);
const selectedScenicNames = computed(() =>
  ticketInfo.scenicIds
    .map((id) => scenicOptions.value.find((item) => item.id === id)?.name)
    .join()
);
const selectedRefundStatusName = computed(
  () =>
    refundStatusOptions.find((item) => item.value === ticketInfo.refundStatus)
      ?.text
);

onMounted(() => {
  setScenicOptions();
  setCategoryOptions();
});

const setScenicOptions = async () =>
  (scenicOptions.value = await getScenicOptions());
const setCategoryOptions = async () => {
  const options = await getTicketCategoryOptions();
  categoryOptions.value = options.map((item) => ({
    ...item,
    disabled: false,
  }));
};

const selectType = ({ selectedValues }: { selectedValues: number[] }) => {
  ticketInfo.type = selectedValues[0];
  typePickerPopupVisible.value = false;
};

const showScenicPickerPopup = () => {
  if (!ticketInfo.type) {
    showToast("请先选择门票类型");
    return;
  }
  scenicPickerPopupVisible.value = true;
};
const selectScenic = ({ selectedValues }: { selectedValues: number[] }) => {
  ticketInfo.scenicIds = selectedValues;
  scenicPickerPopupVisible.value = false;
};
const toggleScenicOptionSelected = (index: number) => {
  scenicOptionRefs.value[index].toggle();
};
const selectScenicList = () => {
  ticketInfo.scenicIds = selectedScenicIds.value;
  scenicPickerPopupVisible.value = false;
};
const bookTimeConfirm = () => {
  ticketInfo.bookingTime = `${startBookTime.value.join(
    ":"
  )}-${endBookTime.value.join(":")}`;
  bookingTimePickerPopupVisible.value = false;
};
const selectRefundStatus = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  ticketInfo.refundStatus = selectedValues[0];
  refundStatusPickerPopupVisible.value = false;
};
const exchangeTimeConfirm = () => {
  ticketInfo.exchangeTime = `${startExchangeTime.value.join(
    ":"
  )}-${endExchangeTime.value.join(":")}`;
  exchangeTimePickerPopupVisible.value = false;
};

const addSpec = ({ selectedValues }: { selectedValues: number[] }) => {
  categoryOptions.value = categoryOptions.value.map((item) =>
    item.id === selectedValues[0]
      ? {
          ...item,
          disabled: true,
        }
      : item
  );

  ticketInfo.specList.push({ categoryId: selectedValues[0], priceList: [] });
  categoryPickerPopupVisible.value = false;
};
const deleteSpec = (index: number) =>
  showConfirmDialog({ title: "确定删除该门票规格吗？" })
    .then(() => {
      categoryOptions.value = categoryOptions.value.map((item) =>
        item.id === ticketInfo.specList[index].categoryId
          ? { ...item, disabled: false }
          : item
      );
      ticketInfo.specList.splice(index, 1);
    })
    .catch(() => true);

const addPriceItem = (index: number) => {
  curSpecIndex.value = index;
  ticketInfo.specList[curSpecIndex.value].priceList.push({
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
  showConfirmDialog({ title: "确定删除该门票规格吗？" })
    .then(() => ticketInfo.specList[index].priceList.splice(priceItemIndex, 1))
    .catch(() => true);
const dateRangeConfirm = (dateList: Date[]) => {
  const priceItem = _.cloneDeep(
    ticketInfo.specList[curSpecIndex.value].priceList[curPriceItemIndex.value]
  );
  ticketInfo.specList[curSpecIndex.value].priceList[curPriceItemIndex.value] = {
    ...priceItem,
    startDate: new Date(dateList[0]).getTime(),
    endDate: new Date(dateList[0]).getTime(),
  };
  dateRangePickerPopupVisible.value = false;
};

const save = async () => {
  console.log("ticketInfo", ticketInfo.specList);
  if (!ticketInfo.type) {
    showToast("请选择门票类型");
    return;
  }
  if (!ticketInfo.scenicIds.length) {
    showToast("请选择关联景点");
    return;
  }
  if (!ticketInfo.name) {
    showToast("请输入门票名称");
    return;
  }
  if (!ticketInfo.price) {
    showToast("请输入门票起始价格");
    return;
  }
  if (
    !ticketInfo.salesCommissionRate ||
    ticketInfo.salesCommissionRate < 10 ||
    ticketInfo.salesCommissionRate > 70
  ) {
    showToast("请输入范围为10%~70%的销售佣金比例");
    return;
  }
  if (
    !ticketInfo.promotionCommissionRate ||
    ticketInfo.promotionCommissionRate < 10 ||
    ticketInfo.promotionCommissionRate > 70
  ) {
    showToast("请输入范围为2%~70%的推广佣金比例");
    return;
  }
  if (
    !ticketInfo.specList.length ||
    ticketInfo.specList.findIndex((item) => !item.priceList.length) !== -1
  ) {
    showToast("请完善门票规格信息");
    return;
  }
  let incompletePriceItemIndex = -1;
  ticketInfo.specList.forEach((item) => {
    incompletePriceItemIndex = item.priceList.findIndex(
      (_item) => !_item.startDate || !_item.endDate || !_item.price
    );
  });
  if (incompletePriceItemIndex !== -1) {
    showToast("部分门票规格未选择日期范围或未填写价格");
    return;
  }
  if (!ticketInfo.refundStatus) {
    showToast("请选择退票条件");
    return;
  }

  const {
    specList,
    salesCommissionRate,
    promotionCommissionRate,
    needExchange,
    ...rest
  } = ticketInfo;
  const createTicketInfo = {
    ...cleanObject(rest),
    salesCommissionRate: salesCommissionRate / 100,
    promotionCommissionRate: promotionCommissionRate / 100,
    specList: specList.map((item) => ({
      ...item,
      priceList: JSON.stringify(item.priceList),
    })),
    needExchange: needExchange ? 1 : 0,
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
        .sku-options {
          .sku-option {
            margin-top: 0.32rem;
            margin-right: 0.32rem;
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
.sku-option-input {
  margin: 0.32rem 0.32rem 0.5rem;
  padding: 0.24rem;
  width: calc(100% - 0.64rem);
  height: 0.88rem;
  font-size: 0.26rem;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
}
.tool-bar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .cancel-btn,
  .confirm-btn {
    width: 1.2rem;
    height: 0.88rem;
    font-size: 0.28rem;
  }
  .cancel-btn {
    color: #969799;
  }
  .confirm-btn {
    color: #576b95;
  }
}
.scenic-options {
  margin-top: 0.88rem;
  padding-bottom: 0.36rem;
  height: 8rem;
  overflow-y: scroll;
}
</style>
