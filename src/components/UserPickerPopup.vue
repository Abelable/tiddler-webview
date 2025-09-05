<template>
  <Popup
    :show="visible"
    @click-overlay="cancel"
    position="bottom"
    round
    safe-area-inset-bottom
  >
    <div class="container">
      <div class="title">选择人员</div>
      <form action="/">
        <Search
          v-model="keywords"
          @search="setUserOptions"
          placeholder="请输入手机号或昵称进行搜索"
        />
      </form>
      <div class="user-options" v-if="userOptions.length">
        <RadioGroup v-model="userId">
          <Radio
            v-for="(user, index) in userOptions"
            :key="index"
            :name="user.id"
            label-position="left"
          >
            <div class="user-option">
              <img class="avatar" :src="user.avatar" alt="" />
              <div class="content">
                <div class="name">{{ user.nickname }}</div>
                <div class="mobile">{{ user.mobile }}</div>
              </div>
            </div>
          </Radio>
        </RadioGroup>
      </div>
      <Empty
        v-if="!userOptions.length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂无人员"
      />
      <div class="btns-wrap row">
        <div class="cancel-btn row center" @click="cancel">取消</div>
        <div
          class="confirm-btn row center"
          :class="{ active: userId }"
          @click="confirm"
        >
          确定
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Search, RadioGroup, Radio, Empty } from "vant";
import { onMounted, ref } from "vue";
import { getUserOptions } from "@/utils/api";

import type { User } from "@/utils/type";

defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const keywords = ref("");
const userOptions = ref<User[]>([]);
const userId = ref(0);

onMounted(() => {
  setUserOptions();
});

const setUserOptions = async () => {
  userOptions.value = await getUserOptions(keywords.value);
};

const confirm = () => {
  if (userId.value === 0) {
    return;
  }
  const user = userOptions.value.find((user) => user.id === userId.value);
  emit("confirm", {
    id: user?.id,
    avatar: user?.avatar,
    nickname: user?.nickname,
  });
};
const cancel = () => {
  emit("cancel");
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  &.center {
    justify-content: center;
  }
}
.container {
  padding: 0.32rem;
  .title {
    margin-bottom: 0.32rem;
    color: #333;
    font-size: 0.32rem;
    text-align: center;
    font-weight: 500;
    line-height: 1;
  }
  .user-options {
    margin-top: 0.2rem;
    height: 6.8rem;
    overflow-y: scroll;
    .user-option {
      display: flex;
      align-items: center;
      padding: 0.16rem 0;
      border-bottom: 1px solid #eee;
      .avatar {
        width: 0.68rem;
        height: 0.68rem;
        border-radius: 50%;
      }
      .content {
        margin-left: 0.18rem;
        flex: 1;
        .name {
          color: #333;
          font-size: 0.28rem;
          font-weight: 500;
        }
        .mobile {
          color: #999;
          font-size: 0.24rem;
        }
      }
    }
  }
  .btns-wrap {
    margin-top: 0.24rem;
    .cancel-btn,
    .confirm-btn {
      flex: 1;
      height: 0.88rem;
      font-size: 0.3rem;
      font-weight: 550;
      border-radius: 0.44rem;
    }
    .cancel-btn {
      margin-right: 0.12rem;
      color: #333;
      border: 1px solid #ddd;
    }
    .confirm-btn {
      margin-left: 0.12rem;
      color: #fff;
      background: #212121;
      opacity: 0.2;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
<style>
.van-search {
  padding: 0 !important;
}
.van-radio__label--left {
  width: 100% !important;
}
.van-empty {
  padding: 1rem 0;
}
</style>
