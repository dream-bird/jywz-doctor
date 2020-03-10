import Vue from "vue";
import Router from "vue-router";
import session from "../../utils/util.session";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: `${process.env.BASE_URL}patient/`,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "用户 | 就诊问诊",
        requiresAuth: true
      },
      component: () =>
        // import(/* webpackChunkName: "patient-home" */ "./views/home/home1.vue")
        import(/* webpackChunkName: "patient-home" */ "./views/home/home.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "欢迎登录 | 用户 | 就诊问诊"
      },
      component: () =>
        import(
          // /* webpackChunkName: "patient-login" */ "./views/login/login1.vue"
          /* webpackChunkName: "patient-login" */ "./views/login/login.vue"
        )
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "欢迎注册 | 用户 | 就诊问诊"
      },
      component: () =>
        import(
          // /* webpackChunkName: "patient-register" */ "./views/register/register1.vue"
          /* webpackChunkName: "patient-register" */ "./views/register/register.vue"
        )
    },
    {
      path: "/register-code",
      name: "register-code",
      meta: {
        title: "挂号 | 用户 | 就诊问诊"
      },
      component: () =>
        import(
          /* webpackChunkName: "register-code" */ "./views/register-code/register-code.vue"
        )
    },
    {
      path: "/patient-card",
      name: "patient-card",
      meta: {
        title: "就诊卡 | 用户 | 就诊问诊"
      },
      component: () =>
        import(
          /* webpackChunkName: "patient-card" */ "./views/patient-card/patient-card.vue"
        )
    },
    {
      path: "/patient-card-qrcode",
      name: "patient-card-qrcode",
      meta: {
        title: "就诊卡二维码 | 用户 | 就诊问诊"
      },
      component: () =>
        import(
          /* webpackChunkName: "patient-card-qrcode" */ "./views/patient-card/patient-card-qrcode.vue"
        )
    },
    {
      path: "/diagnose-record",
      name: "diagnose-record",
      meta: {
        title: "就诊记录 | 用户 | 就诊问诊"
      },
      component: () =>
        import(
          /* webpackChunkName: "diagnose-record" */ "./views/diagnose-record/diagnose-record.vue"
        )
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let _session = await session.get();
    if (_session) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {});

export default router;
