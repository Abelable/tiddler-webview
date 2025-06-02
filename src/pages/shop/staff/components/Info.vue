<template>
  <div class="container">
    <div class="card">
      <ul class="form">
        <li class="form-item row between">
          <div class="name">人员</div>
          <div class="picker row" @click="pickUser">
            <div class="content" v-if="!staffInfo.avatar">请选择人员</div>
            <img
              class="avatar"
              v-if="staffInfo.avatar"
              :src="staffInfo.avatar"
              alt=""
            />
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item row between">
          <div class="name">职位</div>
          <div class="picker row" @click="pickRole">
            <div class="content" :class="{ active: staffInfo.roleId }">
              {{
                staffInfo.roleId
                  ? roleOptions.find((role) => role.id === staffInfo.roleId)
                      ?.name
                  : "请选择职位"
              }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
      </ul>
    </div>

    <div class="btns">
      <button class="delete-btn" v-if="editingStaffInfo" @click="_delete">
        删除
      </button>
      <button
        class="save-btn"
        :class="{ 'create-mode': !editingStaffInfo }"
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
</template>

<script setup lang="ts">
import { Icon, showToast } from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import UserPickerPopup from "@/components/UserPickerPopup.vue";

import { ref, watch } from "vue";
import { initialStaffInfo, roleOptions } from "../utils/index";

import type { StaffDetail } from "../utils/type";

const props = defineProps<{
  editingStaffInfo?: Omit<StaffDetail, "id">;
}>();
const emit = defineEmits(["save", "delete"]);

const staffInfo = ref<Omit<StaffDetail, "id">>(initialStaffInfo);
const userPickerPopupVisible = ref(false);
const rolePickerPopupVisible = ref(false);

watch(props, (props) => {
  if (props.editingStaffInfo) {
    staffInfo.value = props.editingStaffInfo;
  }
});

const pickUser = () => {
  userPickerPopupVisible.value = true;
};
const selectUser = ({ userId, avatar }: { userId: number; avatar: string }) => {
  staffInfo.value.userId = userId;
  staffInfo.value.avatar = avatar;
  userPickerPopupVisible.value = false;
};

const pickRole = () => {
  rolePickerPopupVisible.value = true;
};
const selectRole = ({ selectedValues }: { selectedValues: number[] }) => {
  staffInfo.value.roleId = selectedValues[0];
  rolePickerPopupVisible.value = false;
};

const save = () => {
  if (!staffInfo.value.userId) {
    showToast("请选择人员");
    return;
  }
  if (!staffInfo.value.roleId) {
    showToast("请选择职位");
    return;
  }
  emit("save", { staffInfo: staffInfo.value });
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
