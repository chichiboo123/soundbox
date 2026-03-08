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
      <div className="text-3xl text-center mb-1.5">{sound.emoji}</div>
      <div className="text-[13px] font-semibold text-center mb-3 text-foreground/85 leading-tight">
        {sound.name}
      </div>
      <div className="flex justify-center gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(); }}
          className="p-2 rounded-xl bg-card/50 hover:bg-card/80 active:scale-95 transition-all"
          title="재생"
        >
          <Play className="w-4 h-4 text-foreground/60" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onFadeOut(); }}
          className="p-2 rounded-xl bg-card/50 hover:bg-card/80 active:scale-95 transition-all"
          title="페이드 아웃"
        >
          <Volume1 className="w-4 h-4 text-foreground/60" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onStop(); }}
          className="p-2 rounded-xl bg-card/50 hover:bg-card/80 active:scale-95 transition-all"
          title="정지"
        >
          <Square className="w-4 h-4 text-foreground/60" />
        </button>
      </div>
    </div>
  );
}
