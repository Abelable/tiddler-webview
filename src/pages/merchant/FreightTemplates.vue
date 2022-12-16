<template>
  <div class="template-list">
    <SwipeCell
      v-for="(item, index) in templateList"
      :key="index"
      :name="index"
      :before-close="beforeClose"
    >
      <div class="template">
        <div class="name">{{ item }}</div>
        <Icon name="edit" size="0.3rem" />
      </div>
      <template #right>
        <Button class="delete-btn" square text="删除" type="danger" />
      </template>
    </SwipeCell>
  </div>
</template>

<script setup lang="ts">
import { SwipeCell, Button, Icon, showConfirmDialog } from "vant";
import { ref } from "vue";

const templateList = ref(["模板名称1", "模板名称2", "模板名称3", "模板名称4"]);

const beforeClose = (res: any) => {
  if (res.position === "right") {
    showConfirmDialog({ title: "确定删除该模板吗？" })
      .then(() => {
        templateList.value.splice(res.name, 1);
        return true;
      })
      .catch(() => true);
  } else {
    return true;
  }
};
</script>

<style lang="scss" scoped>
.template-list {
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
</style>
