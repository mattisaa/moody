import { ItemsEntity, RecentlyPlayedEntity } from "../types/types";

export function getTrackIdsFromRecentlyPlayedResponse(
  data: RecentlyPlayedEntity
) {
  const items = data.items;
  return items.reduce((prev, current) => {
    prev.push(current.track.id);
    return prev;
  }, [] as string[]);
}
