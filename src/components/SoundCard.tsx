import { Play, Square, Volume1, Plus } from "lucide-react";
import type { SoundItem } from "@/data/sounds";
import { useLang } from "@/hooks/useLang";

interface SoundCardProps {
  sound: SoundItem;
  cardClass: string;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onFadeOut: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onAddToPlaylist?: () => void;
}

export function SoundCard({
  sound,
  cardClass,
  isPlaying,
  onPlay,
  onStop,
  onFadeOut,
  onDragStart,
  onAddToPlaylist,
}: SoundCardProps) {
  const { lang } = useLang();
  const label = lang === "en" ? sound.nameEn : sound.name;

  return (
    <div
      className={`sound-card ${cardClass} ${isPlaying ? "playing" : ""} select-none`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="text-2xl md:text-3xl text-center mb-1 md:mb-1.5">{sound.emoji}</div>
      <div className="text-[11px] md:text-[13px] font-semibold text-center mb-2 md:mb-3 text-foreground/85 leading-tight truncate">
        {label}
      </div>
      <div className="flex justify-center gap-0.5 md:gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(); }}
          className="p-1.5 md:p-2 rounded-xl bg-card/50 hover:bg-card/80 active:scale-95 transition-all touch-manipulation"
          title={lang === "en" ? "Play" : "재생"}
        >
          <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onFadeOut(); }}
          className="p-1.5 md:p-2 rounded-xl bg-card/50 hover:bg-card/80 active:scale-95 transition-all touch-manipulation"
          title={lang === "en" ? "Fade Out" : "페이드 아웃"}
        >
          <Volume1 className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onStop(); }}
          className="p-1.5 md:p-2 rounded-xl bg-card/50 hover:bg-card/80 active:scale-95 transition-all touch-manipulation"
          title={lang === "en" ? "Stop" : "정지"}
        >
          <Square className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60" />
        </button>
        {onAddToPlaylist && (
          <button
            onClick={(e) => { e.stopPropagation(); onAddToPlaylist(); }}
            className="p-1.5 md:p-2 rounded-xl bg-primary/30 hover:bg-primary/50 active:scale-95 transition-all touch-manipulation"
            title={lang === "en" ? "Add to Playlist" : "플레이리스트에 추가"}
          >
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60" />
          </button>
        )}
      </div>
    </div>
  );
}
