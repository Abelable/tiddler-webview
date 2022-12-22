<template>
  <div class="container">
    <div class="card">
      <div class="title flex">
        <div>上传主图视频</div>
        <Popover
          v-model:show="uploadVideoTipsVisible"
          placement="bottom-start"
          theme="dark"
        >
          <div class="warning">
            <p>时长：建议不超过60s</p>
            <p>大小：建议不超过50M</p>
            <p>尺寸：建议比例16:9或3:4</p>
            <p>格式：mp4</p>
            <p>内容：建议突出商品1-2个核心卖点</p>
          </div>
          <template #reference>
            <Icon style="margin-left: 0.06rem" name="question-o" />
          </template>
        </Popover>
      </div>
      <Uploader max-count="1" accept="video/*" />
    </div>
    <div class="card">
      <div class="title required flex">
        <div>上传主图图片</div>
        <Popover
          v-model:show="uploadMainImgsTipsVisible"
          placement="bottom-start"
          theme="dark"
        >
          <div class="warning">数量：最多不超过10张</div>
          <template #reference>
            <Icon style="margin-left: 0.06rem" name="question-o" />
          </template>
        </Popover>
      </div>
      <Uploader max-count="10" />
    </div>
    <div class="card">
      <div class="title required">填写基本信息</div>
      <div class="form">
        <div class="form-list">
          <div class="label">商品标题</div>
          <input class="input" type="text" placeholder="请输入标题，最长30字" />
        </div>
        <div class="form-list">
          <div class="label">运费模板</div>
          <div class="picker" :class="{ active: selectedFreightTemplateDesc }">
            <div>{{ selectedFreightTemplateDesc || "请选择运费模板" }}</div>
            <Icon name="arrow" />
          </div>
        </div>
        <div class="form-list">
          <div class="label">商品分类</div>
          <div class="picker" :class="{ active: selectedFreightTemplateDesc }">
            <div>{{ selectedFreightTemplateDesc || "请选择商品分类" }}</div>
            <Icon name="arrow" />
          </div>
        </div>
        <div class="form-list">
          <div class="label">退货地址</div>
          <div class="picker" :class="{ active: selectedFreightTemplateDesc }">
            <div>{{ selectedFreightTemplateDesc || "请选择退货地址" }}</div>
            <Icon name="arrow" />
          </div>
        </div>
        <div class="form-list">
          <div class="label">店铺价格</div>
          <input class="input" type="number" placeholder="请输入店铺价格" />
        </div>
        <div class="form-list">
          <div class="label">市场价格</div>
          <input class="input" type="number" placeholder="请输入市场价格" />
        </div>
        <div class="form-list">
          <div class="label">推广佣金比例(0～70%)</div>
          <input class="input" type="number" placeholder="请输入佣金比例" />
          <div class="unit">%</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="title flex between">
        <div>填写商品规格</div>
        <Button icon="plus" text="新增规格" type="primary" size="mini" />
      </div>
      <SwipeCell>
        <div class="sku-item">
          <div class="sku-name">
            <div class="label">规格名称</div>
            <input class="input" type="text" placeholder="请输入规格名称" />
          </div>
          <div class="sku-options-wrap">
            <div class="label">规格选项</div>
            <div class="sku-options">
              <Tag
                class="sku-option"
                color="#DBEFFD"
                text-color="#2A3664"
                closeable
                size="medium"
                >红</Tag
              >
              <Tag
                class="sku-option"
                @click="addSkuModalVisible = true"
                type="primary"
                size="medium"
                >+ 新增选项</Tag
              >
              <Dialog
                v-model:show="addSkuModalVisible"
                title="新增规格选项"
                show-cancel-button
              >
                <input
                  class="sku-name-input"
                  type="text"
                  placeholder="请输入规格选项名称"
                />
              </Dialog>
            </div>
          </div>
        </div>
        <template #right>
          <Button class="delete-btn" icon="delete" color="#EE0D23" plain />
        </template>
      </SwipeCell>
      <Empty image-size="1.8rem" description="暂无规格" />
    </div>
    <div class="card">
      <div class="title required flex">
        <div>上传详情图片</div>
        <Popover
          v-model:show="uploadDetailImgsTipsVisible"
          placement="bottom-start"
          theme="dark"
        >
          <div class="warning">注意图片顺序</div>
          <template #reference>
            <Icon style="margin-left: 0.06rem" name="question-o" />
          </template>
        </Popover>
      </div>
      <Uploader />
    </div>
  </div>
  <button class="upload-btn">点击上传</button>
</template>

<script setup lang="ts">
import {
  Uploader,
  Icon,
  Empty,
  Popover,
  Button,
  Dialog,
  Tag,
  SwipeCell,
} from "vant";
import { ref } from "vue";

const uploadVideoTipsVisible = ref(false);
const uploadMainImgsTipsVisible = ref(false);
const uploadDetailImgsTipsVisible = ref(false);
const addSkuModalVisible = ref(false);
const selectedFreightTemplateDesc = ref("");
</script>

<style>
.van-empty__description {
  font-size: 0.24rem;
}
</style>
<style lang="scss" scoped>
.warning {
  padding: 0.24rem;
  color: #fff;
  font-size: 0.24rem;
  line-height: 1.5;
  white-space: wrap;
}
.container {
  padding: 0.32rem 0.32rem 1.52rem;
  .card {
    margin-bottom: 0.32rem;
    padding: 0.32rem;
    background: #fff;
    border-radius: 0.32rem;
    overflow: hidden;
    .title {
      margin-bottom: 0.32rem;
      color: #333;
      font-size: 0.28rem;
      font-weight: 550;
      line-height: 1;
      &.flex {
        display: flex;
        align-items: center;
        &.between {
          justify-content: space-between;
        }
      }
      &.required {
        position: relative;
        &::before {
          position: absolute;
          top: -0.08rem;
          left: -0.16rem;
          content: "*";
          color: #ee0d23;
          font-size: 0.24rem;
        }
      }
    }
    .form {
      .form-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1rem;
        font-size: 0.26rem;
        border-top: 1px solid #eee;
        &:last-child {
          border-bottom: 1px solid #eee;
        }
        .label {
          color: #333;
          font-weight: 500;
        }
        .input {
          flex: 1;
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
    .sku-item {
      padding: 0.32rem;
      border: 1px solid #eee;
      border-radius: 0.24rem;
      .sku-name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 0.32rem;
        font-size: 0.26rem;
        border-bottom: 1px solid #eee;
        .label {
          color: #333;
          font-weight: 500;
        }
        .input {
          flex: 1;
          text-align: right;
        }
      }
      .sku-options-wrap {
        margin-top: 0.32rem;
        font-size: 0.26rem;
        .label {
          color: #333;
          font-weight: 500;
        }
        .sku-options {
          .sku-option {
            margin-top: 0.24rem;
            margin-right: 0.24rem;
          }
        }
        .sku-name-input {
          margin: 0.32rem 0.32rem 0.5rem;
          padding: 0.24rem;
          width: calc(100% - 0.64rem);
          height: 0.88rem;
          font-size: 0.26rem;
          border: 1px solid #ddd;
          border-radius: 0.12rem;
        }
      }
    }
    .delete-btn {
      height: 100%;
      border: none;
    }
  }
}
.upload-btn {
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
