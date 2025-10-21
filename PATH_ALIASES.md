# Path Aliases Configuration

Este documento describe la configuración de path aliases (alias de rutas) implementada en el proyecto para mejorar la legibilidad y mantenibilidad del código.

## 🎯 Beneficios

- **📁 Imports más limpios**: Evita rutas relativas largas como `../../../`
- **🔄 Refactoring más fácil**: Cambiar la estructura de carpetas no rompe los imports
- **📖 Mejor legibilidad**: Rutas semánticamente claras
- **⚡ Autocompletado mejorado**: IDE puede sugerir mejor las rutas

## ⚙️ Configuración

Los path aliases están configurados en `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/app/core/*"],
      "@domain/*": ["src/app/core/domain/*"],
      "@entities/*": ["src/app/core/domain/entities/*"],
      "@repositories/*": ["src/app/core/domain/repositories/*"],
      "@use-cases/*": ["src/app/core/domain/use-cases/*"],
      "@infrastructure/*": ["src/app/infrastructure/*"],
      "@presentation/*": ["src/app/presentation/*"],
      "@components/*": ["src/app/presentation/components/*"],
      "@pages/*": ["src/app/presentation/pages/*"],
      "@shared/*": ["src/app/shared/*"],
      "@constants/*": ["src/app/shared/constants/*"],
      "@interfaces/*": ["src/app/shared/interfaces/*"],
      "@providers/*": ["src/app/shared/providers/*"],
      "@environment/*": ["src/environment/*"],
      "@assets/*": ["public/assets/*"],
      "~/*": ["src/*"]
    }
  }
}
```

## 📚 Uso de los Aliases

### Antes (rutas relativas)
```typescript
import { MovieUseCase } from '../../../core/domain/use-cases/movie.use-case';
import { Weather } from '../../../core/domain/entities/weather.entity';
import { API_ENDPOINTS } from '../../../shared/constants/api.constants';
```

### Después (path aliases)
```typescript
import { MovieUseCase } from '@use-cases/movie.use-case';
import { Weather } from '@entities/weather.entity';
import { API_ENDPOINTS } from '@constants/api.constants';
```

## 🗂️ Aliases Disponibles

| Alias | Ruta Real | Uso |
|-------|-----------|-----|
| `@app/*` | `src/app/*` | Cualquier archivo en la carpeta app |
| `@core/*` | `src/app/core/*` | Archivos del núcleo de la aplicación |
| `@domain/*` | `src/app/core/domain/*` | Capa de dominio |
| `@entities/*` | `src/app/core/domain/entities/*` | Entidades del dominio |
| `@repositories/*` | `src/app/core/domain/repositories/*` | Interfaces de repositorios |
| `@use-cases/*` | `src/app/core/domain/use-cases/*` | Casos de uso |
| `@infrastructure/*` | `src/app/infrastructure/*` | Capa de infraestructura |
| `@presentation/*` | `src/app/presentation/*` | Capa de presentación |
| `@components/*` | `src/app/presentation/components/*` | Componentes reutilizables |
| `@pages/*` | `src/app/presentation/pages/*` | Páginas de la aplicación |
| `@shared/*` | `src/app/shared/*` | Código compartido |
| `@constants/*` | `src/app/shared/constants/*` | Constantes |
| `@interfaces/*` | `src/app/shared/interfaces/*` | Interfaces TypeScript |
| `@providers/*` | `src/app/shared/providers/*` | Providers de Angular |
| `@environment/*` | `src/environment/*` | Configuración de entornos |
| `@assets/*` | `public/assets/*` | Recursos estáticos |
| `~/*` | `src/*` | Cualquier archivo en src |

## 🏗️ Ejemplos por Capa Arquitectónica

### Domain Layer (Dominio)
```typescript
// Entities
import { Movie } from '@entities/movie.entity';
import { Weather } from '@entities/weather.entity';

// Repositories
import { MovieRepository } from '@repositories/movie.repository';
import { WeatherRepository } from '@repositories/weather.repository'; 

// Use Cases
import { MovieUseCase } from '@use-cases/movie.use-case';
import { WeatherUseCase } from '@use-cases/weather.use-case';
```

### Infrastructure Layer (Infraestructura)
```typescript
// API Services
import { MovieApiService } from '@infrastructure/repositories/movie/movie-api.service';
import { WeatherApiService } from '@infrastructure/repositories/weather/weather-api.service';
```

### Presentation Layer (Presentación)
```typescript
// Components
import { DataTableComponent } from '@components/data-table/data-table.component';

// Pages
import { HomeComponent } from '@pages/home/home.component';
```

### Shared (Compartido)
```typescript
// Constants
import { API_ENDPOINTS } from '@constants/api.constants';

// Interfaces
import { SearchParams } from '@interfaces/common.interface';

// Providers
import { REPOSITORY_PROVIDERS } from '@providers/repository.providers';
```

### Environment & Assets
```typescript
// Environment
import { environment } from '@environment/environment';

// Assets (en templates)
<img src="@assets/no-image.svg" alt="No image">
```

## 🧪 Testing

Los path aliases funcionan tanto en:
- **Compilación**: `npm run build`
- **Desarrollo**: `npm start` 
- **Testing**: `npm test`
- **TypeScript Check**: `npx tsc --noEmit`

## 📝 Notas Importantes

1. **Herencia**: Los archivos `tsconfig.app.json` y `tsconfig.spec.json` heredan la configuración del `tsconfig.json` principal
2. **IDE Support**: La mayoría de IDEs modernos (VS Code, WebStorm, etc.) soportan automáticamente estos aliases
3. **Refactoring**: Al refactorizar código, los IDEs pueden actualizar automáticamente las importaciones
4. **Consistencia**: Se recomienda usar siempre los aliases en lugar de rutas relativas para mantener consistencia

## 🔄 Migración Completada

Todos los imports existentes en el proyecto han sido actualizados para usar los nuevos path aliases:

- ✅ Components
- ✅ Services  
- ✅ Use Cases
- ✅ Repositories
- ✅ Entities
- ✅ Test files
- ✅ Configuration files

## 🚀 Próximos Pasos

Con esta configuración, el desarrollo futuro será más eficiente:

1. **Nuevos componentes**: Usar aliases desde el inicio
2. **Refactoring**: Cambios estructurales serán más seguros
3. **Colaboración**: Código más legible para el equipo
4. **Escalabilidad**: Preparado para crecimiento del proyecto