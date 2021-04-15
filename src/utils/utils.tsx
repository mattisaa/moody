import {
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

  return moodScore;
}
