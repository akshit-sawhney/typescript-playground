const { writeJSONFile } = require('./helpers/writeFile');
const WRITE_PATH = 'casa/mergePublicELBLogs/files/mergedAdminRoutes.json'

function component() {
  // Do nothing; this is just a placeholder
}

function defineAsyncComponent() {
  // Do nothing; this is just a placeholder
}

const ROUTE_LIST = [
  {
    path: '/admin/gcse',
    name: 'admin-gcse',
    props: true,
    component: () => import('~/pages/gcse/index.vue'),
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    path: '/ai-toolkit',
    name: 'admin-ai',
    props: true,
    component: () => import('~/pages/ai-tools/index.vue'),
  },
  {
    path: '/ai-toolkit/:useCase',
    name: 'admin-ai-use-case',
    props: true,
    component: () => import('~/pages/ai-tools/_useCase.vue'),
  },
  {
    path: '/admin/quizizz-ai',
    name: 'admin-quizizz-ai',
    props: true,
    component: () => import('~/pages/ai-studio/index.vue'),
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    path: '/admin/ai-studio',
    redirect: '/admin/quizizz-ai',
  },
  {
    path: '/admin/google-slides-addon',
    name: 'google-addon',
    props: true,
    component: () => import('~/pages/google-slides-addon/GoogleSlidesAddon.vue'),
    meta: {
      layout: 'addon',
    },
    children: [
      {
        name: 'google-addon-sidebar',
        path: 'sidebar',
        props: true,
        children: [
          {
            name: 'google-addon-sidebar-home',
            path: '',
            component: () => import('~/pages/google-slides-addon/sidebar/index.vue'),
            props: true,
          },
          {
            name: 'google-addon-sidebar-login',
            path: 'login',
            props: true,
            children: [
              {
                name: 'google-addon-sidebar-login',
                path: '',
                component: () => import('~/pages/google-slides-addon/sidebar/login/index.vue'),
                props: true,
              },
              {
                name: 'google-addon-sidebar-login-success',
                path: 'success',
                meta: {
                  layout: 'blank',
                },
                component: () => import('~/pages/google-slides-addon/sidebar/login/success.vue'),
                props: true,
              },
              {
                name: 'google-addon-sidebar-login-failure',
                path: 'failure',
                component: () => import('~/pages/google-slides-addon/sidebar/login/failure.vue'),
                props: true,
              },
            ],
          },
          {
            name: 'google-addon-sidebar-librarylimits',
            path: 'librarylimits',
            component: () => import('~/pages/google-slides-addon/sidebar/librarylimits.vue'),
            props: true,
          },
        ],
      },
      {
        name: 'google-addon-modal',
        path: 'modal',
        meta: {
          layout: 'default',
        },
        props: true,
        children: [
          {
            name: 'google-addon-modal-question',
            path: 'question',
            props: true,
            children: [
              {
                name: 'google-addon-modal-question-create',
                path: 'create',
                component: () => import('~/pages/google-slides-addon/modal/question/create.vue'),
                props: true,
              },
              {
                name: 'google-addon-modal-question-search',
                path: 'search',
                component: () => import('~/pages/google-slides-addon/modal/question/search.vue'),
                props: true,
              },
              {
                name: 'google-addon-modal-question-generated',
                path: 'generated',
                component: () => import('~/pages/google-slides-addon/modal/question/generated.vue'),
                props: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'admin-book-id',
    path: '/admin/literature/:id/:slug?',
    component: () => import('~/discovery/pages/Book.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-book-id-v2',
    path: '/admin/literature/v2/:id/:slug?',
    component: () => import('~/search-experiences/literature/BookV2.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-skill-id',
    path: '/admin/topic/:subject/:id/:slug?',
    component: () => import('~/discovery/pages/Skills.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-skill-id-v2',
    path: '/admin/topic/v2/:subject/:id/:slug?',
    component: () => import('~/search-experiences/skills/SkillsV2.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-assessment-id',
    path: '/assessment/:id/:slug?',
    component: () => import('~/activities/pages/activity.vue'),
    props: true,
    meta: {
      layout: 'adpLayout',
    },
  },
  {
    name: 'admin-lesson-id',
    path: '/lesson/:id/:slug?',
    component: () => import('~/activities/pages/activity.vue'),
    props: true,
    meta: {
      layout: 'adpLayout',
    },
  },
  {
    name: 'admin-passage-id',
    path: '/passage/:id/:slug?',
    component: () => import('~/activities/pages/activity.vue'),
    props: true,
    meta: {
      layout: 'adpLayout',
    },
  },
  {
    name: 'admin-interactive-video-id',
    path: '/interactive-video/:id/:slug?',
    component: () => import('~/activities/pages/activity.vue'),
    props: true,
    meta: {
      layout: 'adpLayout',
    },
  },
  {
    name: 'sales-qfw',
    path: '/sales/qfw',
    component: () => import('~/pages/sales/qfw.vue'),
    props: true,
  },
  {
    name: 'create-activity',
    path: '/create-activity',
    component: () => import('~/pages/create/activity.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'import-activity',
    path: '/import-activity',
    component: () => import('~/components/ImportActivity/index.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'sales-onboarding-organization',
    path: '/sales/onboarding/organization',
    component: () => import('~/pages/sales/onboarding/organization/index.vue'),
    props: true,
  },
  {
    name: 'admin-subscription-update',
    path: '/admin/subscription/update',
    component: () => import('~/pages/admin/subscription/update/index.vue'),
    props: true,
    meta: {
      middleware: 'auth, qfwSubscription',
    },
  },
  {
    name: 'admin-subscription-manage',
    path: '/admin/subscription/manage',
    component: () => import('~/pages/admin/subscription/manage/index.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'snd-dashboard',
    path: '/snd/dashboard',
    component: () => import('~/pages/snd/dashboard/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth, sndDashboardAccess',
    },
  },
  {
    name: 'signup-teacher-2',
    path: '/signup/teacher/2',
    component: () => import('~/pages/signup/teacher/2.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-teacher-1',
    path: '/signup/teacher/1',
    component: () => import('~/pages/signup/teacher/1.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-student-1',
    path: '/signup/student/1',
    component: () => import('~/pages/signup/student/1.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-parent-1',
    path: '/signup/parent/1',
    component: () => import('~/pages/signup/parent/1.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-other-1',
    path: '/signup/other/1',
    component: () => import('~/pages/signup/other/1.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-create-org',
    path: '/signup/create-org',
    component: () => import('~/pages/signup/create-org/index.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-add-classes',
    path: '/signup/add-classes',
    component: () => import('~/pages/signup/AddClasses.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-complete',
    path: '/signup/complete',
    component: () => import('~/pages/signup/Complete.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-corporate-journey',
    path: '/signup/corporate/journey',
    component: () => import('~/pages/signup/corporate/journey.vue'),
    props: true,
  },
  {
    name: 'signup-corporate-2',
    path: '/signup/corporate/2',
    component: () => import('~/pages/signup/corporate/2.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-corporate-1',
    path: '/signup/corporate/1',
    component: () => import('~/pages/signup/corporate/1.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup-admin-1',
    path: '/signup/admin/1',
    component: () => import('~/pages/signup/admin/1.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'sales-subscriptions-subscriptionDetails',
    path: '/sales/subscriptions/subscriptiondetails',
    component: () => import('~/pages/sales/subscriptions/subscriptionDetails.vue'),
    props: true,
  },
  {
    name: 'sales-subscriptions-new',
    path: '/sales/subscriptions/new',
    component: () => import('~/pages/sales/subscriptions/new.vue'),
    props: true,
  },
  {
    name: 'onboarding-teacher',
    path: '/onboarding/teacher',
    component: () => import('~/pages/onboarding/teacher/index.vue'),
    props: true,
  },
  {
    name: 'onboarding-corporate',
    path: '/onboarding/corporate',
    component: () => import('~/pages/onboarding/corporate/index.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'demo-quiz-QfwDemoLoading',
    path: '/demo/quiz/qfwdemoloading',
    component: () => import('~/pages/demo/quiz/QfwDemoLoading.vue'),
    props: true,
  },
  {
    name: 'demo-quiz-CircularProgress',
    path: '/demo/quiz/circularprogress',
    component: () => import('~/pages/demo/quiz/CircularProgress.vue'),
    props: true,
  },
  {
    name: 'admin-vocab',
    path: '/admin/vocab',
    component: () => import('~/pages/admin/vocab/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-reports',
    path: '/admin/reports',
    component: () => import('~/pages/admin/reports/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-recommended-for-you',
    path: '/admin/recommended-for-you',
    component: () => import('~/pages/admin/recommended-for-you/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-private',
    path: '/admin/private',
    component: () => import('~/pages/admin/private/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-passages',
    path: '/admin/passages',
    component: () => import('~/pages/admin/passages/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-memes',
    path: '/admin/memes',
    component: () => import('~/pages/admin/memes/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-groups',
    path: '/admin/groups',
    component: () => import('~/pages/admin/groups/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-filters-content',
    path: '/admin/filters/content',
    component: () => import('~/pages/admin/filters/content.vue'),
    props: true,
  },
  {
    name: 'admin-differentiation',
    path: '/admin/differentiation/:id',
    component: () => import('~/pages/admin/differentiation/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-district',
    path: '/admin/district',
    component: () => import('~/pages/admin/district/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-courses',
    path: '/admin/courses',
    component: () => import('~/pages/admin/courses/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-courses-create',
    path: '/admin/courses/create',
    component: () => import('~/pages/admin/courses/create.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-classes',
    path: '/admin/classes',
    component: () => import('~/pages/admin/classes/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-bts-recommendations-all',
    path: '/admin/bts-recommendations/all',
    component: () => import('~/pages/admin/bts-recommendations/all.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'super-trainer',
    path: '/super-trainer',
    component: () => import('~/pages/super-trainer/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'super-pricing',
    path: '/super-pricing',
    component: () => {
      return import('~/pages/super-pricing/index.vue');
    },
    props: true,
  },
  {
    name: 'super-pricing-followup',
    path: '/super-pricing/followup',
    component: () => import('~/pages/super-pricing/followup.vue'),
    props: true,
  },
  {
    name: 'summer-vacation-trivia',
    path: '/summer-vacation-trivia',
    component: () => import('~/pages/summer-vacation-trivia/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'signup-sso',
    path: '/signup/sso',
    component: () => import('~/pages/signup/sso.vue'),
    props: true,
  },
  {
    name: 'signup-occupation',
    path: '/signup/occupation',
    component: () => import('~/pages/signup/occupation.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'signup',
    path: '/signup',
    component: () => import('~/pages/signup/index.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('~/pages/settings/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'select-class',
    path: '/select-class',
    component: () => import('~/pages/select-class/index.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'school-pricing',
    path: '/school-pricing',
    component: () => import('~/pages/school-pricing/index.vue'),
    props: true,
  },
  {
    name: 'sales',
    path: '/sales',
    component: () => import('~/pages/sales/index.vue'),
    props: true,
  },
  {
    name: 'rewind',
    path: '/rewind',
    component: () => import('~/pages/rewind/index.vue'),
    props: true,
  },
  {
    name: 'reset-password',
    path: '/reset-password',
    component: () => import('~/pages/reset-password/index.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'referral',
    path: '/referral',
    component: () => import('~/pages/referral/index.vue'),
    props: true,
  },
  {
    name: 'reactivated',
    path: '/reactivated',
    component: () => import('~/pages/reactivated/index.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'reactivate',
    path: '/reactivate',
    component: () => import('~/pages/reactivate/index.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'qfwdemo',
    path: '/qfwdemo',
    component: () => import('~/pages/qfwdemo/index.vue'),
    props: true,
  },
  {
    name: 'qfwdemo-QfwDemoLoading',
    path: '/qfwdemo/qfwdemoloading',
    component: () => import('~/pages/qfwdemo/QfwDemoLoading.vue'),
    props: true,
  },
  {
    name: 'qfwdemo-CircularProgress',
    path: '/qfwdemo/circularprogress',
    component: () => import('~/pages/qfwdemo/CircularProgress.vue'),
    props: true,
  },
  {
    name: 'qdash-contests',
    path: '/qdash/contests',
    component: () => import('~/pages/qdash/contests.vue'),
    props: true,
    meta: {
      layout: 'internalDashboard',
    },
  },
  {
    name: 'player-report',
    path: '/player-report',
    component: () => import('~/pages/player-report/index.vue'),
    props: true,
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('~/pages/login/index.vue'),
    props: true,
    meta: {
      layout: 'signupDashboard',
    },
  },
  {
    name: 'join-school-search',
    path: '/join-school/search',
    component: () => import('~/pages/join-school/search.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'join-school-add',
    path: '/join-school/add',
    component: () => import('~/pages/join-school/add.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'join-organization',
    path: '/join-organization',
    component: () => import('~/pages/join-organization/index.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'internal-redirect',
    path: '/internal-redirect',
    component: () => import('~/pages/internal-redirect/index.vue'),
    props: true,
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    component: () => import('~/pages/forgot-password/index.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'forWork-support',
    path: '/forwork/support',
    component: () => import('~/pages/forWork/support.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'forWork-plans',
    path: '/forwork/plans',
    component: () => import('~/pages/forWork/plans.vue'),
    props: true,
    meta: {
      layout: 'qfwPricing',
    },
  },
  {
    name: 'forWork-dashboard',
    path: '/forwork/dashboard',
    component: () => import('~/pages/forWork/dashboard.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'corporate',
    },
  },
  {
    name: 'delete-account',
    path: '/delete-account',
    component: () => import('~/pages/delete-account/index.vue'),
    props: true,
    meta: {
      layout: 'auth',
    },
  },
  {
    name: 'brazil-parana-reports',
    path: '/brazil-parana-reports',
    component: () => import('~/pages/brazil-parana-reports/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'blocked-corporate',
    path: '/blocked/corporate',
    component: () => import('~/pages/blocked/corporate.vue'),
    props: true,
  },
  {
    name: 'admin-teachers',
    path: '/admin/teachers',
    component: () => import('~/pages/admin/teachers.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-my-library',
    path: '/admin/my-library',
    component: () => import('~/pages/admin/my-library.vue'),
    beforeEnter: (to, from, next) => {
      if (!from.path.match(/^\/admin\/\/my-library\//)) {
        fetchAndSetContentCounts();
      }
      next();
    },
    children: [
      {
        name: 'admin-my-library-standardTagging',
        path: 'standardtagging',
        component: () => import('~/pages/admin/my-library/standardTagging/index.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-sharedWithMe',
        path: 'sharedwithme',
        component: () => import('~/pages/admin/my-library/sharedWithMe/index.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-likedByMe',
        path: 'likedbyme',
        component: () => import('~/pages/admin/my-library/likedByMe/index.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-imported',
        path: 'imported',
        component: () => import('~/pages/admin/my-library/imported/index.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-hostedQuizzes',
        path: 'hostedquizzes',
        component: () => import('~/pages/admin/my-library/hostedQuizzes/index.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-createdByMe',
        path: 'createdbyme',
        component: () => import('~/pages/admin/my-library/createdByMe/index.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-allQuizzes',
        path: 'allquizzes',
        component: () => import('~/pages/admin/my-library/allQuizzes/index.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-teams',
        path: 'teams',
        component: () => import('~/pages/admin/my-library/teams.vue'),
        children: [
          {
            name: 'admin-my-library-teams-teamId',
            path: ':teamId?',
            component: () => import('~/pages/admin/my-library/teams/_teamId.vue'),
            props: true,
            meta: {
              layout: 'globalLayout',
              middleware: 'auth',
            },
          },
        ],
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-collections',
        path: 'collections',
        component: () => import('~/pages/admin/my-library/collections.vue'),
        children: [
          {
            name: 'admin-my-library-collections-collectionId',
            path: ':collectionId?',
            component: () => import('~/pages/admin/my-library/collections/_collectionId.vue'),
            props: true,
            meta: {
              layout: 'globalLayout',
              middleware: 'auth',
            },
          },
        ],
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
      {
        name: 'admin-my-library-fallback',
        path: ':fallback?',
        component: () => import('~/pages/admin/my-library/_fallback.vue'),
        props: true,
        meta: {
          layout: 'globalLayout',
          middleware: 'auth',
        },
      },
    ],
    props: true,
  },
  {
    name: 'admin',
    path: '/admin',
    component: () => import('~/pages/admin/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-import-quiz',
    path: '/admin/import-quiz',
    component: () => import('~/pages/admin/import-quiz.vue'),
    props: true,
  },
  {
    path: '/admin/corporate',
    component: () => import('~/pages/admin/corporate.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    path: '/admin/corporate/ai-studio',
    component: () => import('~/pages/admin/corporate/ai-studio.vue'),
    props: (route) => {
      return {
        defaultOption: route.query.defaultOption,
      };
    },
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'index',
    path: '/',
    redirect: '/admin',
  },
  {
    name: 'all',
    path: '/:all(.*)*',
    component: () => import('~/pages/_.vue'),
    props: true,
  },
  {
    name: 'badge-id',
    path: '/badge/:id?',
    component: () => import('~/pages/badge/_id.vue'),
    props: true,
  },
  {
    name: 'magic-link-id',
    path: '/magic-link/:id?',
    component: () => import('~/pages/magic-link/_id.vue'),
    props: true,
  },
  {
    name: 'admin-memes-id',
    path: '/admin/memes/:id',
    component: () => import('~/pages/admin/memes/_id.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-search-term',
    path: '/admin/search/:term?',
    component: () => import('~/search/SearchRouter.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-search-term-v1',
    path: '/admin/search/v1/:term?',
    component: () => import('~/pages/admin/search/_term.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-search-term-v2',
    path: '/admin/search/v2/:term?',
    component: defineAsyncComponent(() => import('~/search/index.vue')),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'contest-id-contestUrlName',
    path: '/contest/:id/:contestUrlName?',
    component: () => import('~/pages/contest/_id/_contestUrlName.vue'),
    props: true,
  },
  {
    name: 'corporate-orgId',
    path: '/corporate/:orgId',
    component: () => import('~/pages/corporate/_orgId/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth, qfwAdminDashboardAccess',
    },
  },
  {
    name: 'demo-quiz-id',
    path: '/demo/quiz/:id?',
    component: () => import('~/pages/demo/quiz/_id.vue'),
    props: true,
  },
  {
    name: 'demo-schools-id',
    path: '/demo/schools/:id?',
    component: () => import('~/pages/demo/schools/_id.vue'),
    props: true,
  },
  {
    name: 'presentation-id-edit',
    path: '/presentation/:id/edit',
    component: () => import('~/pages/presentation/_id/edit.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'print-worksheet-id',
    path: '/print/worksheet/:id?',
    component: () => import('~/pages/print/worksheet/_id.vue'),
    props: true,
    meta: {
      layout: 'blank',
    },
  },
  {
    name: 'print-worksheet-id-new',
    path: '/print/worksheet/:id/new',
    component: () => import('~/pages/print/worksheet/_id/new.vue'),
    props: true,
    meta: {
      layout: 'blank',
    },
  },
  {
    name: 'profile-id',
    path: '/profile/:id',
    component: () => import('~/pages/profile/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'sales-subscriptions-subscriptionId',
    path: '/sales/subscriptions/:subscriptionId?',
    component: () => import('~/pages/sales/subscriptions/_subscriptionId.vue'),
    props: true,
  },
  {
    name: 'admin-quizType-id-slug',
    path: '/admin/:quizType/:id/:slug?',
    component: () => import('~/pages/admin/_quizType/_id/_slug.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
    beforeEnter: (to, from, next) => {
      const id = to.params.id;

      // Check if the ID is 24 characters long and contains only hexadecimal characters
      const regex = /^[0-9a-fA-F]{24}$/;

      if (regex.test(id)) {
        next(); // Allow navigation
      } else {
        next('/404'); // Redirect or handle the error case
      }
    },
  },
  {
    name: 'admin-classes-classId-tab',
    path: '/admin/classes/:classId/:tab?',
    component: () => import('~/pages/admin/classes/_classId/_tab.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-classes-classId-manageRoster',
    path: '/admin/classes/:classId/manageroster',
    component: () => import('~/pages/admin/classes/_classId/manageRoster.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-courses-id-edit',
    path: '/admin/courses/:id/edit',
    component: () => import('~/pages/admin/courses/_id/edit.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-courses-id',
    path: '/admin/courses/:id',
    component: () => import('~/pages/admin/courses/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-courses-id-start',
    path: '/admin/courses/:id/start',
    component: () => import('~/pages/admin/courses/_id/start.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-groups-groupId-tab',
    path: '/admin/groups/:groupId/:tab?',
    component: () => import('~/pages/admin/groups/_groupId/_tab.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-groups-groupId-manageRoster',
    path: '/admin/groups/:groupId/manageroster',
    component: () => import('~/pages/admin/groups/_groupId/manageRoster.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-mystic-peak-id',
    path: '/admin/mystic-peak/:id',
    component: () => import('~/pages/admin/mystic-peak/_id/index.vue'),
    props: true,
  },
  {
    name: 'admin-passages-passageId',
    path: '/admin/passages/:passageId',
    component: () => import('~/pages/admin/passages/_passageId/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-pm-id',
    path: '/admin/pm/:id',
    component: () => import('~/pages/admin/pm/_id/index.vue'),
    props: true,
    meta: {
      layout: 'game',
    },
  },
  {
    name: 'admin-quiz-quizId-edit',
    path: '/admin/quiz/:quizId/edit',
    component: () => import('~/pages/admin/quiz/_quizId/edit.vue'),
    props: true,
    meta: {
      layout: 'editorLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-reports-gameid',
    path: '/admin/reports/:gameid',
    component: () => import('~/pages/admin/reports/_gameid/index.vue'),
    props: true,
  },
  {
    name: 'admin-section-sectionName-bts',
    path: '/admin/section/:sectionName/bts',
    component: () => import('~/pages/admin/section/_sectionName/bts.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-test-id',
    path: '/admin/test/:id',
    component: () => import('~/pages/admin/test/_id/index.vue'),
    props: true,
  },
  {
    name: 'admin-vocab-books-bookId',
    path: '/admin/vocab/books/:bookId?',
    component: () => import('~/pages/admin/vocab/books/_bookId.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-vocab-grades-gradeId',
    path: '/admin/vocab/grades/:gradeId?',
    component: () => import('~/pages/admin/vocab/grades/_gradeId.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-vocab-school-stages-id',
    path: '/admin/vocab/school-stages/:id?',
    component: () => import('~/pages/admin/vocab/school-stages/_id.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'corporate-orgId-userType-id',
    path: '/corporate/:orgId/:userType/:id?',
    component: () => import('~/pages/corporate/_orgId/_userType/_id.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth, qfwAdminDashboardAccess',
    },
  },
  {
    name: 'integrations-lms-lmsName-import-teachers',
    path: '/integrations/lms/:lmsName/import-teachers',
    component: () => import('~/pages/integrations/lms/_lmsName/import-teachers.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'integrations-lms-lmsName-status',
    path: '/integrations/lms/:lmsName/status',
    component: () => import('~/pages/integrations/lms/_lmsName/status.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'print-quiz-id',
    path: '/print/quiz/:id',
    component: () => import('~/pages/print/quiz/_id.vue'),
    props: true,
    meta: {
      layout: 'blank',
    },
  },
  {
    name: 'print-reports-id-players-detailed',
    path: '/print/reports/:id/players-detailed',
    component: () => import('~/pages/print/reports/_id/players-detailed.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'print-reports-id-players',
    path: '/print/reports/:id/players',
    component: () => import('~/pages/print/reports/_id/players.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'print-reports-id-questions',
    path: '/print/reports/:id/questions',
    component: () => import('~/pages/print/reports/_id/questions.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'sales-organizations-editId-edit',
    path: '/sales/organizations/:editId/edit',
    component: () => import('~/pages/sales/organizations/_editId/edit.vue'),
    props: true,
  },
  {
    name: 'worksheet-slug-id',
    path: '/worksheet/:slug/:id',
    component: () => import('~/pages/worksheet/_slug/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-quizType-id-homework-settings',
    path: '/admin/:quizType/:id/homework/settings',
    component: () => import('~/pages/admin/_quizType/_id/homework/settings.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-quizType-id-settings',
    path: '/admin/:quizType/:id/settings',
    component: () => import('~/pages/admin/_quizType/_id/settings/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-quizType-homework-id',
    path: '/admin/:quizType/homework/:id',
    component: () => import('~/pages/admin/_quizType/homework/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-quizType-paper_mode-id',
    path: '/admin/:quizType/paper_mode/:id',
    component: () => import('~/pages/admin/_quizType/paper_mode/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-quizType-start_new-id',
    path: '/admin/:quizType/start_new/:id',
    component: () => import('~/pages/admin/_quizType/start_new/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-quizType-tp-id',
    path: '/admin/:quizType/tp/:id',
    component: () => import('~/pages/admin/_quizType/tp/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-classes-classId-studentreport-studentId',
    path: '/admin/classes/:classId/studentreport/:studentId?',
    component: () => import('~/pages/admin/classes/_classId/studentreport/_studentId.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-courses-report-sessionId',
    path: '/admin/courses/report/:sessionId',
    component: () => import('~/pages/admin/courses/report/_sessionId/index.vue'),
    props: true,
  },
  {
    name: 'admin-groups-groupId-studentreport-studentId',
    path: '/admin/groups/:groupId/studentreport/:studentId?',
    component: () => import('~/pages/admin/groups/_groupId/studentreport/_studentId.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-reports-gameid-selectedTabId-playerAttemptId',
    path: '/admin/reports/:gameid/:selectedTabId/:playerAttemptId',
    component: () => import('~/pages/admin/reports/_gameid/_selectedTabId/_playerAttemptId.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-reports-gameid-selectedTabId',
    path: '/admin/reports/:gameid/:selectedTabId',
    component: () => import('~/pages/admin/reports/_gameid/_selectedTabId/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'admin-section-sectionName-id',
    path: '/admin/section/:sectionName/:id',
    component: () => import('~/pages/admin/section/_sectionName/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'print-reports-id-player-playerId',
    path: '/print/reports/:id/player/:playerId?',
    component: () => import('~/pages/print/reports/_id/player/_playerId.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'snd-dashboard-school-schoolId',
    path: '/snd/dashboard/school/:schoolId',
    component: () => import('~/pages/snd/dashboard/school/_schoolId/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth, sndDashboardAccess',
    },
  },
  {
    name: 'admin-courses-report-sessionId-selectedTabId',
    path: '/admin/courses/report/:sessionId/:selectedTabId',
    component: () => import('~/pages/admin/courses/report/_sessionId/_selectedTabId/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-quiz-quizId-question-questionId-edit',
    path: '/admin/quiz/:quizId/question/:questionId/edit',
    component: () => import('~/pages/admin/quiz/_quizId/question/_questionId/edit.vue'),
    props: true,
    meta: {
      layout: 'editorLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-standards-collection-standard-subject-grade-subGrade',
    path: '/admin/standards-collection/:standard/:subject/:grade/:subGrade',
    component: () => import('~/pages/admin/standards-collection/_standard/_subject/_grade/_subGrade.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'admin-standards-collection-standard-subject-grade',
    path: '/admin/standards-collection/:standard/:subject/:grade',
    component: () => import('~/pages/admin/standards-collection/_standard/_subject/_grade/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  {
    name: 'curriculum-country-curriculumName-subjectName-id-curriculumTopic',
    path: '/curriculum/:country/:curriculumName/:subjectName/:id/:curriculumTopic',
    component: () => import('~/pages/curriculum/_country/_curriculumName/_subjectName/_id/_curriculumTopic.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'curriculum-country-curriculumName-subjectName-id',
    path: '/curriculum/:country/:curriculumName/:subjectName/:id',
    component: () => import('~/pages/curriculum/_country/_curriculumName/_subjectName/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'snd-dashboard-school-schoolId-userType-id',
    path: '/snd/dashboard/school/:schoolId/:userType/:id?',
    component: () => import('~/pages/snd/dashboard/school/_schoolId/_userType/_id.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth, sndDashboardAccess',
    },
  },
  {
    name: 'sales-onboarding-organization-lms-admin-upsert-paidOrgId-subscriptionId-accountId',
    path: '/sales/onboarding/organization/lms-admin/:upsert/:paidOrgId/:subscriptionId/:accountId',
    component: () => import('~/pages/sales/onboarding/organization/lms-admin/_upsert/_paidOrgId/_subscriptionId/_accountId/index.vue'),
    props: true,
    meta: {
      layout: 'orgDashboard',
    },
  },
  {
    name: 'sales-onboarding-organization-new-subscription-subscription-details-accountId-subscriptionId-requestType',
    path: '/sales/onboarding/organization/new-subscription/subscription-details/:accountId/:subscriptionId/:requestType',
    component: () => import('~/pages/sales/onboarding/organization/new-subscription/subscription-details/_accountId/_subscriptionId/_requestType/index.vue'),
    props: true,
    meta: {
      layout: 'orgDashboard',
    },
  },
  {
    name: 'sales-onboarding-organization-new-subscription-hierarchy-upsert-accountId-subscriptionId-requestType',
    path: '/sales/onboarding/organization/new-subscription/hierarchy/:upsert/:accountId/:subscriptionId/:requestType',
    component: () => import('~/pages/sales/onboarding/organization/new-subscription/hierarchy/_upsert/_accountId/_subscriptionId/_requestType/index.vue'),
    props: true,
    meta: {
      layout: 'orgDashboard',
    },
  },
  {
    name: 'sales-onboarding-organization-new-subscription-org-details-upsert-accountId-subscriptionId-requestType',
    path: '/sales/onboarding/organization/new-subscription/org-details/:upsert/:accountId/:subscriptionId/:requestType',
    component: () => import('~/pages/sales/onboarding/organization/new-subscription/org-details/_upsert/_accountId/_subscriptionId/_requestType/index.vue'),
    props: true,
    meta: {
      layout: 'orgDashboard',
    },
  },
  // Org Dashboard
  {
    name: 'org-members-dashboard',
    path: '/admin/organization/dashboard',
    component: () => import('~/pages/organization/dashboard/index.vue'),
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
    props: (route) => {
      return {
        pageNumber: route.query.page ? +route.query.page : 1,
      };
    },
  },

  // My Schools Page
  {
    name: 'my-school-dashboard',
    path: '/admin/my-school/:schoolId',
    component: () => import('~/pages/my-school/index.vue'),
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
    props: (route) => {
      return {
        pageNumber: route.query.page ? +route.query.page : 1,
      };
    },
  },
  {
    path: '/integrations/import-lms/',
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth',
    },
    children: [
      {
        path: '',
        component: () => import('~/pages/integrations/import-lms/index.vue'),
        props: true,
      },
      {
        name: 'integrations-import-lms-canvas',
        path: 'canvas',
        component: () => import('~/pages/integrations/import-lms/canvas.vue'),
        props: true,
      },
      {
        name: 'integrations-import-lms-schoology',
        path: 'schoology',
        component: () => import('~/pages/integrations/import-lms/schoology.vue'),
        props: true,
      },
    ],
  },
  {
    name: 'activity',
    path: '/admin/activity',
    component: () => import('~/pages/admin/activity/Activity.vue'),
    props: true,
    children: [
      {
        name: 'classic',
        path: 'classic/:activityId',
        props: true,
        children: [
          {
            name: 'classic-default',
            path: '',
            component: () => import('~/pages/admin/activity/pages/ClassicLiveDashboard/ClassicLiveDashboard.vue'),
            props: true,
          },
        ],
      },
    ],
  },
  {
    name: 'admin-live-dash-id',
    path: '/admin/live-dash/:id',
    component: () => import('~/pages/admin/activity/pages/ClassicLiveDashboard/ClassicLiveDashboard.vue'),
    props: true,
  },
  {
    name: 'new-year-trivia',
    path: '/new-year-trivia',
    component: () => import('~/pages/new-year-trivia/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'school-page',
    path: '/school',
    component: () => import('~/pages/school/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'school-page',
    path: '/school/:id?',
    component: () => import('~/pages/school/_id/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
    },
  },
  {
    name: 'school-page-manage',
    path: '/school/:id/manage',
    component: () => import('~/pages/school/_id/manage.vue'),
    props: true,
    meta: {
      layout: 'default',
      middleware: 'auth, ffs',
    },
  },
  {
    name: 'school-page-library',
    path: '/school/:id/library',
    component: () => import('~/pages/school/_id/library.vue'),
    props: true,
    meta: {
      layout: 'default',
      middleware: 'auth, ffs',
    },
  },
  {
    name: 'school-page-invite',
    path: '/school/invite',
    component: () => import('~/pages/school/_id/invite.vue'),
    props: true,
    meta: {
      layout: 'default',
    },
  },
  {
    name: 'school-invite-page',
    path: '/school/invite/:inviteId',
    component: () => import('~/pages/school/invite/_inviteId.vue'),
    props: true,
  },
  {
    name: 'assessment-listing',
    path: '/admin/assessments',
    component: () => import('~/CommonAssessment/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth, nonCorporate',
    },
  },
  // TODO: Sandip - check if all common assessment routes can be clubed
  {
    name: 'assessment-details',
    path: '/admin/assessments/:id',
    component: () => import('~/CommonAssessment/Sessions/index.vue'),
    props: true,
    meta: {
      layout: 'globalLayout',
      middleware: 'auth, nonCorporate',
    },
  },
  {
    name: 'assessment-report-dashboard',
    path: '/admin/assessments/:id/report',
    component: () => import('~/CommonAssessment/Report/index.vue'),
    props: true,
    meta: {
      // layout: 'globalLayout',
      middleware: 'auth',
    },
  },
  // TODO: Sandip - route can be changed to `/admin/assessments/:assessmentId/games/:gameId`
  {
    name: 'assessment-game-dashboard',
    path: '/admin/common-assessment/:id',
    component: () => import('~/pages/admin/common-assessment/_id/index.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'teacher-qudos',
    path: '/admin/qudos',
    component: () => import('~/components/Qudos/Dashboard.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'create-interactive-video',
    path: '/admin/interactive-video',
    component: () => import('~/components/InteractiveVideo/Create/index.vue'),
    props: (route) => {
      return {
        quizId: route.query.quizId,
        tab: route.query.tab,
      };
    },
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'create-passage',
    path: '/admin/passage',
    component: () => import('~/components/Passage/Create/index.vue'),
    props: (route) => {
      return {
        quizId: route.query.quizId,
        tab: route.query.tab,
      };
    },
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'internal-skills-campaign',
    path: '/internal/skills/:campaignId',
    component: () => import('~/internal/skill-campaigns/Campaign.vue'),
    props: true,
    meta: {
      middleware: 'auth',
    },
  },
  {
    name: 'standard-tagging',
    path: '/admin/standard-tagging/:gameId',
    component: () => import('~/standard-tagging/index.vue'),
    props: true,
    meta: {
      middleware: 'auth',
      layout: 'blank',
    },
  },
  {
    path: '/admin/gc-addon',
    name: 'gc-addon',
    props: true,
    component: defineAsyncComponent(() => import('./index.vue')),
    meta: {
      middleware: 'gcAddon',
    },
    children: [
      {
        path: 'intro',
        name: 'gc-addon-intro',
        props: true,
        component: defineAsyncComponent(() => import('~/GCAddon/Intro.vue')),
      },
      {
        path: 'reports/:gameId/players',
        name: 'gc-addon-player-report',
        props: true,
        component: defineAsyncComponent(() => import('~/GCAddon/Reports/index.vue')),
      },
      {
        path: 'activity/:activityId',
        name: 'gc-addon-activity',
        props: true,
        component: defineAsyncComponent(() => import('~/GCAddon/Activity/index.vue')),
      },
      {
        path: 'login',
        name: 'gc-addon-login',
        props: true,
        component: defineAsyncComponent(() => import('~/GCAddon/auth/login.vue')),
      },
      {
        path: 'auth/confirmation',
        name: 'gc-addon-confirmation',
        props: true,
        component: defineAsyncComponent(() => import('~/GCAddon/auth/confirmation.vue')),
      },
    ],
  },
  {
    path: '/signup',
    name: 'signup2',
    props: true,
    component: defineAsyncComponent(() => import('./pages/index.vue')),
    children: [
      {
        path: 'explore',
        name: 'signup-explore',
        props: true,
        component: defineAsyncComponent(() => import('./pages/explore.vue')),
      },
      {
        path: 'qdp',
        name: 'signup-qdp',
        props: true,
        component: defineAsyncComponent(() => import('./pages/qdp.vue')),
      },
    ],
  },
  {
    path: '/admin/dashboards/lesson/:id',
    name: 'lesson-dashboard',
    props: true,
    component: defineAsyncComponent(() => import('./index.vue')),
  },
  {
    path: '/lti',
    name: 'lti',
    props: true,
    children: [
      {
        path: 'auth/confirmation',
        name: 'lti-auth-confirmation',
        props: true,
        component: defineAsyncComponent(() => import('~/LTI/components/auth/Confirmation.vue')),
      },
      {
        path: 'auth/pending',
        name: 'lti-auth-pending',
        props: true,
        component: defineAsyncComponent(() => import('~/LTI/components/auth/Pending.vue')),
      },
      {
        name: 'lti-onboarding',
        path: ':platform/onboarding',
        component: () => defineAsyncComponent(() => import('~/LTI/components/onboarding.vue')),
        props: true,
        meta: {
          layout: 'default',
        },
      },
      {
        name: 'lti-explore',
        path: 'explore',
        component: () => defineAsyncComponent(() => import('~/LTI/components/Explore.vue')),
        meta: {
          layout: 'globalLayout',
        },
      },
    ],
  },
];

function generateRoutes(routes, parentPath = '') {
  let allRoutes = [];

  routes.forEach(route => {
    const fullPath = `${parentPath}${route.path}`;
    allRoutes.push(fullPath);

    if (route.children) {
      const childRoutes = generateRoutes(route.children, `${fullPath}/`);
      allRoutes = allRoutes.concat(childRoutes);
    }
  });

  return allRoutes;
}

async function main() {
  const allRoutes = generateRoutes(ROUTE_LIST);
  await writeJSONFile(WRITE_PATH, Array.from(allRoutes));
}

main().then(res => {
    console.log('done');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});