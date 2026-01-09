<template>
  <div class="bg-wrap">
    <img class="bg" src="./images/bg.webp" alt="" />
    <div class="count-down-wrap">
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
    <div class="luck-draw">
      <div class="luck-score-wrap">
        <div class="luck-score">
          <div class="luck-score-tips">
            <div>我的福气值</div>
            <img class="tips-arrow" src="./images/arrow.png" alt="" />
          </div>
          <div class="luck-score-value">
            <img class="luck-bag" src="./images/luck_bag.webp" alt="" />
            <div>120</div>
          </div>
          <div class="activity-time">活动时间：2026.01.08-2026.02.24</div>
        </div>
        <div class="luck-btn">获取更多福气值</div>
      </div>
      <div class="draw-wheel">
        <div class="prize-list">
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize big">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
            <div class="big-prize-tag">本期大奖</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
          <div class="prize">
            <img class="prize-cover" src="./images/qdcy.webp" />
            <div class="prize-name">测试测试测试</div>
          </div>
        </div>
        <div
          class="draw-btn"
          @touchstart="press = true"
          @touchend="press = false"
          :class="{ pressed: press }"
        >
          消耗20福气值
        </div>
        <div class="my-prize-btn-wrap">
          <div class="my-prize-btn">
            <p>我的</p>
            <p>奖品</p>
          </div>
        </div>
      </div>
    </div>
    <div class="luck-exchange">
      <img
        class="luck-exchange-title"
        src="./images/exchange_title.webp"
        alt=""
      />
      <div class="goods-list">
        <div class="goods">
          <img class="goods-cover" src="./images/qdcy.webp" alt="" />
          <div class="goods-info">
            <div class="goods-name">
              测试测试测试测试测试测试测试测试测试测试测试测试测试
            </div>
            <div class="goods-exchange">
              <div class="goods-need-luck">300福气值</div>
              <div class="goods-exchange-btn">兑换</div>
            </div>
          </div>
        </div>
        <div class="goods">
          <img class="goods-cover" src="./images/qdcy.webp" alt="" />
          <div class="goods-info">
            <div class="goods-name">
              测试测试测试测试测试测试测试测试测试测试测试测试测试
            </div>
            <div class="goods-exchange">
              <div class="goods-need-luck">300福气值</div>
              <div class="goods-exchange-btn">兑换</div>
            </div>
          </div>
        </div>
        <div class="goods">
          <img class="goods-cover" src="./images/qdcy.webp" alt="" />
          <div class="goods-info">
            <div class="goods-name">
              测试测试测试测试测试测试测试测试测试测试测试测试测试
            </div>
            <div class="goods-exchange">
              <div class="goods-need-luck">300福气值</div>
              <div class="goods-exchange-btn">兑换</div>
            </div>
          </div>
        </div>
        <div class="goods">
          <img class="goods-cover" src="./images/qdcy.webp" alt="" />
          <div class="goods-info">
            <div class="goods-name">
              测试测试测试测试测试测试测试测试测试测试测试测试测试
            </div>
            <div class="goods-exchange">
              <div class="goods-need-luck">300福气值</div>
              <div class="goods-exchange-btn">兑换</div>
            </div>
          </div>
        </div>
        <div class="goods">
          <img class="goods-cover" src="./images/qdcy.webp" alt="" />
          <div class="goods-info">
            <div class="goods-name">
              测试测试测试测试测试测试测试测试测试测试测试测试测试
            </div>
            <div class="goods-exchange">
              <div class="goods-need-luck">300福气值</div>
              <div class="goods-exchange-btn">兑换</div>
            </div>
          </div>
        </div>
        <div class="goods">
          <img class="goods-cover" src="./images/qdcy.webp" alt="" />
          <div class="goods-info">
            <div class="goods-name">
              测试测试测试测试测试测试测试测试测试测试测试测试测试
            </div>
            <div class="goods-exchange">
              <div class="goods-need-luck">300福气值</div>
              <div class="goods-exchange-btn">兑换</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="split-tips">合作伙伴</div>
    <div class="partters">
      <div class="partter">
        <img class="partter-logo" src="./images/qdnp.webp" alt="" />
      </div>
      <div class="partter">
        <img class="partter-logo" src="./images/qdlw.webp" alt="" />
      </div>
      <div class="partter">
        <img class="partter-logo" src="./images/qdcy.webp" alt="" />
      </div>
      <div class="partter">
        <img class="partter-logo" src="./images/klj.webp" alt="" />
      </div>
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

const press = ref(false);
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
  padding-bottom: 0.48rem;
  background: linear-gradient(
    180deg,
    rgba(233, 214, 249, 0.5) 0%,
    rgba(233, 214, 249, 1) 0.6rem,
    rgba(233, 214, 249, 1) 100%
  );
  border-radius: 0.8rem 0.8rem 0 0;
  .luck-draw {
    padding: 0.32rem;
    .luck-score-wrap {
      display: flex;
      justify-content: space-between;
      padding-top: 0.12rem;
      padding-left: 0.24rem;
      padding-right: 0.12rem;
      .luck-score {
        display: flex;
        flex-direction: column;
        .luck-score-tips {
          display: flex;
          align-items: center;
          font-size: 0.22rem;
          color: #3d099a;
          .tips-arrow {
            width: 0.22rem;
            height: 0.22rem;
          }
        }
        .luck-score-value {
          display: flex;
          align-items: center;
          margin-top: 0.08rem;
          font-size: 0.48rem;
          font-weight: bolder;
          color: #3d099a;
          .luck-bag {
            margin-right: 0.08rem;
            width: 0.48rem;
            height: 0.48rem;
          }
        }
        .activity-time {
          display: flex;
          margin-top: 0.08rem;
          font-size: 0.22rem;
          color: #a689d5;
        }
      }
      .luck-btn {
        display: flex;
        align-items: center;
        padding: 0 0.24rem;
        height: 0.8rem;
        font-size: 0.28rem;
        color: #ffffff;
        font-weight: bold;
        background: linear-gradient(90deg, #996cfe 0%, #441aef 100%);
        border-radius: 0.4rem;
      }
    }
    .draw-wheel {
      position: relative;
      margin-top: 0.48rem;
      padding-top: 0.7rem;
      width: 100%;
      height: 4.68rem;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        background: url("./images/draw_wheel_bg.webp") no-repeat left bottom;
        background-size: 100% auto;
      }
      .prize-list {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding-top: 0.4rem;
        width: calc(100% - 0.08rem);
        gap: 0.18rem;
        flex-wrap: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        border-top-right-radius: 0.68rem;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
        .prize {
          position: relative;
          flex-shrink: 0;
          padding: 0.08rem;
          width: 1.6rem;
          height: 2rem;
          background: #ffffff;
          border-radius: 0.28rem;
          overflow: hidden;
          &.big {
            width: 2.4rem;
            .prize-name {
              color: #ff197d;
            }
          }
          .prize-cover {
            display: block;
            width: 100%;
            height: 1.4rem;
            object-fit: cover;
            border-radius: 0.22rem;
          }
          .prize-name {
            margin-top: 0.1rem;
            font-size: 0.2rem;
            color: #420f9d;
            font-weight: bold;
            text-align: center;
          }
          .big-prize-tag {
            position: absolute;
            top: 0rem;
            left: 0;
            display: flex;
            align-items: center;
            padding: 0 0.12rem;
            height: 0.36rem;
            font-size: 0.18rem;
            color: #ffffff;
            background: linear-gradient(90deg, #ff48d0 0%, #fd2b81 100%);
            border-bottom-right-radius: 0.18rem;
          }
        }
      }
      .draw-btn {
        position: absolute;
        left: 50%;
        bottom: 0.24rem;
        transform: translateX(-50%) scale(1);
        width: 2.41rem;
        height: 1.03rem;
        border-radius: 0.51rem;
        text-align: center;
        line-height: 1.04rem;
        padding-top: 0.16rem;
        color: #fff;
        font-size: 0.2rem;
        background: none;
        z-index: 1;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
          filter 0.15s ease;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
          width: 2.58rem;
          height: 2.12rem;
          background: url("./images/draw_btn_bg.webp") no-repeat center center;
          background-size: cover;
          z-index: -1;
          border-radius: 0.51rem;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            filter 0.15s ease;
        }
        &.pressed {
          transform: translateX(-50%) scale(0.94);
          filter: brightness(1.1);
        }
        &.pressed::before {
          transform: translate(-50%, -50%) scale(0.94);
        }
      }
      .my-prize-btn-wrap {
        position: absolute;
        right: 0.06rem;
        bottom: 0;
        height: 1.12rem;
        border-bottom-right-radius: 0.68rem;
        overflow: hidden;
        .my-prize-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 0.28rem;
          width: 0.8rem;
          height: 0.64rem;
          font-size: 0.2rem;
          line-height: 1.1;
          color: #fff;
          font-weight: bold;
          background: url("./images/my_prize_btn_bg.webp") no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
  }
  .luck-exchange {
    margin-top: 0.24rem;
    background: #eec8ff;
    padding: 0.32rem;
    border-radius: 0.48rem;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    .luck-exchange-title {
      display: block;
      width: 1.6rem;
    }
    .goods-list {
      margin-top: 0.32rem;
      display: flex;
      gap: 0.18rem;
      flex-wrap: wrap;
      .goods {
        flex: 0 0 auto;
        width: calc((100% - 0.18rem) / 2);
        background: #ffffff;
        border-radius: 0.32rem;
        overflow: hidden;
        .goods-cover {
          display: block;
          width: 100%;
          height: 3.2rem;
          object-fit: cover;
        }
        .goods-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.18rem;
          height: 1.8rem;
          .goods-name {
            font-size: 0.26rem;
            color: #333;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .goods-exchange {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .goods-need-luck {
              font-size: 0.26rem;
              color: #ff6430;
              font-weight: bold;
            }
            .goods-exchange-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 0.2rem;
              height: 0.48rem;
              font-size: 0.22rem;
              font-weight: bold;
              color: #ffffff;
              background: linear-gradient(90deg, #ec7e62 0%, #ff483f 100%);
              border-radius: 0.24rem;
            }
          }
        }
      }
    }
  }
  .split-tips {
    position: relative;
    margin: 0.48rem auto 0;
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
    padding: 0.32rem;
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
        object-fit: cover;
      }
    }
  }
}
</style>
