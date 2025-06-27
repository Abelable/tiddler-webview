import { ref } from "vue";
import { getFreightTemplateList } from "../../freightTemplate/utils/api";
import { getPickupAddressList } from "../../pickupAddress/utils/api";
import { getRefundAddressList } from "../../refundAddress/utils/api";
import { getGoodsCategoryOptions } from "./api";

import type { FreightTemplateListItem } from "../../freightTemplate/utils/type";
import type { PickupAddressItem } from "../../pickupAddress/utils/type";
import type { RefundAddressItem } from "../../refundAddress/utils/type";
import type { GoodsCategoryOption } from "./type";

export const initialGoodsInfo = {
  cover: [],
  video: [],
  imageList: [],
  detailImageList: [],
  defaultSpecImage: [],
  name: "",
  introduction: "",
  shopCategoryId: undefined,
  categoryId: undefined,
  price: undefined,
  marketPrice: undefined,
  salesCommissionRate: undefined,
  stock: undefined,
  numberLimit: undefined,
  specList: [],
  skuList: [],
  deliveryMode: undefined,
  freightTemplateId: undefined,
  pickupAddressIds: [],
  refundStatus: false,
  refundAddressIds: [],
};

export const freightTemplateOptions = ref<FreightTemplateListItem[]>([]);
export const setFreightTemplateOptions = async (shopId: number) =>
  (freightTemplateOptions.value = [
    { id: 0, name: "全国包邮" },
    ...(await getFreightTemplateList(shopId)),
  ]);

export const categoryOptions = ref<GoodsCategoryOption[]>([]);
export const setCategoryOptions = async (shopId: number) =>
  (categoryOptions.value = await getGoodsCategoryOptions(shopId));

export const pickupAddressOptions = ref<PickupAddressItem[]>([]);
export const setPickupAddressOptions = async (shopId: number) =>
  (pickupAddressOptions.value = await getPickupAddressList(shopId));

export const refundAddressOptions = ref<RefundAddressItem[]>([]);
export const setRefundAddressOptions = async (shopId: number) =>
  (refundAddressOptions.value = await getRefundAddressList(shopId));
