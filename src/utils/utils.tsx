import {
  AudioFeatures,
  AudioFeaturesEntity,
  ItemsEntity,
  RecentlyPlayedEntity
} from "../types/types";

export function getTrackIdsFromRecentlyPlayedResponse(
  data: RecentlyPlayedEntity
) {
  const items = data.items;
  return items.reduce((prev, current) => {
    prev.push(current.track.id);
    return prev;
  }, [] as string[]);
}

const valenceMoodWeight = 0.7;
const danceAndEnergyMoodWeight = 0.3;
export function getMood(data: AudioFeaturesEntity) {
  const audioFeatures = data.audio_features;
  const numbTracks = audioFeatures.length;

  const totalScores = audioFeatures.reduce(
    (prev, current) => {
      prev.danceability += current.danceability;
      prev.energy += current.energy;
      prev.valence += current.valence;
      return prev;
    },
    { danceability: 0, energy: 0, valence: 0 }
  );

  const averageDanceability = totalScores.danceability / numbTracks;
  const averageEnergy = totalScores.energy / numbTracks;
  const averageValence = totalScores.valence / numbTracks;

  const moodScore =
    (averageDanceability + averageEnergy) * danceAndEnergyMoodWeight +
    averageValence * valenceMoodWeight;

  return Math.round(moodScore * 100);
}

export function getHighsAndLows({
  audioFeatures,
  recentlyPlayed
}: {
  audioFeatures: AudioFeatures[];
  recentlyPlayed: ItemsEntity[];
}) {
  const happiestSong = audioFeatures.reduce((prev, current) => {
    return current.valence > prev.valence ? current : prev;
  });
  const saddestSong = audioFeatures.reduce((prev, current) => {
    return current.valence < prev.valence ? current : prev;
  });

  const happiestSongFeatures = recentlyPlayed.find(
    item => item.track.id === happiestSong.id
  );
  const saddestSongFeatures = recentlyPlayed.find(
    item => item.track.id === saddestSong.id
  );

  return { happiestSongFeatures, saddestSongFeatures };
}

const emojies = {
  extremelySad: { emoji: "😭", value: [0, 10] },
  verySad: { emoji: "😓", value: [11, 20] },
  sad: { emoji: "😕", value: [21, 30] },
  mellow: { emoji: "😐", value: [31, 40] },
  average: { emoji: "🤨", value: [41, 50] },
  peaceful: { emoji: "😌", value: [51, 60] },
  awesome: { emoji: "😎", value: [61, 70] },
  happy: { emoji: "😁", value: [71, 80] },
  veryHappy: { emoji: " 🥳", value: [81, 90] },
  topOfTheWorld: { emoji: "🤩", value: [91, 100] }
};

export function getMoodEmoji(score: number) {
  let moodEmoji;
  Object.entries(emojies).forEach(([_, { value, emoji }]) => {
    if (score >= value[0] && score <= value[1]) {
      moodEmoji = emoji;
    }
  });

  return moodEmoji || "";
}
