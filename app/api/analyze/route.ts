import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const gemini = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
);

export async function POST(req: Request) {
  const { userData, routine } = await req.json();

  const model = gemini.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `
  Actúa como un Nutricionista Clínico y Coach Deportivo de Élite. 
  
  CONTEXTO DEL USUARIO:
  - Biometría: ${JSON.stringify(userData)}
  - Entrenamiento: ${JSON.stringify(routine)}

  TAREA:
  Analiza los datos y genera un plan integral de optimización en formato JSON.
  
  REGLAS DE RESPUESTA:
  1. Calcula el TMB (Tasa Metabólica Basal) usando la fórmula de Harris-Benedict.
  2. Determina la distribución de Macronutrientes según el objetivo "${userData.goal}".
  3. Evalúa el riesgo de lesiones según las limitaciones: "${userData.limitations ?? "ninguna"}".

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
      "puntuacion_eficiencia": "1-10",
      "volumen_semanal": "análisis de carga"
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
