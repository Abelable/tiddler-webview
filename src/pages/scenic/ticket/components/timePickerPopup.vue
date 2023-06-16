<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <TimePicker @confirm="confirm" @cancel="cancel" />
  </Popup>
</template>

<script setup lang="ts">
import { Popup, TimePicker } from "vant";

defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const confirm = ({ selectedValues }: { selectedValues: string[] }) =>
  emit("confirm", `${selectedValues.join(":")}`);
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
