<template>
  <div class="container">
    <img
      class="scenic"
      v-for="(id, index) in scenicList"
      :key="index"
      :src="require(`./images/scenic/${index + 1}.png`)"
      @click="checkScenic(id)"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
const scenicList = [1, 2, 3, 4, 5];
const checkScenic = (id: number) => {
  window.wx.miniProgram.navigateTo({
    url: `/pages/subpages/mall/scenic/subpages/scenic-detail/index?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 2.5rem;
  font-size: 0;
  background: #90cef0;
  background-image: url("./images/bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  .scenic {
    width: 100%;
    &:first-child {
      margin-top: 12.88rem;
    }
    &:nth-child(2) {
      margin-top: 0.88rem;
    }
    &:nth-child(3) {
      margin-top: 2.2rem;
    }
    &:nth-child(4) {
      margin-top: 1.5rem;
    }
    &:last-child {
      margin-top: 1.2rem;
    }
  }
}
</style>
