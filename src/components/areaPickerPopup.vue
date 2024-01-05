<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <Area :area-list="areaList" @confirm="confirm" @cancel="cancel" />
  </Popup>
</template>

<script setup lang="ts">
import { Area, Popup } from "vant";
import { areaList } from "@vant/area-data";
import type { Option } from "@/utils/type";

defineProps<{ visible: boolean }>();
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
