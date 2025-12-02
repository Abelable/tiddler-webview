<template>
  <div class="container">
    <div class="card">
      <ul class="form">
        <li class="form-item row between">
          <div class="name required">发货状态</div>
          <div class="picker row" @click="pickStatus">
            <div
              class="content"
              :class="{ active: deliveryInfo.isAllDelivered }"
            >
              {{
                deliveryInfo.isAllDelivered
                  ? statusOptions.find(
                      (status) => status.value === deliveryInfo.isAllDelivered
                    )?.text
                  : "请选择发货状态"
              }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
      </ul>
    </div>

    <div class="title row between">
      <div>包裹列表</div>
      <Button
        @click="addPackage"
        icon="plus"
        text="添加包裹"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in deliveryInfo.packageList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item row between">
            <div class="name required">物流公司</div>
            <div class="picker row" @click="showExpressPickerPopup(index)">
              <div class="content" :class="{ active: item.shipChannel }">
                {{ item.shipChannel || "请选择物流公司" }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item row between">
            <div class="name required">快递单号</div>
            <input
              class="input"
              v-model="item.shipSn"
              placeholder="请输入快递单号"
            />
          </li>
          <li class="form-item" style="padding-bottom: 0">
            <div class="title row between">
              <div>商品列表</div>
              <Button
                @click="addGoodsItem(index)"
                icon="plus"
                text="添加商品"
                type="primary"
                size="mini"
              />
            </div>
            <SwipeCell
              v-for="(_item, _index) in item.goodsList"
              :key="_index"
              stop-propagation
            >
              <ul class="form unit">
                <li class="form-item row between">
                  <div class="name required">商品</div>
                  <div
                    class="picker row"
                    @click="showGoodsPickerPopup(index, _index)"
                  >
                    <div class="content" :class="{ active: _item.name }">
                      {{ _item.name || "请选择商品" }}
                    </div>
                    <Icon name="arrow" />
                  </div>
                </li>
                <li class="form-item row between">
                  <div class="name required">商品数量</div>
                  <input
                    class="input"
                    v-model="_item.number"
                    type="number"
                    placeholder="请输入商品数量"
                  />
                </li>
              </ul>
              <template #right>
                <Button
                  class="delete-btn"
                  @click.stop="deleteGoodsItem(index, _index)"
                  icon="delete"
                  color="#EE0D23"
                  plain
                />
              </template>
            </SwipeCell>
            <div class="card" v-if="!item.goodsList.length">
              <Empty
                image="https://static.tiddler.cn/mp/default_illus/empty.png"
                description="暂未添加商品"
              />
            </div>
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deletePackage(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!deliveryInfo.packageList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加包裹"
      />
    </div>

    <button class="save-btn" @click="save">发货</button>
  </div>

  <PickerPopup
    :visible="statusPickerPopupVisible"
    :options="statusOptions"
    @confirm="selectStatus"
    @cancel="statusPickerPopupVisible = false"
  />
  <ExpressPickerPopup
    :visible="expressPickerPopupVisible"
    @confirm="selectExpress"
    @cancel="expressPickerPopupVisible = false"
  />
  <GoodsPickerPopup
    :visible="goodsPickerPopupVisible"
    :goodsOptions="goodsOptions"
    @confirm="selectGoods"
    @cancel="goodsPickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import {
  Icon,
  showToast,
  Button,
  Empty,
  showConfirmDialog,
  SwipeCell,
} from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import ExpressPickerPopup from "@/components/ExpressPickerPopup.vue";
import GoodsPickerPopup from "./components/GoodsPickerPopup.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { initialDeliveryInfo, statusOptions } from "./utils/index";
import { getUnshippedGoodsList, ship } from "./utils/api";

import type { DeliveryInfo, Goods } from "./utils/type";

const route = useRoute();

const shopId = ref(0);
const orderId = ref(0);
const deliveryInfo = ref<Omit<DeliveryInfo, "id">>(initialDeliveryInfo);
const goodsOptions = ref<Goods[]>([]);
const curPackageIndex = ref(0);
const curGoodsIndex = ref(0);
const statusPickerPopupVisible = ref(false);
const expressPickerPopupVisible = ref(false);
const goodsPickerPopupVisible = ref(false);

onMounted(() => {
  shopId.value = +(route.query.shop_id as string);
  orderId.value = +(route.query.order_id as string);
  setGoodsOptions();
});

const setGoodsOptions = async () => {
  goodsOptions.value = await getUnshippedGoodsList(shopId.value, orderId.value);
};

const pickStatus = () => {
  statusPickerPopupVisible.value = true;
};
const selectStatus = ({ selectedValues }: { selectedValues: number[] }) => {
  deliveryInfo.value.isAllDelivered = selectedValues[0];
  statusPickerPopupVisible.value = false;
};

const showExpressPickerPopup = (index: number) => {
  curPackageIndex.value = index;
  expressPickerPopupVisible.value = true;
};
const selectExpress = ({
  expressCode,
  expressName,
}: {
  expressCode: string;
  expressName: string;
}) => {
  deliveryInfo.value.packageList[curPackageIndex.value].shipCode = expressCode;
  deliveryInfo.value.packageList[curPackageIndex.value].shipChannel =
    expressName;
  expressPickerPopupVisible.value = false;
};

const addPackage = () => {
  deliveryInfo.value.packageList.push({
    shipChannel: "",
    shipCode: "",
    shipSn: "",
    goodsList: [],
  });
};
const deletePackage = (index: number) =>
  showConfirmDialog({ title: "确定删除该包裹吗？" })
    .then(() => {
      deliveryInfo.value.packageList.splice(index, 1);
    })
    .catch(() => true);

const addGoodsItem = (index: number) => {
  curPackageIndex.value = index;
  deliveryInfo.value.packageList[curPackageIndex.value].goodsList.push({
    goodsId: undefined,
    cover: "",
    name: "",
    selectedSkuName: "",
    number: undefined,
  });
};
const deleteGoodsItem = (index: number, _index: number) =>
  showConfirmDialog({ title: "确定删除该商品吗？" })
    .then(() =>
      deliveryInfo.value.packageList[index].goodsList.splice(_index, 1)
    )
    .catch(() => true);

const showGoodsPickerPopup = (index: number, _index: number) => {
  curPackageIndex.value = index;
  curGoodsIndex.value = _index;
  goodsPickerPopupVisible.value = true;
};
const selectGoods = (goods: Goods) => {
  deliveryInfo.value.packageList[curPackageIndex.value].goodsList[
    curGoodsIndex.value
  ] = goods;
  goodsPickerPopupVisible.value = false;
};

const save = () => {
  if (!deliveryInfo.value.isAllDelivered) {
    showToast("请选择发货状态");
    return;
  }
  if (!deliveryInfo.value.packageList.length) {
    showToast("请添加包裹列表");
    return;
  }

  try {
    ship(
      shopId.value,
      orderId.value,
      deliveryInfo.value.isAllDelivered,
      deliveryInfo.value.packageList
    );
    showToast("发货成功");
    setTimeout(() => {
      window.wx.miniProgram.navigateBack();
    }, 2000);
  } catch (error) {
    showToast("发货失败，请重试");
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
}

.container {
  padding: 0.32rem;
  .title {
    margin-bottom: 0.32rem;
    color: #333;
    font-size: 0.3rem;
    font-weight: 550;
    line-height: 1;
  }
  .card {
    margin-bottom: 0.32rem;
    padding: 0 0.32rem;
    background: #fff;
    border-radius: 0.24rem;
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
        .name {
          margin-right: 0.2rem;
          color: #333;
          font-weight: 500;
          line-height: 1;
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
          flex: 1;
        }
        .content {
          flex: 1;
          color: #999;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          &.active {
            color: #333;
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
  .save-btn {
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
}
</style>
<style>
.van-empty {
  padding: 1rem 0;
}
</style>
