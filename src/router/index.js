import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      {
        path: "/timeLine",
        name: "timeLine",
        component: () => import(/* webpackChunkName: "about" */ "../views/Timeline.vue")
      },
      {
        path: "/portfolio",
        name: "portfolio",
        component: () => import(/* webpackChunkName: "about" */ "../views/Portfolio.vue")
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import(/* webpackChunkName: "about" */ "../views/Contact.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
