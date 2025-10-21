import { Provider } from '@angular/core';
import { MovieRepository } from '@repositories/movie.repository';
import { WeatherRepository } from '@repositories/weather.repository';
import { MovieApiService } from '@infrastructure/repositories/movie/movie-api.service';
import { WeatherApiService } from '@infrastructure/repositories/weather/weather-api.service';

export const REPOSITORY_PROVIDERS: Provider[] = [
  {
    provide: MovieRepository,
    useClass: MovieApiService,
  },
  {
    provide: WeatherRepository,
    useClass: WeatherApiService,
  },
];

