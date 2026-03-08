import { useState, useCallback, useEffect } from "react";
import { categories } from "@/data/sounds";
import { CategorySection } from "@/components/CategorySection";
import { Playlist, type PlaylistItem } from "@/components/Playlist";
import { MobilePlaylistDrawer } from "@/components/MobilePlaylistDrawer";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { LangProvider, useLang } from "@/hooks/useLang";
import type { Lang } from "@/hooks/useLang";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const STORAGE_KEY = "soundbox-playlist";

function loadPlaylist(): PlaylistItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function SoundBoxApp() {
  const { lang, setLang } = useLang();
  const { play, stop, fadeOut, isPlaying } = useAudioPlayer();
  const [playlist, setPlaylist] = useState<PlaylistItem[]>(loadPlaylist);
  const isMobile = useIsMobile();

  const LANGS: { key: Lang; label: string }[] = [
    { key: "ko", label: "한국어" },
    { key: "en", label: "EN" },
    { key: "ja", label: "日本語" },
  ];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
  }, [playlist]);

  const handleDragStart = useCallback((e: React.DragEvent, soundName: string) => {
    e.dataTransfer.setData("soundName", soundName);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    const soundName = e.dataTransfer.getData("soundName");
    if (!soundName) return;
    setPlaylist((prev) => [...prev, { id: crypto.randomUUID(), soundName }]);
  }, []);

  const addToPlaylist = useCallback((soundName: string) => {
    setPlaylist((prev) => [...prev, { id: crypto.randomUUID(), soundName }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setPlaylist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const moveUp = useCallback((index: number) => {
    if (index === 0) return;
    setPlaylist((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const moveDown = useCallback((index: number) => {
    setPlaylist((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  const clearPlaylist = useCallback(() => setPlaylist([]), []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="header-gradient py-6 md:py-8 px-4 md:px-6 text-center relative">
          <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center bg-card/50 rounded-xl overflow-hidden text-[13px] font-medium">
            {LANGS.map((l) => (
              <button
                key={l.key}
                onClick={() => setLang(l.key)}
                className={`px-3 py-1.5 transition-all ${lang === l.key ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:bg-card/80"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl text-foreground/90 tracking-tight" style={{ fontFamily: '"Black Han Sans", sans-serif' }}>
            🎵 {lang === "en" ? "Sound Box" : lang === "ja" ? "サウンドボックス" : "여기 있어 효과음"}
          </h1>
        </header>

        {/* Sound categories */}
        <main className="flex-1 px-3 md:px-8 py-6 md:py-8 max-w-6xl mx-auto w-full pb-24 md:pb-8">
          {categories.map((cat) => (
            <CategorySection
              key={cat.key}
              category={cat}
              isPlaying={isPlaying}
              onPlay={play}
              onStop={stop}
              onFadeOut={fadeOut}
              onDragStart={handleDragStart}
              onAddToPlaylist={isMobile ? addToPlaylist : undefined}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="py-5 text-center">
          <a
            href="https://litt.ly/chichiboo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted-foreground hover:text-foreground/70 transition-colors"
          >
            created by. 교육뮤지컬 꿈꾸는 치수쌤
          </a>
        </footer>
      </div>

      {/* Desktop: sidebar playlist */}
      {!isMobile && (
        <Playlist
          items={playlist}
          onRemove={removeItem}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onClear={clearPlaylist}
          onDrop={handleDrop}
          isPlaying={isPlaying}
          onPlay={play}
          onStop={stop}
          onFadeOut={fadeOut}
        />
      )}

      {/* Mobile: bottom drawer playlist */}
      {isMobile && (
        <MobilePlaylistDrawer
          items={playlist}
          onRemove={removeItem}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onClear={clearPlaylist}
          onDrop={handleDrop}
          isPlaying={isPlaying}
          onPlay={play}
          onStop={stop}
          onFadeOut={fadeOut}
        />
      )}
    </div>
  );
}

const Index = () => (
  <LangProvider>
    <SoundBoxApp />
  </LangProvider>
);

export default Index;
