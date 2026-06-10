type VideoProps = {
  courseData: {
    video: {
      youtubeId: string;
      title: string;
    };
  };
};

export const Video = ({ courseData }: VideoProps) => {
  const data = courseData.video;

  return (
    <div className="video-container">
      <iframe
        className="youtube-embed"
        src={`https://www.youtube.com/embed/${data.youtubeId}`}
        title={data.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};
