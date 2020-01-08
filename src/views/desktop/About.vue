<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px'}">
    <a-row>
      <a-carousel autoplay>
        <div>
          <h3>{{$t('m.lifeMottoJobs')}}</h3>
          <h1>-{{$t('m.jobs')}}</h1>
        </div>
        <div>
          <h3>{{$t('m.lifeMottoGump')}}</h3>
          <h1>-{{$t('m.gump')}}</h1>
        </div>
      </a-carousel>
    </a-row>
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
<style scoped>
  /* For demo */
  .ant-carousel >>> .slick-slide {
    padding: 80px;
    text-align: center;
    height: 280px;
    background-image: url('../../assets/bg.jpg');
    background-repeat:no-repeat;
    background-position:center;
    overflow: hidden;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: rgb(235, 28, 97);
  }
</style>