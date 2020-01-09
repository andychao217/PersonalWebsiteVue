<template>
  <div class="scrollDiv" :style="{overflowY:'auto', height: contentHeight + 133 + 'px', padding: '10px'}">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <div class="swipeDiv" :style="{backgroundImage: bgUrl1}">
          <h3 style="margin-top:10px;">{{$t('m.lifeMottoJobs1')}}</h3>
          <h1>-{{$t('m.jobs')}}</h1>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="swipeDiv" :style="{backgroundImage: bgUrl2}">
          <h3>{{$t('m.lifeMottoGump')}}</h3>
          <h1>-{{$t('m.gump')}}</h1>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import bgPic1 from "@/assets/bg1.jpg";
import bgPic2 from "@/assets/bg2.jpg";
export default {
  name: "aboutMobile",
  data () {
    return {
      contentHeight: 690,
      bgUrl1: 'url(' + bgPic1 + ')',
      bgUrl2: 'url(' + bgPic2 + ')',
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
<style lang="css" scoped>
.swipeDiv{
  padding:20px 60px;
  height:120px;
  background-repeat:no-repeat;
  background-position:center;
}

.swipeDiv > h3{
  font-size: 15px;
}
.swipeDiv > h1{
  font-size: 12px;
}

.swipeDiv > h3,
.swipeDiv > h1 {
  color: #fff;
  text-shadow: 1px 1px 1px #000;
}
</style>