
export interface PlatformFilter {
  "search"?:string
}

export interface Platform {
  "id": number;
  "name": string;
  "slug": string;
  "games_count": number;
  "image_background": string;
  "image": string;
  "year_start": string;
  "year_end": string;
}

export interface PlatformResponse {
  "count":  number;
  "next": string;
  "previous": string;
  "results": Platform[];
}
