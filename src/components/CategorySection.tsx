import type { Category } from "@/data/sounds";
import { SoundCard } from "./SoundCard";

interface CategorySectionProps {
  category: Category;
  isPlaying: (file: string) => boolean;
  onPlay: (file: string) => void;
  onStop: (file: string) => void;
  onFadeOut: (file: string) => void;
  onDragStart: (e: React.DragEvent, soundName: string) => void;
}

export function CategorySection({
  category,
  isPlaying,
  onPlay,
  onStop,
  onFadeOut,
  onDragStart,
}: CategorySectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-display font-bold mb-4 text-foreground/80">
        {category.emoji} {category.label}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {category.sounds.map((sound) => (
          <SoundCard
            key={sound.name}
            sound={sound}
            cardClass={category.cardClass}
            isPlaying={isPlaying(sound.file)}
            onPlay={() => onPlay(sound.file)}
            onStop={() => onStop(sound.file)}
            onFadeOut={() => onFadeOut(sound.file)}
            onDragStart={(e) => onDragStart(e, sound.name)}
          />
        ))}
      </div>
    </section>
  );
}
