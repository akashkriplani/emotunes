const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`;

  return (
    <div>
      <div className="container pt-4">
        <iframe width="700" height="300" allowFullScreen src={videoSrc} title="video player" allow="autoplay" />
      </div>
      <div className="container">
        <h4 className="text-2xl font-bold">{video.snippet.title}</h4>
        <p className="text-xl">{video.snippet.channelTitle}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
