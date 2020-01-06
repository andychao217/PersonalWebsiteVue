import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "home",
  component: Home,
  children: [{
      path: "/about",
      name: "about",
      meta: {
        icon: "user",
        title: "m.about"
      },
      component: () => import("../views/About.vue")
    },
    {
      path: "/timeLine",
      name: "timeLine",
      meta: {
        icon: "profile",
        title: "m.timeLine"
      },
      component: () => import("../views/Timeline.vue")
    },
    {
      path: "/portfolio",
      name: "portfolio",
      meta: {
        icon: "picture",
        title: "m.portfolio"
      },
      component: () => import("../views/Portfolio.vue")
    },
    {
      path: "/contact",
      name: "contact",
      meta: {
        icon: "mail",
        title: "m.contact"
      },
      component: () => import("../views/Contact.vue")
    }
  ]
}];

const router = new VueRouter({
  routes
});

export default router;
