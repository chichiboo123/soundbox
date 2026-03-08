import type { Category } from "@/data/sounds";
import { SoundCard } from "./SoundCard";
import { useLang } from "@/hooks/useLang";

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
  const { lang } = useLang();
  const label = lang === "en" ? category.labelEn : category.label;

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold mb-4 text-foreground/75 tracking-tight flex items-center gap-2">
        <span className="text-2xl">{category.emoji}</span>
        {label}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
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
