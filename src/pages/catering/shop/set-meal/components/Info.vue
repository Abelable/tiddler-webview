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
        <li class="form-item">
          <div class="name flex required">
            <div>套餐封面</div>
            <Popover
              v-model:show="imageTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">用于套餐展示</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="setMealInfo.cover"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">套餐名称</div>
          <input
            class="input"
            v-model="setMealInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">套餐售价</div>
          <input
            class="input"
            v-model="setMealInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入售价"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">套餐原价</div>
          <input
            class="input"
            v-model="setMealInfo.originalPrice"
            type="number"
            step="0.01"
            placeholder="请输入套餐原价"
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
              <div class="warning">范围：10%～70%</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <input
            class="input"
            v-model="setMealInfo.salesCommissionRate"
            type="number"
            placeholder="请输入佣金比例"
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
            v-model="setMealInfo.validityDays"
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

    <div class="title flex">
      <div>编辑套餐详情</div>
      <Button
        @click="packageDetailModalVisible = true"
        icon="plus"
        text="新增菜品分类"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in setMealInfo.packageDetails" :key="index">
      <div class="card">
        <div class="title flex" style="margin-top: 0.32rem">
          <div>{{ item.name }}</div>
          <Button
            @click="addFoodItem(index)"
            icon="plus"
            text="新增菜品"
            type="primary"
            size="mini"
          />
        </div>
        <SwipeCell
          v-for="(_item, _index) in item.foodList"
          :key="_index"
          stop-propagation
        >
          <ul class="form unit">
            <li class="form-item flex">
              <div class="name required">菜品名称</div>
              <input
                class="input"
                v-model="_item.name"
                placeholder="请输入菜品名称"
              />
            </li>
            <li class="form-item flex">
              <div class="name required">菜品份数</div>
              <input
                class="input"
                v-model="_item.num"
                type="number"
                step="0.01"
                placeholder="请输入菜品份数"
              />
            </li>
            <li class="form-item flex">
              <div class="name required">菜品价格</div>
              <input
                class="input"
                v-model="_item.price"
                type="number"
                placeholder="请输入菜品价格"
              />
            </li>
          </ul>
          <template #right>
            <Button
              class="delete-btn"
              @click.stop="deleteFoodItem(index, _index)"
              icon="delete"
              color="#EE0D23"
              plain
            />
          </template>
        </SwipeCell>
        <div class="card" v-if="!item.foodList.length">
          <Empty
            image="https://static.tiddler.cn/mp/default_illus/empty.png"
            description="暂无菜品列表"
          />
        </div>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deletePackageDetail(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!setMealInfo.packageDetails.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未设置套餐详情"
      />
    </div>

    <div class="title">填写购买须知</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">限购数量</div>
          <input
            class="input"
            v-model="setMealInfo.buyLimit"
            type="number"
            placeholder="请输入限购数量"
          />
        </li>
        <li class="form-item flex">
          <div class="name">每桌使用数量限制</div>
          <input
            class="input"
            v-model="setMealInfo.perTableUsageLimit"
            type="number"
            placeholder="请输入每桌使用数量限制"
          />
        </li>
        <li class="form-item flex">
          <div class="name">是否需要预定</div>
          <Switch v-model="setMealInfo.needPreBook" size="18px" />
        </li>
        <li class="form-item">
          <div class="name">使用规则</div>
          <div class="tags">
            <Tag
              v-for="(item, index) in setMealInfo.useRules"
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
        <li class="form-item flex">
          <div class="name">自定义使用时间</div>
          <Switch v-model="customUseTime" size="18px" />
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
      <SwipeCell v-for="(item, index) in setMealInfo.useTimeList" :key="index">
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
    <div class="card" v-if="customUseTime && !setMealInfo.useTimeList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加使用时间"
      />
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <MultiPickerPopup
    :visible="restaurantPickerPopupVisible"
    :options="
      restaurantOptions.map((item) => ({ text: item.name, value: item.id }))
    "
    @confirm="setRestaurantIds"
    @cancel="restaurantPickerPopupVisible = false"
  />
  <PickerPopup
    :visible="validityTypePickerPopupVisible"
    :options="validityTypeOptions"
    @confirm="setValidityType"
    @cancel="validityTypePickerPopupVisible = false"
  />
  <DateRangePickerPopup
    :visible="dateRangePickerPopupVisible"
    @confirm="setValidityDateRange"
    @cancel="dateRangePickerPopupVisible = false"
  />
  <Dialog
    v-model:show="packageDetailModalVisible"
    title="新增菜品分类"
    show-cancel-button
    :before-close="addPackageDetail"
  >
    <input
      class="dialog-input"
      v-model="packageDetailName"
      type="text"
      placeholder="请输入菜品分类名称"
    />
  </Dialog>
  <Dialog
    v-model:show="useRuleModalVisible"
    title="新增使用规则"
    show-cancel-button
    :before-close="addUseRule"
  >
    <input
      class="dialog-input"
      v-model="useRule"
      type="text"
      placeholder="请输入规则名称"
    />
  </Dialog>
  <PickerPopup
    :visible="weekDayPickerPopupVisible"
    :options="weekDayOptions"
    @confirm="selectWeekDay"
    @cancel="weekDayPickerPopupVisible = false"
  />
  <TimeRangePickerPopup
    :visible="timeFramePickerPopupVisible"
    @confirm="selectTimeFrame"
    @cancel="timeFramePickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import {
  Uploader,
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
} from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import MultiPickerPopup from "@/components/MultiPickerPopup.vue";
import TimeRangePickerPopup from "@/components/TimeRangePickerPopup.vue";
import DateRangePickerPopup from "@/components/DateRangePickerPopup.vue";

import { ref, computed, onMounted, watch } from "vue";
import { weekDayOptions } from "@/utils/index";
import { uploadFile } from "@/utils/upload";
import {
  initialSetMealInfo,
  validityTypeOptions,
  restaurantOptions,
  setRestaurantOptions,
  checkSetMealInfo,
} from "../utils/index";

import type { FormSetMealInfo } from "../utils/type";

const props = defineProps<{
  shopId: number;
  editingSetMealInfo?: FormSetMealInfo;
}>();
const emit = defineEmits(["save"]);

const setMealInfo = ref<FormSetMealInfo>(initialSetMealInfo);

const imageTipsVisible = ref(false);
const restaurantPickerPopupVisible = ref(false);
const validityType = ref(0);
const validityTypePickerPopupVisible = ref(false);
const dateRangePickerPopupVisible = ref(false);
const validityPeriod = ref("");
const salesCommissionRateTipsVisible = ref(false);
const packageDetailModalVisible = ref(false);
const packageDetailName = ref("");
const useRuleModalVisible = ref(false);
const useRule = ref("");
const customUseTime = ref(false);
const curUseTimeIdx = ref(0);
const weekDayPickerPopupVisible = ref(false);
const curWeekDayType = ref(0);
const timeFramePickerPopupVisible = ref(false);

// 计算属性
const restaurantNames = computed(() =>
  setMealInfo.value.restaurantIds
    .map((id) => restaurantOptions.value.find((item) => item.id === id)?.name)
    .join()
);
const validityTypeDesc = computed(
  () =>
    validityTypeOptions.find((item) => item.value === validityType.value)?.text
);

watch(props, (props) => {
  if (props.editingSetMealInfo) {
    setMealInfo.value = props.editingSetMealInfo;
    const { validityDays, validityStartTime, validityEndTime } =
      props.editingSetMealInfo;
    if (validityDays) {
      validityType.value = 1;
    } else {
      validityType.value = 2;
      validityPeriod.value = `${validityStartTime}至${validityEndTime}`;
    }
  }
});

onMounted(() => {
  setRestaurantOptions(props.shopId);
});

const setRestaurantIds = ({ selectedValues }: { selectedValues: number[] }) => {
  setMealInfo.value.restaurantIds = selectedValues;
  restaurantPickerPopupVisible.value = false;
};

const setValidityType = ({ selectedValues }: { selectedValues: number[] }) => {
  validityType.value = selectedValues[0];
  setMealInfo.value.validityDays = undefined;
  setMealInfo.value.validityStartTime = "";
  setMealInfo.value.validityEndTime = "";
  validityTypePickerPopupVisible.value = false;
};

const setValidityDateRange = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  setMealInfo.value.validityStartTime = startDate;
  setMealInfo.value.validityEndTime = endDate;
  validityPeriod.value = `${startDate}至${endDate}`;
  dateRangePickerPopupVisible.value = false;
};

const addPackageDetail = () => {
  setMealInfo.value.packageDetails.push({
    name: packageDetailName.value,
    foodList: [],
  });
  packageDetailName.value = "";
  packageDetailModalVisible.value = false;
};
const deletePackageDetail = (index: number) =>
  showConfirmDialog({ title: "确定删除该套餐详情吗？" })
    .then(() => {
      setMealInfo.value.packageDetails.splice(index, 1);
    })
    .catch(() => true);
const addFoodItem = (index: number) => {
  setMealInfo.value.packageDetails[index].foodList.push({
    name: "",
    num: undefined,
    price: undefined,
  });
};
const deleteFoodItem = (index: number, foodItemIndex: number) =>
  showConfirmDialog({ title: "确定删除该菜品吗？" })
    .then(() =>
      setMealInfo.value.packageDetails[index].foodList.splice(foodItemIndex, 1)
    )
    .catch(() => true);

const deleteUseRule = (index: number) =>
  setMealInfo.value.useRules.splice(index, 1);
const addUseRule = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (!useRule.value) {
    showToast("请输入规则名称");
    return;
  }
  setMealInfo.value.useRules.push(useRule.value);
  useRule.value = "";
  useRuleModalVisible.value = false;
};

const addUseTime = () => {
  setMealInfo.value.useTimeList.push({
    startWeekDay: undefined,
    endWeekDay: undefined,
    timeFrameList: [],
  });
};
const deleteUseTime = (index: number) => {
  showConfirmDialog({ title: "确定删除该使用时间吗？" })
    .then(() => setMealInfo.value.useTimeList.splice(index, 1))
    .catch(() => true);
};

const pickWeekDay = (index: number, type: number) => {
  curUseTimeIdx.value = index;
  curWeekDayType.value = type;
  weekDayPickerPopupVisible.value = true;
};
const selectWeekDay = ({ selectedValues }: { selectedValues: number[] }) => {
  if (curWeekDayType.value) {
    setMealInfo.value.useTimeList[curUseTimeIdx.value].endWeekDay =
      selectedValues[0];
  } else {
    setMealInfo.value.useTimeList[curUseTimeIdx.value].startWeekDay =
      selectedValues[0];
  }
  weekDayPickerPopupVisible.value = false;
};

const showTimeFramePickerPopup = (index: number) => {
  curUseTimeIdx.value = index;
  timeFramePickerPopupVisible.value = true;
};
const deleteTimeFrame = (index: number, timeFrameIndex: number) => {
  setMealInfo.value.useTimeList[index].timeFrameList.splice(timeFrameIndex, 1);
};
const selectTimeFrame = ({
  startTime,
  endTime,
}: {
  startTime: string[];
  endTime: string[];
}) => {
  setMealInfo.value.useTimeList[curUseTimeIdx.value].timeFrameList.push({
    startTime: startTime.join(":"),
    endTime: endTime.join(":"),
  });
  timeFramePickerPopupVisible.value = false;
};

const save = async () => {
  if (!checkSetMealInfo(setMealInfo.value)) {
    return;
  }

  const { cover, needPreBook, ...rest } = setMealInfo.value;
  emit("save", {
    setMealInfo: {
      ...rest,
      cover: cover[0].url as string,
      needPreBook: needPreBook ? 1 : 0,
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
</style>
