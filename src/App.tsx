import React, { useState, useRef } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);
function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isTimelineStarted, setIsTimelineStarted] = useState(false);

  return (
    <>
      <video ref={videoRef}
          src="/background.mp4"
          playsInline={true} webkit-playsinline="true"
          preload="auto"
          muted={true}
          className="video-background"
          onLoadedMetadata={() => {
            if (videoRef.current && false === isTimelineStarted) {
              const tl = gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                  trigger: "#root",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true
                }
              });

              tl.fromTo(videoRef.current, {currentTime: 0}, {currentTime: videoRef.current.duration || 1});
              setIsTimelineStarted(true);
            }
          }}
      />    
      <div id="container" className="container mx-auto" onTouchStart={() => {
          if (videoRef.current && false === isStarted) {
            videoRef.current.play();
            videoRef.current.pause();
            setIsStarted(true);
          }
      }}>
        <h1 className="text-3xl font-bold underline">
          Vite + React
        </h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App
