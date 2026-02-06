/**
 * Typed ritual payload per feeling. Deterministic static mapping; expandable later.
 */

export interface RitualItem {
  title: string;
  guidance: string;
  duration?: string;
}

export interface RitualPayload {
  meditation: RitualItem;
  selfCare: string;
  journaling: string;
  spotify?: {
    label: string;
    href: string;
  };
}

export type FeelingId =
  | "calm"
  | "happy"
  | "stressed"
  | "sad"
  | "angry"
  | "tired"
  | "lonely"
  | "overwhelmed"
  | "unfocused"
  | "motivated"
  | "grateful"
  | "numb"
  | "anxious"
  | "peaceful"
  | "energized"
  | "frustrated"
  | "exhausted"
  | "content"
  | "restless"
  | "hopeful";

export interface FeelingOption {
  id: FeelingId;
  label: string;
  category: string;
}

export const FEELING_CATEGORIES: { id: string; label: string }[] = [
  { id: "calm", label: "Calm / Peaceful" },
  { id: "positive", label: "Happy / Energized" },
  { id: "low", label: "Sad / Low" },
  { id: "tense", label: "Stressed / Anxious" },
  { id: "angry", label: "Angry / Frustrated" },
  { id: "tired", label: "Tired / Exhausted" },
  { id: "lonely", label: "Lonely" },
  { id: "overwhelmed", label: "Overwhelmed" },
  { id: "unfocused", label: "Unfocused" },
  { id: "motivated", label: "Motivated" },
  { id: "grateful", label: "Grateful" },
  { id: "numb", label: "Numb" },
  { id: "hopeful", label: "Hopeful / Restless" },
];

export const FEELINGS: FeelingOption[] = [
  { id: "calm", label: "Calm", category: "calm" },
  { id: "peaceful", label: "Peaceful", category: "calm" },
  { id: "content", label: "Content", category: "calm" },
  { id: "happy", label: "Happy", category: "positive" },
  { id: "energized", label: "Energized", category: "positive" },
  { id: "motivated", label: "Motivated", category: "motivated" },
  { id: "grateful", label: "Grateful", category: "grateful" },
  { id: "hopeful", label: "Hopeful", category: "hopeful" },
  { id: "stressed", label: "Stressed", category: "tense" },
  { id: "anxious", label: "Anxious", category: "tense" },
  { id: "sad", label: "Sad", category: "low" },
  { id: "lonely", label: "Lonely", category: "lonely" },
  { id: "angry", label: "Angry", category: "angry" },
  { id: "frustrated", label: "Frustrated", category: "angry" },
  { id: "tired", label: "Tired", category: "tired" },
  { id: "exhausted", label: "Exhausted", category: "tired" },
  { id: "overwhelmed", label: "Overwhelmed", category: "overwhelmed" },
  { id: "unfocused", label: "Unfocused", category: "unfocused" },
  { id: "restless", label: "Restless", category: "hopeful" },
  { id: "numb", label: "Numb", category: "numb" },
];

const RITUALS: Record<FeelingId, RitualPayload> = {
  calm: {
    meditation: {
      title: "Body scan",
      guidance: "Lie down and slowly notice each part of your body from feet to crown. No need to change anything.",
      duration: "8–10 min",
    },
    selfCare: "Spend 10 minutes outside without your phone.",
    journaling: "What does ‘enough’ feel like in your body right now?",
    spotify: { label: "Peaceful Piano", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  happy: {
    meditation: {
      title: "Gratitude breath",
      guidance: "On each inhale, name one small thing you’re grateful for. On the exhale, let the feeling settle.",
      duration: "5 min",
    },
    selfCare: "Share this good moment with someone — a text, a call, or in person.",
    journaling: "What made today feel good? Write three concrete things.",
    spotify: { label: "Acoustic Chill", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  stressed: {
    meditation: {
      title: "4-7-8 breath",
      guidance: "Inhale 4 counts, hold 7, exhale 8. Repeat four times. Calms the nervous system.",
      duration: "3–4 min",
    },
    selfCare: "Step away from screens for 20 minutes. Stretch or walk.",
    journaling: "What’s one thing you can let go of control over today?",
    spotify: { label: "Deep Focus", href: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
  },
  sad: {
    meditation: {
      title: "Self-compassion pause",
      guidance: "Place a hand on your heart. Breathe. Say inwardly: ‘It’s okay to feel this. I’m here with myself.’",
      duration: "5 min",
    },
    selfCare: "Do one gentle thing for your body: warm drink, bath, or a short walk.",
    journaling: "What would you say to a friend who felt like this? Write it to yourself.",
    spotify: { label: "Soft & Gentle", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  angry: {
    meditation: {
      title: "Cooling breath",
      guidance: "Breathe in through the nose, out slowly through the mouth. Imagine cooling air with each exhale.",
      duration: "5 min",
    },
    selfCare: "Move your body — a brisk walk, stretch, or shake out tension.",
    journaling: "What need or boundary was crossed? Name it without blaming.",
    spotify: { label: "Calm Down", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  tired: {
    meditation: {
      title: "Resting awareness",
      guidance: "Sit or lie down. Simply notice your breath. No effort to change it — just rest with it.",
      duration: "5–7 min",
    },
    selfCare: "One thing only: hydrate, a small snack, or 10 minutes of rest with eyes closed.",
    journaling: "What would true rest look like for you today?",
    spotify: { label: "Sleep", href: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
  },
  lonely: {
    meditation: {
      title: "Connected breath",
      guidance: "As you breathe, imagine others breathing with you — same sky, same moment. You’re not alone in this.",
      duration: "6 min",
    },
    selfCare: "Reach out to one person — even a short message. Or write a letter you don’t have to send.",
    journaling: "Who or what makes you feel seen? How can you invite more of that in?",
    spotify: { label: "Indie Chill", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  overwhelmed: {
    meditation: {
      title: "Grounding 5-4-3-2-1",
      guidance: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. Stay present.",
      duration: "5 min",
    },
    selfCare: "Choose one small task and complete it. Nothing else for now.",
    journaling: "What’s the single most important thing today? Everything else can wait.",
    spotify: { label: "Focus Flow", href: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
  },
  unfocused: {
    meditation: {
      title: "Single-point focus",
      guidance: "Pick one object. Look at it for 2 minutes. When the mind wanders, return to the object.",
      duration: "5 min",
    },
    selfCare: "Clear your workspace or one surface. One place of order.",
    journaling: "What’s pulling your attention? Write it down so your mind can let go.",
    spotify: { label: "Deep Focus", href: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
  },
  motivated: {
    meditation: {
      title: "Clarity breath",
      guidance: "Three deep breaths. On the last exhale, set one clear intention for the next hour.",
      duration: "2–3 min",
    },
    selfCare: "Do the one thing you’ve been putting off — even for 5 minutes.",
    journaling: "What would make today feel like a win? One concrete step.",
    spotify: { label: "Productive Morning", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  grateful: {
    meditation: {
      title: "Loving-kindness (short)",
      guidance: "Repeat: ‘May I be well. May I be at ease.’ Then send the same to someone you care about.",
      duration: "5 min",
    },
    selfCare: "Tell one person why you’re grateful for them.",
    journaling: "List three things that went right this week, however small.",
    spotify: { label: "Peaceful Piano", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  numb: {
    meditation: {
      title: "Sensation check",
      guidance: "Notice one sensation in your body — temperature, pressure, texture. Stay with it without judging.",
      duration: "5 min",
    },
    selfCare: "Do something that engages the body: cold water on hands, a stretch, or a short walk.",
    journaling: "When did you last feel something strongly? What was it?",
    spotify: { label: "Ambient Relaxation", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  anxious: {
    meditation: {
      title: "Extended exhale",
      guidance: "Make the exhale longer than the inhale. Inhale 4, exhale 6 or 8. Repeat five times.",
      duration: "4 min",
    },
    selfCare: "Name three things you can control right now. Do one.",
    journaling: "What’s the worst that could happen? What’s actually likely?",
    spotify: { label: "Anxiety Relief", href: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
  },
  peaceful: {
    meditation: {
      title: "Open awareness",
      guidance: "Sit quietly. Let sounds and sensations come and go. No need to hold or push away.",
      duration: "10 min",
    },
    selfCare: "Keep the peace — avoid one thing that usually disrupts it today.",
    journaling: "What does peace look like in your daily life? Describe it.",
    spotify: { label: "Peaceful Piano", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  energized: {
    meditation: {
      title: "Morning stretch breath",
      guidance: "With each inhale, reach or stretch. With each exhale, release. Five rounds.",
      duration: "3 min",
    },
    selfCare: "Use this energy for one thing that matters to you.",
    journaling: "What would you do with an extra hour of energy today?",
    spotify: { label: "Morning Motivation", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  frustrated: {
    meditation: {
      title: "Pause and release",
      guidance: "On each exhale, imagine releasing a bit of tension. Shoulders, jaw, hands.",
      duration: "5 min",
    },
    selfCare: "Change your environment for 10 minutes — different room or outside.",
    journaling: "What’s blocking you? One small way around it.",
    spotify: { label: "Calm Down", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  exhausted: {
    meditation: {
      title: "Rest first",
      guidance: "No formal practice. Just sit or lie down and breathe. Permission to do nothing.",
      duration: "5 min",
    },
    selfCare: "Cancel one non-essential thing. Protect your rest.",
    journaling: "What can wait until tomorrow? Write it down and give yourself permission.",
    spotify: { label: "Sleep", href: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
  },
  content: {
    meditation: {
      title: "Savoring",
      guidance: "Stay with this feeling. Breathe into it. Let it last a little longer.",
      duration: "5 min",
    },
    selfCare: "Do one thing that extends this feeling — share it or write it down.",
    journaling: "What made today feel enough?",
    spotify: { label: "Acoustic Chill", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  restless: {
    meditation: {
      title: "Movement + breath",
      guidance: "Stand. Inhale as you raise arms, exhale as you lower. Slow and deliberate.",
      duration: "5 min",
    },
    selfCare: "Move — walk, stretch, or gentle exercise. Then sit for 2 minutes.",
    journaling: "What are you restless for? Name it.",
    spotify: { label: "Indie Chill", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
  hopeful: {
    meditation: {
      title: "Future self",
      guidance: "Breathe. Imagine yourself one month from now, feeling a bit lighter. What changed?",
      duration: "6 min",
    },
    selfCare: "Take one small step toward something you hope for.",
    journaling: "What’s one reason to be hopeful today?",
    spotify: { label: "Peaceful Piano", href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  },
};

export function getRitualForFeeling(feelingId: FeelingId): RitualPayload {
  return RITUALS[feelingId];
}
