<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <PickerGroup :tabs="tabs" @confirm="confirm" @cancel="cancel">
      <TimePicker v-model="startTime" />
      <TimePicker v-model="endTime" />
    </PickerGroup>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, PickerGroup, TimePicker } from "vant";
import { ref } from "vue";

withDefaults(
  defineProps<{
    visible: boolean;
    tabs?: string[];
  }>(),
  { tabs: () => ["开始时间", "结束时间"] }
);

const emit = defineEmits(["confirm", "cancel"]);

const startTime = ref([]);
const endTime = ref([]);

const confirm = () =>
  emit("confirm", { startTime: startTime.value, endTime: endTime.value });
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
