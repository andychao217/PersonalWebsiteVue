<template>
  <div >
    <van-nav-bar :title="titleTxt" style="border-bottom:thin solid lightgray;">
      <a :href="resumeLink" target="_blank" slot="left">
        <img :src="imgUrl" style="width:30px; height:30px; border-radius:30px;"/>
      </a>
      <van-dropdown-menu  slot="right">
        <van-dropdown-item v-model="lang" :options="langOptions" @change="handleChangeLang"/>
      </van-dropdown-menu>
    </van-nav-bar>
    <div style="text-align:center;overflow:auto;">
      <router-view />
    </div>
    <van-tabbar v-model="active" style="border-top:thin solid lightgray;" @change="handleChangePage">
      <van-tabbar-item v-for="item in menus" :key="item.name" :icon="item.meta.icon">
        <span>{{$t(item.meta.title)}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "mobile",
    data() {
      return {
        active: 0,
        menus: null,
        titleTxt: "",
        publicPath: process.env.BASE_URL,
        imgUrl: process.env.BASE_URL + 'images/profilepic.jpg',
        lang: 'zh-CN',
        langOptions: [
          { text: '中', value: 'zh-CN' },
          { text: 'En', value: 'en-US' }
        ]
      }
    },
    computed: {
      resumeLink() {
        let lang = this.lang
        if (lang === 'zh-CN') {
          return this.publicPath + 'pdf/赵庆简历.pdf';
        } else {
          return this.publicPath + 'pdf/AndyChaoResume.pdf';
        }
      }
    },
    methods: {
      handleChangeLang (val) {
        this.lang = val;
        this.$i18n.locale = this.lang;
        localStorage.lang = this.lang;
        document.title = this.$t("windowTitle");
        this.handleChangePage(this.active);
        this.$router.go(0);
      },
      handleChangePage (index) {
        this.active = index;
        if (index === 0) {
          this.$router.push('aboutMobile');
          this.titleTxt = this.$t('about');
        } else if (index === 1) {
          this.$router.push('timeLineMobile');
          this.titleTxt = this.$t('timeLine');
        } else if (index === 2) {
          this.$router.push('portfolioMobile');
          this.titleTxt = this.$t('portfolio');
        } else if (index === 3) {
          this.$router.push('contactMobile');
          this.titleTxt = this.$t('contact');
        }
      }
    },
    created () {
      let _this = this;
      if (localStorage.lang) {
        _this.lang = localStorage.lang;
      } else {
        if (navigator.language === "zh-CN") {
          _this.lang = "zh-CN";
        } else {
          _this.lang = "en-US";
        }
      }
      this.$i18n.locale = this.lang;
      document.title = this.$t("windowTitle");
      this.menus = this.$router.options.routes[2].children;
      this.handleChangePage(0);
    }
  }

</script>
