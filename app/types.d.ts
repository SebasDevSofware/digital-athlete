export type Gender = "masculino" | "femenino" | "otro";
export type ActivityLevel =
  | "sedentario"
  | "ligero"
  | "moderado"
  | "intenso"
  | "atleta";
export type Goal =
  | "perder_grasa"
  | "ganar_musculo"
  | "mantener"
  | "mejorar_resistencia";

export type UserData = {
  age: int;
  weight: float;
  gender: Gender;
  height: float;
  activityLevel: ActivityLevel;
  limitations?: string;
  goal: Goal;
};

export type ExperienceLevel = "principiante" | "intermedio" | "avanzado";

export interface UserRoutine {
  description: string;
  frequency: number;
  duration: number;
  experienceLevel: ExperienceLevel;
  lastUpdated: string;
}

export interface IAAnalysis {
  metabolismo: {
    tmb: number;
    calorias_mantenimiento: number;
    objetivo_calorico: number;
  };
  macros: {
    proteinas: string;
    grasas: string;
    carbohidratos: string;
  };
  analisis_rutina: {
    critica: string;
    puntuacion_eficiencia: string;
    volumen_semanal: string;
  };
  plan_accion: {
    alimentos_clave: string[];
    ajuste_inmediato: string;
    suplementacion_sugerida: string[];
  };
  advertencias: string[];
}
