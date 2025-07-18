<template>
  <div class="container">
    <div class="card">
      <ul class="form">
        <li class="form-item row between">
          <div class="name">人员</div>
          <div class="picker row" @click="pickUser">
            <div class="content" v-if="!managerInfo.avatar">请选择人员</div>
            <img
              class="avatar"
              v-if="managerInfo.avatar"
              :src="managerInfo.avatar"
              alt=""
            />
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item row between">
          <div class="name">职位</div>
          <div class="picker row" @click="pickRole">
            <div class="content" :class="{ active: managerInfo.roleId }">
              {{
                managerInfo.roleId
                  ? roleOptions.find((role) => role.id === managerInfo.roleId)
                      ?.name
                  : "请选择职位"
              }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item row between" v-if="managerInfo.roleId === 3">
          <div class="name">关联酒店</div>
          <div class="picker row" @click="hotelPickerPopupVisible = true">
            <div class="content" :class="{ active: hotelNames }">
              {{ hotelNames || "请选择关联酒店" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
      </ul>
    </div>

    <div class="btns">
      <button class="delete-btn" v-if="editingManagerInfo" @click="_delete">
        删除
      </button>
      <button
        class="save-btn"
        :class="{ 'create-mode': !editingManagerInfo }"
        @click="save"
      >
        保存
      </button>
    </div>
  </div>

  <PickerPopup
    :visible="rolePickerPopupVisible"
    :options="roleOptions.map((role) => ({ text: role.name, value: role.id }))"
    @confirm="selectRole"
    @cancel="rolePickerPopupVisible = false"
  />
  <UserPickerPopup
    :visible="userPickerPopupVisible"
    @confirm="selectUser"
    @cancel="userPickerPopupVisible = false"
  />
  <MultiPickerPopup
    :visible="hotelPickerPopupVisible"
    :options="hotelOptions.map((item) => ({ text: item.name, value: item.id }))"
    @confirm="setHotelIds"
    @cancel="hotelPickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { Icon, showToast } from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import MultiPickerPopup from "@/components/MultiPickerPopup.vue";
import UserPickerPopup from "@/components/UserPickerPopup.vue";

import { computed, ref, watch } from "vue";
import { initialManagerInfo, roleOptions } from "../utils/index";
import { hotelOptions } from "../../room/utils";

import type { ManagerDetail } from "../utils/type";

const props = defineProps<{
  editingManagerInfo?: Omit<ManagerDetail, "id">;
}>();
const emit = defineEmits(["save", "delete"]);

const managerInfo = ref<Omit<ManagerDetail, "id">>(initialManagerInfo);
const userPickerPopupVisible = ref(false);
const rolePickerPopupVisible = ref(false);
const hotelPickerPopupVisible = ref(false);

const hotelNames = computed(() =>
  managerInfo.value.hotelIds
    .map((id) => hotelOptions.value.find((item) => item.id === id)?.name)
    .join()
);

watch(props, (props) => {
  if (props.editingManagerInfo) {
    managerInfo.value = props.editingManagerInfo;
  }
});

const pickUser = () => {
  userPickerPopupVisible.value = true;
};
const selectUser = ({ userId, avatar }: { userId: number; avatar: string }) => {
  managerInfo.value.userId = userId;
  managerInfo.value.avatar = avatar;
  userPickerPopupVisible.value = false;
};

const pickRole = () => {
  rolePickerPopupVisible.value = true;
};
const selectRole = ({ selectedValues }: { selectedValues: number[] }) => {
  managerInfo.value.roleId = selectedValues[0];
  rolePickerPopupVisible.value = false;
};

const setHotelIds = ({ selectedValues }: { selectedValues: number[] }) => {
  managerInfo.value.hotelIds = selectedValues;
  hotelPickerPopupVisible.value = false;
};

const save = () => {
  const { userId, roleId, hotelIds } = managerInfo.value;
  if (!userId) {
    showToast("请选择人员");
    return;
  }
  if (!roleId) {
    showToast("请选择职位");
    return;
  }
  if (roleId === 3 && !hotelIds.length) {
    showToast("请选择关联酒店");
    return;
  }
  emit("save", { managerInfo: managerInfo.value });
};

const _delete = () => emit("delete");
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
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
        height: 1.1rem;
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
        }
        .content {
          color: #999;
          &.active {
            color: #333;
          }
        }
        .avatar {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }
      }
    }
  }
  .btns {
    display: flex;
    margin-top: 1.28rem;
    .save-btn,
    .delete-btn {
      flex: 1;
      height: 0.88rem;
      font-size: 0.3rem;
      font-weight: 550;
      border-radius: 0.18rem;
    }
    .save-btn {
      margin-left: 0.2rem;
      color: #fff;
      background: #212121;
      &.create-mode {
        margin-left: 0;
      }
    }
    .delete-btn {
      margin-right: 0.2rem;
      color: #333;
      border: 1px solid #ddd;
    }
  }
}
</style>
