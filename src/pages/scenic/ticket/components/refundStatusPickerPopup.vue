<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Picker
      :columns="refundStatusOptions"
      @confirm="confirm"
      @cancel="cancel"
    />
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Picker } from "vant";

const refundStatusOptions = [
  { text: "随时可退", value: 1 },
  { text: "有条件退", value: 2 },
  { text: "不可退", value: 3 },
];

defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const confirm = ({ selectedValues }: { selectedValues: number[] }) =>
  emit("confirm", {
    status: selectedValues[0],
    name: refundStatusOptions.find((item) => item.value === selectedValues[0])
      ?.text,
  });
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
