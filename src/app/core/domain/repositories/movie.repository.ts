import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '@entities/movie.entity';
import { PaginationParams, SearchParams } from '@interfaces/common.interface';

export abstract class MovieRepository {
  abstract getPopularMovies(params: PaginationParams): Observable<MovieResponse>;
  abstract searchMovies(searchParams: SearchParams & PaginationParams): Observable<MovieResponse>;
  abstract getMovieDetails(id: number): Observable<Movie>;
}