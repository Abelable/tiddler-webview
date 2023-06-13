<template>
  <div class="container">
    <div class="title">上传视频及图片</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name flex required">
            <div>列表图片</div>
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
            v-model="goodsInfo.image"
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

    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
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
          <div class="name required">退货地址</div>
          <div class="picker" @click="returnAddressPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedReturnAddress }">
              {{ selectedReturnAddress || "请选择退货地址" }}
            </div>
            <Icon name="arrow" />
          </div>
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
            v-model="goodsInfo.salesCommissionRate"
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
            v-model="goodsInfo.promotionCommissionRate"
            type="number"
            placeholder="请输入推广佣金比例"
          />
          <div class="unit">%</div>
        </li>
      </ul>
    </div>

    <div class="title flex">
      <div>编辑商品规格</div>
      <Button
        @click="addSpec"
        icon="plus"
        text="新增规格"
        type="primary"
        size="mini"
      />
    </div>
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
                v-model="item.image"
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

  <button class="upload-btn" @click="save">点击上传</button>

  <Popup
    v-model:show="freightTemplatePickerPopupVisible"
    position="bottom"
    round
  >
    <Picker
      :columns="freightTemplateOptions"
      @confirm="selectFreightTemplate"
      @cancel="freightTemplatePickerPopupVisible = false"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>
  <Popup v-model:show="categoryPickerPopupVisible" position="bottom" round>
    <Picker
      :columns="categoryOptions"
      @confirm="selectCategory"
      @cancel="categoryPickerPopupVisible = false"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>
  <Popup v-model:show="returnAddressPickerPopupVisible" position="bottom" round>
    <Picker
      :columns="returnAddressOptions"
      @confirm="selectReturnAddress"
      @cancel="returnAddressPickerPopupVisible = false"
      :columns-field-names="{ text: 'addressDetail', value: 'id' }"
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
  Popup,
  Picker,
  showDialog,
} from "vant";
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import { uploadFile } from "@/utils/upload";
import { createGoods, getGoodsCategoryOptions } from "./utils/api";
import { getFreightTemplateList } from "../freightTemplate/utils/api";
import { getAddressList } from "../goodsReturnAddress/utils/api";

import type {
  GoodsInfo,
  GoodsCategoryOption,
  CreateGoodsInfo,
} from "./utils/type";
import type { FreightTemplateListItem } from "../freightTemplate/utils/type";
import type { AddressListItem } from "../goodsReturnAddress/utils/type";

const router = useRouter();

const freightTemplateOptions = ref<FreightTemplateListItem[]>([]);
const categoryOptions = ref<GoodsCategoryOption[]>([]);
const returnAddressOptions = ref<AddressListItem[]>([]);
const goodsInfo = reactive<Omit<GoodsInfo, "id">>({
  image: [],
  video: [],
  imageList: [],
  detailImageList: [],
  defaultSpecImage: [],
  name: "",
  freightTemplateId: undefined,
  categoryId: undefined,
  returnAddressId: undefined,
  price: undefined,
  marketPrice: undefined,
  stock: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
  specList: [],
  skuList: [],
});
const specOptionModalVisible = ref(false);
const curSpecIndex = ref(0);
const specOptionName = ref("");
const freightTemplatePickerPopupVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const returnAddressPickerPopupVisible = ref(false);
const imageTipsVisible = ref(false);
const videoTipsVisible = ref(false);
const imageListTipsVisible = ref(false);
const detailImageListTipsVisible = ref(false);
const defaultSpecImageTipsVisible = ref(false);
const salesCommissionRateTipsVisible = ref(false);
const promotionCommissionRateTipsVisible = ref(false);
const activeSkuNames = ref([0]);

// 计算属性
const selectedFreightTemplateName = computed(
  () =>
    freightTemplateOptions.value.find(
      (item) => item.id === goodsInfo.freightTemplateId
    )?.name
);
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find((item) => item.id === goodsInfo.categoryId)?.name
);
const selectedReturnAddress = computed(
  () =>
    returnAddressOptions.value.find(
      (item) => item.id === goodsInfo.returnAddressId
    )?.addressDetail
);

onMounted(() => {
  setFreightTemplateOptions();
  setCategoryOptions();
  setReturnAddressOptions();
});

const setFreightTemplateOptions = async () =>
  (freightTemplateOptions.value = [
    { id: 0, name: "包邮" },
    ...(await getFreightTemplateList()),
  ]);
const setCategoryOptions = async () =>
  (categoryOptions.value = await getGoodsCategoryOptions());
const setReturnAddressOptions = async () =>
  (returnAddressOptions.value = await getAddressList());
const selectFreightTemplate = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  goodsInfo.freightTemplateId = selectedValues[0];
  freightTemplatePickerPopupVisible.value = false;
};
const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  goodsInfo.categoryId = selectedValues[0];
  categoryPickerPopupVisible.value = false;
};
const selectReturnAddress = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  goodsInfo.returnAddressId = selectedValues[0];
  returnAddressPickerPopupVisible.value = false;
};

watch(goodsInfo.specList, () => {
  let nameList: string[][] = [];
  goodsInfo.specList.forEach((item, index) => {
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
  goodsInfo.skuList = nameList.map((item) => {
    const sku = goodsInfo.skuList.find((sku) => sku.name === item.join());
    return (
      sku || {
        name: item.join(),
        image: [],
        price: undefined,
        stock: undefined,
      }
    );
  });
});

const addSpec = () => {
  goodsInfo.specList.push({ name: "", options: [] });
};
const deleteSpec = (index: number) => {
  showConfirmDialog({ title: "确定删除该商品规格吗？" })
    .then(() => goodsInfo.specList.splice(index, 1))
    .catch(() => true);
};
const showSpecOptionModalVisible = (index: number) => {
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
  goodsInfo.specList[curSpecIndex.value].options.push(specOptionName.value);
  specOptionName.value = "";
  specOptionModalVisible.value = false;
  return true;
};
const deleteSpecOption = (index: number, optionIndex: number) => {
  goodsInfo.specList[index].options.splice(optionIndex, 1);
};

const save = async () => {
  if (!goodsInfo.image.length) {
    showToast("请上传列表图片");
    return;
  }
  if (!goodsInfo.imageList.length) {
    showToast("请上传至少一张主图图片");
    return;
  }
  if (!goodsInfo.detailImageList.length) {
    showToast("请上传至少一张详情图片");
    return;
  }
  if (!goodsInfo.defaultSpecImage.length) {
    showToast("请上传默认规格图片");
    return;
  }
  if (!goodsInfo.name) {
    showToast("请输入商品名称");
    return;
  }
  if (goodsInfo.freightTemplateId === undefined) {
    showToast("请选择运费模板");
    return;
  }
  if (!goodsInfo.categoryId) {
    showToast("请选择商品分类");
    return;
  }
  if (!goodsInfo.returnAddressId) {
    showToast("请选择退货地址");
    return;
  }
  if (!goodsInfo.price) {
    showToast("请输入商品店铺价格");
    return;
  }
  if (!goodsInfo.stock) {
    showToast("请输入商品总库存");
    return;
  }
  if (goodsInfo.salesCommissionRate === undefined) {
    showToast("请输入销售佣金比例");
    return;
  }
  if (goodsInfo.promotionCommissionRate === undefined) {
    showToast("请输入推广佣金比例");
    return;
  }
  if (
    goodsInfo.specList.length &&
    goodsInfo.specList.findIndex(
      (item) => !item.name || !item.options.length
    ) !== -1
  ) {
    showToast("请完善商品规格信息");
    return;
  }
  if (goodsInfo.skuList.length) {
    if (
      goodsInfo.skuList.findIndex((item) => !item.price || !item.stock) !== -1
    ) {
      showToast("部分商品规格未填写价格或库存");
      return;
    }
    if (
      goodsInfo.stock <
      goodsInfo.skuList.reduce((stock, sku) => stock + (sku.stock as number), 0)
    ) {
      showDialog({
        title: "请核对库存设置",
        message: "商品总库存，小于商品各规格库存总和",
      });
      return;
    }
  }
  const {
    image,
    video,
    imageList,
    detailImageList,
    defaultSpecImage,
    marketPrice,
    specList,
    skuList,
    salesCommissionRate,
    promotionCommissionRate,
    ...rest
  } = goodsInfo;
  const createGoodsInfo: CreateGoodsInfo = {
    ...rest,
    image: image[0].url as string,
    imageList: JSON.stringify(imageList.map((item) => item.url)),
    detailImageList: JSON.stringify(detailImageList.map((item) => item.url)),
    defaultSpecImage: defaultSpecImage[0].url as string,
    salesCommissionRate: salesCommissionRate / 100,
    promotionCommissionRate: promotionCommissionRate / 100,
    specList: JSON.stringify(specList),
    skuList: JSON.stringify(
      skuList.map((item) => ({
        ...item,
        image: item.image.length ? item.image[0].url : "",
      }))
    ),
  };
  if (video.length) createGoodsInfo.video = video[0].url;
  if (marketPrice) createGoodsInfo.marketPrice = marketPrice;
  try {
    await createGoods(createGoodsInfo);
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
