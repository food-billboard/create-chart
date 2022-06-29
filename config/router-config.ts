export default [
  {
    extra: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/register',
        component: '@/pages/Register',
      },
      {
        path: '/login',
        component: '@/pages/Login',
      },
      {
        path: '/forget',
        component: '@/pages/Forget',
      },
      {
        path: '/share',
        component: '@/pages/Share',
      },
      {
        path: '/',
        component: '@/layouts/AuthLayout/index',
        routes: [
          {
            path: '/',
            component: '@/pages/ScreenList',
          },
          {
            path: '/designer',
            component: '@/pages/Designer',
          },
          {
            path: '/model-designer',
            component: '@/pages/Designer',
          },
          {
            path: '/model',
            component: '@/pages/ModelList',
          },
          {
            path: '/preview',
            component: '@/pages/Previewer',
          },
          {
            path: '/model-preview',
            component: '@/pages/Previewer',
          },
          {
            redirect: '/',
            component: '@/pages/ScreenList',
          },
        ],
      },
      {
        redirect: '/',
        component: '@/pages/ScreenList',
      },
    ],
  },
];
