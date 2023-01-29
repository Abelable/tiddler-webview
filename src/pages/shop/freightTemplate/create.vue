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
      <SwipeCell v-for="(item, index) in areaList" :key="index" :name="index">
        <div class="card">
          <div class="form">
            <div class="form-item">
              <div class="label">地区</div>
              <div
                class="picker"
                :class="{ active: item.pickedAreaDescs.length }"
                @click="showAreaselectPopup(index)"
              >
                <div>
                  {{
                    item.pickedAreaDescs.length
                      ? `${item.pickedAreaDescs.join().slice(0, 20)}...`
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
                v-model="areaList[index].fee"
                type="number"
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
              <div
                class="picker"
                :class="{ active: item.pickedAreaDescs.length }"
              >
                <div>
                  {{
                    item.pickedAreaDescs.length
                      ? `${item.pickedAreaDescs.join().slice(0, 20)}...`
                      : "请选择目的地"
                  }}
                </div>
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

  <Popup v-model:show="areaSelectPopupVisible" position="bottom" round>
    <div class="area-select-wrap">
      <div class="header">
        <div class="title">请选择地区</div>
        <Checkbox
          v-model="allAreaSelected"
          @change="selectAllArea"
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
              @click="setPickedCityIndex(-1)"
              :disabled="
                item.allSelected && !item.areaIndexs.includes(curAreaIndex)
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
              :disabled="_item.selected && _item.areaIndex !== curAreaIndex"
              @change="selectArea"
              @click="setPickedCityIndex(_index)"
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
} from "vant";
import { ref, reactive, onMounted, computed } from "vue";
import {
  RegionOption as Option,
  getCityRegionOptions,
} from "@/utils/region-options";

interface AreaRegion {
  label: string;
  value: string;
  areaIndex: number;
  selected: boolean;
}
interface RegionOption {
  label: string;
  value: string;
  areaIndexs: number[];
  allSelected: boolean;
  children: AreaRegion[];
}

// -------------------------- 地区选择 --------------------------
const areaList = reactive<
  { pickedAreaCodes: string[]; pickedAreaDescs: string[]; fee: string }[]
>([{ pickedAreaCodes: [], pickedAreaDescs: [], fee: "" }]);
const addArea = () =>
  areaList.push({ pickedAreaCodes: [], pickedAreaDescs: [], fee: "" });

const areaSelectPopupVisible = ref(false);
const curAreaIndex = ref(-1);
const showAreaselectPopup = (index: number) => {
  curAreaIndex.value = index;
  areaSelectPopupVisible.value = true;
};

const regionOptions = ref<RegionOption[]>([]);
const activeProvinceIndex = ref(0);
const pickedCityIndex = ref(-1);
const allAreaSelected = ref(false); // 全国地区全选
const allAreaSelectDisabled = computed(
  () =>
    allAreaSelected.value &&
    regionOptions.value.findIndex((item) =>
      item.areaIndexs.includes(curAreaIndex.value)
    ) === -1
);
const selectAllArea = (value: boolean) => {
  allAreaSelected.value = value;
  regionOptions.value = regionOptions.value.map((item) => {
    // 省份已全选的情况，
    // 只执行取消全选逻辑，且仅在包含当前地区索引情况下执行
    // 若为全选逻辑，则直接跳过
    if (item.allSelected) {
      if (!value && item.areaIndexs.includes(curAreaIndex.value)) {
        const children = item.children.map((_item) => {
          if (_item.areaIndex === curAreaIndex.value) {
            areaList[curAreaIndex.value].pickedAreaCodes = areaList[
              curAreaIndex.value
            ].pickedAreaCodes.filter((code) => code !== _item.value);
            areaList[curAreaIndex.value].pickedAreaDescs = areaList[
              curAreaIndex.value
            ].pickedAreaDescs.filter((desc) => desc !== _item.label);
            return {
              ..._item,
              selected: false,
              areaIndex: -1,
            };
          } else {
            return _item;
          }
        });
        return {
          ...item,
          allSelected: false,
          areaIndexs: item.areaIndexs.filter(
            (areaIndex) => areaIndex !== curAreaIndex.value
          ),
          children,
        };
      } else return item;
    } else {
      // 省份未全选的情况，分全选、取消全选，2个逻辑
      let children;
      if (value) {
        children = item.children.map((_item) => {
          if (!_item.selected) {
            areaList[curAreaIndex.value].pickedAreaCodes = Array.from(
              new Set([
                ...areaList[curAreaIndex.value].pickedAreaCodes,
                _item.value,
              ])
            );
            areaList[curAreaIndex.value].pickedAreaDescs = Array.from(
              new Set([
                ...areaList[curAreaIndex.value].pickedAreaDescs,
                _item.label,
              ])
            );
            return {
              ..._item,
              selected: true,
              areaIndex: curAreaIndex.value,
            };
          } else return _item;
        });
      } else {
        children = item.children.map((_item) => {
          if (_item.selected && _item.areaIndex === curAreaIndex.value) {
            areaList[curAreaIndex.value].pickedAreaCodes = areaList[
              curAreaIndex.value
            ].pickedAreaCodes.filter((code) => code !== _item.value);
            areaList[curAreaIndex.value].pickedAreaDescs = areaList[
              curAreaIndex.value
            ].pickedAreaDescs.filter((desc) => desc !== _item.label);
            return {
              ..._item,
              selected: false,
              areaIndex: -1,
            };
          } else return _item;
        });
      }

      return {
        ...item,
        allSelected: value,
        areaIndexs: value
          ? Array.from(new Set([...item.areaIndexs, curAreaIndex.value]))
          : item.areaIndexs.filter(
              (areaIndex) => areaIndex !== curAreaIndex.value
            ),
        children,
      };
    }
  });
};
const selectAllProvinceArea = (value: boolean) => {
  if (pickedCityIndex.value === -1) {
    regionOptions.value[activeProvinceIndex.value].areaIndexs = value
      ? Array.from(
          new Set([
            ...regionOptions.value[activeProvinceIndex.value].areaIndexs,
            curAreaIndex.value,
          ])
        )
      : regionOptions.value[activeProvinceIndex.value].areaIndexs.filter(
          (areaIndex) => areaIndex !== curAreaIndex.value
        );
    if (value) {
      regionOptions.value[activeProvinceIndex.value].children =
        regionOptions.value[activeProvinceIndex.value].children.map((item) => {
          if (!item.selected) {
            areaList[curAreaIndex.value].pickedAreaCodes = Array.from(
              new Set([
                ...areaList[curAreaIndex.value].pickedAreaCodes,
                item.value,
              ])
            );
            areaList[curAreaIndex.value].pickedAreaDescs = Array.from(
              new Set([
                ...areaList[curAreaIndex.value].pickedAreaDescs,
                item.label,
              ])
            );
            return {
              ...item,
              selected: true,
              areaIndex: curAreaIndex.value,
            };
          } else return item;
        });
    } else {
      regionOptions.value[activeProvinceIndex.value].children =
        regionOptions.value[activeProvinceIndex.value].children.map((item) => {
          if (item.selected && item.areaIndex === curAreaIndex.value) {
            areaList[curAreaIndex.value].pickedAreaCodes = areaList[
              curAreaIndex.value
            ].pickedAreaCodes.filter((code) => code !== item.value);
            areaList[curAreaIndex.value].pickedAreaDescs = areaList[
              curAreaIndex.value
            ].pickedAreaDescs.filter((desc) => desc !== item.label);
            return {
              ...item,
              selected: false,
              areaIndex: -1,
            };
          } else return item;
        });
    }
    allAreaSelected.value =
      regionOptions.value.findIndex((item) => !item.allSelected) === -1;
  }
};
const setPickedCityIndex = (index: number) => (pickedCityIndex.value = index);
const selectArea = (value: boolean) => {
  if (pickedCityIndex.value !== -1) {
    if (value) {
      areaList[curAreaIndex.value].pickedAreaCodes = Array.from(
        new Set([
          ...areaList[curAreaIndex.value].pickedAreaCodes,
          regionOptions.value[activeProvinceIndex.value].children[
            pickedCityIndex.value
          ].value,
        ])
      );
      areaList[curAreaIndex.value].pickedAreaDescs = Array.from(
        new Set([
          ...areaList[curAreaIndex.value].pickedAreaDescs,
          regionOptions.value[activeProvinceIndex.value].children[
            pickedCityIndex.value
          ].label,
        ])
      );
    } else {
      areaList[curAreaIndex.value].pickedAreaCodes = areaList[
        curAreaIndex.value
      ].pickedAreaCodes.filter(
        (code) =>
          code !==
          regionOptions.value[activeProvinceIndex.value].children[
            pickedCityIndex.value
          ].value
      );
      areaList[curAreaIndex.value].pickedAreaDescs = areaList[
        curAreaIndex.value
      ].pickedAreaDescs.filter(
        (desc) =>
          desc !==
          regionOptions.value[activeProvinceIndex.value].children[
            pickedCityIndex.value
          ].label
      );
    }
    regionOptions.value[activeProvinceIndex.value].children[
      pickedCityIndex.value
    ].areaIndex = value ? curAreaIndex.value : -1;
    regionOptions.value[activeProvinceIndex.value].areaIndexs = value
      ? Array.from(
          new Set([
            ...regionOptions.value[activeProvinceIndex.value].areaIndexs,
            curAreaIndex.value,
          ])
        )
      : regionOptions.value[activeProvinceIndex.value].areaIndexs.filter(
          (areaIndex) => areaIndex !== curAreaIndex.value
        );
    regionOptions.value[activeProvinceIndex.value].allSelected =
      regionOptions.value[activeProvinceIndex.value].children.findIndex(
        (item) => !item.selected
      ) === -1;
    allAreaSelected.value =
      regionOptions.value.findIndex((item) => !item.allSelected) === -1;
  }
};
const deleteArea = (index: number) => {
  showConfirmDialog({ title: "确定删除该配送地区配置吗？" })
    .then(() => areaList.splice(index, 1))
    .catch(() => true);
};
// -------------------------------------------------------------

onMounted(() => {
  setRegionOptions();
});

const setRegionOptions = () => {
  regionOptions.value = getCityRegionOptions().map((item: Option) => ({
    ...item,
    children: item.children?.map((_item) => ({
      ..._item,
      areaIndex: -1,
      selected: false,
    })),
    areaIndexs: [],
    allSelected: false,
  }));
};

const templateType = ref(0);
const computeType = ref(1);
const expressList = reactive([{ pickedExpressDesc: "", fee: "" }]);

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
