<template>
  <div class="container">
    <div class="title">基础信息</div>
    <div class="card">
      <div class="form">
        <div class="form-item">
          <div class="label required">模板名称</div>
          <input
            class="input"
            v-model="freightTemplate.name"
            type="text"
            placeholder="请输入模板名称"
          />
        </div>
        <div class="form-item">
          <div class="label row required">
            <div>运费标题</div>
            <Popover theme="dark" placement="bottom-start">
              <div style="padding: 0.24rem; font-size: 0.26rem">
                可显示在商品详情
              </div>
              <template #reference>
                <Icon style="margin-left: 0.04rem" name="question-o" />
              </template>
            </Popover>
          </div>
          <input
            class="input"
            v-model="freightTemplate.title"
            type="text"
            placeholder="请输入运费标题"
          />
        </div>
        <div class="form-item">
          <div class="label">计算方式</div>
          <RadioGroup
            class="selection"
            v-model="freightTemplate.computeMode"
            direction="horizontal"
            icon-size="0.32rem"
          >
            <Radio :name="1">不计重量和件数</Radio>
            <Radio :name="2">按商品件数</Radio>
          </RadioGroup>
        </div>
        <div class="form-item">
          <div class="label">免费额度</div>
          <input
            class="input"
            v-model="freightTemplate.freeQuota"
            type="number"
            step="0.01"
            placeholder="例：0.00"
          />
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
    <SwipeCell v-for="(item, index) in freightTemplate.areaList" :key="index">
      <div class="card">
        <div class="form">
          <div class="form-item">
            <div class="label required">地区</div>
            <div class="picker" @click="showAreaSelectPopup(index)">
              <div
                class="content"
                :class="{ active: item.pickedCityDescs.length }"
              >
                {{
                  item.pickedCityDescs.length
                    ? item.pickedCityDescs.join()
                    : "请选择地区"
                }}
              </div>
              <Icon name="arrow" />
            </div>
          </div>
          <div class="form-item">
            <div class="label required">运费</div>
            <input
              class="input"
              v-model="item.fee"
              type="number"
              step="0.01"
              placeholder="例：0.00"
            />
          </div>
        </div>
      </div>
      <template #right>
        <Button
          class="delete-btn"
          @click.stop="deleteArea(index)"
          icon="delete"
          color="#EE0D23"
          plain
        />
      </template>
    </SwipeCell>
    <div class="card" v-if="!freightTemplate.areaList.length">
      <Empty image-size="1.8rem" description="暂未添加配送地区" />
    </div>

    <button class="save-btn" @click="save">保存</button>
  </div>

  <Popup
    v-model:show="areaSelectPopupVisible"
    position="bottom"
    round
    safe-area-inset-bottom
  >
    <div class="area-select-wrap">
      <div class="header">
        <div class="title">请选择地区</div>
        <Checkbox
          v-model="allAreaSelected"
          @change="selectAllArea"
          @click="pickedCityIndex = -2"
          :disabled="allAreaSelectDisabled"
          label-position="left"
          >全选</Checkbox
        >
      </div>
      <div class="main" v-if="regionOptions.length">
        <div class="left">
          <div
            class="province-selection"
            :class="{ active: activeProvinceIndex === index }"
            v-for="(item, index) in regionOptions"
            :key="index"
            @click="activeProvinceIndex = index"
          >
            {{ item.label }}
          </div>
        </div>
        <div
          class="right"
          v-for="(item, index) in regionOptions"
          :key="index"
          v-show="index === activeProvinceIndex"
        >
          <div class="city-selection">
            <Checkbox
              v-model="item.allSelected"
              @change="selectAllProvinceArea"
              @click="pickedCityIndex = -1"
              :disabled="
                item.allSelected &&
                freightTemplate.areaList[curAreaIndex] &&
                !item.areaIds.includes(
                  freightTemplate.areaList[curAreaIndex].id
                )
              "
              label-position="left"
              >全选</Checkbox
            >
          </div>
          <div
            class="city-selection"
            v-for="(_item, _index) in item.children"
            :key="_index"
          >
            <Checkbox
              v-model="_item.selected"
              :disabled="
                _item.selected &&
                freightTemplate.areaList[curAreaIndex] &&
                _item.areaId !== freightTemplate.areaList[curAreaIndex].id
              "
              @change="selectArea"
              @click="pickedCityIndex = _index"
              label-position="left"
              >{{ _item.label }}</Checkbox
            >
          </div>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  Radio,
  SwipeCell,
  showConfirmDialog,
  Button,
  Icon,
  Popover,
  Popup,
  Checkbox,
  Empty,
} from "vant";

import { ref, computed, watch } from "vue";
import {
  initialFreightTemplate,
  regionOptions,
  checkFreightTemplateInfo,
} from "../utils/index";

import type { FormFreightTemplate } from "../utils/type";

const props = defineProps<{
  editingFreightTemplate?: FormFreightTemplate;
}>();
const emit = defineEmits(["save"]);

const freightTemplate = ref<FormFreightTemplate>(initialFreightTemplate);

watch(props, (props) => {
  if (props.editingFreightTemplate) {
    freightTemplate.value = props.editingFreightTemplate;
    // 更新地区列表选项
    freightTemplate.value.areaList.map((item) => {
      regionOptions.value = regionOptions.value.map((province) => {
        let isInclude = false;
        const children = province.children.map((city) => {
          if (item.pickedCityCodes.includes(city.value)) {
            isInclude = true;
            return {
              ...city,
              areaId: item.id,
              selected: true,
            };
          } else return city;
        });
        return {
          ...province,
          areaIds: isInclude
            ? Array.from(new Set([...province.areaIds, item.id]))
            : province.areaIds,
          allSelected: children.findIndex((city) => !city.selected) === -1,
          children,
        };
      });
    });
    allAreaSelected.value =
      regionOptions.value.findIndex((item) => !item.allSelected) === -1;
  }
});

// -------------------------- 地区选择 --------------------------
const curAreaIndex = ref(-1);
const areaSelectPopupVisible = ref(false);
const allAreaSelected = ref(false); // 全国地区全选
const activeProvinceIndex = ref(0);
const pickedCityIndex = ref(-3);

const allAreaSelectDisabled = computed(
  () =>
    allAreaSelected.value &&
    regionOptions.value.findIndex((item) =>
      item.areaIds.includes(
        freightTemplate.value.areaList[curAreaIndex.value].id
      )
    ) === -1
);

const showAreaSelectPopup = (index: number) => {
  curAreaIndex.value = index;
  areaSelectPopupVisible.value = true;
};
const selectAllArea = (value: boolean) => {
  if (pickedCityIndex.value === -2) {
    regionOptions.value = regionOptions.value.map((item) => {
      const curAreaItem = freightTemplate.value.areaList[curAreaIndex.value];
      // 省份已全选的情况，
      // 只执行取消全选逻辑，且仅在包含当前地区索引情况下执行
      // 若为全选逻辑，则直接跳过
      if (item.allSelected) {
        if (!value && item.areaIds.includes(curAreaItem.id)) {
          const children = item.children.map((_item) => {
            if (_item.areaId === curAreaItem.id) {
              curAreaItem.pickedCityCodes = curAreaItem.pickedCityCodes.filter(
                (code) => code !== _item.value
              );
              curAreaItem.pickedCityDescs = curAreaItem.pickedCityDescs.filter(
                (desc) => desc !== _item.label
              );
              return {
                ..._item,
                selected: false,
                areaId: 0,
              };
            } else {
              return _item;
            }
          });
          return {
            ...item,
            allSelected: false,
            areaIds: item.areaIds.filter((areaId) => areaId !== curAreaItem.id),
            children,
          };
        } else return item;
      } else {
        // 省份未全选的情况，分全选、取消全选，2个逻辑
        let children;
        if (value) {
          children = item.children.map((_item) => {
            if (!_item.selected) {
              curAreaItem.pickedCityCodes = Array.from(
                new Set([...curAreaItem.pickedCityCodes, _item.value])
              );
              curAreaItem.pickedCityDescs = Array.from(
                new Set([...curAreaItem.pickedCityDescs, _item.label])
              );
              return {
                ..._item,
                selected: true,
                areaId: curAreaItem.id,
              };
            } else return _item;
          });
        } else {
          children = item.children.map((_item) => {
            if (_item.selected && _item.areaId === curAreaItem.id) {
              curAreaItem.pickedCityCodes = curAreaItem.pickedCityCodes.filter(
                (code) => code !== _item.value
              );
              curAreaItem.pickedCityDescs = curAreaItem.pickedCityDescs.filter(
                (desc) => desc !== _item.label
              );
              return {
                ..._item,
                selected: false,
                areaId: 0,
              };
            } else return _item;
          });
        }

        return {
          ...item,
          allSelected: value,
          areaIds: value
            ? Array.from(new Set([...item.areaIds, curAreaItem.id]))
            : item.areaIds.filter((areaId) => areaId !== curAreaItem.id),
          children,
        };
      }
    });
  }
};
const selectAllProvinceArea = (value: boolean) => {
  if (pickedCityIndex.value === -1) {
    const curRegionOption = regionOptions.value[activeProvinceIndex.value];
    const curAreaItem = freightTemplate.value.areaList[curAreaIndex.value];
    curRegionOption.areaIds = value
      ? Array.from(new Set([...curRegionOption.areaIds, curAreaItem.id]))
      : curRegionOption.areaIds.filter((areaId) => areaId !== curAreaItem.id);
    if (value) {
      curRegionOption.children = curRegionOption.children.map((item) => {
        if (!item.selected) {
          curAreaItem.pickedCityCodes = Array.from(
            new Set([...curAreaItem.pickedCityCodes, item.value])
          );
          curAreaItem.pickedCityDescs = Array.from(
            new Set([...curAreaItem.pickedCityDescs, item.label])
          );
          return {
            ...item,
            selected: true,
            areaId: curAreaItem.id,
          };
        } else return item;
      });
    } else {
      curRegionOption.children = curRegionOption.children.map((item) => {
        if (item.selected && item.areaId === curAreaItem.id) {
          curAreaItem.pickedCityCodes = curAreaItem.pickedCityCodes.filter(
            (code) => code !== item.value
          );
          curAreaItem.pickedCityDescs = curAreaItem.pickedCityDescs.filter(
            (desc) => desc !== item.label
          );
          return {
            ...item,
            selected: false,
            areaId: 0,
          };
        } else return item;
      });
    }
    allAreaSelected.value =
      regionOptions.value.findIndex((item) => !item.allSelected) === -1;
  }
};
const selectArea = (value: boolean) => {
  if (
    pickedCityIndex.value !== -1 &&
    pickedCityIndex.value !== -2 &&
    pickedCityIndex.value !== -3
  ) {
    const curRegionOption = regionOptions.value[activeProvinceIndex.value];
    const curCityOption = curRegionOption.children[pickedCityIndex.value];
    const curAreaItem = freightTemplate.value.areaList[curAreaIndex.value];
    if (value) {
      curAreaItem.pickedCityCodes = Array.from(
        new Set([...curAreaItem.pickedCityCodes, curCityOption.value])
      );
      curAreaItem.pickedCityDescs = Array.from(
        new Set([...curAreaItem.pickedCityDescs, curCityOption.label])
      );
    } else {
      curAreaItem.pickedCityCodes = curAreaItem.pickedCityCodes.filter(
        (code) => code !== curCityOption.value
      );
      curAreaItem.pickedCityDescs = curAreaItem.pickedCityDescs.filter(
        (desc) => desc !== curCityOption.label
      );
    }
    curCityOption.areaId = value ? curAreaItem.id : 0;
    curRegionOption.areaIds = value
      ? Array.from(new Set([...curRegionOption.areaIds, curAreaItem.id]))
      : curRegionOption.areaIds.filter((areaId) => areaId !== curAreaItem.id);
    curRegionOption.allSelected =
      curRegionOption.children.findIndex((item) => !item.selected) === -1;
    allAreaSelected.value =
      regionOptions.value.findIndex((item) => !item.allSelected) === -1;
  }
};

const addArea = () =>
  freightTemplate.value.areaList.push({
    id: (freightTemplate.value.areaList as []).length
      ? freightTemplate.value.areaList[
          freightTemplate.value.areaList.length - 1
        ].id + 1
      : 1,
    pickedCityCodes: [],
    pickedCityDescs: [],
    fee: undefined,
  });
const deleteArea = (index: number) => {
  showConfirmDialog({ title: "确定删除该配送地区配置吗？" })
    .then(() => {
      curAreaIndex.value = index;
      pickedCityIndex.value = -3;
      const id = freightTemplate.value.areaList[index].id;
      regionOptions.value = regionOptions.value.map((item) => {
        if (item.areaIds.includes(id)) {
          const children = item.children.map((_item) => {
            if (_item.areaId === id) {
              return {
                ..._item,
                areaId: 0,
                selected: false,
              };
            } else return _item;
          });
          return {
            ...item,
            areaIds: item.areaIds.filter((areaId) => areaId !== id),
            allSelected: false,
            children,
          };
        } else return item;
      });
      allAreaSelected.value = false;
      freightTemplate.value.areaList.splice(index, 1);
      return true;
    })
    .catch(() => true);
};
// -------------------------------------------------------------

const save = async () => {
  if (checkFreightTemplateInfo(freightTemplate.value)) {
    const { areaList, ...rest } = freightTemplate.value;
    emit("save", {
      freightTemplate: {
        ...rest,
        areaList: areaList.map((item) => ({
          pickedCityCodes: item.pickedCityCodes.join(),
          pickedCityDescs: item.pickedCityDescs.join(),
        })),
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
}
.container {
  padding: 0.32rem 0.32rem 1.52rem;
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
    background: #fff;
    border-radius: 0.32rem;
    overflow: hidden;
    .form {
      .form-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1rem;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        .label {
          color: #333;
          font-size: 0.26rem;
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
      }
    }
  }
  .delete-btn {
    height: 100%;
    border: none;
    background-color: transparent;
  }
  .save-btn {
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
}
.area-select-wrap {
  background: #f7f8fa;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.32rem;
    font-size: 0.28rem;
    font-weight: 550;
    .title {
      color: #333;
      font-size: 0.32rem;
    }
  }
  .main {
    display: flex;
    .left {
      flex: 3;
      height: 8rem;
      overflow-y: scroll;
      .province-selection {
        display: flex;
        align-items: center;
        padding-left: 0.24rem;
        height: 1rem;
        color: #333;
        font-size: 0.28rem;
        &.active {
          position: relative;
          font-weight: 550;
          background: #fff;
          &::before {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.1rem;
            height: 0.4rem;
            content: "";
            background: #1b89fa;
          }
        }
      }
    }
    .right {
      flex: 5;
      height: 8rem;
      overflow-y: scroll;
      background: #fff;
      .city-selection {
        display: flex;
        align-items: center;
        padding: 0 0.32rem;
        height: 1rem;
        color: #333;
        font-size: 0.28rem;
        font-weight: 550;
        .van-checkbox {
          justify-content: space-between;
          width: 100%;
        }
      }
    }
  }
}
</style>
