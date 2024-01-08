<template>
  <div class="container">
    <div class="title">上传视频及图片</div>
    <div class="card">
      <ul class="form">
        <li class="form-item">
          <div class="name flex">
            <div>景点视频</div>
            <Popover
              v-model:show="videoTipsVisible"
              placement="bottom-start"
              theme="dark"
            >
              <div class="warning">
                <p>时长：建议不超过60s</p>
                <p>大小：建议不超过50M</p>
                <p>尺寸：建议比例16:9或3:4</p>
                <p>格式：mp4</p>
                <p>内容：建议突出景点1-2个核心卖点</p>
              </div>
              <template #reference>
                <Icon style="margin-left: 0.06rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <Uploader
            v-model="scenicInfo.video"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
            max-count="1"
            accept="video/*"
          />
        </li>
        <li class="form-item">
          <div class="name flex">菜品图片列表</div>
          <Uploader
            v-model="scenicInfo.imageList"
            :after-read="uploadFile"
            style="margin-top: 0.32rem"
          />
        </li>
      </ul>
    </div>

    <div class="title">填写基本信息</div>
    <div class="card">
      <ul class="form">
        <li class="form-item flex">
          <div class="name required">景点名称</div>
          <input
            class="input"
            v-model="scenicInfo.name"
            type="text"
            placeholder="请输入名称，最长30字"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">景点等级</div>
          <input
            class="input"
            v-model="scenicInfo.level"
            type="text"
            placeholder="请输入景点等级，例：5A"
          />
        </li>
        <li class="form-item flex">
          <div class="name required">景点分类</div>
          <div class="picker" @click="categoryPickerPopupVisible = true">
            <div class="content" :class="{ active: selectedCategoryName }">
              {{ selectedCategoryName || "请选择景点分类" }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">经纬度</div>
          <div class="picker" @click="mapPopupVisible = true">
            <div class="content" :class="{ active: scenicInfo.longitude }">
              {{
                scenicInfo.longitude
                  ? `${scenicInfo.longitude},${scenicInfo.latitude}`
                  : "打开地图选择"
              }}
            </div>
            <Icon name="arrow" />
          </div>
        </li>
        <li class="form-item flex">
          <div class="name required">具体地址</div>
          <input
            class="input"
            v-model="scenicInfo.address"
            type="text"
            placeholder="请输入景点具体地址"
          />
        </li>
        <li class="form-item">
          <div class="name required">咨询热线</div>
          <div class="tags">
            <Tag
              v-for="(item, index) in scenicInfo.hotlineList"
              :key="index"
              @close="deleteHotline(index)"
              class="tag"
              color="#DBEFFD"
              text-color="#2A3664"
              closeable
              size="medium"
              >{{ item }}</Tag
            >
            <Tag
              class="tag"
              @click="hotlineModalVisible = true"
              type="primary"
              size="medium"
              >+ 新增咨询热线</Tag
            >
          </div>
        </li>
        <li class="form-item">
          <div class="name required">景点简介</div>
          <textarea
            class="textarea"
            v-model="scenicInfo.brief"
            placeholder="请输入景点简介"
          />
        </li>
      </ul>
    </div>

    <div class="title flex">
      <div>编辑开放时间</div>
      <Button
        @click="addOpenTime"
        icon="plus"
        text="新增开放时间"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in scenicInfo.openTimeList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">开始月份</div>
            <div class="picker" @click="pickMonth(index, 0)">
              <div class="content" :class="{ active: item.openMonth }">
                {{
                  item.openMonth
                    ? monthOptions[item.openMonth - 1].text
                    : "请选择开始时间"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name required">周结束时间</div>
            <div class="picker" @click="pickMonth(index, 1)">
              <div class="content" :class="{ active: item.closeMonth }">
                {{
                  item.closeMonth
                    ? monthOptions[item.closeMonth - 1].text
                    : "请选择结束时间"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteOpenTime(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!scenicInfo.openTimeList.length">
      <Empty image-size="1.8rem" description="暂未添加开放时间" />
    </div>
  </div>

  <button class="upload-btn" @click="save">点击提交</button>

  <PickerPopup
    :visible="categoryPickerPopupVisible"
    :options="
      categoryOptions.map((item) => ({ text: item.name, value: item.id }))
    "
    @confirm="selectCategory"
    @cancel="categoryPickerPopupVisible = false"
  />
  <MapPopup
    :visible="mapPopupVisible"
    @confirm="setLnglat"
    @cancel="mapPopupVisible = false"
  />
  <Dialog
    v-model:show="hotlineModalVisible"
    title="新增咨询热线"
    show-cancel-button
    :before-close="addHotline"
  >
    <input
      class="dialog-input"
      v-model="hotline"
      type="text"
      placeholder="请输入咨询热线"
    />
  </Dialog>
  <Dialog
    v-model:show="facilityModalVisible"
    title="新增服务设施"
    show-cancel-button
    :before-close="addFacility"
  >
    <input
      class="dialog-input"
      v-model="facility"
      type="text"
      placeholder="请输入设施名称"
    />
  </Dialog>
  <PickerPopup
    :visible="monthPickerPopupVisible"
    :options="monthOptions"
    @confirm="selectMonth"
    @cancel="monthPickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import {
  Uploader,
  Icon,
  Popover,
  showToast,
  Dialog,
  Button,
  Tag,
  SwipeCell,
  Empty,
  showConfirmDialog,
} from "vant";
import PickerPopup from "@/components/PickerPopup.vue";
import MapPopup from "@/components/MapPopup.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { monthOptions } from "@/utils/index";
import { uploadFile } from "@/utils/upload";
import { createScenic } from "./utils/api";
import {
  categoryOptions,
  setCategoryOptions,
  checkScenicInfo,
} from "./utils/index";

import type { ScenicInfo, OriginalScenicInfo } from "./utils/type";

const router = useRouter();

const scenicInfo = reactive<Omit<ScenicInfo, "id">>({
  name: "",
  level: "",
  categoryId: undefined,
  video: [],
  imageList: [],
  longitude: undefined,
  latitude: undefined,
  address: "",
  brief: "",
  openTimeList: [],
  policyList: [],
  hotlineList: [],
  facilityList: [],
  projectList: [],
  tipsList: [],
});
const videoTipsVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const mapPopupVisible = ref(false);
const hotlineModalVisible = ref(false);
const hotline = ref("");
const facilityModalVisible = ref(false);
const facility = ref("");
const curOpenTimeIdx = ref(0);
const monthPickerPopupVisible = ref(false);
const curMonthType = ref(0);
const openTime = ref(["12", "00"]);
const closeTime = ref(["12", "00"]);

// 计算属性
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find((item) => item.id === scenicInfo.categoryId)
      ?.name
);

onMounted(() => {
  setCategoryOptions();
});

const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  scenicInfo.categoryId = selectedValues[0];
  categoryPickerPopupVisible.value = false;
};

const setLnglat = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  scenicInfo.longitude = longitude;
  scenicInfo.latitude = latitude;
  mapPopupVisible.value = false;
};

const deleteHotline = (index: number) =>
  scenicInfo.hotlineList.splice(index, 1);
const addHotline = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (
    !hotline.value ||
    (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(
      hotline.value
    ) &&
      !/^0\d{2,3}-?\d{7,8}$/.test(hotline.value))
  ) {
    showToast("请输入正确咨询热线");
    return;
  }
  scenicInfo.hotlineList.push(hotline.value);
  hotline.value = "";
  hotlineModalVisible.value = false;
};

const deleteFacility = (index: number) =>
  scenicInfo.facilityList.splice(index, 1);
const addFacility = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (!facility.value) {
    showToast("请输入设施名称");
    return;
  }
  scenicInfo.facilityList.push(facility.value);
  facility.value = "";
  facilityModalVisible.value = false;
};

const addOpenTime = () => {
  scenicInfo.openTimeList.push({
    openMonth: undefined,
    closeMonth: undefined,
    openTime: "",
    closeTime: "",
    tips: "",
  });
};
const deleteOpenTime = (index: number) => {
  showConfirmDialog({ title: "确定删除该开放时间吗？" })
    .then(() => scenicInfo.openTimeList.splice(index, 1))
    .catch(() => true);
};

const pickMonth = (index: number, type: number) => {
  curOpenTimeIdx.value = index;
  curMonthType.value = type;
  monthPickerPopupVisible.value = true;
};
const selectMonth = ({ selectedValues }: { selectedValues: number[] }) => {
  if (curMonthType.value) {
    scenicInfo.openTimeList[curOpenTimeIdx.value].closeMonth =
      selectedValues[0];
  } else {
    scenicInfo.openTimeList[curOpenTimeIdx.value].openMonth = selectedValues[0];
  }
  monthPickerPopupVisible.value = false;
};

const save = async () => {
  if (checkScenicInfo(scenicInfo)) {
    const {
      categoryId,
      longitude,
      latitude,
      video,
      imageList,
      projectList,
      ...rest
    } = scenicInfo;
    const createScenicInfo: Omit<OriginalScenicInfo, "id"> = {
      ...rest,
      categoryId: categoryId as number,
      longitude: longitude as number,
      latitude: latitude as number,
      imageList: imageList.map((item) => item.url || ""),
      projectList: projectList.map((item) => ({
        ...item,
        image: item.image[0].url,
      })),
    };
    if (video.length) createScenicInfo.video = video[0].url;
    try {
      await createScenic(createScenicInfo);
      router.back();
    } catch (error) {
      showToast("上传失败，请重试");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0.32rem 0.32rem 1.52rem;
  .title {
    margin-bottom: 0.32rem;
    color: #333;
    font-size: 0.3rem;
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
    overflow: hidden;
    .form {
      &.unit {
        padding: 0 0.32rem;
        border: 1px solid #eee;
        border-radius: 0.24rem;
      }
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
          margin-left: 0.2rem;
          color: #333;
          flex: 1;
          text-align: right;
        }
        .textarea {
          background: #f7f8fa;
          border-radius: 0.12rem;
        }
        .picker {
          display: flex;
          align-items: center;
          .content {
            color: #777;
            &.active {
              max-width: 3rem;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 1;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
        .tags {
          .tag {
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
.dialog-input {
  margin: 0.32rem 0.32rem 0.5rem;
  padding: 0.24rem;
  width: calc(100% - 0.64rem);
  height: 0.88rem;
  font-size: 0.26rem;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
}
</style>
<style>
.van-empty__description {
  font-size: 0.24rem;
}
.van-collapse-item__title {
  font-size: 0.26rem;
  font-weight: 500;
}
</style>
