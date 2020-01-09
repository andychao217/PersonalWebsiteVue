<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px'}">
    <a-row>
      <a-carousel autoplay vertical>
        <div style="margin-top:20px;">
          <h1>{{$t('m.lifeMottoJobs1')}}</h1>
          <h3>-{{$t('m.jobs')}}</h3>
        </div>
        <div>
          <h1>{{$t('m.lifeMottoGump')}}</h1>
          <h3>-{{$t('m.gump')}}</h3>
        </div>
      </a-carousel>
    </a-row>
  </div>
</template>
<script>
  import Bus from '@/lib/bus';
  export default {
    name: "about",
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
<style scoped>
  /* For demo */
  .ant-carousel>>>.slick-slide {
    padding: 40px 150px;
    text-align: center;
    border-radius: 5px;
    height: 200px;
    background-image: url('../../assets/bg1.jpg');
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
  }

  .ant-carousel>>>.slick-slide:nth-child(odd) {
    background-image: url('../../assets/bg2.jpg');
  }


  .ant-carousel>>>.slick-slide h3,
  .ant-carousel>>>.slick-slide h1 {
    color: #fff;
    text-shadow: 2px 2px 2px #000;
  }

</style>
