<template>
  <Popup :show="visible" @click-overlay="cancel" position="bottom" round>
    <div class="container">
      <div class="picked-data row">
        <div class="data-item row">
          <div class="data-title">经度：</div>
          <div class="data">{{ longitude }}</div>
        </div>
        <div class="data-item row">
          <div class="data-title">纬度：</div>
          <div class="data">{{ latitude }}</div>
        </div>
      </div>
      <div class="map-wrap">
        <div id="map" />
        <div class="search-bar row">
          <input
            class="address-input"
            v-model="address"
            type="text"
            placeholder="请输入地址查询经纬度"
          />
          <div class="search-btn row center" @click="search">查询</div>
        </div>
      </div>
      <div class="btns-wrap row">
        <div class="cancel-btn row center" @click="cancel">取消</div>
        <div class="confirm-btn row center" @click="confirm">确定</div>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup } from "vant";
import { ref, watch } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["confirm", "cancel"]);

const Map = ref(null);
const map = ref(null);
const placeSearch = ref(null);
const makers = ref<any[]>([]);
const address = ref("");
const longitude = ref(undefined);
const latitude = ref(undefined);

watch(props, (props) => {
  if (props.visible) {
    initMap();
  }
});

const initMap = () => {
  AMapLoader.load({
    key: "c7d234ca736e86cc74ec35d25b2400e4",
    version: "2.0",
  }).then((AMap) => {
    Map.value = AMap;
    map.value = new AMap.Map("map", {
      resizeEnable: true,
    });
    AMap.plugin("AMap.PlaceSearch", () => {
      placeSearch.value = new AMap.PlaceSearch();
    });
  });
};

const search = () => {
  if (!address.value) {
    return;
  }
  (placeSearch.value as any).search(
    address.value,
    (status: string, result: any) => {
      if (status === "complete") {
        if (makers.value.length) {
          (map.value as any).remove(makers.value);
        }
        if (result.poiList.pois.length) {
          const pois = result.poiList.pois;
          let makerList: any[] = [];
          for (let i = 0; i < pois.length; i++) {
            makerList[i] = new (Map as any).value.Marker({
              position: pois[i].location,
              title: `${pois[i].location.lng},${pois[i].location.lat}`,
              label: {
                content: pois[i].name,
              },
            });
            makerList[i].on("click", (e: any) => {
              longitude.value = e.lnglat.getLng();
              latitude.value = e.lnglat.getLat();
            });
            (map.value as any).add(makerList[i]);
          }
          makers.value = makerList;
          (map.value as any).setFitView();
        }
      }
    }
  );
};

const confirm = () =>
  emit("confirm", { longitude: longitude.value, latitude: latitude.value });
const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped>
#map {
  height: 10rem;
  border-radius: 0.24rem;
}
.row {
  display: flex;
  align-items: center;
  &.center {
    justify-content: center;
  }
}
.container {
  padding: 0.24rem;
  .picked-data {
    .data-item {
      padding: 0 0.24rem;
      flex: 1;
      height: 0.8rem;
      font-size: 0.26rem;
      border-radius: 0.12rem;
      border: 1px solid #ddd;
      &:first-child {
        margin-right: 0.12rem;
      }
      &:last-child {
        margin-left: 0.12rem;
      }
      .data-title {
        color: #666;
      }
      .data {
        color: #333;
        font-weight: 500;
      }
    }
  }
  .map-wrap {
    position: reactive;
    margin-top: 0.24rem;
    .search-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0.24rem;
      .address-input {
        padding: 0.24rem;
        flex: 1;
        height: 0.8rem;
        font-size: 0.26rem;
        border-radius: 0.12rem;
        border: 1px solid #ddd;
        background: #fff;
      }
      .search-btn {
        margin-left: 0.24rem;
        width: 1.6rem;
        height: 0.8rem;
        color: #fff;
        font-size: 0.28rem;
        background: #1182fb;
        border-radius: 0.12rem;
      }
    }
  }
  .btns-wrap {
    margin-top: 0.24rem;
    .cancel-btn,
    .confirm-btn {
      flex: 1;
      height: 0.88rem;
      font-size: 0.3rem;
      font-weight: 550;
      border-radius: 0.44rem;
    }
    .cancel-btn {
      margin-right: 0.12rem;
      color: #333;
      border: 1px solid #ddd;
    }
    .confirm-btn {
      margin-left: 0.12rem;
      color: #fff;
      background: #212121;
    }
  }
}
</style>
