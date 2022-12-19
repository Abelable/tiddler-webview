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
    <div class="main" v-if="templateType === 0">
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
          @click="addArea"
          icon="plus"
          text="添加"
          type="primary"
          size="mini"
        />
      </div>
      <SwipeCell
        :before-close="deleteArea"
        v-for="(item, index) in areaList"
        :key="index"
        :name="index"
      >
        <div class="card">
          <div class="form">
            <div class="form-item">
              <div class="label">地区</div>
              <div class="picker" :class="{ active: item.pickedAreaDesc }">
                <div>{{ item.pickedAreaDesc || "请选择地区" }}</div>
                <Icon name="arrow" />
              </div>
            </div>
            <div class="form-item">
              <div class="label">运费</div>
              <input
                class="input"
                v-model="areaList[index].fee"
                type="number"
                placeholder="例：0.00"
              />
            </div>
          </div>
        </div>
        <template #right>
          <Button class="delete-btn" icon="delete" color="#EE0D23" plain />
        </template>
      </SwipeCell>
      <div class="title">
        <div>快递方式</div>
        <Button
          class="add-btn"
          @click="addExpress"
          icon="plus"
          text="添加"
          type="primary"
          size="mini"
        />
      </div>
      <SwipeCell
        :before-close="deleteExpress"
        v-for="(item, index) in expressList"
        :key="index"
        :name="index"
      >
        <div class="card">
          <div class="form">
            <div class="form-item">
              <div class="label">快递名称</div>
              <div class="picker" :class="{ active: item.pickedExpressDesc }">
                <div>{{ item.pickedExpressDesc || "请选择快递" }}</div>
                <Icon name="arrow" />
              </div>
            </div>
            <div class="form-item">
              <div class="label">额外运费</div>
              <input
                class="input"
                v-model="expressList[index].fee"
                type="number"
                placeholder="例：0.00"
              />
            </div>
          </div>
        </div>
        <template #right>
          <Button class="delete-btn" icon="delete" color="#EE0D23" plain />
        </template>
      </SwipeCell>
    </div>
    <div class="main" v-if="templateType === 1">
      <div class="title">
        <div>基础信息</div>
        <Button
          class="add-btn"
          @click="addArea"
          icon="plus"
          text="添加快递模板"
          type="primary"
          size="mini"
        />
      </div>
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
        </div>
      </div>
      <div class="title">
        <div>顺丰快递</div>
        <Button
          class="add-btn"
          @click="addArea"
          icon="plus"
          text="添加"
          type="primary"
          size="mini"
        />
      </div>
      <SwipeCell
        :before-close="deleteArea"
        v-for="(item, index) in areaList"
        :key="index"
        :name="index"
      >
        <div class="card">
          <div class="form">
            <div class="form-item">
              <div class="label">区域名称</div>
              <input class="input" type="text" placeholder="请输入区域名称" />
            </div>
            <div class="form-item">
              <div class="label">费用计算方式</div>
              <RadioGroup
                class="selection"
                direction="horizontal"
                icon-size="0.32rem"
              >
                <Radio name="1">按重量</Radio>
                <Radio name="2">按商品件数</Radio>
              </RadioGroup>
            </div>
            <div class="form-item">
              <div class="label">首重1KG以内费用</div>
              <input class="input" type="number" placeholder="例：0.00" />
            </div>
            <div class="form-item">
              <div class="label">续重每1KG或其零数的费用</div>
              <input class="input" type="number" placeholder="例：0.00" />
            </div>
            <div class="form-item">
              <div class="label">单件商品费用</div>
              <input class="input" type="number" placeholder="例：0.00" />
            </div>
            <div class="form-item">
              <div class="label">免费额度</div>
              <input class="input" type="number" placeholder="例：0.00" />
            </div>
            <div class="form-item">
              <div class="label">目的地</div>
              <div class="picker" :class="{ active: item.pickedAreaDesc }">
                <div>{{ item.pickedAreaDesc || "请选择目的地" }}</div>
                <Icon name="arrow" />
              </div>
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
import {
  RadioGroup,
  Radio,
  SwipeCell,
  showConfirmDialog,
  Button,
  Icon,
} from "vant";
import { ref, reactive } from "vue";
const templateType = ref(0);
const computeType = ref(1);
const areaList = reactive([{ pickedAreaDesc: "", fee: "" }]);
const expressList = reactive([{ pickedExpressDesc: "", fee: "" }]);

const addArea = () => areaList.push({ pickedAreaDesc: "", fee: "" });
const deleteArea = (res: any) => {
  if (res.position === "right") {
    showConfirmDialog({ title: "确定删除该配送地区配置吗？" })
      .then(() => {
        areaList.splice(res.name, 1);
        return true;
      })
      .catch(() => true);
  } else {
    return true;
  }
};
const addExpress = () => expressList.push({ pickedExpressDesc: "", fee: "" });
const deleteExpress = (res: any) => {
  if (res.position === "right") {
    showConfirmDialog({ title: "确定删除该快递方式配置吗？" })
      .then(() => {
        expressList.splice(res.name, 1);
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
    border-radius: 0.32rem 0.32rem 0 0;
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
      .form {
        .form-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 1rem;
          border-bottom: 1px solid #e8e8e8;
          &:last-child {
            border-bottom: none;
          }
          .label {
            color: #333;
            font-size: 0.26rem;
          }
          .input,
          .selection,
          .picker {
            font-size: 0.26rem;
          }
          .input {
            text-align: right;
          }
          .picker {
            display: flex;
            align-items: center;
            color: #777;
            &.active {
              color: #333;
            }
          }
        }
      }
    }
    .delete-btn {
      height: 100%;
      border: none;
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
