import { Observable } from 'rxjs';
import { Weather, WeatherResponse } from '@entities/weather.entity';
import { SearchParams } from '@interfaces/common.interface';

export abstract class WeatherRepository {
  abstract getWeatherForCities(cities: string[]): Observable<WeatherResponse>;
  abstract getWeatherForCitiesPaginated(page: number, pageSize: number): Observable<WeatherResponse>;
  abstract searchWeatherByCity(searchParams: SearchParams): Observable<Weather>;
  abstract getCurrentWeather(cityName: string): Observable<Weather>;
}