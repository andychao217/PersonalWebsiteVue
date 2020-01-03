<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100vh;">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="box-shadow: 2px 0px 10px #888888;">
      <div class="logo">
        <a-avatar :src="imgUrl" v-if="collapsed" style="margin-top: -15px;"/>
        <span v-if="!collapsed">
          {{logoText}}
        </span>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px; border-bottom:thin solid lightgray;">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="controlSidebar"
          style="float:left"
        />
        <div style="float:right">
          
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
  import profilePic from "@/assets/profilepic.jpg"

  export default {
    name: 'home',
    components: {
      MainFooter
    },
    data() {
      return {
        collapsed: false,
        logoText: "ANDY CHAO",
        imgUrl: profilePic
      }
    },
    methods:{
      controlSidebar () {
        let isCollaped = !this.collapsed
        this.collapsed = isCollaped
        localStorage.collapsed = isCollaped
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
