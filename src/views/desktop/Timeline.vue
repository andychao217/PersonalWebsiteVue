<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px', background: 'red'}">
    timeline desktop
  </div>
</template>
<script>
  import Bus from '@/lib/bus';
  export default {
    name: "timeline",
    data() {
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
        if (window.innerWidth < 938) {
          Bus.$emit('handleSidebarControl', true);
        } else if (window.innerWidth) {
          Bus.$emit('handleSidebarControl', false);
        }
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
