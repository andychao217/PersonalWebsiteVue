<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight + 133 + 'px', minHeight: '400px', padding: '10px'}">
    <van-row>
      <baidu-map ak="M4Pb27gO9W9y3e5ciPVXoDFnFdYjHk5O" :center="center" :zoom="zoom"
        :scroll-wheel-zoom="true" @ready="handler" :style="{width:'100%', height: 200 + 'px'}">
        <bm-traffic :predictDate="{weekday: 7, hour: 12}">
        </bm-traffic>
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
          anchor="BMAP_ANCHOR_TOP_LEFT">
        </bm-map-type>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" style="margin-top:20px;">
        </bm-navigation>
        <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="false">
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
    </van-row>
    <van-divider content-position="left">{{$t('contactTitle')}}</van-divider>
    <van-row>
      <van-row>
        <van-col :span="12">
          <van-icon name="envelop-o" /><a href="mailto:andychao217@qq.com"> andychao217@qq.com</a>
        </van-col>
        <van-col :span="12">
          <van-icon name="phone-o" /><a href="tel:13548691522"> (+86)135-4869-1522</a>
        </van-col>
      </van-row>
    </van-row>
    <van-divider content-position="left">{{$t('send')}}</van-divider>
    <van-row>
      <van-cell-group>
        <van-field v-model="form.name" required clearable clickable left-icon="contact"
          label-align="left" :label="$t('nameInput')" />
        <van-field v-model="form.mail" type="email" required left-icon="envelop-o" clearable
          clickable label-align="left" :label="$t('emailInput')" />
        <van-field v-model="form.subject" required clearable clickable left-icon="comment-o"
          label-align="left" :label="$t('subjectInput')" />
        <van-field v-model="form.message" rows="5" autosize required clearable clickable
          left-icon="description" label-align="left" :label="$t('messageInput')" type="textarea"
          maxlength="60" show-word-limit />
      </van-cell-group>
    </van-row>
    <van-row>
      <van-button type="primary" @click="handleSubmit" block>{{$t('submit')}}</van-button>
    </van-row>
    <van-row>
      <MobileFooter></MobileFooter>
    </van-row>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Toast } from 'vant';
  import {
    sendMail
  } from '@/api/sendMail';
  import MobileFooter from "@/components/MobileFooter.vue";
  Vue.use(Toast);
  const BaiduMap = () => import("vue-baidu-map/components/map/Map.vue");
  const BmTraffic = () => import("vue-baidu-map/components/layers/Traffic.vue");
  const BmMapType = () => import("vue-baidu-map/components/controls/MapType.vue");
  const BmNavigation = () => import("vue-baidu-map/components/controls/Navigation.vue");
  const BmOverviewMap = () => import("vue-baidu-map/components/controls/OverviewMap.vue");
  const BmGeolocation = () => import("vue-baidu-map/components/controls/Geolocation.vue");
  const BmMarker = () => import("vue-baidu-map/components/overlays/Marker.vue");
  const BmLabel = () => import("vue-baidu-map/components/overlays/Label.vue");
  export default {
    name: "contactMobile",
    components: {
      BaiduMap,
      BmTraffic,
      BmMapType,
      BmNavigation,
      BmOverviewMap,
      BmGeolocation,
      BmMarker,
      BmLabel,
      MobileFooter
    },
    data() {
      return {
        center: {
          lng: 0,
          lat: 0
        },
        zoom: 3,
        contentHeight: 690,
        form: {
          name: "",
          mail: "",
          subject: "",
          message: ""
        }
      }
    },
    computed: {
      findMeTxt() {
        return this.$t('findMe');
      },
      myPosTxt() {
        return this.$t('iAmHere');
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
      },
      handleSubmit() {
        let _this = this;
        if (
          _this.form.name === "" || 
          _this.form.mail === "" ||
          _this.form.message === ""
        ) {
          Toast.fail(_this.$t('errorMessage'));
        } else {
          sendMail(_this.form.name, _this.form.mail, _this.form.subject, _this.form.message).then(
            response => {
              if (response.data === "OK") {
                Toast.success(_this.$t('sendSuccess'));
                _this.form.name = "";
                _this.form.mail = "";
                _this.form.subject = "";
                _this.form.message = "";
              } else {
                Toast.fail(_this.$t('sendFailed'));
              }
            }).catch(response => {
              console.log(response);
          });
        }
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
