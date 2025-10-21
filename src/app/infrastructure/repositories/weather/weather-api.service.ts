import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, forkJoin, of, throwError } from 'rxjs';
import { environment } from '@environment/environment';
import { WeatherResponse, Weather } from '@entities/weather.entity';
import { WeatherRepository } from '@repositories/weather.repository';
import { DEFAULT_CITIES, MockCity, API_ENDPOINTS, MOCK_CITIES } from '@constants/api.constants';
import { SearchParams } from '@interfaces/common.interface';
import { OpenWeatherResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService extends WeatherRepository {
  private readonly apiKey = environment.WEATHER_API_KEY;

  constructor(private http: HttpClient) {
    super();
  }

  getWeatherForCities(cities?: string[]): Observable<WeatherResponse> {
    const citiesToFetch = cities && cities.length > 0 ? cities : DEFAULT_CITIES.slice(0, 12); // Limitar a 12 ciudades inicialmente

    const weatherRequests = citiesToFetch.map((cityName) => {
      const city = this.findCityByName(cityName);
      return city ? this.getCurrentWeatherByCoordinates(city) : of(null);
    });

    return forkJoin(weatherRequests).pipe(
      map((weatherData) => {
        const validWeatherData = weatherData.filter((data): data is Weather => data !== null);
        return {
          weather: validWeatherData,
          totalResults: validWeatherData.length,
        };
      }),
    );
  }

  // Método para obtener clima con paginación
  getWeatherForCitiesPaginated(
    page: number = 1,
    pageSize: number = 10,
  ): Observable<WeatherResponse> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const citiesToFetch = DEFAULT_CITIES.slice(startIndex, endIndex);

    if (citiesToFetch.length === 0) {
      return of({ weather: [], totalResults: DEFAULT_CITIES.length });
    }

    const weatherRequests = citiesToFetch.map((cityName) => {
      const city = this.findCityByName(cityName);
      return city ? this.getCurrentWeatherByCoordinates(city) : of(null);
    });

    return forkJoin(weatherRequests).pipe(
      map((weatherData) => {
        const validWeatherData = weatherData.filter((data): data is Weather => data !== null);
        return {
          weather: validWeatherData,
          totalResults: DEFAULT_CITIES.length, // Total de ciudades disponibles
        };
      }),
    );
  }

  searchWeatherByCity(searchParams: SearchParams): Observable<Weather> {
    const query = searchParams.query?.toLowerCase().trim() || '';

    if (!query) {
      return throwError(() => new Error('Ciudad no especificada'));
    }

    const city = this.findCityByName(query);

    if (!city) {
      return throwError(
        () => new Error(`Ciudad "${query}" no encontrada en la lista de ciudades disponibles`),
      );
    }

    return this.getCurrentWeatherByCoordinates(city);
  }

  getCurrentWeather(cityName: string): Observable<Weather> {
    const city = this.findCityByName(cityName);

    if (!city) {
      return throwError(
        () => new Error(`Ciudad "${cityName}" no encontrada en la lista de ciudades disponibles`),
      );
    }

    return this.getCurrentWeatherByCoordinates(city);
  }

  private getCurrentWeatherByCoordinates(city: MockCity): Observable<Weather> {
    // Verificar si tenemos API key
    if (!this.apiKey || this.apiKey === 'your_openweather_api_key_here') {
      return throwError(
        () =>
          new Error(
            'API key de OpenWeather no configurada. Por favor configura WEATHER_API_KEY en el archivo .env',
          ),
      );
    }

    const httpParams = new HttpParams()
      .set('lat', city.lat.toString())
      .set('lon', city.lon.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric'); // Para obtener temperatura en Celsius

    const url = `${API_ENDPOINTS.WEATHER.BASE_URL}`;

    return this.http
      .get<OpenWeatherResponse>(url, { params: httpParams })
      .pipe(map((response) => this.mapOpenWeatherResponse(response, city)));
  }

  private findCityByName(cityName: string): MockCity | undefined {
    const searchName = cityName.toLowerCase().trim();

    // Búsqueda exacta primero
    let found = MOCK_CITIES.find((city) => city.name.toLowerCase() === searchName);

    // Si no encuentra exacta, búsqueda por coincidencia parcial
    if (!found) {
      found = MOCK_CITIES.find(
        (city) =>
          city.name.toLowerCase().includes(searchName) ||
          searchName.includes(city.name.toLowerCase()) ||
          city.country.toLowerCase() === searchName ||
          city.country.toLowerCase().includes(searchName),
      );
    }

    return found;
  }

  private mapOpenWeatherResponse(response: OpenWeatherResponse, mockCity: MockCity): Weather {
    const weatherCondition = response.weather[0];

    return {
      id: response.id,
      cityName: response.name || mockCity.name,
      country: response.sys.country || mockCity.country,
      temperature: Math.round(response.main.temp),
      feelsLike: Math.round(response.main.feels_like),
      humidity: response.main.humidity,
      pressure: response.main.pressure,
      description: weatherCondition?.description || 'No description available',
      icon: weatherCondition?.icon,
      windSpeed: Math.round(response.wind?.speed * 10) / 10, // Redondear a 1 decimal
      windDirection: response.wind?.deg || 0,
      visibility: response.visibility || 0,
      cloudiness: response.clouds?.all || 0,
    };
  }

  // Método para obtener la lista de ciudades disponibles (útil para autocompletado)
  getAvailableCities(): string[] {
    return MOCK_CITIES.map((city) => `${city.name}, ${city.country}`).sort();
  }

  // Método para buscar ciudades por nombre (útil para filtros)
  searchCities(query: string): MockCity[] {
    const searchQuery = query.toLowerCase().trim();
    if (!searchQuery) return MOCK_CITIES.slice(0, 20); // Primeras 20 si no hay query

    return MOCK_CITIES.filter(
      (city) =>
        city.name.toLowerCase().includes(searchQuery) ||
        city.country.toLowerCase().includes(searchQuery) ||
        `${city.name.toLowerCase()}, ${city.country.toLowerCase()}`.includes(searchQuery),
    ).slice(0, 20); // Máximo 20 resultados
  }

  // Método para obtener todas las ciudades mockeadas
  getAllMockCities(): MockCity[] {
    return [...MOCK_CITIES];
  }

  // Método para obtener información de una ciudad específica
  getCityInfo(cityName: string): MockCity | undefined {
    return this.findCityByName(cityName);
  }
}
