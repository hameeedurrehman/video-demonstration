"use client";
import { useRef, useState, useEffect } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Tracks video progress (0 to 100)
  const [duration, setDuration] = useState(0); // Total duration of video

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress as video plays
  useEffect(() => {
    const videoElement = videoRef.current;

    // Update duration when video loads
    const handleLoadedMetadata = () => setDuration(videoElement.duration);

    // Update progress bar
    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      setProgress((currentTime / duration) * 100);
    };

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [duration]);

  // Click on timeline to seek
  const handleTimelineClick = (event) => {
    const timelineWidth = event.target.clientWidth;
    const clickX = event.nativeEvent.offsetX;
    const newTime = (clickX / timelineWidth) * duration;
    videoRef.current.currentTime = newTime;
  };

  // Skip forward and backward 10 seconds
  const skipForward = () => (videoRef.current.currentTime += 10);
  const skipBackward = () => (videoRef.current.currentTime -= 10);

  return (
    <div style={styles.container}>
      <video ref={videoRef} style={styles.video} preload="auto" controls>
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom timeline */}
      <div style={styles.timelineContainer} onClick={handleTimelineClick}>
        <div style={{ ...styles.timelineProgress, width: `${progress}%` }} />
      </div>

      {/* Control buttons */}
      <div style={styles.controls}>
        <button onClick={skipBackward} style={styles.button}>
          ⏪ -10 sec
        </button>
        <button onClick={togglePlayPause} style={styles.button}>
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>
        <button onClick={skipForward} style={styles.button}>
          +10 sec ⏩
        </button>
      </div>
    </div>
  );
}

// Styling for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "640px",
    margin: "auto",
  },
  video: {
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  timelineContainer: {
    width: "100%",
    height: "8px",
    backgroundColor: "#ddd",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "10px",
    cursor: "pointer",
  },
  timelineProgress: {
    height: "100%",
    backgroundColor: "#007bff",
  },
  controls: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
