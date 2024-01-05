<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <PickerGroup
      :tabs="['开始日期', '结束日期']"
      @confirm="confirm"
      @cancel="cancel"
    >
      <DatePicker v-model="startDate" :min-date="minDate" />
      <DatePicker v-model="endDate" :min-date="minDate" />
    </PickerGroup>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, PickerGroup, DatePicker } from "vant";
import { ref } from "vue";

defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const minDate = new Date();

const startDate = ref([]);
const endDate = ref([]);

const confirm = () =>
  emit("confirm", {
    startDate: startDate.value.join("-"),
    endDate: endDate.value.join("-"),
  });
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped></style>
