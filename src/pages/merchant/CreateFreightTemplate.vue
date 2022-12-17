<template>
  <div class="container">
    <div class="header">
      <div class="title">请选择模板类型</div>
      <div class="type-options">
        <div
          class="option"
          :class="{ selected: index === templateType }"
          v-for="(item, index) in ['自定义模板', '快递模板']"
          :key="index"
          @click="templateType = index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title">基础信息</div>
      <div class="card">
        <div class="form">
          <div class="form-item">
            <div class="label">模板名称</div>
            <input class="input" type="text" placeholder="请输入模板名称" />
          </div>
          <div class="form-item">
            <div class="label">运费标题</div>
            <input class="input" type="text" placeholder="请输入运费标题" />
          </div>
          <div class="form-item">
            <div class="label">计算方式</div>
            <RadioGroup
              class="selection"
              v-model="computeType"
              direction="horizontal"
              icon-size="0.32rem"
            >
              <Radio name="1">不计重量和件数</Radio>
              <Radio name="2">按商品件数</Radio>
            </RadioGroup>
          </div>
          <div class="form-item">
            <div class="label">免费额度</div>
            <input class="input" type="number" placeholder="例：0.00" />
          </div>
        </div>
      </div>
      <div class="title">
        <div>配送地区</div>
        <Button
          class="add-btn"
          icon="plus"
          text="新增"
          type="primary"
          size="mini"
        />
      </div>
      <SwipeCell :before-close="beforeClose">
        <div class="card">
          <div class="form">
            <div class="form-item">
              <div class="label">地区</div>
              <div class="picker">请选择地区</div>
            </div>
            <div class="form-item">
              <div class="label">运费</div>
              <input class="input" type="number" placeholder="例：0.00" />
            </div>
          </div>
        </div>
        <template #right>
          <Button class="delete-btn" icon="delete" color="#EE0D23" plain />
        </template>
      </SwipeCell>
    </div>
    <div class="btns">
      <button class="save-btn">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, Radio, SwipeCell, showConfirmDialog, Button } from "vant";
import { ref } from "vue";

const templateType = ref(0);
const computeType = ref(1);

const beforeClose = (res: any) => {
  if (res.position === "right") {
    showConfirmDialog({ title: "确定删除该配送地区配置吗？" })
      .then(() => {
        return true;
      })
      .catch(() => true);
  } else {
    return true;
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 0;
  .header {
    padding: 0.32rem 0.32rem 0.4rem;
    .title {
      margin-bottom: 0.32rem;
      color: #333;
      font-size: 0.32rem;
      font-weight: 550;
    }
    .type-options {
      display: flex;
      justify-content: space-between;
      .option {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.3rem;
        color: #999;
        font-size: 0.26rem;
        height: 0.68rem;
        background: #fff;
        border-radius: 0.34rem;
        &.selected {
          color: #fff;
          background: #1b89fa;
        }
      }
    }
  }
  .main {
    padding: 0.32rem;
    flex: 1;
    overflow-y: scroll;
    border-radius: 0.32rem;
    background: #fff;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.32rem;
      color: #333;
      font-size: 0.28rem;
      font-weight: 550;
    }
    .card {
      margin-bottom: 0.32rem;
      padding: 0 0.32rem;
      background: #eaf6ff;
      border-radius: 0.32rem;
    }
    .delete-btn {
      height: 100%;
      border: none;
    }
    .form {
      .form-item {
        display: flex;
        align-items: center;
        height: 1rem;
        border-bottom: 1px solid #e8e8e8;
        &:last-child {
          border-bottom: none;
        }
        .label {
          flex: 1;
          color: #333;
          font-size: 0.26rem;
        }
        .input,
        .selection,
        .picker {
          flex: 3;
          font-size: 0.26rem;
        }
        .picker {
          color: #777;
          &.active {
            color: #333;
          }
        }
      }
    }
  }
  .btns {
    padding: 0.32rem;
    background: #fff;
    .save-btn {
      width: 100%;
      height: 0.88rem;
      color: #fff;
      font-size: 0.3rem;
      font-weight: 550;
      border-radius: 0.18rem;
      background: #212121;
    }
  }
}
</style>
