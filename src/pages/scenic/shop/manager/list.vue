<template>
  <PullRefresh class="container" v-model="refreshing" @refresh="onRefresh">
    <List
      class="manager-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadMore"
      :finished-text="managerList.length ? '没有更多了' : ''"
    >
      <SwipeCell v-for="(item, index) in managerList" :key="index">
        <div class="manager row" @click="editManager(item.id)">
          <img class="avatar" :src="item.avatar" alt="" />
          <div class="content">
            <div class="name-wrap row">
              <div class="name">{{ item.nickname }}</div>
              <div class="role-tag row">
                {{ roleOptions.find((role) => role.id === item.roleId)?.name }}
              </div>
            </div>
            <div class="mobile">{{ item.mobile }}</div>
          </div>
          <Icon name="edit" size="0.32rem" />
        </div>
        <template #right>
          <Button
            class="delete-btn"
            @click.stop="confirmDelete(index)"
            square
            text="删除"
            type="danger"
          />
        </template>
      </SwipeCell>
    </List>
  </PullRefresh>
  <Empty
    v-if="!managerList.length"
    image="https://static.tiddler.cn/mp/default_illus/empty.png"
    description="暂无人员"
  />
  <button class="add-btn" @click="addManager">新增人员</button>
</template>

<script setup lang="ts">
import {
  PullRefresh,
  List,
  SwipeCell,
  Button,
  Icon,
  showConfirmDialog,
  Empty,
  showToast,
} from "vant";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getManagerList, deleteManager } from "./utils/api";

import type { Manager } from "./utils/type";
import { roleOptions } from "./utils/index";

const route = useRoute();
const router = useRouter();

const shopId = ref(0);
const managerList = ref<Manager[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
let page = 0;

onMounted(async () => {
  shopId.value = +(route.query.shop_id as string);
});

const onRefresh = () => setManagerList(true);
const onLoadMore = () => setManagerList();

const setManagerList = async (init = false) => {
  if (init) {
    page = 0;
    finished.value = false;
  }
  const list = (await getManagerList(shopId.value, ++page)) || {};

  managerList.value = init ? list : [...managerList.value, ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
};

const addManager = () =>
  router.push({
    path: "/scenic/shop/manager/create",
    query: { shop_id: shopId.value },
  });
const editManager = (id: number) =>
  router.push({
    path: "/scenic/shop/manager/edit",
    query: { id, shop_id: shopId.value },
  });

const confirmDelete = (index: number) =>
  showConfirmDialog({ title: "确定删除该人员吗？" })
    .then(async () => {
      try {
        await deleteManager(managerList.value[index].id, shopId.value);
        managerList.value.splice(index, 1);
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
.manager-list {
  padding-bottom: 1.52rem;
  font-size: 0;
  .manager {
    margin-bottom: 1px;
    padding: 0 0.24rem;
    height: 1.5rem;
    background: #fff;
    .avatar {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .content {
      position: relative;
      padding: 0 0.2rem;
      flex: 1;
      .name {
        color: #333;
        font-size: 0.28rem;
        font-weight: 500;
      }
      .role-tag {
        margin-left: 0.12rem;
        height: 0.36rem;
        padding: 0 0.1rem;
        color: #e0d6cb;
        font-size: 0.18rem;
        background: linear-gradient(180deg, #0d61d7 0%, #063e82 100%);
        border-radius: 0.08rem;
      }
      .mobile {
        margin-top: 0.12rem;
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
