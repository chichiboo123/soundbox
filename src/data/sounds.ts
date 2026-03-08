export type CategoryKey = "stage" | "nature" | "human" | "daily";

export interface SoundItem {
  name: string;
  nameEn: string;
  nameJa: string;
  emoji: string;
  file: string;
}

export interface Category {
  key: CategoryKey;
  label: string;
  labelEn: string;
  labelJa: string;
  emoji: string;
  cardClass: string;
  sounds: SoundItem[];
}

export const categories: Category[] = [
  {
    key: "stage",
    label: "무대 효과",
    labelEn: "Stage Effects",
    labelJa: "ステージ効果",
    emoji: "🎭",
    cardClass: "sound-card-stage",
    sounds: [
      { name: "오케스트라 튜닝", nameEn: "Orchestra Tuning", nameJa: "オーケストラチューニング", emoji: "🎻", file: "orchestratuning.mp3" },
      { name: "드럼롤", nameEn: "Drum Roll", nameJa: "ドラムロール", emoji: "🥁", file: "drum roll.mp3" },
      { name: "마법봉", nameEn: "Magic Wand", nameJa: "魔法の杖", emoji: "✨", file: "magic wand.mp3" },
      { name: "종소리", nameEn: "Old Bell", nameJa: "古い鐘", emoji: "🔔", file: "old bell.mp3" },
      { name: "시간 이동", nameEn: "Time Warp", nameJa: "タイムワープ", emoji: "⏳", file: "time warp.mp3" },
      { name: "카메라 촬영", nameEn: "Camera Shutter", nameJa: "カメラシャッター", emoji: "📸", file: "camera shoot.mp3" },
    ],
  },
  {
    key: "nature",
    label: "자연",
    labelEn: "Nature",
    labelJa: "自然",
    emoji: "🌿",
    cardClass: "sound-card-nature",
    sounds: [
      { name: "빗소리", nameEn: "Rain", nameJa: "雨", emoji: "🌧️", file: "rain.mp3" },
      { name: "천둥소리", nameEn: "Thunder", nameJa: "雷", emoji: "⚡", file: "thunder.mp3" },
      { name: "바람소리", nameEn: "Wind", nameJa: "風", emoji: "💨", file: "wind.mp3" },
      { name: "물 흐르는 소리", nameEn: "Water Flow", nameJa: "水の流れ", emoji: "💧", file: "water flow.mp3" },
      { name: "파도소리", nameEn: "Ocean Waves", nameJa: "波の音", emoji: "🌊", file: "ocean waves.mp3" },
      { name: "새 울음소리", nameEn: "Birds Chirping", nameJa: "鳥のさえずり", emoji: "🐦", file: "birds chirping.mp3" },
    ],
  },
  {
    key: "human",
    label: "사람",
    labelEn: "Human",
    labelJa: "人間",
    emoji: "👥",
    cardClass: "sound-card-human",
    sounds: [
      { name: "발자국", nameEn: "Footsteps", nameJa: "足音", emoji: "👣", file: "foot steps.mp3" },
      { name: "심장 박동", nameEn: "Heartbeat", nameJa: "心臓の鼓動", emoji: "💓", file: "heartbeat.mp3" },
      { name: "박수", nameEn: "Applause", nameJa: "拍手", emoji: "👏", file: "applause.mp3" },
      { name: "중얼거림", nameEn: "Murmur", nameJa: "つぶやき", emoji: "🗣️", file: "murmur.mp3" },
    ],
  },
  {
    key: "daily",
    label: "일상",
    labelEn: "Daily Life",
    labelJa: "日常",
    emoji: "🏙️",
    cardClass: "sound-card-daily",
    sounds: [
      { name: "초인종", nameEn: "Doorbell", nameJa: "ドアベル", emoji: "🔔", file: "ding dong.mp3" },
      { name: "문 두드리기", nameEn: "Door Knocking", nameJa: "ノック", emoji: "🚪", file: "door knocking.mp3" },
      { name: "전화 걸기", nameEn: "Phone Dialing", nameJa: "電話ダイヤル", emoji: "📞", file: "telephone dial and call.mp3" },
      { name: "전화 울림", nameEn: "Phone Ring", nameJa: "電話の着信音", emoji: "📱", file: "phone ring.mp3" },
      { name: "학교 종", nameEn: "School Bell", nameJa: "学校のチャイム", emoji: "🏫", file: "schoolbell.mp3" },
      { name: "키보드 타이핑", nameEn: "Keyboard Typing", nameJa: "キーボード入力", emoji: "⌨️", file: "keyboard typing.mp3" },
      { name: "지하철", nameEn: "Subway", nameJa: "地下鉄", emoji: "🚇", file: "subway.mp3" },
      { name: "사이렌", nameEn: "Siren", nameJa: "サイレン", emoji: "🚨", file: "siren.mp3" },
      { name: "교통음", nameEn: "Traffic", nameJa: "交通音", emoji: "🚗", file: "traffic.mp3" },
      { name: "카카오톡", nameEn: "KakaoTalk", nameJa: "カカオトーク", emoji: "💬", file: "kakaotalk.mp3" },
      { name: "전화 키패드", nameEn: "Phone Keypad", nameJa: "電話キーパッド", emoji: "🔢", file: "phone keyboard typing.mp3" },
    ],
  },
];

export const allSoundsMap = new Map<string, SoundItem>();
categories.forEach((cat) =>
  cat.sounds.forEach((s) => allSoundsMap.set(s.name, s))
);
