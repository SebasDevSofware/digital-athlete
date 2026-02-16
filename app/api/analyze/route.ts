import { getEnvironmentData } from "@/app/services/getEnvData";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const gemini = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
);

export async function POST(req: Request) {
  const { userData, routine } = await req.json();

  const environmentData = await getEnvironmentData(userData.lat, userData.lot);
  console.log(environmentData);

  const model = gemini.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `
  Actúa como un Nutricionista Clínico, Coach Deportivo de Élite y Especialista en Salud Ambiental. 
  
  CONTEXTO DEL USUARIO:
  - Biometría: ${JSON.stringify(userData)}
  - Entrenamiento: ${JSON.stringify(routine)}
  - Entorno Actual (Cambio Climático/Calidad del Aire): ${JSON.stringify(environmentData)}

  TAREA:
  Analiza los datos biométricos junto con las condiciones climáticas externas para generar un plan integral de optimización en formato JSON.
  
  REGLAS DE RESPUESTA:
  1. Calcula el TMB usando la fórmula de Harris-Benedict.
  2. Determina macros según el objetivo "${userData.goal}".
  3. Evalúa riesgo de lesiones según: "${userData.limitations ?? "ninguna"}".
  4. CRÍTICO: Ajusta las recomendaciones de hidratación y esfuerzo respiratorio basándote en la temperatura (${environmentData.temp}°C) y la calidad del aire (AQI: ${environmentData.aqi}).
  

  RESPONDE ÚNICAMENTE CON UN OBJETO JSON SIGUIENDO ESTA ESTRUCTURA:
  {
    "metabolismo": {
      "tmb": number,
      "calorias_mantenimiento": number,
      "objetivo_calorico": number
    },
    "macros": {
      "proteinas": "gramos y porcentaje",
      "grasas": "gramos y porcentaje",
      "carbohidratos": "gramos y porcentaje"
    },
    "analisis_rutina": {
      "critica": "string",
      "puntuacion_eficiencia": "1-10" Solo responde con una puntuacion del 1 al 10 siempre,
      "volumen_semanal": "análisis de carga"
    },
    "clima_y_entorno": {
      "riesgo_exposicion": "bajo/medio/alto",
      "impacto_cardiovascular": "string",
      "ajuste_por_contaminacion": "string",
      "hidratacion_climatica": "ml adicionales recomendados"
    },
    "plan_accion": {
      "alimentos_clave": ["string", "string", "string"],
      "ajuste_inmediato": "string",
      "suplementacion_sugerida": ["string", "string"]
    },
    "advertencias": ["string"]
  }
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return NextResponse.json(JSON.parse(response));
}
