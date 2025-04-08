<template>
  <div class="address-list">
    <SwipeCell v-for="(item, index) in addressList" :key="index">
      <div class="address row" @click="editAddress(item.id)">
        <Icon name="location-o" size="0.32rem" />
        <div class="content">
          <div class="row">
            <div class="name">{{ item.consigneeName }}</div>
            <div class="mobile">{{ item.mobile }}</div>
          </div>
          <div class="detail limit">{{ item.addressDetail }}</div>
        </div>
        <Icon name="edit" size="0.32rem" />
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteTempalte(index)"
          square
          text="删除"
          type="danger"
        />
      </template>
    </SwipeCell>
  </div>
  <Empty v-if="!addressList.length" description="暂无退货地址列表" />
  <button class="add-btn" @click="addAddress">新增退货地址</button>
</template>

<script setup lang="ts">
import {
  SwipeCell,
  Button,
  Icon,
  showConfirmDialog,
  Empty,
  showToast,
} from "vant";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAddressList, deleteAddress } from "./utils/api";

import type { AddressListItem } from "./utils/type";

const router = useRouter();

const addressList = ref<AddressListItem[]>([]);

onMounted(async () => {
  addressList.value = await getAddressList();
});

const addAddress = () => router.push("/shop/refund_address/create");
const editAddress = (id: number) =>
  router.push({
    path: "/shop/refund_address/edit",
    query: { id },
  });

const deleteTempalte = (index: number) =>
  showConfirmDialog({ title: "确定删除该退货地址吗？" })
    .then(async () => {
      try {
        await deleteAddress(addressList.value[index].id);
        addressList.value.splice(index, 1);
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);
</script>

<style lang="scss" scoped>
.limit {
  display: -webkit-box;
  overflow: hidden;
  line-height: 1;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.row {
  display: flex;
  align-items: center;
}
.address-list {
  padding-bottom: 1.52rem;
  font-size: 0;
  .address {
    margin-bottom: 1px;
    padding: 0 0.24rem;
    height: 1.5rem;
    background: #fff;
    .content {
      position: relative;
      padding: 0 0.2rem;
      flex: 1;
      .name,
      .mobile {
        color: #333;
        font-size: 0.28rem;
      }
      .mobile {
        margin-left: 0.2rem;
      }
      .detail {
        margin-top: 0.2rem;
        width: 100%;
        color: #666;
        font-size: 0.26rem;
      }
    }
  }
  .delete-btn {
    height: 100%;
  }
}
.add-btn {
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
</style>
