const { writeJSONFile } = require('./helpers/writeFile');
const WRITE_PATH = 'casa/mergePublicELBLogs/files/mergedJoinRoutes.json'

const PageNames = {
  get: function () {
    // Do nothing, just return the object
  }
}

const ActivitySubRouteNames = {
  CREATED: 'created',
  RUNNING: 'running',
  COMPLETED: 'completed',
};

const ROUTE_LIST = [
  {
    path: '/join',
    children: [
      {
        path: '',
        children: [
          {
            path: '',
          },
          {
            path: 'dashboard',
          },
          {
            path: 'search/:query?',
          },
          {
            path: 'game-code',
          },
          {
            path: 'activity',
            children: [
              {
                path: ActivitySubRouteNames.RUNNING,
              },
              {
                path: ActivitySubRouteNames.CREATED,
              },
              {
                path: ActivitySubRouteNames.COMPLETED,
              },
            ],
          },
          {
            path: 'settings',
          },
          {
            path: 'topic/:topicId/:topicSlug',
          },
          {
            path: 'event-quizzes',
          },
          {
            path: 'class',
          },
          {
            path: 'groups',
          },
          {
            path: 'course/:courseSessionId',
          },
        ],
      },
      {
        path: 'quiz/:quizId?',
        children: [
          {
            path: 'start',
          },
          {
            path: 'challenge/:roomHash',
          },
        ],
      },
      {
        path: 'pre-game',
        children: [
          {
            path: 'running/:preGameRunningComposite/start',
          },
        ],
      },
      {
        path: 'game/:gameComposite', // If any changes made here then also make them in func `getWebGameUrl` in file core/URLs.js
      },
      {
        path: 'avatar-shop',
      },
    ],
  },
  {
    path: '/embed/quiz/:quizId',
    children: [
      {
        path: '',
      }],
  },
  {
    path: '/:pathMatch(.*)*',
  },
];

function generateRoutes(routes, parentPath = '') {
  let allRoutes = [];

  routes.forEach(route => {
    const fullPath = `${parentPath}${route.path}`.replace(/\/\//g, '/');
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
  const uniqueRoutes = new Set(allRoutes);
  await writeJSONFile(WRITE_PATH, Array.from(uniqueRoutes));
}

main().then(res => {
  console.log('done');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});