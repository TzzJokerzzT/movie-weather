export const API_ENDPOINTS = {
  MOVIE_DB: {
    BASE_URL: 'https://api.themoviedb.org/3',
    POPULAR_MOVIES: '/movie/popular',
    SEARCH_MOVIES: '/search/movie',
    MOVIE_DETAILS: '/movie',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  },
  WEATHER: {
    BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
  },
} as const;

// Ciudades mockeadas con sus coordenadas lat/lon
export interface MockCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const MOCK_CITIES: MockCity[] = [
  { name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 },
  { name: 'Barcelona', country: 'ES', lat: 41.3851, lon: 2.1734 },
  { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
  { name: 'Rome', country: 'IT', lat: 41.9028, lon: 12.4964 },
  { name: 'Amsterdam', country: 'NL', lat: 52.3676, lon: 4.9041 },
  { name: 'Vienna', country: 'AT', lat: 48.2082, lon: 16.3738 },
  { name: 'Prague', country: 'CZ', lat: 50.0755, lon: 14.4378 },
  { name: 'Warsaw', country: 'PL', lat: 52.2297, lon: 21.0122 },
  { name: 'Stockholm', country: 'SE', lat: 59.3293, lon: 18.0686 },
  { name: 'Oslo', country: 'NO', lat: 59.9139, lon: 10.7522 },
  { name: 'Copenhagen', country: 'DK', lat: 55.6761, lon: 12.5683 },
  { name: 'Helsinki', country: 'FI', lat: 60.1699, lon: 24.9384 },
  { name: 'Lisbon', country: 'PT', lat: 38.7223, lon: -9.1393 },
  { name: 'Dublin', country: 'IE', lat: 53.3498, lon: -6.2603 },
  { name: 'Brussels', country: 'BE', lat: 50.8503, lon: 4.3517 },
  { name: 'Zurich', country: 'CH', lat: 47.3769, lon: 8.5417 },
  { name: 'Luxembourg', country: 'LU', lat: 49.6117, lon: 6.1319 },
  { name: 'Monaco', country: 'MC', lat: 43.7384, lon: 7.4246 },
  // Ciudades internacionales populares
  { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
  { name: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 },
  { name: 'Chicago', country: 'US', lat: 41.8781, lon: -87.6298 },
  { name: 'Miami', country: 'US', lat: 25.7617, lon: -80.1918 },
  { name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832 },
  { name: 'Vancouver', country: 'CA', lat: 49.2827, lon: -123.1207 },
  { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { name: 'Seoul', country: 'KR', lat: 37.5665, lon: 126.9780 },
  { name: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074 },
  { name: 'Shanghai', country: 'CN', lat: 31.2304, lon: 121.4737 },
  { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi', country: 'IN', lat: 28.7041, lon: 77.1025 },
  { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { name: 'Melbourne', country: 'AU', lat: -37.8136, lon: 144.9631 },
  { name: 'São Paulo', country: 'BR', lat: -23.5558, lon: -46.6396 },
  { name: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729 },
  { name: 'Buenos Aires', country: 'AR', lat: -34.6118, lon: -58.3960 },
  { name: 'Mexico City', country: 'MX', lat: 19.4326, lon: -99.1332 },
  { name: 'Lagos', country: 'NG', lat: 6.5244, lon: 3.3792 },
  { name: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357 }
] as const;

// Ciudades por defecto para mostrar inicialmente (todas las disponibles)
export const DEFAULT_CITIES: string[] = MOCK_CITIES.map(city => city.name);
