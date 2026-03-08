export type CategoryKey = "stage" | "nature" | "human" | "daily";

export interface SoundItem {
  name: string;
  emoji: string;
  file: string;
}

export interface Category {
  key: CategoryKey;
  label: string;
  emoji: string;
  cardClass: string;
  sounds: SoundItem[];
}

export const categories: Category[] = [
  {
    key: "stage",
    label: "무대 효과",
    emoji: "🎭",
    cardClass: "sound-card-stage",
    sounds: [
      { name: "오케스트라 튜닝", emoji: "🎻", file: "orchestratuning.mp3" },
      { name: "드럼롤", emoji: "🥁", file: "drum roll.mp3" },
      { name: "마법봉", emoji: "✨", file: "magic wand.mp3" },
      { name: "종소리", emoji: "🔔", file: "old bell.mp3" },
      { name: "시간 이동", emoji: "⏳", file: "time warp.mp3" },
    ],
  },
  {
    key: "nature",
    label: "자연",
    emoji: "🌿",
    cardClass: "sound-card-nature",
    sounds: [
      { name: "빗소리", emoji: "🌧️", file: "rain.mp3" },
      { name: "천둥소리", emoji: "⚡", file: "thunder.mp3" },
      { name: "바람소리", emoji: "💨", file: "wind.mp3" },
      { name: "물 흐르는 소리", emoji: "💧", file: "water flow.mp3" },
      { name: "파도소리", emoji: "🌊", file: "ocean waves.mp3" },
      { name: "새 울음소리", emoji: "🐦", file: "birds chirping.mp3" },
    ],
  },
  {
    key: "human",
    label: "사람",
    emoji: "👥",
    cardClass: "sound-card-human",
    sounds: [
      { name: "발자국", emoji: "👣", file: "foot steps.mp3" },
      { name: "심장 박동", emoji: "💓", file: "heartbeat.mp3" },
      { name: "박수", emoji: "👏", file: "applause.mp3" },
      { name: "중얼거림", emoji: "🗣️", file: "murmur.mp3" },
    ],
  },
  {
    key: "daily",
    label: "일상",
    emoji: "🏙️",
    cardClass: "sound-card-daily",
    sounds: [
      { name: "초인종", emoji: "🔔", file: "ding dong.mp3" },
      { name: "문 두드리기", emoji: "🚪", file: "door knocking.mp3" },
      { name: "전화 걸기", emoji: "📞", file: "telephone dial and call.mp3" },
      { name: "전화 울림", emoji: "📱", file: "phone ring.mp3" },
      { name: "학교 종", emoji: "🏫", file: "schoolbell.mp3" },
      { name: "키보드 타이핑", emoji: "⌨️", file: "keyboard typing.mp3" },
      { name: "지하철", emoji: "🚇", file: "subway.mp3" },
      { name: "사이렌", emoji: "🚨", file: "siren.mp3" },
      { name: "교통음", emoji: "🚗", file: "traffic.mp3" },
    ],
  },
];

// Flatten all sounds for lookup
export const allSoundsMap = new Map<string, SoundItem>();
categories.forEach((cat) =>
  cat.sounds.forEach((s) => allSoundsMap.set(s.name, s))
);
