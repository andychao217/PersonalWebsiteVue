<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight - 40 + 'px', minHeight: '400px'}">
    <a-row>
      <baidu-map ak="M4Pb27gO9W9y3e5ciPVXoDFnFdYjHk5O" :center="center" :zoom="zoom"
        :scroll-wheel-zoom="true" @ready="handler" :style="{width:'100%', height: 350 + 'px'}">
        <bm-traffic :predictDate="{weekday: 7, hour: 12}">
        </bm-traffic>
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
          anchor="BMAP_ANCHOR_TOP_LEFT">
        </bm-map-type>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" style="margin-top:20px;">
        </bm-navigation>
        <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true">
        </bm-overview-map>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true"
          :autoLocation="true">
        </bm-geolocation>
        <bm-marker :position="{lng: 112.979, lat: 28.213}" :dragging="false"
          animation="BMAP_ANIMATION_BOUNCE">
          <bm-label :content="myPosTxt" :labelStyle="{
              borderRadius: '5px', 
              padding: '5px', 
              color: 'orangered', 
              fontSize : '14px'
            }" :offset="{
              width: -22, 
              height: 25
            }" />
        </bm-marker>
      </baidu-map>
    </a-row>
    <a-row style="margin-top:10px;">

    </a-row>
  </div>
</template>
<script>
  const BaiduMap = () => import("vue-baidu-map/components/map/Map.vue");
  const BmTraffic = () => import("vue-baidu-map/components/layers/Traffic.vue");
  const BmMapType = () => import("vue-baidu-map/components/controls/MapType.vue");
  const BmNavigation = () => import("vue-baidu-map/components/controls/Navigation.vue");
  const BmOverviewMap = () => import("vue-baidu-map/components/controls/OverviewMap.vue");
  const BmGeolocation = () => import("vue-baidu-map/components/controls/Geolocation.vue");
  const BmMarker = () => import("vue-baidu-map/components/overlays/Marker.vue");
  const BmLabel = () => import("vue-baidu-map/components/overlays/Label.vue");
  export default {
    components: {
      BaiduMap,
      BmTraffic,
      BmMapType,
      BmNavigation,
      BmOverviewMap,
      BmGeolocation,
      BmMarker,
      BmLabel
    },
    data() {
      return {
        center: {
          lng: 0,
          lat: 0
        },
        zoom: 3,
        contentHeight: 690
      }
    },
    computed: {
      findMeTxt() {
        return this.$t('m.findMe');
      },
      myPosTxt() {
        return this.$t('m.iAmHere');
      }
    },
    watch: {
      contentHeight(val) {
        if (!this.timer) {
          this.contentHeight = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.timer = false;
          }, 400);
        }
      }
    },
    methods: {
      handler() {
        //  console.log(BMap, map)
        this.center = {
          lng: 112.979,
          lat: 28.213
        };
        this.zoom = 15;
      },
      handleFindMe() {
        //  console.log(e)
        this.center = {
          lng: 112.979,
          lat: 28.213
        };
        this.zoom = 15;
      }
    },
    mounted() {
      let _this = this;
      this.contentHeight = this.$util.resizeTable();
      window.onresize = () => {
        return (() => {
          _this.contentHeight = _this.$util.resizeTable();
        })()
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  }

</script>
