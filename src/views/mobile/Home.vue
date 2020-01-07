<template>
  <div>
    <van-nav-bar :title="titleTxt" style="border-bottom:thin solid lightgray;">
      <img :src="imgUrl" slot="left" style="width:30px; height:30px; border-radius:30px;"/>
      <van-dropdown-menu  slot="right">
        <van-dropdown-item v-model="lang" :options="langOptions" @change="handleChangeLang"/>
      </van-dropdown-menu>
    </van-nav-bar>
    <van-tabbar v-model="active" style="border-top:thin solid lightgray;" @change="handleChangePage">
      <van-tabbar-item v-for="item in menus" :key="item.name" :icon="item.meta.icon">
        <span>{{$t(item.meta.title)}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import profilePic from "@/assets/profilepic.jpg";
  export default {
    data() {
      return {
        active: 0,
        menus: null,
        titleTxt: "",
        imgUrl: profilePic,
        lang: 'zh-CN',
        langOptions: [
          { text: '中', value: 'zh-CN' },
          { text: 'En', value: 'en-US' }
        ]
      }
    },
    methods: {
      handleChangeLang (val) {
        this.lang = val;
        this.$i18n.locale = this.lang;
        localStorage.lang = this.lang;
        document.title = this.$t("m.windowTitle");
        this.handleChangePage(this.active);
      },
      handleChangePage (index) {
        this.active = index;
        if (index === 0) {
          this.$router.push('aboutMobile');
          this.titleTxt = this.$t('m.about');
        } else if (index === 1) {
          this.$router.push('timeLineMobile');
          this.titleTxt = this.$t('m.timeLine');
        } else if (index === 2) {
          this.$router.push('portfolioMobile');
          this.titleTxt = this.$t('m.portfolio');
        } else if (index === 3) {
          this.$router.push('contactMobile');
          this.titleTxt = this.$t('m.contact');
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
      document.title = this.$t("m.windowTitle");
      this.menus = this.$router.options.routes[1].children;
      this.handleChangePage(0);
    }
  }

</script>
