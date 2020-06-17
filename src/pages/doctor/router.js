import Vue from "vue";
import Router from "vue-router";
import session from "../../utils/util.session";

Vue.use(Router);
//路由啊
const router = new Router({
  mode: "history",
  base: `${process.env.BASE_URL}doctor/`,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "医生 | 就诊问诊",
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "doctor-home" */ "./views/home/home.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "欢迎登录 | 医生 | 就诊问诊"
      },
      component: () =>
        // import(/* webpackChunkName: "doctor-login" */ "./views/login/login.vue")
        import(
          /* webpackChunkName: "doctor-login" */ "./views/login/login_mock.vue"
        )
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "欢迎注册 | 医生 | 就诊问诊"
      },
      component: () =>
        import(
          /* webpackChunkName: "doctor-register" */ "./views/register/register.vue"
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
