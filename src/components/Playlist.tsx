import { useState, useEffect, useCallback } from "react";
import {
  Play,
  Square,
  Volume1,
  ChevronUp,
  ChevronDown,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { allSoundsMap } from "@/data/sounds";

export interface PlaylistItem {
  id: string;
  soundName: string;
}

interface PlaylistProps {
  items: PlaylistItem[];
  onRemove: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onClear: () => void;
  onDrop: (e: React.DragEvent) => void;
  isPlaying: (file: string) => boolean;
  onPlay: (file: string) => void;
  onStop: (file: string) => void;
  onFadeOut: (file: string) => void;
}

export function Playlist({
  items,
  onRemove,
  onMoveUp,
  onMoveDown,
  onClear,
  onDrop,
  isPlaying,
  onPlay,
  onStop,
  onFadeOut,
}: PlaylistProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      onDrop(e);
    },
    [onDrop]
  );

  return (
    <aside
      className={`playlist-panel border-l-4 border-primary transition-all duration-300 flex flex-col ${
        collapsed ? "w-12" : "w-80"
      } fixed right-0 top-0 h-full z-30 md:relative md:h-auto md:min-h-screen`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 hover:bg-card/40 transition-colors self-start"
        title={collapsed ? "펼치기" : "접기"}
      >
        {collapsed ? (
          <ChevronLeft className="w-5 h-5 text-foreground/60" />
        ) : (
          <ChevronRight className="w-5 h-5 text-foreground/60" />
        )}
      </button>

      {!collapsed && (
        <>
          <div className="px-4 pb-2">
            <h3 className="text-xl font-display font-bold text-foreground/80">
              🎬 플레이리스트
            </h3>
          </div>

          <div
            className={`flex-1 overflow-y-auto px-3 py-2 ${
              dragOver ? "bg-primary/20 ring-2 ring-primary ring-inset" : ""
            }`}
          >
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-8">
                음향 카드를 여기로<br />드래그해 주세요 🎵
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((item, index) => {
                  const sound = allSoundsMap.get(item.soundName);
                  if (!sound) return null;
                  const playing = isPlaying(sound.file);
                  return (
                    <div
                      key={item.id}
                      className={`animate-drop-in rounded-lg bg-card/70 p-2 flex items-center gap-2 ${
                        playing ? "ring-2 ring-coral" : ""
                      }`}
                    >
                      <span className="text-lg">{sound.emoji}</span>
                      <span className="flex-1 text-xs font-medium truncate">
                        {sound.name}
                      </span>
                      <div className="flex gap-0.5">
                        <button
                          onClick={() => onPlay(sound.file)}
                          className="p-1 rounded hover:bg-primary/20"
                        >
                          <Play className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onFadeOut(sound.file)}
                          className="p-1 rounded hover:bg-primary/20"
                        >
                          <Volume1 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onStop(sound.file)}
                          className="p-1 rounded hover:bg-primary/20"
                        >
                          <Square className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onMoveUp(index)}
                          className="p-1 rounded hover:bg-primary/20"
                          disabled={index === 0}
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onMoveDown(index)}
                          className="p-1 rounded hover:bg-primary/20"
                          disabled={index === items.length - 1}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-1 rounded hover:bg-destructive/20"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-3">
              <button
                onClick={onClear}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-sm font-medium text-foreground/70 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                전체 비우기
              </button>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
