<template>
  <div class="scrollDiv" :style="{height: contentHeight + 'px'}">
    <a-alert :message="$t('m.helloWhoAmI')" type="info" showIcon />
    <a-row style="margin-top: 10px;">
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
    <a-row :gutter="10" style="margin-top:10px;">
      <a-col span="14">

      </a-col>
      <a-col span="10" style="padding:20px;background:whitesmoke;border-radius:5px;">
        <h3 style="text-align:left;">{{$t('m.ability')}}</h3>
        <Charts style="margin-top:-35px;"></Charts>
      </a-col>
    </a-row>
    <a-divider orientation="left">{{$t('m.personalInfo')}}</a-divider>
    <a-row :gutter="10">
      <a-col span="4">
        <img :src="imgUrl" style="height:148px;border-radius:5px;">
      </a-col>
      <a-col span="20">
        <a-form :form="form" style="background:whitesmoke; padding:10px;border-radius:5px;">
          <a-row :gutter="10">
            <a-col span="12">
              <a-row>
                <a-form-item :label="$t('m.nameInput')" :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 16 }">
                  <a-input v-model="form.name" readOnly />
                </a-form-item>
              </a-row>
            </a-col>
            <a-col span="12">
              <a-row>
                <a-form-item :label="$t('m.emailInput')" :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 16 }">
                  <a-input type="email" v-model="form.mail" readOnly />
                </a-form-item>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="10">
            <a-col span="12">
              <a-row>
                <a-form-item :label="$t('m.phoneInput')" :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 16 }">
                  <a-input v-model="form.phone" readOnly />
                </a-form-item>
              </a-row>
            </a-col>
            <a-col span="12">
              <a-form-item :label="$t('m.websiteInput')" :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }">
                <a-input v-model="form.website" readOnly/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
    <a-row style="margin-top:10px;">
      <a :href="resumeLink" target="_blank" style="color:white; text-decoration:none;float:right;">
        <a-button type="primary" icon="download">
          <span> {{$t('m.resumeTxt')}}</span>
        </a-button>
      </a>
    </a-row>
  </div>
</template>
<script>
  import Bus from '@/lib/bus';
  import profilePic from "@/assets/profilepic.jpg";
  const Charts = () => import("@/components/Charts.vue");
  export default {
    name: "about",
    components: {
      Charts
    },
    data() {
      return {
        contentHeight: 690,
        imgUrl: profilePic,
        form: {
          name: "赵庆",
          mail: "andychao217@qq.com",
          phone: "(+86)13548691522",
          website: "https://www.andychao217.cn"
        },
        publicPath: process.env.BASE_URL
      }
    },
    computed: {
      resumeLink() {
        let lang = localStorage.lang;
        if (lang === 'zh-CN') {
          return this.publicPath + '赵庆简历.pdf';
        } else {
          return this.publicPath + 'AndyChaoResume.pdf';
        }
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
