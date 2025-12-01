<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <div class="tool-bar">
      <button class="cancel-btn" @click="cancel">取消</button>
      <button class="confirm-btn" @click="confirm">确认</button>
    </div>
    <CheckboxGroup class="options" v-model="selectedValues">
      <CellGroup>
        <Cell
          v-for="(item, index) in options"
          :key="item.value"
          :title="item.text"
          @click="toggleSelected(index)"
        >
          <template #right-icon>
            <Checkbox
              :name="item.value"
              :ref="(el: CheckboxInstance) => (optionRefs[index] = el)"
              @click.stop
            />
          </template>
        </Cell>
      </CellGroup>
    </CheckboxGroup>
    <slot></slot>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, CheckboxGroup, Checkbox, CellGroup, Cell } from "vant";
import { ref, watch } from "vue";

import type { CheckboxInstance } from "vant";
import type { Option } from "@/utils/type";

const props = defineProps<{
  visible: boolean;
  options: Option[];
  selectedValues?: (string | number)[];
}>();

const emit = defineEmits(["update:selectedValues", "confirm", "cancel"]);

const selectedValues = ref<(string | number)[]>(props.selectedValues ?? []);

watch(
  () => props.selectedValues,
  (val) => {
    if (val) selectedValues.value = [...val];
  }
);

const optionRefs = ref<CheckboxInstance[]>([]);

const toggleSelected = (index: number) => {
  optionRefs.value[index]?.toggle();
};

const confirm = () => {
  emit("update:selectedValues", selectedValues.value);
  emit("confirm", { selectedValues: selectedValues.value });
};

const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped>
.tool-bar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .cancel-btn,
  .confirm-btn {
    width: 1.2rem;
    height: 0.88rem;
    font-size: 0.28rem;
  }
  .cancel-btn {
    color: #969799;
  }
  .confirm-btn {
    color: #576b95;
  }
}
.options {
  margin-top: 0.88rem;
  padding-bottom: 0.36rem;
  height: 8rem;
  overflow-y: scroll;
}
</style>
