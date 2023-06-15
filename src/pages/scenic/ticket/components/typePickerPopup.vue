<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Picker :columns="typeOptions" @confirm="confirm" @cancel="cancel" />
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Picker } from "vant";

const typeOptions = [
  { text: "单景点门票", value: 1 },
  { text: "多景点联票", value: 2 },
];
defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const confirm = ({ selectedValues }: { selectedValues: number[] }) =>
  emit("confirm", {
    type: selectedValues[0],
    name: typeOptions.find((item) => item.value === selectedValues[0])?.text,
  });
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
