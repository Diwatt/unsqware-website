import { gsap, ScrollTrigger } from "gsap/all";
console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector<HTMLMediaElement>(".video-background")!;
const src = video.currentSrc || video.src;
//console.log(video, src);

document.documentElement.addEventListener("touchstart", () => {
    video.play();
    video.pause();
}, { once: true });

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

video.addEventListener("loadedmetadata", () => {
    tl.fromTo(
        video,
        {
          currentTime: 0
        },
        {
          currentTime: video.duration || 1
        }
      );
}, { once: true });

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(() => {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        const blobURL = URL.createObjectURL(response);

        const t = video.currentTime;
        document.documentElement.addEventListener("touchstart", () => {
            video.play();
            video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);