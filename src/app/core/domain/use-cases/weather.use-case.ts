import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherRepository } from '@repositories/weather.repository';
import { Weather, WeatherResponse } from '@entities/weather.entity';
import { SearchParams } from '@interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherUseCase {
  constructor(private weatherRepository: WeatherRepository) {}

  getWeatherForCities(cities: string[]): Observable<WeatherResponse> {
    return this.weatherRepository.getWeatherForCities(cities);
  }

  getWeatherForCitiesPaginated(page: number, pageSize: number): Observable<WeatherResponse> {
    return this.weatherRepository.getWeatherForCitiesPaginated(page, pageSize);
  }

  searchWeatherByCity(searchParams: SearchParams): Observable<Weather> {
    return this.weatherRepository.searchWeatherByCity(searchParams);
  }

  getCurrentWeather(cityName: string): Observable<Weather> {
    return this.weatherRepository.getCurrentWeather(cityName);
  }
}