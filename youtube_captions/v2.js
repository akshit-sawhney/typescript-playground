const { google } = require('googleapis');

// Initialize YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyAGPBDMZg1vrCak8OyfzChWEZKC9s0oc4I', // Replace with your actual API key
});

async function getCaptions(videoId) {
  try {
    const captionsResponse = await youtube.captions.list({
      part: ['snippet', 'id'],
      videoId: videoId,
    });

    const captions = captionsResponse.data.items.map(item => {
      return {
        id: item.id,
        language: item.snippet.language,
        name: item.snippet.name,
      };
    });

    return captions;
  } catch (error) {
    console.error('Error retrieving captions:', error.message);
    return null;
  }
}

// Example usage
const videoId = 'U_LlX4t0A9I'; // Replace with actual video ID
getCaptions(videoId)
  .then(captions => {
    console.log('Captions:', captions);
  })
  .catch(err => {
    console.error('Error:', err);
  });


  // artillery run load_test.yml