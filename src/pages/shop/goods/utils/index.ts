import { ref } from "vue";
import { showDialog, showToast } from "vant";
import { getFreightTemplateList } from "../../freightTemplate/utils/api";
import { getAddressList } from "../../goodsReturnAddress/utils/api";
import { getGoodsCategoryOptions } from "./api";

import type { FreightTemplateListItem } from "../../freightTemplate/utils/type";
import type { AddressListItem } from "../../goodsReturnAddress/utils/type";
import type { FormGoodsInfo, GoodsCategoryOption } from "./type";

export const initialGoodsInfo = {
  cover: [],
  video: [],
  imageList: [],
  detailImageList: [],
  defaultSpecImage: [],
  name: "",
  freightTemplateId: undefined,
  shopCategoryId: undefined,
  categoryId: undefined,
  returnAddressId: undefined,
  price: undefined,
  marketPrice: undefined,
  stock: undefined,
  salesCommissionRate: undefined,
  promotionCommissionRate: undefined,
  specList: [],
  skuList: [],
  refundSupport: false,
};

export const freightTemplateOptions = ref<FreightTemplateListItem[]>([]);
export const setFreightTemplateOptions = async () =>
  (freightTemplateOptions.value = [
    { id: 0, name: "全国包邮" },
    ...(await getFreightTemplateList()),
  ]);

export const categoryOptions = ref<GoodsCategoryOption[]>([]);
export const setCategoryOptions = async () =>
  (categoryOptions.value = await getGoodsCategoryOptions());

export const returnAddressOptions = ref<AddressListItem[]>([]);
export const setReturnAddressOptions = async () =>
  (returnAddressOptions.value = await getAddressList());

export const checkGoodsInfo = (
  goodsInfo: FormGoodsInfo,
  minSalesCommissionRate: number,
  maxSalesCommissionRate: number,
  minPromotionCommissionRate: number,
  maxPromotionCommissionRate: number
) => {
  if (!goodsInfo.cover.length) {
    showToast("请上传列表图片");
    return false;
  }
  if (!goodsInfo.imageList.length) {
    showToast("请上传至少一张主图图片");
    return false;
  }
  if (!goodsInfo.detailImageList.length) {
    showToast("请上传至少一张详情图片");
    return false;
  }
  if (!goodsInfo.defaultSpecImage.length) {
    showToast("请上传默认规格图片");
    return false;
  }
  if (!goodsInfo.name) {
    showToast("请输入商品名称");
    return false;
  }
  if (goodsInfo.freightTemplateId === undefined) {
    showToast("请选择运费模板");
    return false;
  }
  if (!goodsInfo.categoryId) {
    showToast("请选择商品分类");
    return false;
  }
  if (!goodsInfo.returnAddressId) {
    showToast("请选择退货地址");
    return false;
  }
  if (!goodsInfo.price) {
    showToast("请输入商品店铺价格");
    return false;
  }
  if (!goodsInfo.stock) {
    showToast("请输入商品总库存");
    return false;
  }
  if (
    goodsInfo.salesCommissionRate === undefined ||
    goodsInfo.salesCommissionRate < minSalesCommissionRate
  ) {
    showToast(
      `请输入范围为${minSalesCommissionRate}%～${maxSalesCommissionRate}%的销售佣金比例`
    );
    return false;
  }
  if (
    goodsInfo.promotionCommissionRate === undefined ||
    goodsInfo.promotionCommissionRate < minPromotionCommissionRate
  ) {
    showToast(
      `请输入范围为${minPromotionCommissionRate}%～${maxPromotionCommissionRate}%的推广佣金比例`
    );
    return false;
  }
  if (
    goodsInfo.specList.length &&
    goodsInfo.specList.findIndex(
      (item) => !item.name || !item.options.length
    ) !== -1
  ) {
    showToast("请完善商品规格信息");
    return false;
  }
  if (goodsInfo.skuList.length) {
    if (
      goodsInfo.skuList.findIndex((item) => !item.price || !item.stock) !== -1
    ) {
      showToast("部分商品规格未填写价格或库存");
      return false;
    }
    if (
      goodsInfo.stock <
      goodsInfo.skuList.reduce((stock, sku) => stock + (sku.stock as number), 0)
    ) {
      showDialog({
        title: "请核对库存设置",
        message: "商品总库存，小于商品各规格库存总和",
      });
      return false;
    }
  }
  return true;
};
