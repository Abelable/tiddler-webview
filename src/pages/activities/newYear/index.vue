<template>
  <div class="bg-wrap">
    <img class="bg" src="./images/bg.webp" alt="" />
    <div class="count-down-wrap">
      <!-- <div class="count-down-tips">距离团圆还有</div> -->
      <img class="count-down-tips" src="./images/count_down_tips.webp" alt="" />
      <div class="count-down">
        <div class="count-down-unit">
          <div class="time">{{ days }}</div>
          <div class="desc">天</div>
        </div>
        <div class="split">:</div>
        <div class="count-down-unit">
          <div class="time">{{ hours }}</div>
          <div class="desc">时</div>
        </div>
        <div class="split">:</div>
        <div class="count-down-unit">
          <div class="time">{{ minutes }}</div>
          <div class="desc">分</div>
        </div>
        <div class="split">:</div>
        <div class="count-down-unit">
          <div class="time">{{ seconds }}</div>
          <div class="desc">秒</div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="activity-part"></div>
    <div class="activity-part"></div>
    <div class="activity-part"></div>
    <div class="split-tips">合作伙伴</div>
    <div class="partters">
      <div class="partter">
        <img class="partter-logo" src="./images/qdnp.webp" alt="" />
      </div>
      <div class="partter">
        <img class="partter-logo" src="./images/qdlw.webp" alt="" />
      </div>
      <div class="partter"></div>
      <div class="partter"></div>
      <div class="partter"></div>
      <div class="partter"></div>
      <div class="partter"></div>
      <div class="partter"></div>
      <div class="partter"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const days = ref("00");
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");

let timer: number | null = null;

// 2026年除夕（北京时间）
const targetTime = new Date("2026-02-16T23:59:59+08:00").getTime();

const format = (num: number) => String(num).padStart(2, "0");

const updateCountDown = () => {
  const now = Date.now();
  let diff = targetTime - now;

  if (diff <= 0) {
    days.value = hours.value = minutes.value = seconds.value = "00";
    clearInterval(timer!);
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= 1000 * 60 * 60 * 24;

  const h = Math.floor(diff / (1000 * 60 * 60));
  diff %= 1000 * 60 * 60;

  const m = Math.floor(diff / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  days.value = format(d);
  hours.value = format(h);
  minutes.value = format(m);
  seconds.value = format(s);
};

onMounted(() => {
  updateCountDown();
  timer = window.setInterval(updateCountDown, 1000);
});

onUnmounted(() => {
  timer && clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.bg-wrap {
  position: relative;
  .bg {
    width: 100%;
  }
  .count-down-wrap {
    position: absolute;
    bottom: 1.4rem;
    left: 50%;
    transform: translateX(-50%);
    .count-down-tips {
      display: block;
      margin: 0 auto;
      width: 3.2rem;
    }
    .count-down {
      display: flex;
      gap: 0.24rem;
      margin-top: 0.24rem;
      .count-down-unit {
        display: flex;
        flex-direction: column;
        align-items: center;
        .time {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 0.88rem;
          height: 1rem;
          font-size: 0.48rem;
          font-weight: bold;
          font-family: "DIN Alternate", "DIN", "Helvetica Neue", Arial,
            sans-serif;
          font-variant-numeric: tabular-nums;
          color: #ffdcad;
          background: #c71a20;
          border-radius: 0.36rem;
          border: 1px solid #ffdcad;
        }
        .desc {
          margin-top: 0.08rem;
          font-size: 0.24rem;
          color: #160a8c;
        }
      }
      .split {
        display: flex;
        align-items: center;
        height: 1rem;
        font-size: 0.36rem;
        line-height: 1;
        color: #ffdcad;
      }
    }
  }
}
.container {
  margin-top: -1rem;
  padding: 0.32rem;
  padding-bottom: 0.68rem;
  background: linear-gradient(
    180deg,
    rgba(233, 214, 249, 0.5) 0%,
    rgba(233, 214, 249, 1) 0.6rem,
    rgba(233, 214, 249, 1) 100%
  );
  border-radius: 0.8rem 0.8rem 0 0;
  .activity-part {
    height: 1.8rem;
    margin-bottom: 0.32rem;
    background: #ffffff;
    border-radius: 0.6rem;
  }
  .split-tips {
    position: relative;
    margin: 0.64rem auto 0;
    width: fit-content;
    font-size: 0.3rem;
    color: #160a8c;
    font-weight: bold;
    &::before {
      left: -1rem;
    }
    &::after {
      right: -1rem;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 0.8rem;
      height: 0.5px;
      background: #160a8c;
      transform: translateY(-50%);
    }
  }
  .partters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.24rem;
    margin-top: 0.32rem;
    .partter {
      width: calc((100% - 0.48rem) / 3);
      height: 0.88rem;
      background: #ffffff;
      border-radius: 0.24rem;
      overflow: hidden;
      .partter-logo {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
