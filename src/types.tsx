export type moviesType = {
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

export type DetailsMovie = moviesType & {
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
  parts: moviesType[];
  poster_path: string;
};

export type seriesBase = Omit<
  moviesType,
  "video" | "title" | "release_date" | "original_title"
>;

export type SeriesType = seriesBase & {
  name: string;
  first_air_date: Date;
  original_name: string;
}

export type DetailMovieVideosType = {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number
  type: string;
}