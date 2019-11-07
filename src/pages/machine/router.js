import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: `${process.env.BASE_URL}machine.html/`,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "挂号机 | 就诊问诊"
      },
      component: () =>
        import(/* webpackChunkName: "machine-home" */ "./views/home/home.vue")
    },
    {
      path: "/doctors",
      name: "doctors",
      meta: {
        title: "医生列表 | 挂号机 | 就诊问诊"
      },
      component: () =>
        import(
          /* webpackChunkName: "machine-doctors" */ "./views/doctors/doctors.vue"
        )
    },
    {
      path: "/doctor/:uid",
      name: "doctor",
      meta: {
        title: "医生 | 医生列表 | 挂号机 | 就诊问诊"
      },
      component: () =>
        import(
          /* webpackChunkName: "machine-doctor" */ "./views/doctor/doctor.vue"
        )
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  next();
});

router.afterEach(() => {});

export default router;
