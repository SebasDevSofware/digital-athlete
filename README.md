# CONTEXT.md

## Resumen del Proyecto

**Atleta Digital** es una aplicación web de coaching personalizado para fitness y nutrición que aprovecha la inteligencia artificial para proporcionar recomendaciones de salud adaptadas a cada usuario. La plataforma funciona como un entrenador personal y nutricionista digital, analizando datos biométricos individuales junto con condiciones ambientales en tiempo real para ofrecer recomendaciones accionables que optimizan el rendimiento deportivo y el bienestar general.

## El Problema que Resuelve

Los atletas y entusiastas del fitness frecuentemente enfrentan dificultades con consejos genéricos de entrenamiento y nutrición que no consideran sus circunstancias particulares. Los desafíos principales incluyen:

- **Recomendaciones estandarizadas**: La mayoría de las aplicaciones de fitness ofrecen consejos homogéneos que ignoran las diferencias individuales en composición corporal, objetivos y circunstancias
- **Factores ambientales ignorados**: Las condiciones climáticas, la calidad del aire y la temperatura impactan significativamente en la seguridad y efectividad del entrenamiento, sin embargo rara vez se consideran en la planificación fitness
- **Seguimiento fragmentado**: Los usuarios deben manejar múltiples aplicaciones para controlar nutrición, planificar entrenamientos y monitorear su salud
- **Falta de orientación profesional**: Los entrenadores personales y nutricionistas son costosos, haciendo que el asesoramiento experto sea inaccesible para muchos
- **Sobrecarga de información**: La abundancia de información fitness contradictoria dificulta que los usuarios determinen qué funciona realmente para su situación específica

## Audiencia Objetivo

- **Entusiastas del fitness** que buscan orientación personalizada sin el costo de un entrenador personal
- **Atletas amateur y recreativos** interesados en optimizar su entrenamiento y nutrición
- **Personas con objetivos fitness específicos** como ganar masa muscular, perder grasa, mejorar resistencia o mantener peso
- **Usuarios conscientes de su salud** que desean recomendaciones basadas en ciencia adaptadas a su perfil biométrico
- **Usuarios hispanohablantes** (idioma principal de la aplicación)

## Características y Funcionalidades Principales

### Creación de Perfil de Usuario
Los usuarios crean un perfil completo ingresando datos biométricos que incluyen edad, peso, altura, género, nivel de actividad y objetivo fitness principal (perder grasa, ganar músculo, mantener peso o mejorar resistencia). También proporcionan detalles de entrenamiento como frecuencia semanal, duración de las sesiones, nivel de experiencia y una descripción de su rutina actual.

### Análisis Personalizado con Inteligencia Artificial
La aplicación utiliza Google Gemini AI para analizar el perfil completo del usuario y generar recomendaciones personalizadas que incluyen:
- **Cálculos metabólicos**: Tasa metabólica basal (TMB), calorías de mantenimiento e ingesta calórica objetivo basada en la fórmula de Harris-Benedict
- **Distribución de macronutrientes**: Recomendaciones personalizadas de proteínas, carbohidratos y grasas alineadas con el objetivo fitness del usuario
- **Puntuación de eficiencia de rutina**: Una calificación del 1 al 10 sobre la efectividad del entrenamiento con crítica detallada y sugerencias de mejora
- **Planes de acción**: Ajustes estratégicos inmediatos y recomendaciones de alimentos clave

### Integración de Contexto Ambiental
La aplicación solicita permiso de ubicación para obtener datos ambientales en tiempo real incluyendo temperatura, humedad e índice de calidad del aire (AQI). Esta información se analiza para proporcionar:
- **Evaluación de riesgo de exposición**: Clasificación de riesgo bajo, medio o alto basada en las condiciones actuales
- **Impacto cardiovascular**: Cómo las condiciones climáticas pueden afectar la salud cardíaca durante el ejercicio
- **Ajustes por calidad del aire**: Recomendaciones para modificar el entrenamiento al aire libre según los niveles de contaminación
- **Recomendaciones de hidratación**: Necesidades adicionales de ingesta de agua basadas en temperatura y humedad

### Advertencias y Precauciones de Salud
Basado en el análisis de IA y los datos ambientales, los usuarios reciben advertencias personalizadas sobre riesgos potenciales relacionados con la intensidad de entrenamiento, exposición ambiental y necesidades nutricionales.

### Panel de Progreso
Un panel centralizado muestra todos los datos personalizados en un formato visual organizado con:
- Objetivos calóricos diarios con seguimiento de progreso
- Distribución de macronutrientes (proteínas, carbohidratos, grasas)
- Resumen biométrico (IMC, rango de peso saludable, medidas corporales)
- Condiciones ambientales con indicadores de riesgo
- Estrategias generadas por IA y sugerencias de alimentos

### Gestión de Sesiones
Los usuarios pueden guardar su perfil localmente para conveniencia y cerrar sesión cuando terminen, con persistencia de datos entre sesiones.

## Resumen del Stack Tecnológico

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Componentes UI**: Primitivos Radix UI, componentes shadcn/ui, iconos Lucide
- **Integración IA**: Google Generative AI (modelo Gemini 2.5 Flash)
- **APIs Externas**: OpenWeatherMap API (datos climáticos y de contaminación del aire)
- **Manejo de Formularios**: React Hook Form
- **Estilos**: Tailwind CSS 4 con configuración de tema personalizado
- **Herramientas de Build**: SWC, PostCSS
