export type CategoryKey = "stage" | "nature" | "human" | "daily";

export interface SoundItem {
  name: string;
  nameEn: string;
  emoji: string;
  file: string;
}

export interface Category {
  key: CategoryKey;
  label: string;
  labelEn: string;
  emoji: string;
  cardClass: string;
  sounds: SoundItem[];
}

export const categories: Category[] = [
  {
    key: "stage",
    label: "무대 효과",
    labelEn: "Stage Effects",
    emoji: "🎭",
    cardClass: "sound-card-stage",
    sounds: [
      { name: "오케스트라 튜닝", nameEn: "Orchestra Tuning", emoji: "🎻", file: "orchestratuning.mp3" },
      { name: "드럼롤", nameEn: "Drum Roll", emoji: "🥁", file: "drum roll.mp3" },
      { name: "마법봉", nameEn: "Magic Wand", emoji: "✨", file: "magic wand.mp3" },
      { name: "종소리", nameEn: "Old Bell", emoji: "🔔", file: "old bell.mp3" },
      { name: "시간 이동", nameEn: "Time Warp", emoji: "⏳", file: "time warp.mp3" },
      { name: "카메라 촬영", nameEn: "Camera Shutter", emoji: "📸", file: "camera shoot.mp3" },
    ],
  },
  {
    key: "nature",
    label: "자연",
    labelEn: "Nature",
    emoji: "🌿",
    cardClass: "sound-card-nature",
    sounds: [
      { name: "빗소리", nameEn: "Rain", emoji: "🌧️", file: "rain.mp3" },
      { name: "천둥소리", nameEn: "Thunder", emoji: "⚡", file: "thunder.mp3" },
      { name: "바람소리", nameEn: "Wind", emoji: "💨", file: "wind.mp3" },
      { name: "물 흐르는 소리", nameEn: "Water Flow", emoji: "💧", file: "water flow.mp3" },
      { name: "파도소리", nameEn: "Ocean Waves", emoji: "🌊", file: "ocean waves.mp3" },
      { name: "새 울음소리", nameEn: "Birds Chirping", emoji: "🐦", file: "birds chirping.mp3" },
    ],
  },
  {
    key: "human",
    label: "사람",
    labelEn: "Human",
    emoji: "👥",
    cardClass: "sound-card-human",
    sounds: [
      { name: "발자국", nameEn: "Footsteps", emoji: "👣", file: "foot steps.mp3" },
      { name: "심장 박동", nameEn: "Heartbeat", emoji: "💓", file: "heartbeat.mp3" },
      { name: "박수", nameEn: "Applause", emoji: "👏", file: "applause.mp3" },
      { name: "중얼거림", nameEn: "Murmur", emoji: "🗣️", file: "murmur.mp3" },
    ],
  },
  {
    key: "daily",
    label: "일상",
    labelEn: "Daily Life",
    emoji: "🏙️",
    cardClass: "sound-card-daily",
    sounds: [
      { name: "초인종", nameEn: "Doorbell", emoji: "🔔", file: "ding dong.mp3" },
      { name: "문 두드리기", nameEn: "Door Knocking", emoji: "🚪", file: "door knocking.mp3" },
      { name: "전화 걸기", nameEn: "Phone Dialing", emoji: "📞", file: "telephone dial and call.mp3" },
      { name: "전화 울림", nameEn: "Phone Ring", emoji: "📱", file: "phone ring.mp3" },
      { name: "학교 종", nameEn: "School Bell", emoji: "🏫", file: "schoolbell.mp3" },
      { name: "키보드 타이핑", nameEn: "Keyboard Typing", emoji: "⌨️", file: "keyboard typing.mp3" },
      { name: "지하철", nameEn: "Subway", emoji: "🚇", file: "subway.mp3" },
      { name: "사이렌", nameEn: "Siren", emoji: "🚨", file: "siren.mp3" },
      { name: "교통음", nameEn: "Traffic", emoji: "🚗", file: "traffic.mp3" },
      { name: "카카오톡", nameEn: "KakaoTalk", emoji: "💬", file: "kakaotalk.mp3" },
      { name: "전화 키패드", nameEn: "Phone Keypad", emoji: "🔢", file: "phone keyboard typing.mp3" },
    ],
  },
];

export const allSoundsMap = new Map<string, SoundItem>();
categories.forEach((cat) =>
  cat.sounds.forEach((s) => allSoundsMap.set(s.name, s))
);
