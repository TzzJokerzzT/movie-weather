import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { DataTableComponent } from './data-table.component';
import { MovieUseCase } from '@use-cases/movie.use-case';
import { WeatherUseCase } from '@use-cases/weather.use-case';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let mockMovieUseCase: jasmine.SpyObj<MovieUseCase>;
  let mockWeatherUseCase: jasmine.SpyObj<WeatherUseCase>;

  beforeEach(async () => {
    const movieSpy = jasmine.createSpyObj('MovieUseCase', ['getPopularMovies', 'searchMovies']);
    const weatherSpy = jasmine.createSpyObj('WeatherUseCase', ['getWeatherForCities', 'searchWeatherByCity']);

    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        { provide: MovieUseCase, useValue: movieSpy },
        { provide: WeatherUseCase, useValue: weatherSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    mockMovieUseCase = TestBed.inject(MovieUseCase) as jasmine.SpyObj<MovieUseCase>;
    mockWeatherUseCase = TestBed.inject(WeatherUseCase) as jasmine.SpyObj<WeatherUseCase>;

    // Setup default mock responses
    mockMovieUseCase.getPopularMovies.and.returnValue(of({
      results: [],
      totalResults: 0,
      totalPages: 0,
      page: 1
    }));

    mockWeatherUseCase.getWeatherForCities.and.returnValue(of({
      weather: [],
      totalResults: 0
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with movies tab selected', () => {
    expect(component.selectedTabIndex()).toBe(0);
    expect(component.currentDataType()).toBe('movies');
  });

  it('should switch to weather tab when tab changes', () => {
    component.onTabChange(1);
    expect(component.selectedTabIndex()).toBe(1);
    expect(component.currentDataType()).toBe('weather');
  });

  it('should load movies on initialization', () => {
    component.ngOnInit();
    expect(mockMovieUseCase.getPopularMovies).toHaveBeenCalled();
  });

  it('should format date correctly', () => {
    const testDate = '2023-12-01';
    const formattedDate = component.formatDate(testDate);
    expect(formattedDate).toBe(new Date(testDate).toLocaleDateString());
  });

  it('should format number correctly', () => {
    expect(component.formatNumber(1000)).toBe('1,000');
    expect(component.formatNumber(0)).toBe('0');
  });
});