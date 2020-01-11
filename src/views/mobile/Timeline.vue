<template>
  <div class="scrollDiv"
    :style="{overflowY:'auto', height: contentHeight + 133 + 'px'}">
    <van-collapse v-model="activeName" accordion style="text-align:left;">
      <van-collapse-item v-for="(item, index) in data" :key="index" :title="$t(item.title)" :name="index" style="padding:0px;">
        <van-panel 
          v-for="(experience, index2) in item.experience" 
          :key="index2" 
          :title="$t(experience.title)" 
          :desc="experience.starttime + ' - '  + $t(experience.endtime)"
        >
          <div style="padding: 10px 15px;background:whitesmoke;">
            <span v-if="experience.content !== 'm.workSponContent'" style="color:black">
              {{$t(experience.content)}}
            </span>
            <div v-else>
              <van-cell
                v-for="item in $t(experience.content).split(';')"
                :key="item"
                :title="item"
                style="text-align:left; background:whitesmoke;padding:10px 0px;"
              />
            </div>
          </div>
        </van-panel>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
  import timeLineData from '@/lib/timeLineData.js';
  export default {
    name: "timeLineMobile",
    data() {
      return {
        contentHeight: 690,
        data: null,
        activeName: 1
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
      };
      this.data = timeLineData;
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  }

</script>
