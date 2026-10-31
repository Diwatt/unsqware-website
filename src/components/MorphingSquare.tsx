import { useEffect, useMemo, useState } from "react";
import { SquareWarp } from "../services/SquareWarp";

// Vertical scroll position, updated on animation frames; no tracking at
// all under prefers-reduced-motion.
function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return y;
}

// The band's logo icon: a square that warps with scroll. The geometry
// lives in the SquareWarp service, this component only renders it.
export function MorphingSquare() {
  const y = useScrollY();
  const warp = useMemo(() => new SquareWarp(y), [y]);

  return (
    <svg
      className="logo__mark"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      aria-hidden="true"
      style={{ transform: `rotate(${warp.getRotationDeg().toFixed(2)}deg)` }}
    >
      <polygon className="logo__echo" points={warp.getEchoPoints()} />
      <polygon className="logo__main" points={warp.getMainPoints()} />
    </svg>
  );
}
