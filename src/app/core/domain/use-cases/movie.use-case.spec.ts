import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MovieUseCase } from './movie.use-case';
import { MovieRepository } from '@repositories/movie.repository';
import { MovieResponse } from '@entities/movie.entity';

describe('MovieUseCase', () => {
  let useCase: MovieUseCase;
  let mockRepository: jasmine.SpyObj<MovieRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MovieRepository', ['getPopularMovies', 'searchMovies']);

    TestBed.configureTestingModule({
      providers: [
        MovieUseCase,
        { provide: MovieRepository, useValue: spy }
      ]
    });

    useCase = TestBed.inject(MovieUseCase);
    mockRepository = TestBed.inject(MovieRepository) as jasmine.SpyObj<MovieRepository>;
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should get popular movies', () => {
    const mockResponse: MovieResponse = {
      page: 1,
      results: [],
      totalPages: 1,
      totalResults: 0
    };

    mockRepository.getPopularMovies.and.returnValue(of(mockResponse));

    useCase.getPopularMovies({ page: 1, limit: 10 }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(mockRepository.getPopularMovies).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });

  it('should search movies', () => {
    const mockResponse: MovieResponse = {
      page: 1,
      results: [],
      totalPages: 1,
      totalResults: 0
    };

    mockRepository.searchMovies.and.returnValue(of(mockResponse));

    useCase.searchMovies({ page: 1, limit: 10, query: 'test' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(mockRepository.searchMovies).toHaveBeenCalledWith({ page: 1, limit: 10, query: 'test' });
  });
});