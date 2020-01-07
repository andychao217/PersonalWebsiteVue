<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight + 'px', border: 'none'}">
    <a-row :gutter="5">
      <a-col :span="8" v-for="item in gridData" :key="item.name" style="margin-bottom:10px;">
        <a-card hoverable>
          <img
            width="80"
            height="80"
            :src="publicPath + 'portfolio/' + item.name + '.svg'"
            slot="cover"
            style="margin-top:10px;"
          />
          <a-card-meta :title="$t(item.title)">
            <template slot="description">
              {{$t(item.title)}}
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import portfolioData from "@/lib/portfolioData.js";
  export default {
    name: "portfolio",
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
        })()
      }
      this.gridData = portfolioData;
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  }

</script>
