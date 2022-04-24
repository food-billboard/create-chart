export default [
  {
    extra: false,
    path: '/',
    component: '@/layouts/index',
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
        path: '/model',
        component: '@/pages/Model',
      },
      {
        path: '/share',
        component: '@/pages/Share',
      },
      {
        path: '/preview',
        component: '@/pages/Previewer',
      },
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
    ],
  },
];
