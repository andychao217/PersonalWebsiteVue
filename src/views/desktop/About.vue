<template>
  <div class="scrollDiv" ref="container" :style="{height: contentHeight + 'px'}">
    <a-alert :message="$t('helloWhoAmI')" type="info" showIcon />
    <a-row style="margin-top: 10px;">
      <a-carousel autoplay vertical>
        <div style="margin-top:20px;">
          <h1>{{$t('lifeMottoJobs1')}}</h1>
          <h3>-{{$t('jobs')}}</h3>
        </div>
        <div>
          <h1>{{$t('lifeMottoGump')}}</h1>
          <h3>-{{$t('gump')}}</h3>
        </div>
      </a-carousel>
    </a-row>
    <a-row :gutter="10" style="margin-top:10px;">
      <a-col span="14">
        <a-list size="small" bordered style="height:438px;">
          <a-list-item style="text-align:left;" v-for="(intro, indexIntro) in introArray"
            :key="indexIntro">{{intro}}</a-list-item>
          <div slot="header">{{$t('introTitle')}}</div>
          <div slot="footer" style="text-align:left;">
            <strong>{{$t('hobbyTitle')}}: </strong>
            <a-tag v-for="(item, index)  in hobbyArray" :key="item" :color="colorList[index]">
              {{item}}</a-tag>
          </div>
        </a-list>
      </a-col>
      <a-col span="10" style="padding:20px;background:whitesmoke;border-radius:5px;height:438px;">
        <h3 style="text-align:left;">{{$t('ability')}}</h3>
        <Charts style="margin-top:-35px;"></Charts>
      </a-col>
    </a-row>
    <a-divider orientation="left">{{$t('personalInfo')}}</a-divider>
    <a-row :gutter="10">
      <a-col span="4">
        <img :src="imgUrl" style="height:148px;border-radius:5px;">
      </a-col>
      <a-col span="20">
        <a-form :form="form" style="background:whitesmoke; padding:10px;border-radius:5px;">
          <a-row :gutter="10">
            <a-col span="12">
              <a-row>
                <a-form-item :label="$t('nameInput')" :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 16 }">
                  <a-input v-model="form.name" readOnly />
                </a-form-item>
              </a-row>
            </a-col>
            <a-col span="12">
              <a-row>
                <a-form-item :label="$t('emailInput')" :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 16 }">
                  <a-input type="email" v-model="form.mail" readOnly />
                </a-form-item>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="10">
            <a-col span="12">
              <a-row>
                <a-form-item :label="$t('phoneInput')" :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 16 }">
                  <a-input v-model="form.phone" readOnly />
                </a-form-item>
              </a-row>
            </a-col>
            <a-col span="12">
              <a-form-item :label="$t('websiteInput')" :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }">
                <a-input v-model="form.website" readOnly />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
    <a-row style="margin-top:10px;">
      <a :href="resumeLink" target="_blank" style="color:white; text-decoration:none;float:right;">
        <a-button type="primary" icon="download">
          <span> {{$t('resumeTxt')}}</span>
        </a-button>
      </a>
    </a-row>
  </div>
</template>
<script>
  import axios from "axios";
  import Bus from '@/lib/bus';
  const Charts = () => import("@/components/Charts.vue");
  export default {
    name: "about",
    components: {
      Charts
    },
    data() {
      return {
        contentHeight: 690,
        imgUrl: process.env.BASE_URL + 'images/profilepic.jpg',
        form: {},
        publicPath: process.env.BASE_URL,
        colorList: []
      }
    },
    computed: {
      resumeLink() {
        let lang = localStorage.lang;
        if (lang === 'zh-CN') {
          return this.publicPath + 'pdf/赵庆简历.pdf';
        } else {
          return this.publicPath + 'pdf/AndyChaoResume.pdf';
        }
      },
      introArray() {
        return this.$t('introTxt');
      },
      hobbyArray() {
        return this.$t('hobbies');
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
    created() {
      axios.get('data/colorList.json').then((response) => {
        this.colorList = response.data;
      });
      setTimeout(() => {
        axios.get('data/contactInfo.json').then((response)=>{
          this.form = response.data;
        });
      }, 100);
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
<style src="../../css/swiperCSS.css" scoped>
</style>
