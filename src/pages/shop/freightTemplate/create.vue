<template>
  <div class="container">
    <div class="header">
      <div class="title">请选择模板类型</div>
      <div class="type-options">
        <div
          class="option"
          :class="{ selected: index === freightTemplate.mode - 1 }"
          v-for="(item, index) in ['自定义模板', '快递模板']"
          :key="index"
          @click="freightTemplate.mode = index + 1"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="main" v-if="freightTemplate.mode === 1">
      <div class="title">基础信息</div>
      <div class="card">
        <div class="form">
          <div class="form-item">
            <div class="label">模板名称</div>
            <input
              class="input"
              v-model="freightTemplate.name"
              type="text"
              placeholder="请输入模板名称"
            />
          </div>
          <div class="form-item">
            <div class="label row">
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
              <div class="label">地区</div>
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
              <div class="label">运费</div>
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
        v-for="(item, index) in freightTemplate.expressList"
        :key="index"
      >
        <div class="card">
          <div class="form">
            <div class="form-item">
              <div class="label">快递名称</div>
              <div class="picker" @click="showExpressSelectPopup(index)">
                <div
                  class="content"
                  :class="{ active: item.pickedExpressDescs.length }"
                >
                  {{
                    item.pickedExpressDescs.length
                      ? item.pickedExpressDescs.join()
                      : "请选择快递"
                  }}
                </div>
                <Icon name="arrow" />
              </div>
            </div>
            <div class="form-item">
              <div class="label">额外运费</div>
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
            @click.stop="deleteExpress(index)"
            icon="delete"
            color="#EE0D23"
            plain
          />
        </template>
      </SwipeCell>
    </div>
    <div class="main" v-if="freightTemplate.mode === 2">
      <div class="title">
        <div>基础信息</div>
        <Button
          class="add-btn"
          @click="expressTemplateSelectPopupVisible = true"
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
            <input
              class="input"
              v-model="freightTemplate.name"
              type="text"
              placeholder="请输入模板名称"
            />
          </div>
          <div class="form-item">
            <div class="label row">
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
        </div>
      </div>
      <div
        v-for="(item, index) in freightTemplate.expressTemplateLists"
        :key="index"
      >
        <div class="title">
          <div>{{ item.expressName }}</div>
          <Button
            class="add-btn"
            @click="addExpressTemplateList(index)"
            icon="plus"
            text="添加"
            type="primary"
            size="mini"
          />
        </div>
        <SwipeCell v-for="(_item, _index) in item.list" :key="_index">
          <div class="card">
            <div class="form">
              <div class="form-item">
                <div class="label">区域名称</div>
                <input
                  class="input"
                  v-model="_item.areaName"
                  type="text"
                  placeholder="请输入区域名称"
                />
              </div>
              <div class="form-item">
                <div class="label">费用计算方式</div>
                <RadioGroup
                  class="selection"
                  v-model="_item.computeMode"
                  direction="horizontal"
                  icon-size="0.32rem"
                >
                  <Radio :name="1">按重量</Radio>
                  <Radio :name="2">按商品件数</Radio>
                </RadioGroup>
              </div>
              <div class="form-item" v-if="_item.computeMode === 1">
                <div class="label">首重1KG以内费用</div>
                <input
                  class="input"
                  v-model="_item.baseFee"
                  type="number"
                  step="0.01"
                  placeholder="例：0.00"
                />
              </div>
              <div class="form-item" v-if="_item.computeMode === 1">
                <div class="label">续重每1KG或其零数的费用</div>
                <input
                  class="input"
                  v-model="_item.stepFee"
                  type="number"
                  step="0.01"
                  placeholder="例：0.00"
                />
              </div>
              <div class="form-item" v-if="_item.computeMode === 2">
                <div class="label">单件商品费用</div>
                <input
                  class="input"
                  v-model="_item.singleFee"
                  type="number"
                  step="0.01"
                  placeholder="例：0.00"
                />
              </div>
              <div class="form-item">
                <div class="label">免费额度</div>
                <input
                  class="input"
                  v-model="_item.freeQuota"
                  type="number"
                  step="0.01"
                  placeholder="例：0.00"
                />
              </div>
              <div class="form-item">
                <div class="label">目的地</div>
                <div
                  class="picker"
                  @click="showExpressAreaSelectPopup(index, _index)"
                >
                  <div
                    class="content"
                    :class="{ active: _item.pickedCityDescs.length }"
                  >
                    {{
                      _item.pickedCityDescs.length
                        ? _item.pickedCityDescs.join()
                        : "请选择目的地"
                    }}
                  </div>
                  <Icon name="arrow" />
                </div>
              </div>
            </div>
          </div>
          <template #right>
            <Button
              class="delete-btn"
              @click.stop="deleteExpressTemplateList(index, _index)"
              icon="delete"
              color="#EE0D23"
              plain
            />
          </template>
        </SwipeCell>
      </div>
    </div>
    <div class="btns">
      <button class="save-btn" @click="save">保存</button>
    </div>
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
  <Popup
    v-model:show="expressSelectPopupVisible"
    position="bottom"
    round
    safe-area-inset-bottom
  >
    <div class="express-select-wrap">
      <div class="header">
        <div class="title">请选择快递</div>
        <Checkbox
          v-model="allExpressSelected"
          :disabled="allExpressSelectDisabled"
          @change="selectAllExpress"
          @click="curExpressOptionIndex = -1"
          label-position="left"
          >全选</Checkbox
        >
      </div>
      <div class="content">
        <div
          class="express-select"
          v-for="(item, index) in expressOptions"
          :key="index"
        >
          <Checkbox
            v-model="item.selected"
            :disabled="
              item.selected &&
              freightTemplate.expressList[curExpressIndex] &&
              item.expressId !== freightTemplate.expressList[curExpressIndex].id
            "
            @change="selectExpress"
            @click="curExpressOptionIndex = index"
            label-position="left"
            >{{ item.name }}</Checkbox
          >
        </div>
      </div>
    </div>
  </Popup>
  <PickerPopup
    :visible="expressTemplateSelectPopupVisible"
    :options="
      expressTemplateOptions.map((item) => ({
        text: item.name,
        value: +item.code,
      }))
    "
    @confirm="expressTemplateConfirm"
    @cancel="expressTemplateSelectPopupVisible = false"
  />
  <Popup
    v-model:show="expressAreaSelectPopupVisible"
    position="bottom"
    round
    safe-area-inset-bottom
  >
    <div
      class="area-select-wrap"
      v-if="regionOptionsList[curExpressTemplateListIndex]"
    >
      <div class="header">
        <div class="title">请选择地区</div>
        <Checkbox
          v-model="regionOptionsList[curExpressTemplateListIndex].allSelected"
          @change="selectAllExpressArea"
          @click="expressPickedCityIndex = -2"
          :disabled="expressAllAreaSelectDisabled"
          label-position="left"
          >全选</Checkbox
        >
      </div>
      <div class="main">
        <div class="left">
          <div
            class="province-selection"
            :class="{ active: expressActiveProvinceIndex === index }"
            v-for="(item, index) in regionOptionsList[
              curExpressTemplateListIndex
            ].list"
            :key="index"
            @click="expressActiveProvinceIndex = index"
          >
            {{ item.label }}
          </div>
        </div>
        <div
          class="right"
          v-for="(item, index) in regionOptionsList[curExpressTemplateListIndex]
            .list"
          :key="index"
          v-show="index === expressActiveProvinceIndex"
        >
          <div class="city-selection">
            <Checkbox
              v-model="item.allSelected"
              @change="selectAllExpressProvinceArea"
              @click="expressPickedCityIndex = -1"
              :disabled="
                item.allSelected &&
                freightTemplate.expressTemplateLists[
                  curExpressTemplateListIndex
                ].list[curExpressTemplateIndex] &&
                !item.areaIds.includes(
                  freightTemplate.expressTemplateLists[
                    curExpressTemplateListIndex
                  ].list[curExpressTemplateIndex].id
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
                freightTemplate.expressTemplateLists[
                  curExpressTemplateListIndex
                ].list[curExpressTemplateIndex] &&
                _item.areaId !==
                  freightTemplate.expressTemplateLists[
                    curExpressTemplateListIndex
                  ].list[curExpressTemplateIndex].id
              "
              @change="selectExpressArea"
              @click="expressPickedCityIndex = _index"
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
  showToast,
} from "vant";
import PickerPopup from "@/components/PickerPopup.vue";

import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getCityRegionOptions } from "@/utils/region-options";
import { getExpressOptions, createFreightTemplate } from "./utils/api";

import type { Option } from "@/utils/type";
import type {
  RegionOption,
  ExpressOption,
  ExpressTemplateOption,
  FreightTemplate,
} from "./utils/type";

const router = useRouter();

const freightTemplate = reactive<FreightTemplate>({
  mode: 1,
  name: "",
  title: "",
  computeMode: 1,
  freeQuota: 0,
  areaList: [{ id: 1, pickedCityCodes: [], pickedCityDescs: [], fee: 0 }],
  expressList: [
    { id: 1, pickedExpressCodes: [], pickedExpressDescs: [], fee: 0 },
  ],
  expressTemplateLists: [],
});

onMounted(() => {
  setRegionOptions();
  setExpressOptions();
  setExpressTemplateOptions();
});

// -------------------------- 地区选择 --------------------------
const regionOptions = ref<RegionOption[]>([]);
const curAreaIndex = ref(-1);
const areaSelectPopupVisible = ref(false);
const allAreaSelected = ref(false); // 全国地区全选
const activeProvinceIndex = ref(0);
const pickedCityIndex = ref(-3);

const allAreaSelectDisabled = computed(
  () =>
    allAreaSelected.value &&
    regionOptions.value.findIndex((item) =>
      item.areaIds.includes(freightTemplate.areaList[curAreaIndex.value].id)
    ) === -1
);

const setRegionOptions = () => {
  regionOptions.value = getCityRegionOptions().map((item: Option) => ({
    ...item,
    children: item.children?.map((_item) => ({
      ..._item,
      areaId: 0,
      selected: false,
    })),
    areaIds: [],
    allSelected: false,
  }));
};

const showAreaSelectPopup = (index: number) => {
  curAreaIndex.value = index;
  areaSelectPopupVisible.value = true;
};
const selectAllArea = (value: boolean) => {
  if (pickedCityIndex.value === -2) {
    regionOptions.value = regionOptions.value.map((item) => {
      const curAreaItem = freightTemplate.areaList[curAreaIndex.value];
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
    const curAreaItem = freightTemplate.areaList[curAreaIndex.value];
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
    const curAreaItem = freightTemplate.areaList[curAreaIndex.value];
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
  freightTemplate.areaList.push({
    id: (freightTemplate.areaList as []).length
      ? freightTemplate.areaList[freightTemplate.areaList.length - 1].id + 1
      : 1,
    pickedCityCodes: [],
    pickedCityDescs: [],
    fee: 0,
  });
const deleteArea = (index: number) => {
  showConfirmDialog({ title: "确定删除该配送地区配置吗？" })
    .then(() => {
      curAreaIndex.value = index;
      pickedCityIndex.value = -3;
      const id = freightTemplate.areaList[index].id;
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
      freightTemplate.areaList.splice(index, 1);
      return true;
    })
    .catch(() => true);
};
// -------------------------------------------------------------

// -------------------------- 快递选择 --------------------------
const expressOptions = ref<ExpressOption[]>([]);
const expressSelectPopupVisible = ref(false);
const curExpressIndex = ref(-1);
const curExpressOptionIndex = ref(-2);
const allExpressSelected = ref(false);

const allExpressSelectDisabled = computed(
  () =>
    allExpressSelected.value &&
    expressOptions.value.findIndex(
      (item) =>
        item.expressId === freightTemplate.expressList[curExpressIndex.value].id
    ) === -1
);

const setExpressOptions = async () => {
  const options = await getExpressOptions();
  expressOptions.value = options.map((item) => ({
    ...item,
    expressId: 0,
    selected: false,
  }));
};

const showExpressSelectPopup = (index: number) => {
  expressSelectPopupVisible.value = true;
  curExpressIndex.value = index;
};
const selectAllExpress = (value: boolean) => {
  if (curExpressOptionIndex.value === -1) {
    const curExpressItem = freightTemplate.expressList[curExpressIndex.value];
    if (value) {
      expressOptions.value = expressOptions.value.map((item) => {
        if (!item.selected) {
          curExpressItem.pickedExpressCodes = Array.from(
            new Set([...curExpressItem.pickedExpressCodes, item.code])
          );
          curExpressItem.pickedExpressDescs = Array.from(
            new Set([...curExpressItem.pickedExpressDescs, item.name])
          );
          return {
            ...item,
            expressId: curExpressItem.id,
            selected: true,
          };
        } else return item;
      });
    } else {
      expressOptions.value = expressOptions.value.map((item) => {
        if (item.expressId === curExpressItem.id) {
          curExpressItem.pickedExpressCodes =
            curExpressItem.pickedExpressCodes.filter(
              (code) => code !== item.code
            );
          curExpressItem.pickedExpressDescs =
            curExpressItem.pickedExpressDescs.filter(
              (desc) => desc !== item.name
            );
          return {
            ...item,
            expressId: 0,
            selected: false,
          };
        } else return item;
      });
    }
  }
};
const selectExpress = (value: boolean) => {
  if (
    curExpressOptionIndex.value !== -1 &&
    curExpressOptionIndex.value !== -2
  ) {
    const curExpressItem = freightTemplate.expressList[curExpressIndex.value];
    const curExpressOption = expressOptions.value[curExpressOptionIndex.value];
    curExpressOption.expressId = value ? curExpressItem.id : 0;
    curExpressItem.pickedExpressCodes = value
      ? Array.from(
          new Set([...curExpressItem.pickedExpressCodes, curExpressOption.code])
        )
      : curExpressItem.pickedExpressCodes.filter(
          (code) => code !== curExpressOption.code
        );
    curExpressItem.pickedExpressDescs = value
      ? Array.from(
          new Set([...curExpressItem.pickedExpressDescs, curExpressOption.name])
        )
      : curExpressItem.pickedExpressDescs.filter(
          (desc) => desc !== curExpressOption.name
        );
    allExpressSelected.value =
      expressOptions.value.findIndex((item) => !item.selected) === -1;
  }
};

const addExpress = () =>
  freightTemplate.expressList.push({
    id: freightTemplate.expressList.length
      ? freightTemplate.expressList[freightTemplate.expressList.length - 1].id +
        1
      : 1,
    pickedExpressCodes: [],
    pickedExpressDescs: [],
    fee: 0,
  });
const deleteExpress = (index: number) => {
  showConfirmDialog({ title: "确定删除该快递方式配置吗？" })
    .then(() => {
      curExpressIndex.value = index;
      curExpressOptionIndex.value = -2;
      const id = freightTemplate.expressList[index].id;
      expressOptions.value = expressOptions.value.map((item) => {
        if (item.expressId === id) {
          return {
            ...item,
            expressId: 0,
            selected: false,
          };
        } else return item;
      });
      allExpressSelected.value = false;
      freightTemplate.expressList.splice(index, 1);
      return true;
    })
    .catch(() => true);
};
// -------------------------------------------------------------

// ------------------------ 快递模板选择 -------------------------
const regionOptionsList = ref<
  {
    allSelected: boolean;
    list: RegionOption[];
  }[]
>([]);
const expressTemplateOptions = ref<ExpressTemplateOption[]>([]);
const expressTemplateSelectPopupVisible = ref(false);
const curExpressTemplateListIndex = ref(0);
const curExpressTemplateIndex = ref(0);
const expressActiveProvinceIndex = ref(0);
const expressPickedCityIndex = ref(-3);
const expressAreaSelectPopupVisible = ref(false);

const expressAllAreaSelectDisabled = computed(
  () =>
    regionOptionsList.value[curExpressTemplateListIndex.value].allSelected &&
    regionOptionsList.value[curExpressTemplateListIndex.value].list.findIndex(
      (item) =>
        item.areaIds.includes(
          freightTemplate.expressTemplateLists[
            curExpressTemplateListIndex.value
          ].list[curExpressTemplateIndex.value].id
        )
    ) === -1
);

const setExpressTemplateOptions = async () => {
  const options = await getExpressOptions();
  expressTemplateOptions.value = options.map((item) => ({
    ...item,
    disabled: false,
  }));
};

const showExpressAreaSelectPopup = (index: number, _index: number) => {
  curExpressTemplateListIndex.value = index;
  curExpressTemplateIndex.value = _index;
  expressAreaSelectPopupVisible.value = true;
};
const selectAllExpressArea = (value: boolean) => {
  if (expressPickedCityIndex.value === -2) {
    const curRegionOptionsItem =
      regionOptionsList.value[curExpressTemplateListIndex.value];
    curRegionOptionsItem.list = curRegionOptionsItem.list.map((item) => {
      const curAreaItem =
        freightTemplate.expressTemplateLists[curExpressTemplateListIndex.value]
          .list[curExpressTemplateIndex.value];
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
const selectAllExpressProvinceArea = (value: boolean) => {
  if (expressPickedCityIndex.value === -1) {
    const curRegionOptionsItem =
      regionOptionsList.value[curExpressTemplateListIndex.value];
    const curRegionOption =
      curRegionOptionsItem.list[expressActiveProvinceIndex.value];
    const curAreaItem =
      freightTemplate.expressTemplateLists[curExpressTemplateListIndex.value]
        .list[curExpressTemplateIndex.value];
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
    curRegionOptionsItem.allSelected =
      curRegionOptionsItem.list.findIndex((item) => !item.allSelected) === -1;
  }
};
const selectExpressArea = (value: boolean) => {
  if (
    expressPickedCityIndex.value !== -1 &&
    expressPickedCityIndex.value !== -2 &&
    expressPickedCityIndex.value !== -3
  ) {
    const curRegionOptionsItem =
      regionOptionsList.value[curExpressTemplateListIndex.value];
    const curRegionOption =
      curRegionOptionsItem.list[expressActiveProvinceIndex.value];
    const curCityOption =
      curRegionOption.children[expressPickedCityIndex.value];
    const curAreaItem =
      freightTemplate.expressTemplateLists[curExpressTemplateListIndex.value]
        .list[curExpressTemplateIndex.value];
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
    curRegionOptionsItem.allSelected =
      curRegionOptionsItem.list.findIndex((item) => !item.allSelected) === -1;
  }
};

const expressTemplateConfirm = ({
  selectedValues,
}: {
  selectedValues: number[];
}) => {
  const curExpressTemplateInfo = expressTemplateOptions.value.find(
    (item) => item.code === `${selectedValues[0]}`
  ) as ExpressTemplateOption;

  const index = expressTemplateOptions.value.findIndex(
    (item) => item.code === `${selectedValues[0]}`
  );
  expressTemplateOptions.value[index].disabled = true;

  regionOptionsList.value.push({
    allSelected: false,
    list: getCityRegionOptions().map((item: Option) => ({
      ...item,
      children: item.children?.map((_item) => ({
        ..._item,
        areaId: 0,
        selected: false,
      })),
      areaIds: [],
      allSelected: false,
    })),
  });
  freightTemplate.expressTemplateLists.push({
    expressCode: curExpressTemplateInfo.code,
    expressName: curExpressTemplateInfo.name,
    list: [
      {
        id: 1,
        areaName: "",
        computeMode: 1,
        baseFee: 0,
        stepFee: 0,
        singleFee: 0,
        freeQuota: 0,
        pickedCityCodes: [],
        pickedCityDescs: [],
      },
    ],
  });

  expressTemplateSelectPopupVisible.value = false;
};

const addExpressTemplateList = (index: number) => {
  const curList = freightTemplate.expressTemplateLists[index].list;
  curList.push({
    id: curList.length ? curList[curList.length - 1].id + 1 : 1,
    areaName: "",
    computeMode: 1,
    baseFee: 0,
    stepFee: 0,
    singleFee: 0,
    freeQuota: 0,
    pickedCityCodes: [],
    pickedCityDescs: [],
  });
};
const deleteExpressTemplateList = (index: number, _index: number) =>
  showConfirmDialog({ title: "确定删除该快递模版配置吗？" })
    .then(() => {
      curExpressTemplateListIndex.value = index;
      curExpressTemplateIndex.value = _index;
      expressPickedCityIndex.value = -3;
      const id = freightTemplate.expressTemplateLists[index].list[_index].id;
      const curRegionOptionsItem = regionOptionsList.value[index];
      curRegionOptionsItem.list = curRegionOptionsItem.list.map((item) => {
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
      curRegionOptionsItem.allSelected = false;
      freightTemplate.expressTemplateLists[index].list.splice(_index, 1);
      return true;
    })
    .catch(() => true);

// -------------------------------------------------------------

const save = async () => {
  if (!freightTemplate.name) {
    showToast("请输入模板名称");
    return;
  }
  if (!freightTemplate.title) {
    showToast("请输入模板标题");
    return;
  }
  if (
    freightTemplate.mode === 2 &&
    !freightTemplate.expressTemplateLists.length
  ) {
    showToast("请添加快递模板");
    return;
  }
  try {
    await createFreightTemplate({
      ...freightTemplate,
      areaList: JSON.stringify(
        freightTemplate.mode === 1 ? freightTemplate.areaList : []
      ),
      expressList: JSON.stringify(
        freightTemplate.mode === 1 ? freightTemplate.expressList : []
      ),
      expressTemplateLists: JSON.stringify(
        freightTemplate.mode === 2 ? freightTemplate.expressTemplateLists : []
      ),
    });
    router.back();
  } catch (error) {
    showToast("保存失败，请重试");
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
}
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
.express-select-wrap {
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
  .content {
    padding: 0 0.32rem;
    height: 8rem;
    overflow-y: scroll;
    .express-select {
      display: flex;
      align-items: center;
      height: 1rem;
      color: #333;
      font-size: 0.28rem;
      font-weight: 550;
      border-bottom: 0.01rem solid #eee;
      &:last-child {
        border-bottom: none;
      }
      .van-checkbox {
        justify-content: space-between;
        width: 100%;
      }
    }
  }
}
</style>
