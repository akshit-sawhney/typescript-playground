// import { getCaptions, getLanguages } from '@os-team/youtube-captions';
const { getCaptions, getLanguages } = require('@os-team/youtube-captions');

async function main() {
    const youtubeId = 'R7p-nPg8t_g';
const languages = getLanguages(youtubeId); // ['en', 'de', 'pl', 'pt', 'es']
const captions = await getCaptions(youtubeId, 'en'); // [{ start: 0, end: 1000, text: 'subtitle' }]


console.log('here we are: ', languages)
console.log('here we are: ', captions)
}

main().then(res => console.log('done')).catch(err => console.error(err));
