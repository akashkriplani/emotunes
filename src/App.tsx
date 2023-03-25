import { FC, useState } from 'react';
import FaceDetect from './components/FaceDetect';
import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import { Mood, searchSongsQuery } from './utils';
import { youtube } from './apis';

const App: FC = () => {
  const [loader, setLoader] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Call YouTube API to load music recommendations
  const handleCanvasClick = (mood: Mood) => {
    setLoader(true);
    const query = searchSongsQuery(mood);
    setSearchQuery(query);
    callYoutube(query);
  };

  const callYoutube = async (term: string) => {
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    });
    setLoader(false);
    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  return (
    <div>
      <Header />
      <div className={`flex justify-start flex-row ${videos.length > 0 ? 'items-start' : 'items-center'}`}>
        <FaceDetect onCanvasClick={(mood: Mood) => handleCanvasClick(mood)} />
        {loader && <Loading title="Loading tracks..." />}
        {videos.length > 0 && (
          <div className="flex flex-col">
            {searchQuery && videos && videos.length > 0 && (
              <div className="container">
                <div className="mb-4">
                  <VideoDetail video={selectedVideo} />
                </div>
                <div className="px-2 py-2">
                  <VideoList onVideoSelect={setSelectedVideo} videos={videos} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
