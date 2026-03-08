import { useState } from "react";
import {
  Play,
  Square,
  Volume1,
  ChevronUp,
  ChevronDown,
  X,
  Trash2,
  ListMusic,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { allSoundsMap } from "@/data/sounds";
import { useLang } from "@/hooks/useLang";
import type { PlaylistItem } from "@/components/Playlist";

interface MobilePlaylistDrawerProps {
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

export function MobilePlaylistDrawer({
  items,
  onRemove,
  onMoveUp,
  onMoveDown,
  onClear,
  isPlaying,
  onPlay,
  onStop,
  onFadeOut,
}: MobilePlaylistDrawerProps) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform">
          <ListMusic className="w-6 h-6" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[11px] font-bold flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[75vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-base">
            🎬 {lang === "en" ? "Playlist" : "플레이리스트"}
            {items.length > 0 && (
              <span className="ml-2 text-sm text-muted-foreground font-normal">
                ({items.length})
              </span>
            )}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-10">
              {lang === "en"
                ? "Drag sound cards here 🎵"
                : "음향 카드를 여기로 드래그해 주세요 🎵"}
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item, index) => {
                const sound = allSoundsMap.get(item.soundName);
                if (!sound) return null;
                const playing = isPlaying(sound.file);
                const displayName = lang === "en" ? sound.nameEn : sound.name;
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl bg-card/60 backdrop-blur-sm px-3 py-2.5 flex items-center gap-2.5 transition-all ${
                      playing ? "ring-2 ring-coral bg-card/80" : ""
                    }`}
                  >
                    <span className="text-xl shrink-0">{sound.emoji}</span>
                    <span className="flex-1 text-sm font-medium truncate text-foreground/80">
                      {displayName}
                    </span>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => onPlay(sound.file)} className="p-2 rounded-lg hover:bg-primary/20 transition-colors active:scale-95">
                        <Play className="w-4 h-4 text-foreground/60" />
                      </button>
                      <button onClick={() => onFadeOut(sound.file)} className="p-2 rounded-lg hover:bg-primary/20 transition-colors active:scale-95">
                        <Volume1 className="w-4 h-4 text-foreground/60" />
                      </button>
                      <button onClick={() => onStop(sound.file)} className="p-2 rounded-lg hover:bg-primary/20 transition-colors active:scale-95">
                        <Square className="w-4 h-4 text-foreground/60" />
                      </button>
                      <button onClick={() => onMoveUp(index)} className="p-2 rounded-lg hover:bg-primary/20 transition-colors active:scale-95" disabled={index === 0}>
                        <ChevronUp className="w-4 h-4 text-foreground/60" />
                      </button>
                      <button onClick={() => onMoveDown(index)} className="p-2 rounded-lg hover:bg-primary/20 transition-colors active:scale-95" disabled={index === items.length - 1}>
                        <ChevronDown className="w-4 h-4 text-foreground/60" />
                      </button>
                      <button onClick={() => onRemove(item.id)} className="p-2 rounded-lg hover:bg-destructive/20 transition-colors active:scale-95">
                        <X className="w-4 h-4 text-foreground/60" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 pt-0">
            <button
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-destructive/15 hover:bg-destructive/25 text-sm font-medium text-foreground/65 transition-colors active:scale-[0.98]"
            >
              <Trash2 className="w-4 h-4" />
              {lang === "en" ? "Clear All" : "전체 비우기"}
            </button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
