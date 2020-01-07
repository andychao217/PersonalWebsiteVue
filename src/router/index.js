import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/desktop/Home.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: Home,
    children: [{
        path: "/about",
        name: "about",
        meta: {
          icon: "user",
          title: "m.about"
        },
        component: () => import("../views/desktop/About.vue")
      },
      {
        path: "/timeLine",
        name: "timeLine",
        meta: {
          icon: "profile",
          title: "m.timeLine"
        },
        component: () => import("../views/desktop/Timeline.vue")
      },
      {
        path: "/portfolio",
        name: "portfolio",
        meta: {
          icon: "picture",
          title: "m.portfolio"
        },
        component: () => import("../views/desktop/Portfolio.vue")
      },
      {
        path: "/contact",
        name: "contact",
        meta: {
          icon: "mail",
          title: "m.contact"
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
          title: "m.about"
        },
        component: () => import("../views/mobile/About.vue")
      },
      {
        path: "/timeLineMobile",
        name: "timeLineMobile",
        meta: {
          icon: "description",
          title: "m.timeLine"
        },
        component: () => import("../views/mobile/Timeline.vue")
      },
      {
        path: "/portfolioMobile",
        name: "portfolioMobile",
        meta: {
          icon: "photo-o",
          title: "m.portfolio"
        },
        component: () => import("../views/mobile/Portfolio.vue")
      },
      {
        path: "/contactMobile",
        name: "contactMobile",
        meta: {
          icon: "envelop-o",
          title: "m.contact"
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
