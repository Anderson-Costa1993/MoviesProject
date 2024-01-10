export type MoviesType = {
  adult: boolean;
  backdrop_path: string;
  genere_ids: number[];
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
};

export type DetailsMovie = MoviesType & {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
  } | null;

  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  overview: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  elease_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
};

export type DetailMovieVideosType = {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type GenreListType = {
  genres: GenreType[];
};

export type ColletionType = {
  backdrop_path: string;
  id: number;
  name: string;
  overview: string;
  parts: MoviesType[];
  poster_path: string;
};

export type seriesBase = Omit<
  MoviesType,
  "video" | "title" | "release_date" | "original_title"
>;

export type SeriesType = seriesBase & {
  name: string;
  first_air_date: Date;
  original_name: string;
};

export type SeriesDetailsType = SeriesType & {
  adult: Boolean;
  created_by: {
    id: Number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episodes_rum_time?: number[];

  genres: {
    id: number;
    name: string;
  }[];

  homepage: string;

  id_production: boolean;
  languages: string[];
  last_air_date: Date;

  last_episode_to_air: {
    air_date: Date;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };

  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];

  next_episode_to_air?: null | boolean;
  number_of_episodes: number;
  number_of_seasons: number;

  origin_country: number[];
  original_language: string;
  original_name: string;

  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  seasons: {
    air_date: Date;
    episod_count: number;
    id: number;
    name: string;
    overview?: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];

  status: string;
  tagline?: string;
  type: string;
};



export type GalleryType = {
  backdrops: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: string;
    vote_average: number;
    vote_count: number;
  }[];

  id: number;

  logos: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: string;
    vote_average: number;
    vote_count: number;
    width: number
  }[];

  posters: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: string;
    vote_average: number;
    vote_count: number;
    width: number
  }[];



}