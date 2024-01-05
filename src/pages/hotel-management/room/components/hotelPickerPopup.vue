<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Picker
      :columns="hotelOptions"
      @confirm="confirm"
      @cancel="cancel"
      :columns-field-names="{ text: 'name', value: 'id' }"
    />
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Picker } from "vant";
import type { ApiOption } from "@/utils/type";

defineProps<{ visible: boolean; hotelOptions: ApiOption[] }>();
const emit = defineEmits(["confirm", "cancel"]);

const confirm = ({ selectedValues }: { selectedValues: number[] }) =>
  emit("confirm", selectedValues[0]);
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
