<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <PickerGroup
      :tabs="['开始时间', '结束时间']"
      @confirm="confirm"
      @cancel="cancel"
    >
      <TimePicker v-model="startTime" />
      <TimePicker v-model="endTime" />
    </PickerGroup>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, PickerGroup, TimePicker } from "vant";
import { ref } from "vue";

defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const startTime = ref([]);
const endTime = ref([]);

const confirm = () =>
  emit("confirm", `${startTime.value.join(":")}-${endTime.value.join(":")}`);
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
