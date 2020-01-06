<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100vh;">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed"
      style="box-shadow: 2px 0px 10px #888888;">
      <div class="logo">
        <a-avatar :src="imgUrl" v-if="collapsed" style="margin-top: -15px;" />
        <span v-if="!collapsed">{{logoText}}</span>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['about']" @click="handleChangePage" :inlineCollapsed="collapsed">
        <a-menu-item v-for="item in menus" :key="item.name" :title="$t(item.meta.title)">
          <a-icon :type="item.meta.icon" />
          <span>{{$t(item.meta.title)}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0 16px; border-bottom:thin solid lightgray;">
        <div style="float:left;height:64px;">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{collapseTxt}}</span>
            </template>
            <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="controlSidebar" />
          </a-tooltip>
          <span style="font-size:20px;">{{$t('m.hello')}}</span>
        </div>
        <div style="float:right">
          <HeaderToolbar v-model="isFullscreen"></HeaderToolbar>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ 
          margin: '16px', 
          padding: '0px 24px', 
          minHeight: '400px', 
          textAlign: 'center',
          overflowY: 'hidden'
        }">
        <transition name="fade" mode="out-in">
          <a-card hoverable style="width: 100%; height: 100%;}">
            <router-view />
          </a-card>
        </transition>
      </a-layout-content>
      <a-layout-footer style="background:white; border-top:thin solid lightgray;">
        <MainFooter></MainFooter>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
  const MainFooter = () => import("@/components/MainFooter.vue");
  const HeaderToolbar = () => import("@/components/HeaderToolbar.vue");
  import profilePic from "@/assets/profilepic.jpg";
  //import Darkmode from "darkmode-js";

  export default {
    name: "home",
    components: {
      MainFooter,
      HeaderToolbar
    },
    data() {
      return {
        collapsed: false,
        logoText: "ANDY CHAO",
        imgUrl: profilePic,
        isFullscreen: false,
        menus: null
      };
    },
    computed: {
      collapseTxt() {
        return this.collapsed ? this.$t('m.expand') : this.$t('m.collapse');
      }
    },
    methods: {
      controlSidebar() {
        let isCollaped = !this.collapsed;
        this.collapsed = isCollaped;
        localStorage.collapsed = isCollaped;
      },
      handleChangePage(data) {
        this.$router.push(data.key);
      }
    },
    created() {
      if (localStorage.collapsed == "true") {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
      this.menus = this.$router.options.routes[0].children;
    },
    mounted() {
      let _this = this;
      this.$router.push('about');
      this.contentHeight = this.$util.resizeTable();
      window.onresize = () => {
        return (() => {
          _this.contentHeight = _this.$util.resizeTable();
        })()
      }
      //  new Darkmode().showWidget();
    }
  };

</script>
