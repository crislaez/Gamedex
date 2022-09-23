
export interface PublisherFilter {
  "search"?: string
}

export interface Publisher {
  "id": number;
  "name": string;
  "slug": string;
  "games_count": number;
  "image_background": string;
  "games": PublisherGame[];
  "description":string;
}

export interface ResponsePublisher {
  "count": number;
  "next": string;
  "previous": string;
  "results": Publisher[]
}

export interface PublisherGame{
  "id": number;
  "slug": string;
  "name": string;
  "added": number;
}
