/* eslint-disable */
<template>
  <div class="full-screen-btn-con">
    <Tooltip
      :content="value ? '退出全屏' : '全屏'"
      placement="left"
      v-if="showFullScreenBtn"
      style="margin-left:10px"
    >
      <Icon
        @click.native="handleChange"
        :type="value ? 'ios-contract' : 'ios-expand'"
        :size="28"
        class="menuIcon"
      >
      </Icon>
    </Tooltip>
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
    showFullScreenBtn () {
      return !(this.$util.isIE())
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
    },
    handleChange () {
      this.handleFullscreen()
    },
  },
  mounted () {  //全屏事件监听
    let _this = this
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
