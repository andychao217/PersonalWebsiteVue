<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'App',
    beforeCreate () {
      if (!this.$util.IsPC()) {
        this.$router.push('aboutMobile');
      } else {
        this.$router.push('about');
      }
      axios.get('data/lang.json').then((response)=>{
        this.$i18n.mergeLocaleMessage('en-US', response.data.en);
        this.$i18n.mergeLocaleMessage('zh-CN', response.data.cn);
      });
    }
  };

</script>

<style>
  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }

</style>
