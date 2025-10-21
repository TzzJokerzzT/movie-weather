# 🎬🌤️ Movie Weather App

Una aplicación moderna construida con **Angular 19** que demuestra la implementación de **arquitectura hexagonal** con integración de dos fuentes de datos: información de películas desde **The Movie DB API** y datos meteorológicos desde **OpenWeather API**.

## 📋 Tabla de Contenidos

- [Introducción](#-introducción)
- [Características](#-características)
- [Arquitectura](#️-arquitectura)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#️-instalación-y-configuración)
- [Configuración de API Keys](#-configuración-de-api-keys)
- [Uso de la Aplicación](#-uso-de-la-aplicación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Mejoras Futuras](#-mejoras-futuras)

## 🚀 Introducción

**Movie Weather App** es una aplicación web desarrollada como prueba técnica que implementa patrones de arquitectura limpia y mejores prácticas de desarrollo frontend. La aplicación permite a los usuarios:

- 🎭 **Explorar películas populares** y buscar títulos específicos usando The Movie DB API
- 🌍 **Consultar información meteorológica** de 40+ ciudades mockeadas (funciona sin API key) o datos reales con OpenWeather API
- 📱 **Navegar de forma intuitiva** con una interfaz responsive basada en Material Design
- 🔍 **Filtrar y paginar datos** de manera eficiente

La aplicación destaca por su implementación de **arquitectura hexagonal**, separación clara de responsabilidades y uso de las últimas características de Angular 19, incluyendo **standalone components** y **signals** para manejo de estado reactivo.

## ✨ Características

### 🏗️ Arquitectura y Patrones

- **🔸 Arquitectura Hexagonal**: Separación clara entre dominio, infraestructura y presentación
- **🔸 Standalone Components**: Enfoque moderno de Angular 19 sin módulos tradicionales
- **🔸 Signals**: Manejo de estado reactivo y eficiente
- **🔸 Repository Pattern**: Abstracción de acceso a datos
- **🔸 Use Cases**: Encapsulación de lógica de negocio
- **🔸 Dependency Injection**: Bajo acoplamiento entre componentes

### 🎨 Interfaz de Usuario

- **🔸 Material Design**: Componentes de Angular Material con tema personalizado
- **🔸 Responsive Design**: Adaptable a dispositivos móviles y desktop
- **🔸 Navegación por Tabs**: Cambio fluido entre películas y clima
- **🔸 Búsqueda en Tiempo Real**: Filtrado con debounce para optimizar requests
- **🔸 Paginación Avanzada**: Control de páginas y tamaño de resultados
- **🔸 Estados de Carga**: Indicadores visuales para mejor UX
- **🔸 Manejo de Errores**: Feedback claro al usuario en caso de fallos

### 🔧 Características Técnicas

- **🔸 TypeScript**: Tipado fuerte en toda la aplicación
- **🔸 Lazy Loading**: Carga optimizada de componentes
- **🔸 HTTP Interceptors**: Manejo centralizado de requests y errores
- **🔸 Environment Variables**: Configuración segura de API keys
- **🔸 Mocked Cities**: 40+ ciudades predefinidas para funcionalidad sin API key
- **🔸 Unit Testing**: Cobertura de pruebas con Jasmine y Karma
- **🔸 Build Optimization**: Configuración para producción optimizada

## 🏗️ Arquitectura

La aplicación implementa **Arquitectura Hexagonal** (también conocida como Ports and Adapters), organizando el código en capas bien definidas:

```
src/app/
├── 🎯 core/domain/              # CAPA DE DOMINIO
│   ├── entities/                # Modelos de datos del negocio
│   │   ├── movie.entity.ts      # Entidades de películas
│   │   └── weather.entity.ts    # Entidades del clima
│   ├── repositories/            # Interfaces de repositorios
│   │   ├── movie.repository.ts  # Contrato para datos de películas
│   │   └── weather.repository.ts# Contrato para datos del clima
│   └── use-cases/               # Casos de uso del negocio
│       ├── movie.use-case.ts    # Lógica de negocio de películas
│       └── weather.use-case.ts  # Lógica de negocio del clima
│
├── 🔌 infrastructure/           # CAPA DE INFRAESTRUCTURA
│   └── repositories/            # Implementaciones de APIs externas
│       ├── movie-api.service.ts # Adaptador para Movie DB API
│       └── weather-api.service.ts# Adaptador para OpenWeather API
│
├── 🎨 presentation/             # CAPA DE PRESENTACIÓN
│   ├── components/              # Componentes reutilizables
│   │   └── data-table/          # Tabla de datos principal
│   └── pages/                   # Páginas de la aplicación
│       └── home/                # Página principal
│
└── 🛠️ shared/                   # UTILIDADES COMPARTIDAS
    ├── constants/               # Constantes de la aplicación
    ├── interfaces/              # Interfaces comunes
    └── providers/               # Configuración de DI
```

### Principios Arquitectónicos Implementados

1. **🎯 Inversión de Dependencias**: El dominio no depende de la infraestructura
2. **🔄 Separación de Responsabilidades**: Cada capa tiene un propósito específico
3. **🧩 Bajo Acoplamiento**: Componentes independientes y testeable
4. **🔧 Alta Cohesión**: Funcionalidades relacionadas agrupadas
5. **📝 Principio Abierto/Cerrado**: Extensible sin modificar código existente

## 📋 Requisitos Previos

Antes de instalar y ejecutar la aplicación, asegúrate de tener instalado:

- **Node.js** (versión 18.x o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js) o **yarn**
- **Angular CLI** (opcional, pero recomendado)

  ```bash
  npm install -g @angular/cli
  ```

Para verificar las versiones instaladas:

```bash
node --version
npm --version
ng version  # Si tienes Angular CLI instalado
```

## 🛠️ Instalación y Configuración

### 1. **Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/movie-weather.git
cd movie-weather
```

### 2. **Instalar Dependencias**

```bash
npm install
```

Este comando instalará todas las dependencias necesarias incluyendo:

- Angular 19 y Angular Material
- RxJS para programación reactiva
- TypeScript
- Herramientas de testing (Jasmine, Karma)

### 3. **Verificar la Instalación**

```bash
npm run build
```

Si todo está correcto, deberías ver un mensaje de éxito indicando que la aplicación se compiló correctamente.

### 4. **Ejecutar la Aplicación**

```bash
npm start
```

**✅ ¡Listo!** La aplicación funcionará completamente:

- **Películas**: Con las API keys incluidas
- **Clima**: Con 40+ ciudades mockeadas (sin configuración adicional necesaria)

## 🔑 Configuración de API Keys

La aplicación requiere API keys de dos servicios externos. Sigue estos pasos para configurarlas:

### 📁 Archivo de Configuración

El archivo `.env` en la raíz del proyecto contiene las variables de entorno:

```env
# -- MOVIE DB API --
ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTkyYzBmYTlhMTVjNWY2YWMwZTlhY2NhMDdiNjZjMSIsIm5iZiI6MTcyNTExMjM0MC42MzEsInN1YiI6IjY2ZDMyMDE0Mjc2NjdlM2I4NDk0NGQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h9g7sEc9dAfAUgvQ91gkSi0uebkwmE1vkZ59rHWJfWg
API_KEY=0e92c0fa9a15c5f6ac0e9acca07b66c1

# -- WEATHER API --
WEATHER_API_KEY=your_openweather_api_key_here
```

### 🎬 The Movie DB API (Ya Configurado)

La API de películas ya está configurada y lista para usar. Sin embargo, si deseas usar tu propia API key:

1. **Visita**: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. **Crea una cuenta** gratuita
3. **Solicita una API key** en la sección de configuración
4. **Reemplaza** los valores en el archivo `.env`:

   ```env
   ACCESS_TOKEN=tu_access_token_aqui
   API_KEY=tu_api_key_aqui
   ```

### 🌤️ OpenWeather API (Configuración Opcional)

La aplicación incluye un sistema de **ciudades mockeadas** que permite usar la funcionalidad de clima **sin configurar la API key**. Sin embargo, para obtener datos meteorológicos reales, puedes configurar tu propia API key:

#### 🏙️ Sistema de Ciudades Mockeadas

La aplicación incluye **40+ ciudades predefinidas** con sus coordenadas exactas, incluyendo:

- **🇪🇸 España**: Madrid, Barcelona
- **🇬🇧 Reino Unido**: Londres
- **🇫🇷 Francia**: París
- **🇩🇪 Alemania**: Berlín
- **🇺🇸 Estados Unidos**: Nueva York, Los Ángeles, Chicago, Miami
- **🇯🇵 Japón**: Tokio
- **🇨🇳 China**: Beijing, Shanghai
- **🇦🇺 Australia**: Sydney, Melbourne
- **🇧🇷 Brasil**: São Paulo, Río de Janeiro
- **Y muchas más...**

#### ⚙️ Configuración para Datos Reales (Opcional)

Si deseas obtener datos meteorológicos reales y actualizados:

1. **🌐 Visita**: [https://openweathermap.org/api](https://openweathermap.org/api)

2. **📝 Regístrate**: Crea una cuenta gratuita
   - Haz clic en "Sign Up"
   - Completa el formulario con tus datos
   - Verifica tu email

3. **🔑 Obtén tu API Key**:
   - Inicia sesión en tu cuenta
   - Ve a la sección "API Keys" en tu dashboard
   - Copia tu API key (algo como: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

4. **⚙️ Configura la aplicación**:

   ```env
   WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```

5. **✅ Verifica la configuración**:
   - Guarda el archivo `.env`
   - Reinicia el servidor de desarrollo si está ejecutándose
   - La sección de clima obtendrá datos reales de OpenWeather

#### 🏙️ Lista Completa de Ciudades Disponibles

La aplicación incluye las siguientes ciudades mockeadas para pruebas y demostración:

##### 🇪🇺 Europa

| Ciudad     | País               | Ciudad    | País         |
| ---------- | ------------------ | --------- | ------------ |
| Madrid     | 🇪🇸 España          | Barcelona | 🇪🇸 España    |
| London     | 🇬🇧 Reino Unido     | Paris     | 🇫🇷 Francia   |
| Berlin     | 🇩🇪 Alemania        | Rome      | 🇮🇹 Italia    |
| Amsterdam  | 🇳🇱 Países Bajos    | Vienna    | 🇦🇹 Austria   |
| Prague     | 🇨🇿 República Checa | Warsaw    | 🇵🇱 Polonia   |
| Stockholm  | 🇸🇪 Suecia          | Oslo      | 🇳🇴 Noruega   |
| Copenhagen | 🇩🇰 Dinamarca       | Helsinki  | 🇫🇮 Finlandia |
| Lisbon     | 🇵🇹 Portugal        | Dublin    | 🇮🇪 Irlanda   |
| Brussels   | 🇧🇪 Bélgica         | Zurich    | 🇨🇭 Suiza     |
| Luxembourg | 🇱🇺 Luxemburgo      | Monaco    | 🇲🇨 Mónaco    |

##### 🌎 Américas

| Ciudad       | País              | Ciudad         | País              |
| ------------ | ----------------- | -------------- | ----------------- |
| New York     | 🇺🇸 Estados Unidos | Los Angeles    | 🇺🇸 Estados Unidos |
| Chicago      | 🇺🇸 Estados Unidos | Miami          | 🇺🇸 Estados Unidos |
| Toronto      | 🇨🇦 Canadá         | Vancouver      | 🇨🇦 Canadá         |
| São Paulo    | 🇧🇷 Brasil         | Rio de Janeiro | 🇧🇷 Brasil         |
| Buenos Aires | 🇦🇷 Argentina      | Mexico City    | 🇲🇽 México         |

##### 🌏 Asia-Pacífico

| Ciudad  | País         | Ciudad    | País             |
| ------- | ------------ | --------- | ---------------- |
| Tokyo   | 🇯🇵 Japón     | Seoul     | 🇰🇷 Corea del Sur |
| Beijing | 🇨🇳 China     | Shanghai  | 🇨🇳 China         |
| Mumbai  | 🇮🇳 India     | Delhi     | 🇮🇳 India         |
| Sydney  | 🇦🇺 Australia | Melbourne | 🇦🇺 Australia     |

##### 🌍 África

| Ciudad | País       |
| ------ | ---------- |
| Lagos  | 🇳🇬 Nigeria |
| Cairo  | 🇪🇬 Egipto  |

### 🔒 Seguridad de API Keys

**⚠️ Importante**:

- Nunca compartas tus API keys públicamente
- No las subas a repositorios públicos
- El archivo `.env` debe estar en tu `.gitignore`
- En producción, usa variables de entorno del servidor
- **✅ Sin API Key**: La aplicación funciona perfectamente con las ciudades mockeadas

## 📱 Uso de la Aplicación

### 🏠 Página Principal

Al acceder a `http://localhost:4200`, verás la interfaz principal con dos pestañas:

### 🎬 Pestaña de Películas

- **📺 Vista por defecto**: Muestra las películas más populares
- **🔍 Búsqueda**: Escribe en el campo de búsqueda para encontrar películas específicas
- **📄 Información mostrada**:
  - Póster de la película
  - Título
  - Fecha de estreno
  - Calificación promedio
  - Número de votos
- **📊 Paginación**: Navega entre páginas de resultados
- **⚙️ Opciones**: Cambia el número de elementos por página (5, 10, 20, 50)

### 🌤️ Pestaña de Clima

- **🌍 Vista por defecto**: Muestra datos climáticos de **40+ ciudades mockeadas**
- **🔍 Búsqueda inteligente**: Busca entre las ciudades disponibles por nombre o país
- **📊 Información mostrada**:
  - Nombre de la ciudad
  - País (código de 2 letras)
  - Temperatura actual (°C)
  - Descripción del clima
  - Humedad (%)
  - Velocidad del viento (m/s)
- **🎯 Ciudades disponibles**: Madrid, Londres, París, Tokio, Nueva York, y muchas más
- **📄 Paginación**: Navega entre las diferentes ciudades disponibles

### 🎛️ Funcionalidades Interactivas

1. **🔄 Cambio de pestañas**: Clic en "Movies" o "Weather"
2. **🔍 Búsqueda inteligente**:
   - **Películas**: Escribe y los resultados se actualizan automáticamente
   - **Clima**: Busca entre las 40+ ciudades disponibles (ej: "Madrid", "Tokyo", "New York")
3. **📄 Paginación**: Usa los controles inferiores para navegar
4. **🔄 Reintento**: Si hay errores, usa el botón "Retry"
5. **📱 Responsive**: La interfaz se adapta a tu dispositivo

## 📋 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### 🚀 Desarrollo

```bash
# Inicia el servidor de desarrollo
npm start
# o
ng serve

# Abre automáticamente http://localhost:4200
# Los cambios se recargan automáticamente
```

### 🏗️ Construcción

```bash
# Construye la aplicación para producción
npm run build
# o
ng build

# Los archivos se generan en dist/movie-weather/
# Optimizados y minificados para producción
```

### 👀 Desarrollo con Observación

```bash
# Construye y observa cambios
npm run watch
# o
ng build --watch

# Útil para desarrollo sin servidor
```

### 🧪 Testing

```bash
# Ejecuta las pruebas unitarias
npm test
# o
ng test

# Ejecuta en modo watch (observa cambios)
npm run test:watch
```

### 📊 Análisis del Bundle

```bash
# Analiza el tamaño del bundle
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/movie-weather/stats.json
```

## 🧪 Testing

La aplicación incluye una suite completa de pruebas unitarias:

### 🏃‍♂️ Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con coverage
npm test -- --code-coverage

# Ejecutar pruebas específicas
npm test -- --include="**/movie.use-case.spec.ts"
```

### 📊 Cobertura de Pruebas

- **✅ Componentes**: Pruebas de rendering y funcionalidad
- **✅ Servicios**: Pruebas de lógica de negocio
- **✅ Use Cases**: Pruebas de casos de uso
- **✅ Utilities**: Pruebas de funciones auxiliares

### 🧪 Tipos de Pruebas Implementadas

1. **Unit Tests**: Pruebas aisladas de componentes y servicios
2. **Integration Tests**: Pruebas de interacción entre componentes
3. **Mock Testing**: Simulación de APIs y dependencias externas

## 📁 Estructura del Proyecto

```
movie-weather/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 core/domain/          # 🎯 DOMINIO
│   │   │   ├── 📂 entities/         # Modelos de datos
│   │   │   ├── 📂 repositories/     # Contratos de datos
│   │   │   └── 📂 use-cases/        # Lógica de negocio
│   │   ├── 📂 infrastructure/       # 🔌 INFRAESTRUCTURA
│   │   │   └── 📂 repositories/     # Implementaciones API
│   │   ├── 📂 presentation/         # 🎨 PRESENTACIÓN
│   │   │   ├── 📂 components/       # Componentes UI
│   │   │   └── 📂 pages/           # Páginas
│   │   ├── 📂 shared/              # 🛠️ COMPARTIDO
│   │   │   ├── 📂 constants/       # Constantes
│   │   │   ├── 📂 interfaces/      # Interfaces
│   │   │   └── 📂 providers/       # Providers DI
│   │   ├── 📄 app.config.ts        # Configuración de la app
│   │   ├── 📄 app.html             # Template principal
│   │   ├── 📄 app.ts               # Componente raíz
│   │   └── 📄 app.routes.ts        # Configuración de rutas
│   ├── 📄 custom-theme.scss         # Tema personalizado
│   ├── 📄 index.html               # HTML principal
│   ├── 📄 main.ts                  # Punto de entrada
│   └── 📄 styles.css               # Estilos globales
├── 📂 public/                      # Archivos estáticos
│   └── 📂 assets/                  # Imágenes y recursos
├── 📄 .env                         # Variables de entorno
├── 📄 .gitignore                   # Archivos ignorados por Git
├── 📄 angular.json                 # Configuración de Angular
├── 📄 package.json                 # Dependencias del proyecto
├── 📄 README.md                    # Este archivo
├── 📄 tsconfig.json                # Configuración de TypeScript
└── 📄 tsconfig.app.json            # TS config para la app
```

## ⚙️ Tecnologías Utilizadas

### 🅰️ Frontend Framework

- **Angular 19** - Framework principal
- **TypeScript 5.9** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva

### 🎨 UI/UX

- **Angular Material 20** - Componentes de UI
- **Material Design 3** - Sistema de diseño
- **CSS3 & SCSS** - Estilos personalizados
- **Responsive Design** - Adaptabilidad móvil

### 🏗️ Arquitectura y Patrones

- **Hexagonal Architecture** - Arquitectura limpia
- **Repository Pattern** - Abstracción de datos
- **Dependency Injection** - Inversión de control
- **Signals** - Manejo de estado reactivo
- **Standalone Components** - Arquitectura modular

### 🔧 Herramientas de Desarrollo

- **Angular CLI 20** - Herramientas de desarrollo
- **Webpack** - Bundling y optimización
- **Jasmine & Karma** - Testing framework
- **ESLint & Prettier** - Code quality

### 🌐 APIs Externas

- **The Movie DB API** - Datos de películas
- **OpenWeather API** - Datos meteorológicos

### 📦 Gestión de Dependencias

- **npm** - Gestor de paquetes
- **Angular DevKit** - Herramientas de construcción

## 🌟 Mejoras Futuras

### 🎨 UI/UX Enhancements

- [ ] **🌙 Dark Mode**: Tema oscuro con toggle
- [ ] **🎭 Animaciones**: Transiciones suaves entre vistas
- [ ] **♿ Accesibilidad**: Mejoras para usuarios con discapacidades
- [ ] **🖼️ Image Lazy Loading**: Carga diferida de imágenes
- [ ] **📱 PWA**: Funcionalidades de Progressive Web App

### 🚀 Funcionalidades

- [ ] **❤️ Favoritos**: Sistema de películas favoritas
- [ ] **🔄 Sincronización**: Datos en tiempo real
- [ ] **📊 Dashboard**: Panel de control con estadísticas
- [ ] **🌍 Internacionalización**: Soporte multi-idioma
- [ ] **🔔 Notificaciones**: Alertas y notificaciones push

### 🏗️ Arquitectura y Performance

- [ ] **💾 Caching**: Sistema de caché inteligente
- [ ] **🔄 State Management**: NgRx para estado global
- [ ] **⚡ Performance**: Optimizaciones adicionales
- [ ] **📱 Offline Support**: Funcionalidad sin conexión
- [ ] **🐳 Docker**: Containerización de la aplicación

### 🧪 Testing y Calidad

- [ ] **🧪 E2E Testing**: Pruebas end-to-end con Cypress
- [ ] **📊 Code Coverage**: 100% de cobertura de código
- [ ] **🔍 Visual Testing**: Pruebas de regresión visual
- [ ] **⚡ Performance Testing**: Métricas de rendimiento

### 🚀 DevOps y Deployment

- [ ] **🔄 CI/CD**: Pipeline de integración continua
- [ ] **☁️ Cloud Deployment**: Despliegue en la nube
- [ ] **📊 Monitoring**: Monitoreo de aplicación en producción
- [ ] **🔒 Security**: Auditorías de seguridad automatizadas

---

## 👨‍💻 Desarrollado por: Alexis Buelvas

**Prueba Técnica - Frontend Developer**

Aplicación desarrollada siguiendo las mejores prácticas de desarrollo frontend y arquitectura limpia.

### 📞 Contacto

Si tienes preguntas o sugerencias sobre la aplicación:

- 📧 Email: [Alexjesus-4856@hotmail.com]
- 💼 LinkedIn: [https://www.linkedin.com/in/alexis-buelvas/]
-  GitHub: [https://github.com/TzzJokerzzT]

---

**⭐ Si te gusta este proyecto, no olvides darle una estrella!**
