import { Play, Square, Volume1 } from "lucide-react";
import type { SoundItem } from "@/data/sounds";

interface SoundCardProps {
  sound: SoundItem;
  cardClass: string;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onFadeOut: () => void;
  onDragStart: (e: React.DragEvent) => void;
}

export function SoundCard({
  sound,
  cardClass,
  isPlaying,
  onPlay,
  onStop,
  onFadeOut,
  onDragStart,
}: SoundCardProps) {
  return (
    <div
      className={`sound-card ${cardClass} ${isPlaying ? "playing" : ""} select-none`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="text-3xl text-center mb-2">{sound.emoji}</div>
      <div className="text-sm font-medium text-center mb-3 font-body text-foreground/80">
        {sound.name}
      </div>
      <div className="flex justify-center gap-1.5">
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(); }}
          className="p-1.5 rounded-full bg-card/60 hover:bg-card/90 transition-colors"
          title="재생"
        >
          <Play className="w-3.5 h-3.5 text-foreground/70" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onFadeOut(); }}
          className="p-1.5 rounded-full bg-card/60 hover:bg-card/90 transition-colors"
          title="페이드 아웃"
        >
          <Volume1 className="w-3.5 h-3.5 text-foreground/70" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onStop(); }}
          className="p-1.5 rounded-full bg-card/60 hover:bg-card/90 transition-colors"
          title="정지"
        >
          <Square className="w-3.5 h-3.5 text-foreground/70" />
        </button>
      </div>
    </div>
  );
}
