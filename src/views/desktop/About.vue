<template>
  <div class="scrollDiv" :style="{overflowY:'auto', height: contentHeight + 'px', background: 'red'}">
    about desktop
  </div>
</template>
<script>
export default {
  name: "about",
  data () {
    return {
      contentHeight: 690
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