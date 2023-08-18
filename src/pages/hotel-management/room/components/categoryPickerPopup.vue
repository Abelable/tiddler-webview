<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Picker
      :columns="categoryOptions"
      @confirm="confirm"
      @cancel="cancel"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Picker } from "vant";
import { RoomTypeOption } from "../utils/type";

defineProps<{ visible: boolean; categoryOptions: RoomTypeOption[] }>();
const emit = defineEmits(["confirm", "cancel"]);

const confirm = ({ selectedValues }: { selectedValues: number[] }) =>
  emit("confirm", selectedValues[0]);
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
