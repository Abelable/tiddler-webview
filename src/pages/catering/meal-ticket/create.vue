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
      </ul>
    </div>

    <div class="title">设置有效期</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">有效期类型</div>
          <div class="picker" @click="restaurantPickerPopupVisible = true">
            <div class="content" :class="{ active: restaurantNames }">
              {{ restaurantNames || "请选择有效期类型" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
      </ul>
    </div>

    <div class="title">选择适用范围</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name">是否包含酒水饮料</div>
          <Switch v-model="ticketInfo.includingDrink" size="18px" />
        </li>
        <li class="form-item flex">
          <div class="name">能否用于包间消费</div>
          <Switch v-model="ticketInfo.boxAvailable" size="18px" />
        </li>
      </ul>
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <RestaurantPickerPopup
    :visible="restaurantPickerPopupVisible"
    :restaurant-options="restaurantOptions"
    @confirm="setRestaurantIds"
    @cancel="restaurantPickerPopupVisible = false"
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
import RestaurantPickerPopup from "./components/restaurantPickerPopup.vue";
import TimePickerPopup from "./components/timePickerPopup.vue";
import TimeRangePickerPopup from "./components/timeRangePickerPopup.vue";
import RefundStatusPickerPopup from "./components/refundStatusPickerPopup.vue";
import CategoryPickerPopup from "./components/categoryPickerPopup.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import dayjs from "dayjs";
import { cleanObject } from "@/utils/index";
import { createTicket } from "./utils/api";
import {
  refundStatusOptions,
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
  includingDrink: undefined,
  boxAvailable: undefined,
  needPreBook: undefined,
  useRules: [],
});

const bookingTimePickerPopupVisible = ref(false);
const refundStatusPickerPopupVisible = ref(false);
const exchangeTimePickerPopupVisible = ref(false);
const enterTimePickerPopupVisible = ref(false);
const restaurantPickerPopupVisible = ref(false);
const salesCommissionRateTipsVisible = ref(false);
const promotionCommissionRateTipsVisible = ref(false);

// 计算属性
const restaurantNames = computed(() =>
  ticketInfo.restaurantIds
    .map((id) => restaurantOptions.value.find((item) => item.id === id)?.name)
    .join()
);

onMounted(() => {
  setRestaurantOptions();
});
const setRestaurantIds = (restaurantIds: number[]) => {
  ticketInfo.restaurantIds = restaurantIds;
  restaurantPickerPopupVisible.value = false;
};

const save = async () => {
  if (!checkTicketInfo(ticketInfo)) {
    return;
  }

  const { salesCommissionRate, promotionCommissionRate, ...rest } = ticketInfo;
  const createTicketInfo = {
    ...cleanObject(rest),
    salesCommissionRate: (salesCommissionRate as number) / 100,
    promotionCommissionRate: (promotionCommissionRate as number) / 100,
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
