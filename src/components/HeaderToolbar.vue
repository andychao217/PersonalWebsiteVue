/* eslint-disable */
<template>
  <div>
    <a-tooltip placement="left" style="font-size:20px;margin-right:5px;">
      <template slot="title">
        <span>{{fullscreenInfo}}</span>
      </template>
      <a-icon @click="handleFullscreen" :type="value ? 'fullscreen-exit' : 'fullscreen'" />
    </a-tooltip>
    <a-dropdown style="margin-right:5px;">
      <a class="ant-dropdown-link" href="#" style="font-size:20px;">
        <a-icon type="global" />
      </a>
      <a-menu slot="overlay" @click="handleChangeLang">
        <a-menu-item key="1">中文</a-menu-item>
        <a-menu-item key="2">English</a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>{{$t('download')}}</span>
      </template>
      <a :href="resumeLink" target="_blank" style="font-size:20px;">
        <a-icon type="download" />
        <span>{{$t('resumeTxt')}}</span>
      </a>
    </a-tooltip>
  </div>
</template>

<script>
  export default {
    name: "Fullscreen",
    data() {
      return {
        lang: "zh-CN",
        publicPath: process.env.BASE_URL
      };
    },
    computed: {
      fullscreenInfo() {
        return this.value ? this.$t("fullscreenExit") : this.$t("fullscreen");
      },
      resumeLink() {
        let lang = this.lang
        if (lang === 'zh-CN') {
          return this.publicPath + 'pdf/赵庆简历.pdf';
        } else {
          return this.publicPath + 'pdf/AndyChaoResume.pdf';
        }
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleFullscreen() {
        //全屏控制
        let main = document.body;
        if (this.value) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (main.requestFullscreen) {
            main.requestFullscreen();
          } else if (main.mozRequestFullScreen) {
            main.mozRequestFullScreen();
          } else if (main.webkitRequestFullScreen) {
            main.webkitRequestFullScreen();
          } else if (main.msRequestFullscreen) {
            main.msRequestFullscreen();
          }
        }
      },
      handleChangeLang(data) {
        let curLang = "zh-CN";
        if (data.key == 2) {
          curLang = "en-US";
        }
        this.lang = curLang;
        this.$i18n.locale = this.lang;
        localStorage.lang = this.lang;
        document.title = this.$t("windowTitle");
        this.$router.go(0);
      }
    },
    created() {
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
      console.log(navigator.language);
    },
    mounted() {
      //全屏事件监听
      let isFullscreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen;
      isFullscreen = !!isFullscreen;
      document.addEventListener("fullscreenchange", () => {
        this.$emit("input", !this.value);
        this.$emit("on-change", !this.value);
      });
      document.addEventListener("mozfullscreenchange", () => {
        this.$emit("input", !this.value);
        this.$emit("on-change", !this.value);
      });
      document.addEventListener("webkitfullscreenchange", () => {
        this.$emit("input", !this.value);
        this.$emit("on-change", !this.value);
      });
      document.addEventListener("msfullscreenchange", () => {
        this.$emit("input", !this.value);
        this.$emit("on-change", !this.value);
      });
      this.$emit("input", isFullscreen);
    }
  };

</script>
