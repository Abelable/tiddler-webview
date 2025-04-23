<template>
  <div class="container">
    <div class="title" v-show="step === 0">填写基本信息</div>
    <div class="card" v-show="step === 0">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">商品分类</div>
          <div class="picker" @click="categoryPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedCategoryName }">
              {{ selectedCategoryName || "请选择商品分类" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">商品名称</div>
          <input
            class="input"
            v-model="goodsInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name">商品介绍</div>
          <input
            class="input"
            v-model="goodsInfo.introduction"
            type="text"
            placeholder="请输入商品介绍"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">店铺价格</div>
          <input
            class="input"
            v-model="goodsInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入店铺价格"
          />
        </li>
        <li class="form-item flex">
          <div class="name">市场价格</div>
          <input
            class="input"
            v-model="goodsInfo.marketPrice"
            type="number"
            step="0.01"
            placeholder="请输入市场价格"
          />
        </li>
        <li class="form-item flex" v-if="goodsInfo.categoryId">
          <div class="name flex required">
            <div>佣金比例</div>
            <Popover
              v-model:show="salesCommissionRateTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">
                {{
                  `范围：${minSalesCommissionRate}%～${maxSalesCommissionRate}%`
                }}
              </div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <input
            class="input"
            v-model="goodsInfo.salesCommissionRate"
            type="number"
            placeholder="请输入佣金比例"
          />
          <div class="unit">%</div>
        </li>
        <li class="form-item flex">
          <div class="name required">商品总库存</div>
          <input
            class="input"
            v-model="goodsInfo.stock"
            type="number"
            placeholder="请输入商品总库存"
          />
        </li>
        <li class="form-item flex">
          <div class="name">限购数量</div>
          <input
            class="input"
            v-model="goodsInfo.numberLimit"
            type="number"
            placeholder="请输入限购数量"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">配送方式</div>
          <div class="picker" @click="deliveryModePickerPopupVisible = true">
            <div class="content" :class="{ active: selectedDeliveryModeDesc }">
              {{ selectedDeliveryModeDesc || "请选择配送方式" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li
          class="form-item flex"
          v-if="goodsInfo.deliveryMode === 1 || goodsInfo.deliveryMode === 3"
        >
          <div class="name required">运费模板</div>
          <div class="picker" @click="freightTemplatePickerPopupVisible = true">
            <div
              class="content"
              :class="{ active: selectedFreightTemplateName }"
            >
              {{ selectedFreightTemplateName || "请选择运费模板" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li
          class="form-item flex"
          v-if="goodsInfo.deliveryMode === 2 || goodsInfo.deliveryMode === 3"
        >
          <div class="name required">提货地址</div>
          <div class="picker" @click="pickupAddressPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedPickupAddress }">
              {{ selectedPickupAddress || "请选择提货地址" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name">7天无理由退换货</div>
          <Switch v-model="goodsInfo.refundStatus" size="18px" />
        </li>
        <li class="form-item flex" v-if="goodsInfo.refundStatus">
          <div class="name required">退货地址</div>
          <div class="picker" @click="refundAddressPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedRefundAddress }">
              {{ selectedRefundAddress || "请选择退货地址" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
      </ul>
    </div>

    <div class="title" v-show="step === 1">上传视频及图片</div>
    <div class="card" v-show="step === 1">
      <ul class="form">
        <li class="form-item">
          <div class="name flex required">
            <div>商品封面</div>
            <Popover
              v-model:show="imageTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">用于商品列表展示</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="goodsInfo.cover"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
          />
        </li>
        <li class="form-item">
          <div class="name flex">
            <div>主图视频</div>
            <Popover
              v-model:show="videoTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">
                <p>时长：建议不超过60s</p>
                <p>大小：建议不超过50M</p>
                <p>尺寸：建议比例16:9或3:4</p>
                <p>格式：mp4</p>
                <p>内容：建议突出商品1-2个核心卖点</p>
              </div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="goodsInfo.video"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
            accept="video/*"
          />
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>主图图片列表</div>
            <Popover
              v-model:show="imageListTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">数量：最多不超过10张</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="goodsInfo.imageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="10"
          />
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>详情图片列表</div>
            <Popover
              v-model:show="detailImageListTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">注意图片顺序</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="goodsInfo.detailImageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>默认规格图片</div>
            <Popover
              v-model:show="defaultSpecImageTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">未设置或未选择规格时，展示的默认图片</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="goodsInfo.defaultSpecImage"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
          />
        </li>
      </ul>
    </div>

    <div class="title flex" v-show="step === 2">
      <div>编辑商品规格</div>
      <Button
        @click="addSpec"
        icon="plus"
        text="新增规格"
        type="primary"
        size="mini"
      />
    </div>
    <div v-show="step === 2">
      <SwipeCell v-for="(item, index) in goodsInfo.specList" :key="index">
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
                  @click="showSpecOptionModal(index)"
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
      </SwipeCell>
      <div class="card" v-if="!goodsInfo.specList.length">
        <Empty image-size="1.8rem" description="暂无规格" />
      </div>

      <div class="title" v-if="goodsInfo.skuList.length">补充规格信息</div>
      <div class="card" v-if="goodsInfo.skuList.length" style="padding: 0">
        <Collapse v-model="activeSkuNames">
          <CollapseItem
            v-for="(item, index) in goodsInfo.skuList"
            :key="index"
            :title="item.name"
            :name="index"
          >
            <ul class="form unit">
              <li class="form-item">
                <div class="name">图片</div>
                <Uploader
                  v-model="item.cover"
                  :after-read="uploadFile"
                  style="margin-top: 0.32rem"
                  max-count="1"
                />
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
                <div class="name required">库存</div>
                <input
                  class="input"
                  v-model="item.stock"
                  type="number"
                  placeholder="请输入库存"
                />
              </li>
            </ul>
          </CollapseItem>
        </Collapse>
      </div>
    </div>
  </div>
  <div class="btns">
    <div class="btn previous-step" v-if="step !== 0" @click="step = step - 1">
      上一步
    </div>
    <div class="btn next-step" @click="nextStep">
      {{ step === 2 ? "点击提交" : "下一步" }}
    </div>
  </div>

  <PickerPopup
    :visible="freightTemplatePickerPopupVisible"
    :options="
      freightTemplateOptions.map((item) => ({
        text: item.name,
        value: item.id,
      }))
    "
    @confirm="selectFreightTemplate"
    @cancel="freightTemplatePickerPopupVisible = false"
  />
  <PickerPopup
    :visible="categoryPickerPopupVisible"
    :options="
      categoryOptions.map((item) => ({
        text: item.name,
        value: item.id,
      }))
    "
    @confirm="selectCategory"
    @cancel="categoryPickerPopupVisible = false"
  />
  <PickerPopup
    :visible="deliveryModePickerPopupVisible"
    :options="deliveryModeOptions"
    @confirm="selectDeliveryMode"
    @cancel="deliveryModePickerPopupVisible = false"
  />
  <MultiPickerPopup
    :visible="pickupAddressPickerPopupVisible"
    :options="
      pickupAddressOptions.map((item) => ({
        text: item.name,
        value: item.id,
      }))
    "
    @confirm="selectPickupAddress"
    @cancel="pickupAddressPickerPopupVisible = false"
  />
  <MultiPickerPopup
    :visible="refundAddressPickerPopupVisible"
    :options="
      refundAddressOptions.map((item) => ({
        text: item.addressDetail,
        value: item.id,
      }))
    "
    @confirm="selectRefundAddress"
    @cancel="refundAddressPickerPopupVisible = false"
  />

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
  </Dialog>
</template>

<script setup lang="ts">
import {
  Uploader,
  Icon,
  Empty,
  Popover,
  Button,
  Dialog,
  Tag,
  SwipeCell,
  showConfirmDialog,
  showToast,
  Collapse,
  CollapseItem,
  Switch,
  showDialog,
} from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import MultiPickerPopup from "@/components/MultiPickerPopup.vue";

import { ref, watch, computed, onMounted } from "vue";
import _ from "lodash";
import { uploadFile } from "@/utils/upload";
import {
  freightTemplateOptions,
  categoryOptions,
  pickupAddressOptions,
  refundAddressOptions,
  initialGoodsInfo,
} from "../utils/index";

import type { GoodsCategoryOption, FormGoodsInfo } from "../utils/type";

const props = defineProps<{
  editingGoodsInfo?: FormGoodsInfo;
}>();
const emit = defineEmits(["save"]);

const goodsInfo = ref<FormGoodsInfo>(
  props.editingGoodsInfo || initialGoodsInfo
);

const step = ref(0);
const specOptionModalVisible = ref(false);
const curSpecIndex = ref(0);
const specOptionName = ref("");
const freightTemplatePickerPopupVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const deliveryModeOptions = ref([
  { text: "快递", value: 1 },
  { text: "自提", value: 2 },
  { text: "快递/自提", value: 3 },
]);
const deliveryModePickerPopupVisible = ref(false);
const pickupAddressPickerPopupVisible = ref(false);
const refundAddressPickerPopupVisible = ref(false);
const imageTipsVisible = ref(false);
const videoTipsVisible = ref(false);
const imageListTipsVisible = ref(false);
const detailImageListTipsVisible = ref(false);
const defaultSpecImageTipsVisible = ref(false);
const minSalesCommissionRate = ref(0);
const maxSalesCommissionRate = ref(0);
const salesCommissionRateTipsVisible = ref(false);
const activeSkuNames = ref([0]);

// 计算属性
const selectedFreightTemplateName = computed(
  () =>
    freightTemplateOptions.value.find(
      (item) => item.id === goodsInfo.value.freightTemplateId
    )?.name
);
const selectedDeliveryModeDesc = computed(
  () =>
    deliveryModeOptions.value.find(
      (item) => item.value === goodsInfo.value.deliveryMode
    )?.text
);
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find((item) => item.id === goodsInfo.value.categoryId)
      ?.name
);
const selectedPickupAddress = computed(() =>
  goodsInfo.value.pickupAddressIds
    .map(
      (id) => pickupAddressOptions.value.find((item) => item.id === id)?.name
    )
    .join()
);
const selectedRefundAddress = computed(() =>
  goodsInfo.value.refundAddressIds
    .map(
      (id) =>
        refundAddressOptions.value.find((item) => item.id === id)?.addressDetail
    )
    .join()
);

onMounted(() => {
  if (props.editingGoodsInfo) {
    const curCategoryOption = categoryOptions.value.find(
      (item) => item.id === props.editingGoodsInfo?.categoryId
    ) as GoodsCategoryOption;
    minSalesCommissionRate.value = curCategoryOption.minSalesCommissionRate;
    maxSalesCommissionRate.value = curCategoryOption.maxSalesCommissionRate;
  }
});

const selectFreightTemplate = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  goodsInfo.value.freightTemplateId = selectedValues[0];
  freightTemplatePickerPopupVisible.value = false;
};
const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  const curCategoryInfo = categoryOptions.value.find(
    (item) => item.id === selectedValues[0]
  ) as GoodsCategoryOption;
  goodsInfo.value.categoryId = curCategoryInfo.id;
  goodsInfo.value.shopCategoryId = curCategoryInfo.shopCategoryId;
  minSalesCommissionRate.value = curCategoryInfo.minSalesCommissionRate;
  maxSalesCommissionRate.value = curCategoryInfo.maxSalesCommissionRate;
  categoryPickerPopupVisible.value = false;
};
const selectDeliveryMode = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  goodsInfo.value.deliveryMode = selectedValues[0];
  deliveryModePickerPopupVisible.value = false;
};
const selectPickupAddress = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  goodsInfo.value.pickupAddressIds = selectedValues;
  pickupAddressPickerPopupVisible.value = false;
};
const selectRefundAddress = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  goodsInfo.value.refundAddressIds = selectedValues;
  refundAddressPickerPopupVisible.value = false;
};

watch(goodsInfo.value.specList, () => {
  let nameList: string[][] = [];
  goodsInfo.value.specList.forEach((item, index) => {
    const nameListUnit = _.cloneDeep(nameList);
    for (let i = 0; i < item.options.length - 1; i++) {
      nameList = [...nameList, ..._.cloneDeep(nameListUnit)];
    }
    item.options.forEach((_item, _index) => {
      if (index === 0) {
        if (!nameList[_index]) nameList[_index] = [];
        nameList[_index][index] = _item;
      } else {
        const unitLength = nameList.length / item.options.length;
        for (let j = 0; j < unitLength; j++) {
          if (!nameList[j + _index * unitLength]) {
            nameList[j + _index * unitLength] = [];
          }
          nameList[j + _index * unitLength][index] = _item;
        }
      }
    });
  });
  goodsInfo.value.skuList = nameList.map((item) => {
    const sku = goodsInfo.value.skuList.find((sku) => sku.name === item.join());
    return (
      sku || {
        name: item.join(),
        cover: [],
        price: undefined,
        salesCommissionRate: undefined,
        stock: undefined,
        numberLimit: undefined,
      }
    );
  });
});

const addSpec = () => {
  goodsInfo.value.specList.push({ name: "", options: [] });
};
const deleteSpec = (index: number) => {
  showConfirmDialog({ title: "确定删除该商品规格吗？" })
    .then(() => goodsInfo.value.specList.splice(index, 1))
    .catch(() => true);
};
const showSpecOptionModal = (index: number) => {
  curSpecIndex.value = index;
  specOptionModalVisible.value = true;
};
const addSpecOption = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (!specOptionName.value) {
    showToast("名称不能为空");
    return false;
  }
  goodsInfo.value.specList[curSpecIndex.value].options.push(
    specOptionName.value
  );
  specOptionName.value = "";
  specOptionModalVisible.value = false;
  return true;
};
const deleteSpecOption = (index: number, optionIndex: number) => {
  goodsInfo.value.specList[index].options.splice(optionIndex, 1);
};

const nextStep = () => {
  switch (step.value) {
    case 0:
      if (!goodsInfo.value.categoryId) {
        showToast("请选择商品分类");
        return false;
      }
      if (!goodsInfo.value.name) {
        showToast("请输入商品名称");
        return false;
      }
      if (!goodsInfo.value.price) {
        showToast("请输入商品店铺价格");
        return false;
      }
      if (
        goodsInfo.value.salesCommissionRate === undefined ||
        goodsInfo.value.salesCommissionRate < minSalesCommissionRate.value
      ) {
        showToast(
          `请输入范围为${minSalesCommissionRate.value}%～${maxSalesCommissionRate.value}%的佣金比例`
        );
        return false;
      }
      if (!goodsInfo.value.stock) {
        showToast("请输入商品总库存");
        return false;
      }
      if (!goodsInfo.value.deliveryMode) {
        showToast("请选择配送方式");
        return false;
      }
      if (
        (goodsInfo.value.deliveryMode === 1 ||
          goodsInfo.value.deliveryMode === 3) &&
        goodsInfo.value.freightTemplateId === undefined
      ) {
        showToast("请选择运费模板");
        return false;
      }
      if (
        (goodsInfo.value.deliveryMode === 2 ||
          goodsInfo.value.deliveryMode === 3) &&
        !goodsInfo.value.pickupAddressIds.length
      ) {
        showToast("请选择提货地址");
        return false;
      }
      if (
        goodsInfo.value.refundStatus &&
        !goodsInfo.value.refundAddressIds.length
      ) {
        showToast("请选择退货地址");
        return false;
      }
      step.value = 1;
      break;

    case 1:
      if (!goodsInfo.value.cover.length) {
        showToast("请上传商品封面图片");
        return false;
      }
      if (!goodsInfo.value.imageList.length) {
        showToast("请上传至少一张主图图片");
        return false;
      }
      if (!goodsInfo.value.detailImageList.length) {
        showToast("请上传至少一张详情图片");
        return false;
      }
      if (!goodsInfo.value.defaultSpecImage.length) {
        showToast("请上传默认规格图片");
        return false;
      }
      step.value = 2;
      break;

    case 2:
      if (
        goodsInfo.value.specList.length &&
        goodsInfo.value.specList.findIndex(
          (item) => !item.name || !item.options.length
        ) !== -1
      ) {
        showToast("请完善商品规格信息");
        return false;
      }
      if (goodsInfo.value.skuList.length) {
        if (
          goodsInfo.value.skuList.findIndex(
            (item) => !item.price || !item.stock
          ) !== -1
        ) {
          showToast("部分商品规格未填写价格或库存");
          return false;
        }
        if (
          (goodsInfo.value.stock || 0) <
          goodsInfo.value.skuList.reduce(
            (stock, sku) => stock + (sku.stock as number),
            0
          )
        ) {
          showDialog({
            title: "请核对库存设置",
            message: "商品总库存，小于商品各规格库存总和",
          });
          return false;
        }
      }
      submit();
      break;
  }
};

const submit = async () => {
  const {
    video,
    cover,
    imageList,
    detailImageList,
    defaultSpecImage,
    specList,
    skuList,
    refundStatus,
    ...rest
  } = goodsInfo.value;

  emit("save", {
    goodsInfo: {
      ...rest,
      video: video.length ? video[0].url : "",
      cover: cover[0].url,
      imageList: imageList.map((item) => item.url),
      detailImageList: detailImageList.map((item) => item.url),
      defaultSpecImage: defaultSpecImage[0].url,
      specList: specList,
      skuList: skuList.map((item) => ({
        ...item,
        cover: item.cover.length ? item.cover[0].url : "",
      })),
      refundStatus: refundStatus ? 1 : 0,
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
.btns {
  position: fixed;
  left: 50%;
  bottom: 0.32rem;
  transform: translateX(-50%);
  display: flex;
  padding: 0.32rem;
  width: 100%;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.88rem;
    font-size: 0.3rem;
    font-weight: 550;
    border-radius: 0.18rem;
  }
  .previous-step {
    margin-right: 0.32rem;
    flex: 1;
    color: #333;
    font-weight: 550;
    border: 1px solid #ddd;
  }
  .next-step {
    flex: 3;
    color: #fff;
    font-weight: 550;
    background: #212121;
  }
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
<style>
.van-empty__description {
  font-size: 0.24rem;
}
.van-collapse-item__title {
  font-size: 0.26rem;
  font-weight: 500;
}
</style>
