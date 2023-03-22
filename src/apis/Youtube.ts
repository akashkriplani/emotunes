import axios from 'axios';

// ADD your API Key from https://console.developers.google.com to use the youtube API
// For development, create a .env file at the root of your project and add your key there
const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 10,
    type: 'video',
    key: KEY
  }
});

export default youtube;
