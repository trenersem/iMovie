export type ResponseType<Type> = {
  statusCode: number;
  data: Type;
};

export interface PopularMovies {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GetVideos {
  id: number;
  results: Videos[];
}

export interface Videos {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface VideoDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any;
  production_countries: any;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GetCredits {
  crew: any;
  cast: Cast[];
  id: number;
}

export interface Cast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export enum category {
  movie = "movie",
  tv = "tv",
}

export enum tvType {
  popular = "popular",
  top_rated = "top_rated",
  on_the_air = "on_the_air",
}

export enum movieType {
  upcoming = "upcoming",
  popular = "popular",
  top_rated = "top_rated",
  similar = "similar",
}
