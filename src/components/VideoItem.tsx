import './VideoItem.css';

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <div onClick={() => onVideoSelect(video)} className="flex items-center cursor-pointer item mb-4">
      <img className="img" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
      <div className="p-4">
        <div>{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
