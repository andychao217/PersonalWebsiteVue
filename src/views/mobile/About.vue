<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight + 133 + 'px', padding: '0px'}">
    <van-sticky>
      <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      >
        {{$t('helloWhoAmI')}} ({{$t('dedaoPointTxt')}}: {{$t('dedaoPoint')}} | {{$t('zhimaCreditTxt')}}: {{$t('zhimaCredit')}})
      </van-notice-bar>
    </van-sticky>
    <van-row>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div class="swipeDiv" :style="{backgroundImage: bgUrl1}">
            <h3 style="margin-top:10px;">{{$t('lifeMottoJobs1')}}</h3>
            <h1>-{{$t('jobs')}}</h1>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="swipeDiv" :style="{backgroundImage: bgUrl2}">
            <h3>{{$t('lifeMottoGump')}}</h3>
            <h1>-{{$t('gump')}}</h1>
          </div>
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <van-row>
      <van-tabs v-model="active" @touchstart.native="handleTouchStart" @touchend.native="handleTouchEnd">
        <van-tab :title="$t('introTitle')">
          <van-row style="padding:10px;">
            <van-cell v-for="item in introArray" :key="item">{{item}}</van-cell>
          </van-row>
          <van-row style="padding:10px 25px;text-align:left;">
            <strong>{{$t('hobbyTitle')}}: </strong>
            <van-tag plain v-for="(item, index) in hobbyArray" :key="item" :color="colorList[index]" style="margin-right:5px;font-size:14px;">{{item}}</van-tag>
          </van-row>
        </van-tab>
        <van-tab :title="$t('ability')">
          <div style="padding:20px;">
            <Charts></Charts>
          </div>
        </van-tab>
        <van-tab :title="$t('personalInfo')">
          <van-row style="margin-top:20px;">
            <van-cell-group>
              <van-field v-model="form.name" readonly clickable left-icon="contact" label-align="left"
                :label="$t('nameInput')" />
              <van-field v-model="form.mail" type="email" left-icon="envelop-o" readonly clickable
                label-align="left" :label="$t('emailInput')" />
              <van-field v-model="form.phone" readonly clickable left-icon="phone-o" label-align="left"
                :label="$t('phoneInput')" />
              <van-field v-model="form.website" readonly clickable left-icon="wap-home-o"
                label-align="left" :label="$t('websiteInput')" />
            </van-cell-group>
          </van-row>
          <van-row style="margin-top:10px;padding:10px 16px;">
            <a :href="resumeLink" target="_blank" style="color:white; text-decoration:none;">
              <van-button icon="down" type="info" block>
                <span> {{$t('resumeTxt')}}</span>
              </van-button>
            </a>
          </van-row>
        </van-tab>
      </van-tabs>
    </van-row>
    <van-row>
      <MobileFooter></MobileFooter>
    </van-row>
  </div>
</template>
<script>
  import axios from "axios";
  import MobileFooter from "@/components/MobileFooter.vue";
  const Charts = () => import("@/components/Charts.vue");
  export default {
    name: "aboutMobile",
    components: {
      Charts,
      MobileFooter
    },
    data() {
      return {
        contentHeight: 690,
        active: 0,
        bgUrl1: 'url(' + process.env.BASE_URL + 'images/bg1.jpg' + ')',
        bgUrl2: 'url(' + process.env.BASE_URL + 'images/bg2.jpg' + ')',
        form: {
          name: "赵庆",
          mail: "andychao217@qq.com",
          phone: "(+86)13548691522",
          website: "https://www.andychao217.cn"
        },
        publicPath: process.env.BASE_URL,
        colorList: [],
        touchStartX: 0,
        touchEndX: 0,
        touchStartY: 0,
        touchEndY: 0
      }
    },
    computed: {
      resumeLink() {
        let lang = localStorage.lang;
        if (lang === 'zh-CN') {
          return this.publicPath + 'pdf/赵庆简历.pdf';
        } else {
          return this.publicPath + 'pdf/AndyChaoResume.pdf';
        }
      },
      introArray () {
        return this.$t('introTxt');
      },
      hobbyArray () {
        return this.$t('hobbies');
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
      handleTouchStart (e) {
        this.touchStartX = e.changedTouches[0].pageX;
        this.touchStartY = e.changedTouches[0].pageY;
      },
      handleTouchEnd (e) {
        let curTabIndex = this.active;
        this.touchEndX = e.changedTouches[0].pageX;
        this.touchEndY = e.changedTouches[0].pageY;
        let distanceX = this.touchEndX - this.touchStartX;
        let distanceY = this.touchEndY - this.touchStartY;
        let absX = Math.abs(distanceX);
        let absY = Math.abs(distanceY);
        // console.log("absX: " + absX);
        // console.log("absY: " + absY);
        if (absX > absY) {
          if (distanceX > 50) {
            if (curTabIndex < 2) {
              curTabIndex += 1;
            } else {
              curTabIndex = 0;
            }
          } else if (distanceX < 50) {
            if (curTabIndex > 0) {
              curTabIndex -= 1;
            } else {
              curTabIndex = 2;
            }
          }
        }
        this.active = curTabIndex;
      }
    },
    created () {
      axios.get('data/colorList.json').then((response)=>{
        this.colorList = response.data;
      });
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
<style lang="css" scoped>
  .swipeDiv {
    padding: 20px 60px;
    height: 120px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .swipeDiv>h3 {
    font-size: 15px;
  }

  .swipeDiv>h1 {
    font-size: 12px;
  }

  .swipeDiv>h3,
  .swipeDiv>h1 {
    color: #fff;
    text-shadow: 1px 1px 1px #000;
  }

</style>
