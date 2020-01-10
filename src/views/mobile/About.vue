<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight + 133 + 'px', padding: '0px'}">
    <van-sticky>
      <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      >
        {{$t('m.helloWhoAmI')}}
      </van-notice-bar>
    </van-sticky>
    <van-row>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div class="swipeDiv" :style="{backgroundImage: bgUrl1}">
            <h3 style="margin-top:10px;">{{$t('m.lifeMottoJobs1')}}</h3>
            <h1>-{{$t('m.jobs')}}</h1>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="swipeDiv" :style="{backgroundImage: bgUrl2}">
            <h3>{{$t('m.lifeMottoGump')}}</h3>
            <h1>-{{$t('m.gump')}}</h1>
          </div>
        </van-swipe-item>
      </van-swipe>
      <van-divider content-position="left">{{$t('m.personalInfo')}}</van-divider>
      <van-row>
        <van-cell-group>
          <van-field v-model="form.name" readonly clickable left-icon="contact" label-align="left"
            :label="$t('m.nameInput')" />
          <van-field v-model="form.mail" type="email" left-icon="envelop-o" readonly clickable
            label-align="left" :label="$t('m.emailInput')" />
          <van-field v-model="form.phone" readonly clickable left-icon="phone-o" label-align="left"
            :label="$t('m.phoneInput')" />
          <van-field v-model="form.website" readonly clickable left-icon="wap-home-o"
            label-align="left" :label="$t('m.websiteInput')" />
        </van-cell-group>
      </van-row>
      <van-row style="margin-top:10px;padding:0px 16px;">
        <a :href="resumeLink" target="_blank" style="color:white; text-decoration:none;">
          <van-button icon="down" type="info" block>
            <span> {{$t('m.resumeTxt')}}</span>
          </van-button>
        </a>
      </van-row>
    </van-row>
  </div>
</template>
<script>
  import bgPic1 from "@/assets/bg1.jpg";
  import bgPic2 from "@/assets/bg2.jpg";
  export default {
    name: "aboutMobile",
    data() {
      return {
        contentHeight: 690,
        bgUrl1: 'url(' + bgPic1 + ')',
        bgUrl2: 'url(' + bgPic2 + ')',
        form: {
          name: "赵庆",
          mail: "andychao217@qq.com",
          phone: "(+86)13548691522",
          website: "https://www.andychao217.cn"
        },
        publicPath: process.env.BASE_URL
      }
    },
    computed: {
      resumeLink() {
        let lang = localStorage.lang;
        if (lang === 'zh-CN') {
          return this.publicPath + '赵庆简历.pdf';
        } else {
          return this.publicPath + 'AndyChaoResume.pdf';
        }
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
