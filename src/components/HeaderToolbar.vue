/* eslint-disable */
<template>
  <div>
    <a-tooltip placement="left" style="font-size:1rem;margin-right:5px;">
      <template slot="title">
        <span>{{fullscreenInfo}}</span>
      </template>
      <a-icon @click="handleFullscreen" :type="value ? 'fullscreen-exit' : 'fullscreen'" />
    </a-tooltip>
    
    <a-dropdown>
      <a class="ant-dropdown-link" href="#" style="font-size:1rem;">
        <a-icon type="global" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">中文</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">English</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Fullscreen',
  data () {
    return {
    }
  },
  computed: {
    fullscreenInfo () {
      return this.value? '退出全屏':'全屏'
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleFullscreen () { //全屏控制
      let main = document.body
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    }
  },
  mounted () {  //全屏事件监听
    let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    document.addEventListener('fullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('mozfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('webkitfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('msfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    this.$emit('input', isFullscreen)
  }
}
</script>
