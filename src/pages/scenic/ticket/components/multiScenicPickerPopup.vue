<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <div class="tool-bar">
      <button class="cancel-btn" @click="cancel">取消</button>
      <button class="confirm-btn" @click="confirm">确认</button>
    </div>
    <CheckboxGroup class="scenic-options" v-model="scenicIds">
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
              :ref="(el: CheckboxInstance) => (scenicOptionRefs[index] = el)"
              @click.stop
            />
          </template>
        </Cell>
      </CellGroup>
    </CheckboxGroup>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, CheckboxGroup, Checkbox, CellGroup, Cell } from "vant";
import { ref } from "vue";

import type { CheckboxInstance } from "vant";
import type { Option } from "@/utils/type";

defineProps<{ visible: boolean; scenicOptions: Option[] }>();
const emit = defineEmits(["confirm", "cancel"]);

const scenicIds = ref([]);
const scenicOptionRefs = ref<CheckboxInstance[]>([]);

const toggleSelected = (index: number) => {
  scenicOptionRefs.value[index].toggle();
};
const confirm = () => emit("confirm", scenicIds.value);
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
.scenic-options {
  margin-top: 0.88rem;
  padding-bottom: 0.36rem;
  height: 8rem;
  overflow-y: scroll;
}
</style>
