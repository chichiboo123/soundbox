import { useState, useCallback } from "react";
import {
  Play,
  Square,
  Volume1,
  ChevronUp,
  ChevronDown,
  X,
  Trash2,
  PanelRightClose,
  PanelRightOpen,
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
      className={`playlist-panel border-l-2 border-primary/40 transition-all duration-300 flex flex-col ${
        collapsed ? "w-11" : "w-72 lg:w-80"
      } fixed right-0 top-0 h-full z-30 md:relative md:h-auto md:min-h-screen`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2.5 hover:bg-card/40 transition-colors self-start"
        title={collapsed ? "펼치기" : "접기"}
      >
        {collapsed ? (
          <PanelRightOpen className="w-4 h-4 text-foreground/50" />
        ) : (
          <PanelRightClose className="w-4 h-4 text-foreground/50" />
        )}
      </button>

      {!collapsed && (
        <>
          <div className="px-4 pb-3">
            <h3 className="text-base font-bold text-foreground/75 tracking-tight">
              🎬 플레이리스트
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              카드를 드래그하여 추가
            </p>
          </div>

          <div
            className={`flex-1 overflow-y-auto px-3 py-1 ${
              dragOver ? "bg-primary/15 ring-2 ring-primary/40 ring-inset rounded-lg mx-2" : ""
            }`}
          >
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground text-xs py-10 leading-relaxed">
                음향 카드를 여기로<br />드래그해 주세요 🎵
              </div>
            ) : (
              <div className="space-y-1.5">
                {items.map((item, index) => {
                  const sound = allSoundsMap.get(item.soundName);
                  if (!sound) return null;
                  const playing = isPlaying(sound.file);
                  return (
                    <div
                      key={item.id}
                      className={`animate-drop-in rounded-xl bg-card/60 backdrop-blur-sm px-2.5 py-2 flex items-center gap-2 transition-all ${
                        playing ? "ring-2 ring-coral bg-card/80" : ""
                      }`}
                    >
                      <span className="text-base shrink-0">{sound.emoji}</span>
                      <span className="flex-1 text-[12px] font-medium truncate text-foreground/80">
                        {sound.name}
                      </span>
                      <div className="flex gap-0.5 shrink-0">
                        <button onClick={() => onPlay(sound.file)} className="p-1 rounded-lg hover:bg-primary/20 transition-colors" title="재생">
                          <Play className="w-3 h-3 text-foreground/60" />
                        </button>
                        <button onClick={() => onFadeOut(sound.file)} className="p-1 rounded-lg hover:bg-primary/20 transition-colors" title="페이드아웃">
                          <Volume1 className="w-3 h-3 text-foreground/60" />
                        </button>
                        <button onClick={() => onStop(sound.file)} className="p-1 rounded-lg hover:bg-primary/20 transition-colors" title="정지">
                          <Square className="w-3 h-3 text-foreground/60" />
                        </button>
                        <button onClick={() => onMoveUp(index)} className="p-1 rounded-lg hover:bg-primary/20 transition-colors" disabled={index === 0} title="위로">
                          <ChevronUp className="w-3 h-3 text-foreground/60" />
                        </button>
                        <button onClick={() => onMoveDown(index)} className="p-1 rounded-lg hover:bg-primary/20 transition-colors" disabled={index === items.length - 1} title="아래로">
                          <ChevronDown className="w-3 h-3 text-foreground/60" />
                        </button>
                        <button onClick={() => onRemove(item.id)} className="p-1 rounded-lg hover:bg-destructive/20 transition-colors" title="삭제">
                          <X className="w-3 h-3 text-foreground/60" />
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
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-destructive/15 hover:bg-destructive/25 text-[13px] font-medium text-foreground/65 transition-colors"
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
