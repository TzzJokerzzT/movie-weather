import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieRepository } from '@repositories/movie.repository';
import { Movie, MovieResponse } from '@entities/movie.entity';
import { PaginationParams, SearchParams } from '@interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  getPopularMovies(params: PaginationParams): Observable<MovieResponse> {
    return this.movieRepository.getPopularMovies(params);
  }

  searchMovies(searchParams: SearchParams & PaginationParams): Observable<MovieResponse> {
    return this.movieRepository.searchMovies(searchParams);
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.movieRepository.getMovieDetails(id);
  }
}