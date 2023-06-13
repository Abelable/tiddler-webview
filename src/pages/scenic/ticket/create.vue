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
          <div class="name required">门票名称</div>
          <input
            class="input"
            v-model="ticketInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <!-- <li class="form-item flex">
          <div class="name required">门票分类</div>
          <div class="picker" @click="categoryPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedCategoryName }">
              {{ selectedCategoryName || "请选择门票分类" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li> -->
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

    <!-- <div class="title flex">
      <div>编辑门票规格</div>
      <Button
        @click="addSpec"
        icon="plus"
        text="新增规格"
        type="primary"
        size="mini"
      />
    </div> -->
    <!-- <SwipeCell v-for="(item, index) in ticketInfo.specList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">规格名称</div>
            <input
              class="input"
              v-model="item.name"
              type="text"
              placeholder="请输入规格名称"
            />
          </li>
          <li class="form-item">
            <div class="name required">规格选项</div>
            <div class="sku-options">
              <Tag
                v-for="(option, optionIndex) in item.options"
                :key="optionIndex"
                @close="deleteSpecOption(index, optionIndex)"
                class="sku-option"
                color="#DBEFFD"
                text-color="#2A3664"
                closeable
                size="medium"
                >{{ option }}</Tag
              >
              <Tag
                class="sku-option"
                @click="showSpecOptionModalVisible(index)"
                type="primary"
                size="medium"
                >+ 新增选项</Tag
              >
            </div>
          </li>
        </ul>
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
    </SwipeCell> -->
    <div class="card" v-if="!ticketInfo.specList.length">
      <Empty image-size="1.8rem" description="暂无规格" />
    </div>
  </div>

  <button class="upload-btn" @click="save">点击上传</button>

  <Popup v-model:show="typePickerPopupVisible" position="bottom" round>
    <Picker
      :columns="typeOptions"
      @confirm="selectType"
      @cancel="typePickerPopupVisible = false"
    />
  </Popup>

  <!-- <Popup v-model:show="categoryPickerPopupVisible" position="bottom" round>
    <Picker
      :columns="categoryOptions"
      @confirm="selectCategory"
      @cancel="categoryPickerPopupVisible = false"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>

  <Dialog
    v-model:show="specOptionModalVisible"
    title="新增规格选项"
    show-cancel-button
    :before-close="addSpecOption"
  >
    <input
      class="sku-option-input"
      v-model="specOptionName"
      type="text"
      placeholder="请输入规格选项名称"
    />
  </Dialog> -->
</template>

<script setup lang="ts">
import {
  Icon,
  Empty,
  Popover,
  Button,
  Dialog,
  showConfirmDialog,
  showToast,
  Popup,
  Picker,
  showDialog,
} from "vant";
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import _, { values } from "lodash";
import { createTicket, getTicketCategoryOptions } from "./utils/api";

import type {
  TicketTypeOption,
  TicketCategoryOption,
  TicketInfo,
  CreateTicketInfo,
} from "./utils/type";

const router = useRouter();

const typeOptions = [
  { text: "单景点门票", value: 1 },
  { text: "多景点联票", value: 2 },
];
const categoryOptions = ref<TicketCategoryOption[]>([]);
const ticketInfo = reactive<Omit<TicketInfo, "id">>({
  type: undefined,
  name: "",
  price: undefined,
  marketPrice: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
  specList: [],
});
const specOptionModalVisible = ref(false);
const curSpecIndex = ref(0);
const specOptionName = ref("");
const categoryPickerPopupVisible = ref(false);
const typePickerPopupVisible = ref(false);
const salesCommissionRateTipsVisible = ref(false);
const promotionCommissionRateTipsVisible = ref(false);

// 计算属性
const selectedTypeName = computed(
  () => typeOptions.find((item) => item.value === ticketInfo.type)?.text
);
// const selectedCategoryName = computed(
//   () =>
//     categoryOptions.value.find((item) => item.id === ticketInfo.categoryId)
//       ?.name
// );

onMounted(() => {
  setCategoryOptions();
});

const setCategoryOptions = async () =>
  (categoryOptions.value = await getTicketCategoryOptions());

const selectType = ({ selectedValues }: { selectedValues: number[] }) => {
  ticketInfo.type = selectedValues[0];
  typePickerPopupVisible.value = false;
};
// const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
//   ticketInfo.categoryId = selectedValues[0];
//   categoryPickerPopupVisible.value = false;
// };

watch(ticketInfo.specList, () => {
  let nameList: string[][] = [];
  // ticketInfo.specList.forEach((item, index) => {
  //   const nameListUnit = _.cloneDeep(nameList);
  //   for (let i = 0; i < item.options.length - 1; i++) {
  //     nameList = [...nameList, ..._.cloneDeep(nameListUnit)];
  //   }
  //   item.options.forEach((_item, _index) => {
  //     if (index === 0) {
  //       if (!nameList[_index]) nameList[_index] = [];
  //       nameList[_index][index] = _item;
  //     } else {
  //       const unitLength = nameList.length / item.options.length;
  //       for (let j = 0; j < unitLength; j++) {
  //         if (!nameList[j + _index * unitLength]) {
  //           nameList[j + _index * unitLength] = [];
  //         }
  //         nameList[j + _index * unitLength][index] = _item;
  //       }
  //     }
  //   });
  // });
});

// const addSpec = () => {
//   ticketInfo.specList.push({ name: "", options: [] });
// };
// const deleteSpec = (index: number) => {
//   showConfirmDialog({ title: "确定删除该门票规格吗？" })
//     .then(() => ticketInfo.specList.splice(index, 1))
//     .catch(() => true);
// };
// const showSpecOptionModalVisible = (index: number) => {
//   curSpecIndex.value = index;
//   specOptionModalVisible.value = true;
// };
// const addSpecOption = (action: string) => {
//   if (action === "cancel") {
//     return true;
//   }
//   if (!specOptionName.value) {
//     showToast("名称不能为空");
//     return false;
//   }
//   ticketInfo.specList[curSpecIndex.value].options.push(specOptionName.value);
//   specOptionName.value = "";
//   specOptionModalVisible.value = false;
//   return true;
// };
// const deleteSpecOption = (index: number, optionIndex: number) => {
//   ticketInfo.specList[index].options.splice(optionIndex, 1);
// };

const save = async () => {
  if (!ticketInfo.name) {
    showToast("请输入门票名称");
    return;
  }
  if (!ticketInfo.price) {
    showToast("请输入门票店铺价格");
    return;
  }
  if (ticketInfo.salesCommissionRate === undefined) {
    showToast("请输入销售佣金比例");
    return;
  }
  if (ticketInfo.promotionCommissionRate === undefined) {
    showToast("请输入推广佣金比例");
    return;
  }
  // if (
  //   ticketInfo.specList.length &&
  //   ticketInfo.specList.findIndex(
  //     (item) => !item.name || !item.options.length
  //   ) !== -1
  // ) {
  //   showToast("请完善门票规格信息");
  //   return;
  // }
  const {
    marketPrice,
    specList,
    salesCommissionRate,
    promotionCommissionRate,
    ...rest
  } = ticketInfo;
  const createTicketInfo: CreateTicketInfo = {
    ...rest,
    salesCommissionRate: salesCommissionRate / 100,
    promotionCommissionRate: promotionCommissionRate / 100,
    specList: JSON.stringify(specList),
  };
  if (marketPrice) createTicketInfo.marketPrice = marketPrice;
  try {
    await createTicket(createTicketInfo);
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
        .sku-options {
          .sku-option {
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
.sku-option-input {
  margin: 0.32rem 0.32rem 0.5rem;
  padding: 0.24rem;
  width: calc(100% - 0.64rem);
  height: 0.88rem;
  font-size: 0.26rem;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
}
</style>
