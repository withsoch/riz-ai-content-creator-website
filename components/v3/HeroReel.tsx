"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero reel.
 *
 * A creator page that leads with a static portrait is a business page wearing
 * different copy — the whole proposition is "I make things you watch", so the
 * hero should be something playing. This is `riz-reel.mp4` (2.7MB, the only
 * one of the seven small enough to sit above the fold; the next smallest is
 * 5.4MB and riz-reel-6 is 49MB).
 *
 * Muted + autoplay + playsInline is the only combination browsers will start
 * without a gesture, so sound is opt-in through the corner control. `poster`
 * covers the gap before the first frame decodes, and if the file fails
 * entirely the portrait underneath is what shows.
 *
 * The muting has to be applied imperatively. React sets `muted` as a DOM
 * property during commit rather than as an HTML attribute, and Chrome checks
 * the *attribute* when it decides whether an autoplaying video is allowed to
 * start — so the JSX `muted` alone leaves the element looking unmuted at
 * exactly the moment the autoplay policy is evaluated, and playback is
 * blocked silently (readyState 0, paused, no error). Setting it on the
 * element and calling play() ourselves is the standard workaround.
 */

const REEL = "/videos/riz-reel.mp4";
const POSTER = "/riz-photo-new.jpg";

export default function HeroReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {
      // Autoplay refused anyway (data-saver, low power mode). The poster
      // stays up, which is a perfectly good hero.
    });
  }, []);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    // Unmuting a video the browser autoplayed can require a fresh play() call.
    if (!v.muted) v.play().catch(() => {});
  }

  return (
    <div className="v3-reel">
      {failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={POSTER} alt="Rizwan Mahmood" />
      ) : (
        <video
          ref={videoRef}
          src={REEL}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Showreel"
          onError={() => setFailed(true)}
        />
      )}

      {!failed && (
        <button
          type="button"
          className="v3-reel-sound"
          onClick={toggleSound}
          aria-label={muted ? "Unmute the reel" : "Mute the reel"}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}

      <div className="v3-reel-tag">
        <strong>Rizwan Mahmood</strong>
        <span>Tallinn</span>
      </div>
    </div>
  );
}
