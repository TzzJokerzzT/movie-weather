export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  rating: number;
  posterPath: string | null;
  backdropPath: string | null;
  genreIds: number[];
  popularity: number;
  voteCount: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

export interface Genre {
  id: number;
  name: string;
}