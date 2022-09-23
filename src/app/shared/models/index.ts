export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};

export interface Game {
  "added": number;
  "added_by_status": AddedByStatus;
  "background_image": string;
  "clip": any
  "dominant_color": string;
  "esrb_rating": EsrbRating;
  "genres": Genre[];
  "id": number;
  "metacritic": number;
  "name": string;
  "parent_platforms": ParentPlatform[];
  "platforms": ParentPlatform[]
  "playtime": number;
  "rating": number;
  "rating_top": number;
  "ratings": Rating[];
  "ratings_count": number;
  "released": string;
  "reviews_count": number;
  "reviews_text_count": number;
  "saturated_color": string;
  "short_screenshots": ScreenShot[];
  "slug": string;
  "stores": StoreObj[];
  "suggestions_count": number;
  "tags": Tag[];
  "tba": false
  "updated": string;
  "user_game": any;
  "description":string;
  "description_raw": string;
}

export interface ResponseGameFilter{
  "years":Year[]
}

export interface Year {
  "count": number;
  "decade": number;
  "filter": string;
  "from": number;
  "nofollow": boolean;
  "to": number;
}

export interface AddedByStatus {
  "beaten": number;
  "dropped": number;
  "owned": number;
  "playing": number;
  "toplay": number;
  "yet": number;
}

export interface EsrbRating {
  "id": number;
  "name": string;
  "slug": string;
}

export interface Genre {
  "games_count": number;
  "id": number;
  "image_background": string;
  "name": string;
  "slug": string;
}

export interface ParentPlatform {
  "platform":Platform,
  "released_at"?: string;
  "requirements_en"?: any
  "requirements_ru"?: any
}

export interface Platform {
  "id": number;
  "name"?: string;
  "slug"?: string;
  "games_count"?: number;
  "image"?: string;
  "image_background"?: string;
  "year_end"?: number;
  "year_start"?: number;
}

export interface Rating {
  "count"?: number;
  "id"?: number;
  "percent"?: number;
  "title"?: string;
}

export interface ScreenShot {
  "id": number;
  "image"?: string;
}

export interface StoreObj {
  "id":number;
  "store":Store;
  "domain": "store.steampowered.com"
  "games_count": number;
  "image_background"?: string;
  "name"?: string;
  "slug"?: string;
}

export interface Store {
  "domain"?: string;
  "games_count"?: number;
  "id"?: number;
  "image_background"?: string;
  "name"?: string;
  "slug"?: string;
}

export interface Tag {
  "games_count": number;
  "id": number;
  "image_background": string;
  "language": string;
  "name": string;
  "slug": string;
}
