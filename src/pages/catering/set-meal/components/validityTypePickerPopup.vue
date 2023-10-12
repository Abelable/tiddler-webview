<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Picker
      :columns="validityTypeOptions"
      @confirm="confirm"
      @cancel="cancel"
    />
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Picker } from "vant";
import { validityTypeOptions } from "../utils/index";

defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const confirm = ({ selectedValues }: { selectedValues: number[] }) =>
  emit("confirm", selectedValues[0]);
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
