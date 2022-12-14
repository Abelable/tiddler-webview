<template>
  <div class="container">
    <div class="status-illus" v-if="status !== 2">
      <img
        class="illus"
        :src="
          status === 1
            ? require('./images/wait.png')
            : status === 3
            ? require('./images/success.png')
            : require('./images/fail.png')
        "
        alt=""
      />
      <div class="title">
        {{ status === 1 ? "等待审核" : status === 3 ? "缴纳成功" : "审核失败" }}
      </div>
      <div class="desc" :class="{ err: status === 4 }">
        {{
          status === 1
            ? "请耐心等待，平台正在策马扬鞭审核哦！"
            : status === 3
            ? "店铺已开通"
            : "失败原因：身份证照片不够清晰"
        }}
      </div>
      <div class="btn">{{ status === 4 ? "重新申请" : "返回" }}</div>
    </div>
    <div class="payment" v-else>
      <div class="title">审核通过</div>
      <div class="pay-amount">
        缴纳保证金：<span style="color: #eaab63">1000元</span>
      </div>
      <div class="agreement">
        <p>缴纳保证金默认接受以下条款:</p>
        <p>
          1.
          商家在小鱼游参与经营活动必须缴纳服务保证金，保证金主要用于保证商家直播带货符合法律法规及小鱼游的平台规定。
        </p>
        <p>
          2.
          商家在入驻申请通过后需一次性足额缴纳保证金，保证金金额统一为人民币壹仟元。
        </p>
        <p>
          3.
          小鱼游有权根据商家的业务变化及实际违约赔付情况通知商家调整保证金金额，商家应在收到小鱼游通知后的3个工作日内补足保证金，如果没有及时补足保证金金额的，小鱼游有权中止合作。
        </p>
        <p>
          4.
          商家缴纳的保证金将冻结在商家的小鱼游企业账户中，在冻结期内保证金不产生利息，小鱼游不开具发票。
        </p>
        <p>
          5.
          商家需要退出小鱼游，终止合作，需向小鱼游提出保证金退还申请，小鱼游审核通过后会在30天内将保证金原路退回到您缴纳保证金时的支付账户。商家退出时存在前期违约金尚未支付的情况的，小鱼游从保证金余额中扣取。
        </p>
        <p>
          6.
          因重大违规被清退的商家将不退还保证金，因违规行为扣取的保证金不退还，作为商家违约金赔偿给用户及小鱼游，具体保证金扣取情况参见《平台商家违规管理规则》。
        </p>
        <p>
          7.
          小鱼游将根据国家经济情况、市场状况及小鱼游经营情况，适时适当调整保证金制度。保证金制度的调整会按相关规定提前公示予以所有商家。
        </p>
      </div>
      <div class="btn">点击缴纳</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const status = ref(2);
</script>

<style lang="scss" scoped>
.container {
  padding: 0.32rem;
  height: 100vh;
  background: #fff;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.8rem;
    width: 100%;
    height: 0.88rem;
    font-size: 0.3rem;
    border-radius: 0.18rem;
    color: #fff;
    font-weight: 550;
    background: #212121;
  }
  .status-illus {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-bottom: 3rem;
    .illus {
      width: 3.2rem;
      height: 3.2rem;
    }
    .title {
      margin-top: 0.32rem;
      color: #333;
      font-size: 0.36rem;
      font-weight: 550;
    }
    .desc {
      margin-top: 0.2rem;
      color: #666;
      font-size: 0.24rem;
      &.err {
        color: #f22237;
      }
    }
  }
  .payment {
    height: 100%;
    overflow-y: scroll;
    .title {
      color: #333;
      font-size: 0.36rem;
      font-weight: 550;
    }
    .pay-amount {
      margin-top: 0.12rem;
      color: #333;
      font-size: 0.3rem;
    }
    .agreement {
      margin-top: 0.24rem;
      color: #666;
      font-size: 0.26rem;
      line-height: 1.6;
    }
  }
}
</style>
