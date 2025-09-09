<template>
  <div class="container">
    <img class="bg" src="./images/bg.png" alt="" />
    <img
      class="scenic"
      v-for="(id, index) in [30, 32, 58, 29]"
      :key="index"
      :src="require(`./images/scenic/${index + 1}.png`)"
      @click.stop="checkScenic(id)"
      alt=""
    />
    <img class="title" src="./images/title.png" alt="" />
    <img
      class="scenic"
      v-for="(id, index) in [72, 73, 36]"
      :key="index"
      :src="require(`./images/scenic/${index + 5}.png`)"
      @click.stop="checkScenic(id)"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
const checkScenic = (id: number) => {
  window.wx.miniProgram.navigateTo({
    url: `/pages/subpages/mall/scenic/subpages/scenic-detail/index?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 0;
  .bg,
  .title,
  .scenic {
    width: 100%;
  }
}
</style>
