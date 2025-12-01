<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Picker
      v-model="localSelectedValues"
      :columns="options"
      @confirm="onConfirm"
      @cancel="cancel"
    />
    <slot></slot>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Picker } from "vant";
import { ref, watch } from "vue";
import type { Option } from "@/utils/type";

const props = defineProps<{
  visible: boolean;
  options: Option[];
  selectedValues?: (string | number)[];
}>();

const emit = defineEmits(["update:selectedValues", "confirm", "cancel"]);

const localSelectedValues = ref<(string | number)[]>(
  props.selectedValues ?? []
);

watch(
  () => props.selectedValues,
  (val) => {
    if (val) localSelectedValues.value = [...val];
  }
);

const onConfirm = ({
  selectedValues,
  selectedOptions,
}: {
  selectedValues: (string | number)[];
  selectedOptions: Option[];
}) => {
  emit("update:selectedValues", selectedValues);
  emit("confirm", { selectedValues, selectedOptions });
};

const cancel = () => emit("cancel");
</script>
