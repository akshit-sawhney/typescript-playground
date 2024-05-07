// Define your API key
const apiKey = 'AIzaSyAGPBDMZg1vrCak8OyfzChWEZKC9s0oc4I';

// Define the video ID for which you want to retrieve captions
const videoId = 'QztFpzKsdeA';

// URL for the captions request
const captionsUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`;

// Fetch captions data
fetch(captionsUrl)
  .then(response => response.json())
  .then(data => {
    // Extract captions data from the response
    const captions = data.items;
    
    // Log captions data to console
    console.log(captions);
    
    // Process captions data as needed
    captions.forEach(caption => {
      console.log('Language:', caption.snippet.language);
      console.log('Name:', caption.snippet.name);
      console.log('ID:', caption.id);
    });
  })
  .catch(error => {
    console.error('Error fetching captions:', error);
  });
