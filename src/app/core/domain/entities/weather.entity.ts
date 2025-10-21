export interface Weather {
  id: number;
  cityName: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description?: string;
  icon?: string;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  cloudiness: number;
}

export interface WeatherResponse {
  weather: Weather[];
  totalResults: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
