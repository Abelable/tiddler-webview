<template>
  <div class="container">
    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name flex">
            <div>主图视频</div>
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
          <Uploader
            style="margin-top: 0.32rem"
            max-count="1"
            accept="video/*"
          />
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>主图图片</div>
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
          <Uploader style="margin-top: 0.32rem" max-count="10" />
        </li>
        <li class="form-item flex">
          <div class="name required">商品标题</div>
          <input class="input" type="text" placeholder="请输入标题，最长30字" />
        </li>
        <li class="form-item flex">
          <div class="name required">运费模板</div>
          <div class="picker" :class="{ active: selectedFreightTemplateDesc }">
            <div>{{ selectedFreightTemplateDesc || "请选择运费模板" }}</div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">商品分类</div>
          <div class="picker" :class="{ active: selectedFreightTemplateDesc }">
            <div>{{ selectedFreightTemplateDesc || "请选择商品分类" }}</div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">退货地址</div>
          <div class="picker" :class="{ active: selectedFreightTemplateDesc }">
            <div>{{ selectedFreightTemplateDesc || "请选择退货地址" }}</div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">店铺价格</div>
          <input class="input" type="number" placeholder="请输入店铺价格" />
        </li>
        <li class="form-item flex">
          <div class="name">市场价格</div>
          <input class="input" type="number" placeholder="请输入市场价格" />
        </li>
        <li class="form-item flex">
          <div class="name required">商品库存</div>
          <input class="input" type="number" placeholder="请输入商品库存" />
        </li>
        <li class="form-item flex">
          <div class="name flex required">
            <div>推广佣金比例</div>
            <Popover
              v-model:show="uploadVideoTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">范围：0～70%</div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <input class="input" type="number" placeholder="请输入佣金比例" />
          <div class="unit">%</div>
        </li>
        <li class="form-item">
          <div class="name flex required">
            <div>详情图片</div>
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
          <Uploader style="margin-top: 0.32rem" />
        </li>
      </ul>
    </div>

    <div class="title flex">
      <div>编辑商品规格</div>
      <Button
        @click="addSpec"
        icon="plus"
        text="新增规格"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in specList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">规格名称</div>
            <input
              class="input"
              v-model="item.name"
              type="text"
              placeholder="请输入规格名称"
            />
          </li>
          <li class="form-item">
            <div class="name required">规格选项</div>
            <div class="sku-options">
              <Tag
                v-for="(option, optionIndex) in item.options"
                :key="optionIndex"
                @close="deleteSpecOption(index, optionIndex)"
                class="sku-option"
                color="#DBEFFD"
                text-color="#2A3664"
                closeable
                size="medium"
                >{{ option }}</Tag
              >
              <Tag
                class="sku-option"
                @click="showSpecOptionModalVisible(index)"
                type="primary"
                size="medium"
                >+ 新增选项</Tag
              >
            </div>
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteSpec(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!specList.length">
      <Empty image-size="1.8rem" description="暂无规格" />
    </div>
  </div>
  <button class="upload-btn">点击上传</button>
  <Dialog
    v-model:show="specOptionModalVisible"
    title="新增规格选项"
    show-cancel-button
    :before-close="addSpecOption"
  >
    <input
      class="sku-option-input"
      v-model="specOptionName"
      type="text"
      placeholder="请输入规格选项名称"
    />
  </Dialog>
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
  showConfirmDialog,
  showToast,
} from "vant";
import { ref, reactive } from "vue";

interface SpecItem {
  name: string;
  options: string[];
}

const uploadVideoTipsVisible = ref(false);
const uploadMainImgsTipsVisible = ref(false);
const uploadDetailImgsTipsVisible = ref(false);
const selectedFreightTemplateDesc = ref("");
const specList = reactive<SpecItem[]>([]);
const specOptionModalVisible = ref(false);
const curSpecIndex = ref(0);
const specOptionName = ref("");

const addSpec = () => {
  specList.push({ name: "", options: [] });
};
const deleteSpec = (index: number) => {
  showConfirmDialog({ title: "确定删除该商品规格吗？" })
    .then(() => specList.splice(index, 1))
    .catch(() => true);
};
const showSpecOptionModalVisible = (index: number) => {
  curSpecIndex.value = index;
  specOptionModalVisible.value = true;
};
const addSpecOption = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (!specOptionName.value) {
    showToast("名称不能为空");
    return false;
  }
  specList[curSpecIndex.value].options.push(specOptionName.value);
  specOptionName.value = "";
  specOptionModalVisible.value = false;
  return true;
};
const deleteSpecOption = (index: number, optionIndex: number) => {
  specList[index].options.splice(optionIndex, 1);
};
</script>

<style>
.van-empty__description {
  font-size: 0.24rem;
}
</style>
<style lang="scss" scoped>
.container {
  padding: 0.32rem 0.32rem 1.52rem;
  .title {
    margin-bottom: 0.32rem;
    color: #333;
    font-size: 0.28rem;
    font-weight: 550;
    line-height: 1;
    &.flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .card {
    margin-bottom: 0.32rem;
    padding: 0 0.32rem;
    background: #fff;
    border-radius: 0.32rem;
    .form {
      .form-item {
        padding: 0.32rem 0;
        font-size: 0.26rem;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        &.flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .name {
          color: #333;
          font-weight: 500;
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
              top: -0.06rem;
              left: -0.16rem;
              content: "*";
              color: #ee0d23;
              font-size: 0.24rem;
            }
          }
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
        .sku-options {
          .sku-option {
            margin-top: 0.32rem;
            margin-right: 0.32rem;
          }
        }
      }
    }
  }
  .delete-btn {
    height: 100%;
    border: none;
    background-color: transparent;
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
.warning {
  padding: 0.24rem;
  color: #fff;
  font-size: 0.24rem;
  line-height: 1.5;
  white-space: wrap;
}
.sku-option-input {
  margin: 0.32rem 0.32rem 0.5rem;
  padding: 0.24rem;
  width: calc(100% - 0.64rem);
  height: 0.88rem;
  font-size: 0.26rem;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
}
</style>
