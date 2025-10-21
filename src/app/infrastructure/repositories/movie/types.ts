export interface TMDbMovieResponse {
  page: number;
  results: TMDbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDbMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  popularity: number;
  vote_count: number;
}
