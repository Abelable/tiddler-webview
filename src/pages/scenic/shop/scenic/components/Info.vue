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
          <div class="name flex required">
            <div>景点照片列表</div>
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
          <div class="name">景点等级</div>
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
          <div class="name required">门票起始价格</div>
          <input
            class="input"
            v-model="scenicInfo.price"
            type="number"
            step="0.01"
            placeholder="请输入门票起始价格"
          />
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
          <div class="name required">景点简介</div>
          <textarea
            class="textarea"
            v-model="scenicInfo.brief"
            placeholder="请输入景点简介"
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
          <div class="name">特色标签</div>
          <div class="tags">
            <TagList
              :list="scenicInfo.featureTagList"
              title="特色标签"
              @addTag="addFeatureTag"
              @deleteTag="deleteFeatureTag"
            />
          </div>
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
                    : "请选择开始月份"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name required">结束月份</div>
            <div class="picker" @click="pickMonth(index, 1)">
              <div class="content" :class="{ active: item.closeMonth }">
                {{
                  item.closeMonth
                    ? monthOptions[item.closeMonth - 1].text
                    : "请选择结束月份"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name required">开始时间</div>
            <div class="picker" @click="pickTime(index, 0)">
              <div class="content" :class="{ active: item.openTime }">
                {{ item.openTime || "请选择开始时间" }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name required">结束时间</div>
            <div class="picker" @click="pickTime(index, 1)">
              <div class="content" :class="{ active: item.closeTime }">
                {{ item.closeTime || "请选择结束时间" }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name">时间提示</div>
            <input
              class="input"
              v-model="item.tips"
              placeholder="请补充时间提示"
            />
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
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加开放时间"
      />
    </div>

    <div class="title flex">
      <div>编辑优待政策</div>
      <Button
        @click="addPolicy"
        icon="plus"
        text="新增优待政策"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in scenicInfo.policyList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">适用人群</div>
            <input
              class="input"
              v-model="item.crowd"
              placeholder="请输入适用人群"
            />
          </li>
          <li class="form-item flex">
            <div class="name required">适用条件</div>
            <input
              class="input"
              v-model="item.condition"
              placeholder="请输入适用条件"
            />
          </li>
          <li class="form-item flex">
            <div class="name required">政策内容</div>
            <input
              class="input"
              v-model="item.content"
              placeholder="请输入政策内容"
            />
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deletePolicy(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!scenicInfo.policyList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加优待政策"
      />
    </div>

    <div class="title flex">
      <div>编辑景区项目</div>
      <Button
        @click="addProject"
        icon="plus"
        text="新增景区项目"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in scenicInfo.projectList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item">
            <div class="name required">项目照片</div>
            <Uploader
              v-model="item.image"
              :after-read="uploadFile"
              style="margin-top: 0.32rem"
              max-count="1"
            />
          </li>
          <li class="form-item flex">
            <div class="name required">项目名称</div>
            <input
              class="input"
              v-model="item.name"
              placeholder="请输入项目名称"
            />
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteProject(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!scenicInfo.projectList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加景区项目"
      />
    </div>

    <div class="title flex">
      <div>编辑景区设施</div>
      <Button
        @click="addProject"
        icon="plus"
        text="新增景区设施"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in scenicInfo.facilityList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">设施</div>
            <div class="picker" @click="pickFacility(index)">
              <div class="content" :class="{ active: item.facilityId }">
                {{
                  item.facilityId
                    ? facilityOptions.find(
                        (_item) => _item.value === item.facilityId
                      )?.text
                    : "请选择设施"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </li>
          <li class="form-item flex">
            <div class="name required">设施描述</div>
            <input
              class="input"
              v-model="item.content"
              placeholder="请输入设施描述"
            />
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteProject(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!scenicInfo.facilityList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加景区设施"
      />
    </div>

    <div class="title flex">
      <div>编辑游玩贴士</div>
      <Button
        @click="addTips"
        icon="plus"
        text="新增游玩贴士"
        type="primary"
        size="mini"
      />
    </div>
    <SwipeCell v-for="(item, index) in scenicInfo.tipsList" :key="index">
      <div class="card">
        <ul class="form">
          <li class="form-item flex">
            <div class="name required">贴士标题</div>
            <input
              class="input"
              v-model="item.title"
              placeholder="请输入贴士标题"
            />
          </li>
          <li class="form-item flex">
            <div class="name required">贴士内容</div>
            <input
              class="input"
              v-model="item.content"
              placeholder="请输入贴士内容"
            />
          </li>
        </ul>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteTips(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!scenicInfo.tipsList.length">
      <Empty
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="暂未添加游玩贴士"
      />
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
  <PickerPopup
    :visible="monthPickerPopupVisible"
    :options="monthOptions"
    @confirm="selectMonth"
    @cancel="monthPickerPopupVisible = false"
  />
  <TimePickerPopup
    :visible="timePickerPopupVisible"
    @confirm="setTime"
    @cancel="timePickerPopupVisible = false"
  />
  <PickerPopup
    :visible="facilityPickerPopupVisible"
    :options="facilityOptions"
    @confirm="selectFacility"
    @cancel="facilityPickerPopupVisible = false"
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
import TimePickerPopup from "@/components/TimePickerPopup.vue";
import TagList from "@/components/TagList.vue";

import { ref, computed, onMounted, watch } from "vue";
import { monthOptions } from "@/utils/index";
import { uploadFile } from "@/utils/upload";
import {
  initialScenicInfo,
  categoryOptions,
  facilityOptions,
  setCategoryOptions,
  checkScenicInfo,
} from "../utils/index";

import type { FormScenicInfo } from "../utils/type";

const props = defineProps<{
  editingScenicInfo?: FormScenicInfo;
}>();
const emit = defineEmits(["save"]);

const scenicInfo = ref<FormScenicInfo>(initialScenicInfo);
const videoTipsVisible = ref(false);
const imageListTipsVisible = ref(false);
const categoryPickerPopupVisible = ref(false);
const mapPopupVisible = ref(false);
const hotlineModalVisible = ref(false);
const hotline = ref("");
const curOpenTimeIdx = ref(0);
const monthPickerPopupVisible = ref(false);
const curMonthType = ref(0);
const curTimeType = ref(0);
const timePickerPopupVisible = ref(false);
const curFacilityIdx = ref(0);
const facilityPickerPopupVisible = ref(false);

// 计算属性
const selectedCategoryName = computed(
  () =>
    categoryOptions.value.find(
      (item) => item.id === scenicInfo.value.categoryId
    )?.name
);

watch(props, (props) => {
  if (props.editingScenicInfo) {
    scenicInfo.value = props.editingScenicInfo;
  }
});

onMounted(() => {
  setCategoryOptions();
});

const selectCategory = ({ selectedValues }: { selectedValues: number[] }) => {
  scenicInfo.value.categoryId = selectedValues[0];
  categoryPickerPopupVisible.value = false;
};

const setLnglat = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  scenicInfo.value.longitude = longitude;
  scenicInfo.value.latitude = latitude;
  mapPopupVisible.value = false;
};

const deleteHotline = (index: number) =>
  scenicInfo.value.hotlineList.splice(index, 1);
const addHotline = (action: string) => {
  if (action === "cancel") {
    return true;
  }
  if (
    !hotline.value ||
    (!/^1[3-9]\d{9}$/.test(
      hotline.value
    ) &&
      !/^0\d{2,3}-?\d{7,8}$/.test(hotline.value))
  ) {
    showToast("请输入正确咨询热线");
    return;
  }
  scenicInfo.value.hotlineList.push(hotline.value);
  hotline.value = "";
  hotlineModalVisible.value = false;
};

const addFeatureTag = (tag: string) =>
  scenicInfo.value.featureTagList.push(tag);
const deleteFeatureTag = (index: number) =>
  scenicInfo.value.featureTagList.splice(index, 1);

const addOpenTime = () => {
  scenicInfo.value.openTimeList.push({
    openMonth: undefined,
    closeMonth: undefined,
    openTime: "",
    closeTime: "",
    tips: "",
  });
};
const deleteOpenTime = (index: number) => {
  showConfirmDialog({ title: "确定删除该开放时间吗？" })
    .then(() => scenicInfo.value.openTimeList.splice(index, 1))
    .catch(() => true);
};

const addPolicy = () => {
  scenicInfo.value.policyList.push({
    crowd: "",
    condition: "",
    content: "",
  });
};
const deletePolicy = (index: number) => {
  showConfirmDialog({ title: "确定删除该优待政策吗？" })
    .then(() => scenicInfo.value.policyList.splice(index, 1))
    .catch(() => true);
};

const addProject = () => {
  scenicInfo.value.projectList.push({
    image: [],
    name: "",
  });
};
const deleteProject = (index: number) => {
  showConfirmDialog({ title: "确定删除该景区项目吗？" })
    .then(() => scenicInfo.value.projectList.splice(index, 1))
    .catch(() => true);
};

const addTips = () => {
  scenicInfo.value.tipsList.push({
    title: "",
    content: "",
  });
};
const deleteTips = (index: number) => {
  showConfirmDialog({ title: "确定删除该游玩贴士吗？" })
    .then(() => scenicInfo.value.tipsList.splice(index, 1))
    .catch(() => true);
};

const pickMonth = (index: number, type: number) => {
  curOpenTimeIdx.value = index;
  curMonthType.value = type;
  monthPickerPopupVisible.value = true;
};
const selectMonth = ({ selectedValues }: { selectedValues: number[] }) => {
  if (curMonthType.value) {
    scenicInfo.value.openTimeList[curOpenTimeIdx.value].closeMonth =
      selectedValues[0];
  } else {
    scenicInfo.value.openTimeList[curOpenTimeIdx.value].openMonth =
      selectedValues[0];
  }
  monthPickerPopupVisible.value = false;
};

const pickTime = (index: number, type: number) => {
  curOpenTimeIdx.value = index;
  curTimeType.value = type;
  timePickerPopupVisible.value = true;
};

const setTime = (time: string) => {
  if (curTimeType.value) {
    scenicInfo.value.openTimeList[curOpenTimeIdx.value].closeTime = time;
  } else {
    scenicInfo.value.openTimeList[curOpenTimeIdx.value].openTime = time;
  }
  timePickerPopupVisible.value = false;
};

const pickFacility = (index: number) => {
  curFacilityIdx.value = index;
  facilityPickerPopupVisible.value = true;
};
const selectFacility = ({ selectedValues }: { selectedValues: number[] }) => {
  scenicInfo.value.facilityList[curFacilityIdx.value].facilityId =
    selectedValues[0];
};

const save = async () => {
  if (checkScenicInfo(scenicInfo.value)) {
    const { video, imageList, projectList, ...rest } = scenicInfo.value;
    emit("save", {
      scenicInfo: {
        ...rest,
        video: video ? video[0].url : "",
        imageList: imageList.map((item) => item.url || ""),
        projectList: projectList.map((item) => ({
          ...item,
          image: item.image[0].url,
        })),
      },
    });
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
          margin-top: 0.24rem;
          padding: 0.24rem;
          width: 100%;
          height: 3rem;
          background: #f7f8fa;
          border-radius: 0.12rem;
          border-color: #eee;
          box-sizing: border-box;
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
