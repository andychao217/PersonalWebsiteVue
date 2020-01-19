import Vue from "vue";
import VueRouter from "vue-router";
import Loading from "../views/Loading.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/loading",
    name: "loading",
    component: Loading
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/desktop/Home.vue"),
    children: [{
        path: "/about",
        name: "about",
        meta: {
          icon: "user",
          title: "about"
        },
        component: () => import("../views/desktop/About.vue")
      },
      {
        path: "/timeLine",
        name: "timeLine",
        meta: {
          icon: "profile",
          title: "timeLine"
        },
        component: () => import("../views/desktop/Timeline.vue")
      },
      {
        path: "/portfolio",
        name: "portfolio",
        meta: {
          icon: "picture",
          title: "portfolio"
        },
        component: () => import("../views/desktop/Portfolio.vue")
      },
      {
        path: "/contact",
        name: "contact",
        meta: {
          icon: "mail",
          title: "contact"
        },
        component: () => import("../views/desktop/Contact.vue")
      }
    ]
  },
  {
    path: '/mobile',
    name: 'mobile',
    component: () => import("../views/mobile/Home.vue"),
    children: [
      {
        path: "/aboutMobile",
        name: "aboutMobile",
        meta: {
          icon: "contact",
          title: "about"
        },
        component: () => import("../views/mobile/About.vue")
      },
      {
        path: "/timeLineMobile",
        name: "timeLineMobile",
        meta: {
          icon: "description",
          title: "timeLine"
        },
        component: () => import("../views/mobile/Timeline.vue")
      },
      {
        path: "/portfolioMobile",
        name: "portfolioMobile",
        meta: {
          icon: "photo-o",
          title: "portfolio"
        },
        component: () => import("../views/mobile/Portfolio.vue")
      },
      {
        path: "/contactMobile",
        name: "contactMobile",
        meta: {
          icon: "envelop-o",
          title: "contact"
        },
        component: () => import("../views/mobile/Contact.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
