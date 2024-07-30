const { writeJSONFile } = require('./helpers/writeFile');
const WRITE_PATH = 'casa/mergePublicELBLogs/files/mergedPracticeRoutes.json';

const TEACHER_BASE_ROUTE = '/mathverse/teacher';
const TEACHER_ROUTES = {
    BASE: TEACHER_BASE_ROUTE,
    SKILLS: `${TEACHER_BASE_ROUTE}/skills`,
    REPORTS: `${TEACHER_BASE_ROUTE}/reports`,
    CLASSES: `${TEACHER_BASE_ROUTE}/classes`,
    LOGIN: `/login?q=${encodeURIComponent('/mathverse/teacher')}`,
    LOGIN_SKILL: '/login?q=/mathverse/teacher/skills',
    HELP_CENTER: 'https://support.quizizz.com/hc/en-us/articles/27844755706905-Introducing-MathVerse',
    PREVIEW_GAME_PLAY: 'https://quizizz.com/mathverse/student/game',
  };

const ROUTE_LIST = [
    // Student routes
    {
      path: '/mathverse/student',
      components: {
        default: () => import('@/views/Student.vue'),
      },
      children: [
        {
          path: '',
          name: 'student-dashboard',
          component: () => import('@/views/StudentDashboard.vue'),
        },
        {
          path: 'instruction/:instructionId',
          component: () => import('@/views/InstructionLobby.vue'),
        },
        {
          path: 'game/:gameId',
          component: () => import('@/views/GameLobby.vue'),
        },
        {
          path: 'game/:gameId/player/:playerId',
          component: () => import('@/views/GameLobby.vue'),
        },
      ],
    },

    // Teacher Paths
    {
      path: TEACHER_ROUTES.BASE,
      components: {
        default: () => import('../views/Teacher.vue'),
        TeacherHeader: () => import('@/components/Teacher/Header/Header.vue'),
      },
      children: [
        {
          path: '',
          name: 'teacherLandingPage',
          component: () => import('../views/TeacherLandingPage.vue'),
        },
        {
          path: 'skills',
          name: 'teacherSkillDiscovery',
          component: () => import('../views/TeacherSkillDiscovery.vue'),
        },
        {
          path: 'skills/:skillId',
          name: 'teacherSkillDetails',
          component: () => import('../views/TeacherSkillDetails.vue'),
        },
        {
          path: 'reports',
          component: () => import('../views/TeacherClassReport.vue'),
        },
        {
          path: 'classes',
          component: () => import('../views/TeacherClasses.vue'),
        },
        {
          path: 'reports/:classId',
          name: 'teacherClassReport',
          component: () => import('../views/TeacherClassReport.vue'),
        },
        {
          path: 'reports/classes/:classId/skill/:skillId',
          name: 'teacherSkillReport',
          component: () => import('../views/TeacherSkillReport.vue'),
        },
        {
          path: 'reports/classes/:classId/skill/:skillId/shared',
          name: 'teacherSharedSkillReport',
          component: () => import('../views/TeacherSkillReport.vue'),
        },
      ],
    },

    /** Use this /login path only when running server locally. On dev/prod login route already exists */
    // {
    //   path: '/login',
    //   name: 'loginPage',
    //   component: () => import('@/components/Common/Login.vue'),
    // },

    // 404 - Default route
    {
      path: '/:catchAll(.*)',
      component: () => import('@/components/Common/NotFound.vue'),
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