<template>
  <div class="template-list">
    <SwipeCell v-for="(item, index) in templateList" :key="index">
      <div class="template" @click="editTemplate(item.id)">
        <div class="name">{{ item.name }}</div>
        <Icon name="edit" size="0.3rem" />
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
  <Empty
    v-if="!templateList.length"
    image="https://static.tiddler.cn/mp/default_illus/empty.png"
    description="暂无运费模板列表"
  />
  <button class="add-btn" @click="addTemplate">新增运费模板</button>
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

import { getFreightTemplateList, deleteFreightTemplate } from "./utils/api";

import { FreightTemplateListItem } from "./utils/type";

const router = useRouter();

const templateList = ref<FreightTemplateListItem[]>([]);

onMounted(async () => {
  templateList.value = await getFreightTemplateList();
});

const addTemplate = () => router.push("/shop/freight_template/create");
const editTemplate = (id: number) =>
  router.push({
    path: "/shop/freight_template/edit",
    query: { id },
  });

const deleteTempalte = (index: number) =>
  showConfirmDialog({ title: "确定删除该运费模板吗？" })
    .then(async () => {
      try {
        await deleteFreightTemplate(templateList.value[index].id);
        templateList.value.splice(index, 1);
      } catch (error) {
        showToast("删除失败，请重试");
      }
      return true;
    })
    .catch(() => true);
</script>

<style lang="scss" scoped>
.template-list {
  padding-bottom: 1.52rem;
  font-size: 0;
  .template {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1px;
    padding: 0 0.24rem;
    height: 1.2rem;
    background: #fff;
    .name {
      color: #333;
      font-size: 0.3rem;
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
