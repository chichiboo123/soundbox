import { useState, useCallback, useEffect } from "react";
import { categories } from "@/data/sounds";
import { CategorySection } from "@/components/CategorySection";
import { Playlist, type PlaylistItem } from "@/components/Playlist";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const STORAGE_KEY = "soundbox-playlist";

function loadPlaylist(): PlaylistItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const Index = () => {
  const { play, stop, fadeOut, isPlaying } = useAudioPlayer();
  const [playlist, setPlaylist] = useState<PlaylistItem[]>(loadPlaylist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
  }, [playlist]);

  const handleDragStart = useCallback((e: React.DragEvent, soundName: string) => {
    e.dataTransfer.setData("soundName", soundName);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    const soundName = e.dataTransfer.getData("soundName");
    if (!soundName) return;
    setPlaylist((prev) => [
      ...prev,
      { id: crypto.randomUUID(), soundName },
    ]);
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
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="header-gradient py-8 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground/90 tracking-tight">
            🎵 여기 있어 효과음
          </h1>
          <p className="mt-2 text-sm text-foreground/55 font-medium">
            교실을 위한 음향 효과 보드
          </p>
        </header>

        {/* Sound categories */}
        <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full">
          {categories.map((cat) => (
            <CategorySection
              key={cat.key}
              category={cat}
              isPlaying={isPlaying}
              onPlay={play}
              onStop={stop}
              onFadeOut={fadeOut}
              onDragStart={handleDragStart}
            />
          ))}
        </main>
      </div>

      {/* Playlist sidebar */}
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
    </div>
  );
};

export default Index;
