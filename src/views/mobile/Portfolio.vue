<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight + 135 + 'px', background: 'whitesmoke', padding: '10px 0px'}">
    <van-grid :column-num="2" :gutter="10">
      <van-grid-item
        v-for="item in gridData" 
        :key="item.name"
      >
        <van-image width="50px" height="50px" :src="publicPath + 'portfolio/' + item.name + '.svg'" />
        <span style="margin-top:10px;">{{$t(item.title)}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
  import portfolioData from "@/lib/portfolioData.js";
  export default {
    name: "portfolioMobile",
    data() {
      return {
        contentHeight: 690,
        publicPath: process.env.BASE_URL,
        gridData: null
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
        })();
      };
      this.gridData = portfolioData;
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  }

</script>
