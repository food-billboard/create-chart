export const normalRouter = [
  {
    extra: false,
    path: '/',
    component: '@/layouts/CommonLayout/index',
    routes: [
      {
        path: '/',
        component: '@/pages/Home',
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
      {
        path: '/share',
        component: '@/pages/Share',
      },
      {
        path: '/viewer',
        component: '@/pages/Viewer',
      },
      {
        path: '/',
        component: '@/layouts/AuthLayout/index',
        routes: [
          {
            path: '/screen',
            component: '@/pages/ScreenList',
          },
          {
            path: '/media',
            component: '@/pages/MediaManage',
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
            component: '@/pages/Home',
          },
        ],
      },
      {
        redirect: '/',
        component: '@/pages/Home',
      },
    ],
  },
];

export const staticRouter = [
  {
    path: '/',
    component: '@/layouts/StaticLayout/index',
    routes: [
      {
        path: '/designer',
        component: '@/pages/Designer',
      },
      {
        path: '/viewer',
        component: '@/pages/Viewer',
      },
      {
        path: '/',
        redirect: '/designer',
      },
    ],
  },
];
