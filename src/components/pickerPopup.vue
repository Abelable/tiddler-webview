<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Picker :columns="options" @confirm="confirm" @cancel="cancel" />
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Picker } from "vant";

interface Option {
  text: string;
  value: number;
}

defineProps<{ visible: boolean; options: Option[] }>();
const emit = defineEmits(["confirm", "cancel"]);

const confirm = ({
  selectedValues,
  selectedOptions,
}: {
  selectedValues: number[];
  selectedOptions: Option[];
}) => emit("confirm", { selectedValues, selectedOptions });
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
