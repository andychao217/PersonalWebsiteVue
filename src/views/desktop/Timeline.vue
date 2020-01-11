<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px', padding: '10px 10px'}">
    <a-row>
      <a-timeline>
        <a-timeline-item v-for="(item, index) in data" :key="index" :color="item.color" style="text-align:left;">
          <a-icon slot="dot" :type="item.icon" style="font-size: 24px;" />
          <h3 style="font-weight:bolder;margin-left:5px;">{{$t(item.title)}}</h3>
          <a-timeline>
            <a-timeline-item v-for="(experience, index2) in item.experience" :key="index2" style="text-align:left;">
              <a-card :title="$t(experience.title)" size="small" hoverable>
                <p>
                  {{experience.starttime}} - {{$t(experience.endtime)}}
                </p>
                <p v-if="experience.content !== 'm.workSponContent'">
                  {{$t(experience.content)}}
                </p>
                <a-list v-else size="small" bordered :dataSource="$t(experience.content).split(';')">
                  <a-list-item slot="renderItem" slot-scope="item">{{item}}</a-list-item>
                </a-list>
              </a-card>
            </a-timeline-item>
          </a-timeline>
        </a-timeline-item>
      </a-timeline>
    </a-row>
  </div>
</template>
<script>
  import Bus from '@/lib/bus';
  import timeLineData from '@/lib/timeLineData.js';
  export default {
    name: "timeLine",
    data() {
      return {
        contentHeight: 690,
        data: null
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
      this.data = timeLineData;
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    }
  }

</script>
