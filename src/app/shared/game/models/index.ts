import { Game, ResponseGameFilter } from "@gamedex/shared/models";



export interface GameFilter {
  "search"?: string;
}

export interface ResponseGame {
  "count": number;
  "description": string;
  "filters": ResponseGameFilter
  "next": string;
  "nofollow": boolean;
  "nofollow_collections": string[];
  "noindex": boolean;
  "previous": string;
  "results": Game[]
  "seo_description": string;
  "seo_h1": string;
  "seo_keywords": string;
  "seo_title": string;
}
