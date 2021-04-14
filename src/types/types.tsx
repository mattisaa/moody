export interface RecentlyPlayedEntity {
  items: ItemsEntity[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}
export interface ItemsEntity {
  track: Track;
  played_at: string;
  context: Context;
}
export interface Track {
  album: Album;
  artists: ArtistsEntity[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
export interface Album {
  album_type: string;
  artists: ArtistsEntity[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImagesEntity[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}
export interface ExternalIds {
  isrc: string;
}
export interface Context {
  external_urls: ExternalUrls;
  href: string;
  type: string;
  uri: string;
}
export interface Cursors {
  after: string;
  before: string;
}
