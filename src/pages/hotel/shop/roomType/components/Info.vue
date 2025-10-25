<template>
  <div class="container">
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name flex required">
            <div>房间照片</div>
            <Popover
              v-model:show="imageListTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">图片大小不能超过10M</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="roomTypeInfo.imageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">房型名称</div>
          <input
            class="input"
            v-model="roomTypeInfo.name"
            type="text"
            placeholder="请输入房型名称"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">床铺描述</div>
          <input
            class="input"
            v-model="roomTypeInfo.bedDesc"
            type="text"
            placeholder="请输入床铺描述"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">房间面积（m²）</div>
          <input
            class="input"
            v-model="roomTypeInfo.areaSize"
            type="number"
            placeholder="请输入房间面积"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">楼层描述</div>
          <input
            class="input"
            v-model="roomTypeInfo.floorDesc"
            type="text"
            placeholder="请输入楼层描述"
          />
        </li>
        <li class="form-item">
          <div class="name">房间设施</div>
          <div class="tags">
            <TagList
              :list="roomTypeInfo.facilityList"
              title="房间设施"
              @addTag="addFacility"
              @deleteTag="deleteFacility"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="btns">
      <button class="delete-btn" v-if="editingRoomTypeInfo" @click="_delete">
        删除
      </button>
      <button
        class="save-btn"
        :class="{ 'create-mode': !editingRoomTypeInfo }"
        @click="save"
      >
        保存
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Uploader, showToast, Popover, Icon } from "vant";
import TagList from "@/components/TagList.vue";

import { ref, watch } from "vue";
import { uploadFile } from "@/utils/upload";
import { initialRoomTypeInfo } from "../utils/index";
import type { FormRoomType } from "../utils/type";

const props = defineProps<{
  editingRoomTypeInfo?: Omit<FormRoomType, "id">;
}>();
const emit = defineEmits(["save", "delete"]);

const roomTypeInfo = ref<Omit<FormRoomType, "id">>(initialRoomTypeInfo);
const imageListTipsVisible = ref(false);

watch(props, (props) => {
  if (props.editingRoomTypeInfo) {
    roomTypeInfo.value = props.editingRoomTypeInfo;
  }
});

const addFacility = (tag: string) => roomTypeInfo.value.facilityList.push(tag);
const deleteFacility = (index: number) =>
  roomTypeInfo.value.facilityList.splice(index, 1);

const save = () => {
  if (!roomTypeInfo.value.imageList.length) {
    showToast("请上传房间照片");
    return false;
  }
  if (!roomTypeInfo.value.name) {
    showToast("请输入房型名称");
    return;
  }
  if (!roomTypeInfo.value.bedDesc) {
    showToast("请输入床铺描述");
    return;
  }
  if (!roomTypeInfo.value.areaSize) {
    showToast("请输入房间面积");
    return;
  }
  if (!roomTypeInfo.value.floorDesc) {
    showToast("请输入楼层描述");
    return;
  }
  const { imageList, ...rest } = roomTypeInfo.value;
  emit("save", {
    roomTypeInfo: {
      ...rest,
      imageList: imageList.map((item) => item.url || ""),
    },
  });
};

const _delete = () => emit("delete");
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
.container {
  padding: 0.32rem;
  .card {
    padding: 0 0.32rem;
    background: #fff;
    border-radius: 0.24rem;
    overflow: hidden;
    .form {
      .form-item {
        padding: 0.32rem 0;
        font-size: 0.26rem;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        .name {
          margin-right: 0.2rem;
          color: #333;
          font-weight: 500;
          line-height: 1;
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
          color: #333;
          flex: 1;
          text-align: right;
        }
      }
    }
  }
  .btns {
    position: fixed;
    left: 0.32rem;
    bottom: 0.48rem;
    width: calc(100vw - 0.64rem);
    display: flex;
    .save-btn,
    .delete-btn {
      flex: 1;
      height: 0.88rem;
      font-size: 0.3rem;
      font-weight: 550;
      border-radius: 0.18rem;
    }
    .save-btn {
      margin-left: 0.16rem;
      color: #fff;
      background: #212121;
      &.create-mode {
        margin-left: 0;
      }
    }
    .delete-btn {
      margin-right: 0.16rem;
      color: #333;
      border: 1px solid #ddd;
    }
  }
}
</style>
