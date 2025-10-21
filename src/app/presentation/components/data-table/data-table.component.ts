import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { MovieUseCase } from '@use-cases/movie.use-case';
import { WeatherUseCase } from '@use-cases/weather.use-case';
import { Movie } from '@entities/movie.entity';
import { Weather } from '@entities/weather.entity';
import { API_ENDPOINTS } from '@constants/api.constants';
import { DataType, TableColumn } from './types';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatProgressSpinnerModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  private movieUseCase = inject(MovieUseCase);
  private weatherUseCase = inject(WeatherUseCase);
  private snackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  // Signals for state management
  selectedTabIndex = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchQuery = '';
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  // Data signals
  moviesData = signal<Movie[]>([]);
  weatherData = signal<Weather[]>([]);
  moviesTotalResults = signal(0);
  weatherTotalResults = signal(0);

  // Computed signals
  currentDataType = computed<DataType>(() =>
    this.selectedTabIndex() === 0 ? 'movies' : 'weather',
  );

  displayedData = computed(() =>
    this.currentDataType() === 'movies' ? this.moviesData() : this.weatherData(),
  );

  totalResults = computed(() =>
    this.currentDataType() === 'movies' ? this.moviesTotalResults() : this.weatherTotalResults(),
  );

  columns = computed<TableColumn[]>(() => {
    if (this.currentDataType() === 'movies') {
      return [
        { key: 'posterPath', label: 'Poster', type: 'image' },
        { key: 'title', label: 'Title' },
        { key: 'releaseDate', label: 'Release Date', type: 'date' },
        { key: 'rating', label: 'Rating', type: 'number' },
        { key: 'voteCount', label: 'Votes', type: 'number' },
      ];
    } else {
      return [
        { key: 'cityName', label: 'City' },
        { key: 'country', label: 'Country' },
        { key: 'temperature', label: 'Temperature (°C)', type: 'number' },
        { key: 'description', label: 'Weather' },
        { key: 'humidity', label: 'Humidity (%)', type: 'number' },
        { key: 'windSpeed', label: 'Wind Speed (m/s)', type: 'number' },
      ];
    }
  });

  displayedColumns = computed(() => this.columns().map((col) => col.key));

  searchPlaceholder = computed(() =>
    this.currentDataType() === 'movies'
      ? 'Search movies...'
      : 'Search cities (e.g., Madrid, London, Tokyo, New York)...',
  );

  ngOnInit(): void {
    this.setupSearchDebounce();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchDebounce(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadData();
      });
  }

  onTabChange(index: number): void {
    this.selectedTabIndex.set(index);
    this.searchQuery = '';
    this.currentPage.set(1);
    this.hasError.set(false);
    this.loadData();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.searchSubject.next(target.value);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadData();
  }

  retry(): void {
    this.hasError.set(false);
    this.loadData();
  }

  private loadData(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    if (this.currentDataType() === 'movies') {
      this.loadMovies();
    } else {
      this.loadWeather();
    }
  }

  private loadMovies(): void {
    const params = {
      page: this.currentPage(),
      limit: this.pageSize(),
      query: this.searchQuery,
    };

    const request = this.searchQuery.trim()
      ? this.movieUseCase.searchMovies(params)
      : this.movieUseCase.getPopularMovies(params);

    request.subscribe({
      next: (response) => {
        this.moviesData.set(response.results);
        this.moviesTotalResults.set(response.totalResults);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.handleError('Failed to load movies', error);
      },
    });
  }

  private loadWeather(): void {
    if (this.searchQuery.trim()) {
      this.weatherUseCase.searchWeatherByCity({ query: this.searchQuery }).subscribe({
        next: (weather) => {
          this.weatherData.set([weather]);
          this.weatherTotalResults.set(1);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.handleError(
            'No se pudo encontrar la ciudad. Prueba con: Madrid, London, Tokyo, New York, etc.',
            error,
          );
        },
      });
    } else {
      this.weatherUseCase
        .getWeatherForCitiesPaginated(this.currentPage(), this.pageSize())
        .subscribe({
          next: (response) => {
            this.weatherData.set(response.weather);
            this.weatherTotalResults.set(response.totalResults);
            this.isLoading.set(false);
          },
          error: (error) => {
            this.handleError('Failed to load weather data', error);
          },
        });
    }
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage.set(message);
    this.hasError.set(true);
    this.isLoading.set(false);
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  getImageUrl(path: string | null): string {
    return path ? `${API_ENDPOINTS.MOVIE_DB.IMAGE_BASE_URL}${path}` : '/assets/no-image.svg';
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/no-image.svg';
  }

  formatDate(date: string): string {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  }

  formatNumber(value: number): string {
    return value ? value.toLocaleString() : '0';
  }

  getTableDataSource(): any[] {
    return this.displayedData() as any[];
  }
}
