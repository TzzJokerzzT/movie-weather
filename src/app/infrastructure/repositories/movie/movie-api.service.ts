import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MovieResponse, Movie } from '@entities/movie.entity';
import { MovieRepository } from '@repositories/movie.repository';
import { API_ENDPOINTS } from '@constants/api.constants';
import { PaginationParams, SearchParams } from '@interfaces/common.interface';
import { TMDbMovieResponse, TMDbMovie } from './types';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService extends MovieRepository {
  private readonly apiKey = environment.API_KEY;

  constructor(private http: HttpClient) {
    super();
    console.log(this.apiKey);
  }

  getPopularMovies(params: PaginationParams): Observable<MovieResponse> {
    const httpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', params.page.toString());

    return this.http
      .get<TMDbMovieResponse>(
        `${API_ENDPOINTS.MOVIE_DB.BASE_URL}${API_ENDPOINTS.MOVIE_DB.POPULAR_MOVIES}`,
        { params: httpParams },
      )
      .pipe(map((response) => this.mapTMDbResponse(response)));
  }

  searchMovies(searchParams: SearchParams & PaginationParams): Observable<MovieResponse> {
    const httpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', searchParams.page.toString())
      .set('query', searchParams.query || '');

    return this.http
      .get<TMDbMovieResponse>(
        `${API_ENDPOINTS.MOVIE_DB.BASE_URL}${API_ENDPOINTS.MOVIE_DB.SEARCH_MOVIES}`,
        { params: httpParams },
      )
      .pipe(map((response) => this.mapTMDbResponse(response)));
  }

  getMovieDetails(id: number): Observable<Movie> {
    const httpParams = new HttpParams().set('api_key', this.apiKey);

    return this.http
      .get<TMDbMovie>(
        `${API_ENDPOINTS.MOVIE_DB.BASE_URL}${API_ENDPOINTS.MOVIE_DB.MOVIE_DETAILS}/${id}`,
        { params: httpParams },
      )
      .pipe(map((movie) => this.mapTMDbMovie(movie)));
  }

  private mapTMDbResponse(response: TMDbMovieResponse): MovieResponse {
    return {
      page: response.page,
      results: response.results.map((movie) => this.mapTMDbMovie(movie)),
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };
  }

  private mapTMDbMovie(movie: TMDbMovie): Movie {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      genreIds: movie.genre_ids,
      popularity: movie.popularity,
      voteCount: movie.vote_count,
    };
  }
}
