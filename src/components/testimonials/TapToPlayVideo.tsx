import { useEffect, useRef, useState } from "react";
import { Loader2, Play } from "lucide-react";

type YouTubePlayer = {
  playVideo: () => void;
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
};

type YouTubePlayerOptions = {
  videoId: string;
  width: string;
  height: string;
  playerVars: {
    autoplay: 0;
    controls: 1;
    playsinline: 1;
    rel: 0;
    origin: string;
  };
  events: {
    onReady: (event: { target: YouTubePlayer }) => void;
  };
};

type YouTubeApi = {
  Player: new (element: HTMLElement, options: YouTubePlayerOptions) => YouTubePlayer;
};

type YouTubeWindow = Window & {
  YT?: YouTubeApi;
  onYouTubeIframeAPIReady?: () => void;
};

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function loadYouTubeApi(): Promise<YouTubeApi> {
  const youtubeWindow = window as YouTubeWindow;
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousCallback = youtubeWindow.onYouTubeIframeAPIReady;
    youtubeWindow.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      if (youtubeWindow.YT?.Player) {
        resolve(youtubeWindow.YT);
      } else {
        reject(new Error("YouTube player API did not initialize."));
      }
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        youtubeApiPromise = null;
        reject(new Error("YouTube player API could not be loaded."));
      };
      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

type TapToPlayVideoProps = {
  videoId: string;
  thumbnailUrl: string;
  largeThumbnailUrl?: string;
};

export function TapToPlayVideo({
  videoId,
  thumbnailUrl,
  largeThumbnailUrl,
}: TapToPlayVideoProps) {
  const [shouldPreparePlayer, setShouldPreparePlayer] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playRequestedRef = useRef(false);

  // Paint the lightweight page first, then prepare the player behind the preview.
  useEffect(() => {
    const timer = window.setTimeout(() => setShouldPreparePlayer(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldPreparePlayer || !playerContainerRef.current) return;

    let cancelled = false;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !playerContainerRef.current) return;

        playerRef.current = new YT.Player(playerContainerRef.current, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            controls: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: ({ target }) => {
              playerRef.current = target;
              const iframe = target.getIframe();
              iframe.title = "Client video testimonial";
              iframe.className = "absolute inset-0 h-full w-full border-0";
              iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
              iframe.setAttribute("allowfullscreen", "");
              setIsPlayerReady(true);

              if (playRequestedRef.current) target.playVideo();
            },
          },
        });
      })
      .catch((error: unknown) => {
        console.error("Unable to prepare the testimonial video:", error);
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [shouldPreparePlayer, videoId]);

  const handlePlay = () => {
    playRequestedRef.current = true;

    // This synchronous call preserves the visitor's tap as the play gesture on mobile.
    if (isPlayerReady) playerRef.current?.playVideo();

    setShouldPreparePlayer(true);
    setIsVideoPlaying(true);
  };

  return (
    <>
      {shouldPreparePlayer && (
        <div
          aria-hidden={!isVideoPlaying}
          className={`absolute inset-0 transition-opacity ${
            isVideoPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div ref={playerContainerRef} className="h-full w-full" />
        </div>
      )}

      {!isVideoPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          onPointerDown={() => setShouldPreparePlayer(true)}
          onFocus={() => setShouldPreparePlayer(true)}
          className="group absolute inset-0 z-10 h-full w-full"
          aria-label="Play client testimonial video"
        >
          <img
            src={thumbnailUrl}
            srcSet={largeThumbnailUrl ? `${thumbnailUrl} 480w, ${largeThumbnailUrl} 1280w` : undefined}
            sizes="340px"
            width="480"
            height="360"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-background/10 transition-colors group-hover:bg-background/0" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform group-hover:scale-105">
              <Play className="ml-1 h-9 w-9 fill-current" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/85 px-4 py-2 text-sm font-semibold text-foreground">
            Tap to play
          </span>
        </button>
      )}

      {isVideoPlaying && !isPlayerReady && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-2 bg-background/70 text-sm font-medium text-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
          Starting video…
        </div>
      )}
    </>
  );
}
