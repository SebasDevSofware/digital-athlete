# Digital Athlete

## Descripción General

Digital Athlete es una aplicación diseñada para ayudar a los usuarios a optimizar su rendimiento físico y salud mediante análisis personalizados basados en datos biométricos, rutinas de entrenamiento y factores ambientales.

## Estructura del Proyecto

La aplicación está organizada en las siguientes carpetas principales:

- **app/**: Contiene las páginas y rutas principales de la aplicación.
  - **createUser/**: Página para configurar el perfil del usuario.
  - **dashboard/**: Página principal que muestra análisis y recomendaciones personalizadas.
  - **api/**: Endpoints para procesar datos, como `/analyze`.
  - **hooks/**: Hooks personalizados como `useIAResponse` para manejar lógica de estado y datos.
  - **services/**: Servicios para interactuar con APIs externas y manejar lógica de negocio.
- **components/**: Componentes reutilizables de la interfaz de usuario.
  - **ui/**: Componentes básicos como botones, inputs, y tarjetas.
  - **skeletons/**: Componentes de carga como `DashboardSkeleton`.
- **lib/**: Funciones utilitarias y cliente API.
- **public/**: Archivos estáticos como imágenes y fuentes.

## Flujo de la Aplicación

1. **Inicio**: El usuario comienza en la página de configuración (`/createUser`) donde ingresa sus datos biométricos y detalles de su rutina.
2. **Análisis**: Los datos ingresados se validan y almacenan en `localStorage`. Luego, se redirige al usuario al dashboard.
3. **Dashboard**: Se muestran análisis personalizados, incluyendo:
   - Metabolismo y macros.
   - Datos ambientales (si se otorgan permisos de ubicación).
   - Recomendaciones de IA basadas en los datos del usuario.
4. **API**: El endpoint `/api/analyze` procesa los datos del usuario y devuelve análisis detallados.

## Stack Tecnológico

- **Frontend**:
  - Framework: [Next.js](https://nextjs.org/) (React).
  - Componentes UI: TailwindCSS y componentes personalizados.
- **Backend**:
  - API Routes de Next.js para manejar lógica del servidor.
- **Librerías**:
  - `axios`: Para llamadas HTTP.
  - `sonner`: Para notificaciones y toasts.
- **Integraciones**:
  - OpenWeatherMap API: Para datos climáticos y de calidad del aire.

## Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env.local` y agrega tu clave de API de OpenWeatherMap:
     ```env
     OPENWEATHERMAP_API_KEY=tu_api_key
     ```
4. Ejecuta el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
5. Abre la aplicación en [http://localhost:3000](http://localhost:3000).

## Contribución

1. Crea un branch para tu feature o fix:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
2. Realiza tus cambios y crea un commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
3. Sube tus cambios y crea un Pull Request.

## TODOs

- Mejorar el diseño responsivo del dashboard.
- Componetizar la función `getCoords`.
- Mostrar datos ambientales cuando la ubicación es desconocida.

---

**Diseñado para maximizar el rendimiento físico y la salud.**
