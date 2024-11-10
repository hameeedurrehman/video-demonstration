"use client";
import { useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null); // Reference to the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to control play/pause

  // Play/Pause button handler
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip forward 10 seconds
  const skipForward = () => {
    videoRef.current.currentTime += 10;
  };

  // Skip backward 10 seconds
  const skipBackward = () => {
    videoRef.current.currentTime -= 10;
  };

  return (
    <div>
      {/* Video element */}
      <video ref={videoRef} width="600" controls={false} preload="auto">
        <source src="your-video-url.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Control buttons */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={skipBackward}>⏪ -10 sec</button>
        <button onClick={togglePlayPause}>
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>
        <button onClick={skipForward}>+10 sec ⏩</button>
      </div>
    </div>
  );
}
