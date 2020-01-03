<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100vh;">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="box-shadow: 2px 0px 10px #888888;">
      <div class="logo">
        <a-avatar :src="imgUrl" v-if="collapsed" style="margin-top: -15px;"/>
        <span v-if="!collapsed">
          {{logoText}}
        </span>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @click="handleChangePage">
        <a-menu-item key="1">
          <a-icon type="user"/>
          <span>關於我</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="profile" />
          <span>時間綫</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="picture" />
          <span>作品集</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="mail" />
          <span>聯係我</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px; border-bottom:thin solid lightgray;">
        <div style="float:left;height:64px;">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="controlSidebar"
          />
          <span style="font-size:20px;">{{$t('m.hello')}}</span>
        </div>
        <div style="float:right">
          <HeaderToolbar v-model="isFullscreen"></HeaderToolbar>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ 
          margin: '16px', 
          padding: '24px', 
          background: '#fff', 
          minHeight: '280px', 
          textAlign: 'center'
        }"
      >
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </a-layout-content>
      <a-layout-footer style="background:white; border-top:thin solid lightgray;">
        <MainFooter></MainFooter>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
  const MainFooter = () => import('@/components/MainFooter.vue')
  const HeaderToolbar = () => import('@/components/HeaderToolbar.vue')
  import profilePic from "@/assets/profilepic.jpg"

  export default {
    name: 'home',
    components: {
      MainFooter,
      HeaderToolbar
    },
    data() {
      return {
        collapsed: false,
        logoText: "ANDY CHAO",
        imgUrl: profilePic,
        isFullscreen: false
      }
    },
    methods:{
      controlSidebar () {
        let isCollaped = !this.collapsed
        this.collapsed = isCollaped
        localStorage.collapsed = isCollaped
      },
      handleChangePage (data) {
        this.$router.push('about')
        console.log(data)
      }
    },
    created () {
      if (localStorage.collapsed == 'true') {
        this.collapsed = true
      } else {
        this.collapsed = false
      }
    }
  }
</script>
<style>
  
</style>
