const { writeJSONFile } = require('./helpers/writeFile');
const WRITE_PATH = 'casa/mergePublicELBLogs/files/trimmedGameServiceRoutes.json'

const allowedRoutes = [
  'v4/proceedGame',

  'v3/rejoinGame',
  'v4/rejoinGame',
  'v5/rejoinGame',
  'v6/rejoinGame',

  'v3/getQuestions',
  'v4/getQuestions',

  'get-team-players',
  'getTeamPlayers',

  'getRank',

  'reactionUpdate',
  'raiseHand',

  'v4/checkRoom',
  'v5/checkRoom',

  'v5/join',

  'v4/checkAssignment',
  'v5/checkAssignment',

  /*** POWERUPS start ***/

  'awardPowerup',
  'awardPowerups',
  'archivePowerups',
  'replacePowerups',

  'destroyPowerupEffect',

  'v4/activatePowerup',

  /*** POWERUPS end ***/

  'playerUpdate',

  // Learner feedback
  'addLearnerFeedback',
  'editLearnerFeedback',
  'getLearnerFeedback',

  'playerGameOver',
  'v2/playerGameOver',

  'v2/solo-join',
  'v2/soloJoin',
  'v4/soloJoin',

  'v1/contestJoin',

  'v4/soloProceed',

  'v1/contestProceed',

  'v1/proceedOfflineGame',

  'v2/solo-end',
  'v2/soloEnd',

  'v1/contestEnd',

  'v2/solo-update-metadata',
  'v2/soloUpdateMetadata',

  'v2/update-player-metadata',
  'v2/updatePlayerMetadata',

  'v2/update-response',
  'v2/updateResponse',

  'update-subscription',
  'updateSubscription',

  'v2/demo-join',
  'v2/demoJoin',

  'v2/demo-proceed',
  'v2/demoProceed',

  'v2/demo-player-over',
  'v2/demoPlayerOver',

  'syncPlayerResponses',

  'move-async',
  'moveAsync',

  'testing',
  'add-paid-org-id',

  'skipQuestion',
  'pauseGame',

  'createTestGameActivity',

  'updateBreakRoom',
  'setMasteryPeakTheme',

  'updatePlayerObstacle',
  'getMinimalMysticPeakLeaderBoard',

  'v2/report-game',
  'v2/report-responses',
  'v2/report-questions-list',

  'process-scheduled-game',
  'updatePathFinder',

  'changeHost',
  'proceedHostGame',

  'skipManyQuestions',
  'player-summary',
  'teacherPowerup',
  'duelDecision',

  // P2P game leaderboard
  'getP2PGameLeaderboard',
  'setP2PPlayerScore',

  // player avatar
  // TODO(shradhan): deprecate this once user avatar is out
  'getAllAvatarsInGame',
  'getAvatarForPlayer',
  'setAvatarForPlayer',
  'getAvatarInventory',

  // user avatar
  'updateAvatar',

  // student AI
  'getHint',
  'get-answer-explanation',

  // common assessment
  'v3/undoPlayerGameOver',

  // Qudos
  'addQudo',
  'getQudos',
  'getQudoCount',
  'deleteQudo',

  'fetchPlayers',
];

async function main() {
  const finalJSON = [];
  for (const route of allowedRoutes) {
    finalJSON.push({
      path: route,
      methods: {
        post: true,
      }
    })
  }
  await writeJSONFile(WRITE_PATH, Array.from(finalJSON));
}

main().then(res => {
  console.log('done: ');
  process.exit(0);
}).catch(err => {
  console.log('not done: ', err);
  process.exit(1);
});