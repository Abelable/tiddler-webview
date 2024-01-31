<template>
  <div>
    <Tag
      v-for="(item, index) in list"
      :key="index"
      @close="deleteTag(index)"
      class="tag"
      color="#DBEFFD"
      text-color="#2A3664"
      closeable
      size="medium"
      >{{ item }}</Tag
    >
    <Tag
      class="tag"
      @click="tagModalVisible = true"
      type="primary"
      size="medium"
      >+ 新增{{ title }}</Tag
    >
  </div>

  <Dialog
    v-model:show="tagModalVisible"
    :title="`新增${title}`"
    show-cancel-button
    :before-close="addTag"
  >
    <input
      class="dialog-input"
      v-model="tag"
      type="text"
      :placeholder="`请输入${title}`"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, Tag } from "vant";
import { ref } from "vue";

defineProps<{ title: string; list: string[] }>();
const emit = defineEmits(["deleteTag", "addTag"]);

const tag = ref("");
const tagModalVisible = ref(false);

const deleteTag = (index: number) => emit("deleteTag", { index });
const addTag = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  emit("addTag", { tag: tag.value });
  tag.value = "";
  tagModalVisible.value = false;
};
</script>

<style lang="scss" scoped>
.tag {
  margin-top: 0.32rem;
  margin-right: 0.32rem;
}
</style>
