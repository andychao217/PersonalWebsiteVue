<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px', minHeight: '400px'}">
    <a-row>
      <baidu-map ak="M4Pb27gO9W9y3e5ciPVXoDFnFdYjHk5O" :center="center" :zoom="zoom"
        :scroll-wheel-zoom="true" @ready="handler" :style="{width:'100%', height: 240 + 'px'}">
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
    <a-divider orientation="left">{{$t('m.contactTitle')}}</a-divider>
    <a-row style="margin-top:10px;text-align:left;">
      <a-row>
        <span>{{$t('m.mailMe')}}</span><a href="mailto:andychao217@qq.com">andychao217@qq.com</a>
      </a-row>
      <a-row>
        <span>{{$t('m.phoneNum')}}</span><a href="tel:13548691522"> (+86)135-4869-1522</a>
      </a-row>
    </a-row>
    <a-divider orientation="left">{{$t('m.send')}}</a-divider>
    <a-form :form="form">
      <a-row :gutter="5">
        <a-col span="8">
          <a-row>
            <a-form-item :label="$t('m.nameInput')" :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }">
              <a-input v-model="form.name" allowClear />
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item :label="$t('m.emailInput')" :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }">
              <a-input type="email" v-model="form.mail" allowClear />
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item :label="$t('m.subjectInput')" :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }">
              <a-input v-model="form.subject" allowClear />
            </a-form-item>
          </a-row>
        </a-col>
        <a-col span="16">
          <a-form-item :label="$t('m.messageInput')" :label-col="{ span: 3 }"
            :wrapper-col="{ span: 21 }" style="margin-right:10px;">
            <a-input type="textarea" v-model="form.message" allowClear
              style="height:160px;margin-top:4px;" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-form-item style="float:right;margin-right:10px;margin-top:-20px;">
          <a-button type="primary" @click="handleSubmit">
            {{$t('m.submit')}}
          </a-button>
        </a-form-item>
      </a-row>
    </a-form>
  </div>
</template>
<script>
  import Bus from '@/lib/bus';
  import {
    sendMail
  } from '@/api/sendMail';
  const BaiduMap = () => import("vue-baidu-map/components/map/Map.vue");
  const BmTraffic = () => import("vue-baidu-map/components/layers/Traffic.vue");
  const BmMapType = () => import("vue-baidu-map/components/controls/MapType.vue");
  const BmNavigation = () => import("vue-baidu-map/components/controls/Navigation.vue");
  const BmOverviewMap = () => import("vue-baidu-map/components/controls/OverviewMap.vue");
  const BmGeolocation = () => import("vue-baidu-map/components/controls/Geolocation.vue");
  const BmMarker = () => import("vue-baidu-map/components/overlays/Marker.vue");
  const BmLabel = () => import("vue-baidu-map/components/overlays/Label.vue");
  export default {
    name: "contact",
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
      },
      handleSubmit() {
        let _this = this;
        if (
          _this.form.name === "" ||
          _this.form.mail === "" ||
          _this.form.message === ""
        ) {
          _this.$error({
            title: _this.$t('m.error'),
            content: _this.$t('m.errorMessage')
          });
        } else {
          sendMail(_this.form.name, _this.form.mail, _this.form.subject, _this.form.message).then(
            response => {
              if (response.data === "OK") {
                _this.$notification.success({
                  message: _this.$t('m.sendSuccess'),
                  description: _this.$t('m.sendSuccessContent')
                });
                _this.form.name = "";
                _this.form.mail = "";
                _this.form.subject = "";
                _this.form.message = "";
              } else {
                _this.$notification.error({
                  message: _this.$t('m.sendFailed'),
                  description: response.data
                });
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
        if (window.innerWidth < 938) {
          Bus.$emit('handleSidebarControl', true);
        } else if (window.innerWidth) {
          Bus.$emit('handleSidebarControl', false);
        }
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
