<template>
  <Popup
    :show="visible"
    @click-overlay="cancel"
    position="bottom"
    round
    safe-area-inset-bottom
  >
    <div class="container">
      <div class="title">选择景点</div>
      <form action="/">
        <Search
          v-model="keywords"
          @search="setScenicOptions"
          placeholder="搜索景点"
        />
      </form>
      <div class="scenic-options" v-if="scenicOptions.length">
        <CheckboxGroup class="options" v-model="selectedValues">
          <CellGroup>
            <Cell
              v-for="(item, index) in scenicOptions"
              :key="item.id"
              :title="item.name"
              @click="toggleSelected(index)"
            >
              <template #right-icon>
                <Checkbox
                  :name="item.id"
                  :ref="(el: CheckboxInstance) => (optionRefs[index] = el)"
                  @click.stop
                />
              </template>
            </Cell>
          </CellGroup>
        </CheckboxGroup>
      </div>
      <Empty
        v-if="!scenicOptions.length"
        image="https://static.tiddler.cn/mp/default_illus/empty.png"
        description="未搜索到相关景点"
      />
      <div class="no-tips row center" @click="createScenic">
        没有找到您的景点？<span style="color: #1182fb">点此创建</span>
      </div>
      <div class="btns-wrap row">
        <div class="cancel-btn row center" @click="cancel">取消</div>
        <div
          class="confirm-btn row center"
          :class="{ active: selectedValues.length }"
          @click="confirm"
        >
          确定
        </div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import {
  Popup,
  Search,
  CheckboxGroup,
  Checkbox,
  CellGroup,
  Cell,
  Empty,
} from "vant";

import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getScenicOptions } from "../utils/api";

import type { CheckboxInstance } from "vant";
import type { ApiOption } from "@/utils/type";

const props = defineProps<{ shopId: number; visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const optionRefs = ref<CheckboxInstance[]>([]);
const keywords = ref("");
const scenicOptions = ref<ApiOption[]>([]);
const scenicId = ref(0);
const selectedValues = ref([]);

const router = useRouter();

watch(props, (props) => {
  if (!props.visible) {
    scenicId.value = 0;
  }
});

onMounted(() => {
  setScenicOptions();
});

const setScenicOptions = async () => {
  scenicOptions.value = await getScenicOptions(props.shopId, keywords.value);
};

const toggleSelected = (index: number) => {
  optionRefs.value[index].toggle();
};

const confirm = () => {
  // if (scenicId.value === 0) {
  //   return;
  // }
  // const scenic = scenicOptions.value.find(
  //   (scenic) => scenic.id === scenicId.value
  // );
  if (!selectedValues.value.length) {
    return;
  }
  selectedValues.value.length;
  emit("confirm", { selectedValues: selectedValues.value });
};
const cancel = () => {
  emit("cancel");
};

const createScenic = () => router.push("/scenic/spot/create");
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
  .scenic-options {
    margin-top: 0.2rem;
    height: 6.8rem;
    overflow-y: scroll;
    .scenic-option {
      display: flex;
      align-items: center;
      padding: 0.18rem 0;
      color: #333;
      font-size: 0.28rem;
      font-weight: 500;
      border-bottom: 1px solid #eee;
    }
  }
  .no-tips {
    height: 1.2rem;
    color: #333;
    font-size: 0.26rem;
  }
  .btns-wrap {
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
<style scoped>
.van-empty {
  padding: 1.8rem 0;
}
</style>
<style>
.van-search {
  padding: 0 !important;
}
.van-radio__label--left {
  width: 100% !important;
}
</style>
