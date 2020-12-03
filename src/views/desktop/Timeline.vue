<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px', padding: '10px 10px'}">
    <a-row>
      <a-timeline>
        <a-timeline-item v-for="(item, index) in data" :key="index" :color="item.color" style="text-align:left;">
          <a-icon slot="dot" :type="item.icon" style="font-size: 24px;" />
          <h3 style="font-weight:bolder;margin-left:5px;">{{$t(item.title)}}</h3>
          <a-timeline>
            <a-timeline-item v-for="(experience, indexExp) in item.experience" :key="indexExp" style="text-align:left;">
              <a-card :title="$t(experience.title)" size="small" hoverable>
                <p>
                  {{experience.starttime}} - {{$t(experience.endtime)}}
                </p>
                <p v-if="experience.content !== 'workSponContent' && experience.content !== 'workYssContent'">
                  {{$t(experience.content)}}
                </p>
                <a-list v-else size="small" bordered>
                  <a-list-item v-for="(content, indexContent) in $t(experience.content)" :key="indexContent">{{content}}</a-list-item>
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
  import axios from "axios";
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
    created () {
      axios.get('data/timeLineData.json').then((response)=>{
        this.data = response.data;
      });
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
