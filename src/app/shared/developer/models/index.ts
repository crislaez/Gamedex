
export interface Developer {
  "id": number;
  "name": string;
  "slug": string;
  "games_count": number;
  "image_background": string;
  "games": DeveloperGame[];
  "description": string;
}

export interface DeveloperGame {
  "id": number;
  "slug": string;
  "name": string;
  "added": number;
}

export interface DeveloperFilter {
  "search"?: string;
}

export interface ResponseDeveloper {
  "count": number,
  "next": string;
  "previous": string;
  "results": Developer[]
}
