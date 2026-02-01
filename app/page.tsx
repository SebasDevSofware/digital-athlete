"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ActivityLevel,
  ExperienceLevel,
  Gender,
  Goal,
  UserData,
  UserRoutine,
} from "./types";
import validationsInputsErrors from "./services/validationsInputsErrors";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<{
    userData: UserData;
    routine: UserRoutine;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const validationErrors = validationsInputsErrors(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setIsAnalyzing(true);
    const age = Number(formData.get("age") ?? 0);
    const weight = Number(formData.get("weight") ?? 0);
    const height = Number(formData.get("height") ?? 0);
    const gender = (formData.get("gender") as Gender) ?? "otro";
    const activityLevel =
      (formData.get("activityLevel") as ActivityLevel) ?? "sedentario";
    const goal = (formData.get("goal") as Goal) ?? "mantener";
    const frequency = Number(formData.get("frequency") ?? 0);
    const duration = Number(formData.get("duration") ?? 0);
    const experienceLevel =
      (formData.get("experienceLevel") as ExperienceLevel) ?? "principiante";

    const newData = {
      userData: {
        age,
        weight,
        height,
        gender,
        activityLevel,
        goal,
      },
      routine: {
        description: String(formData.get("description") ?? ""),
        frequency,
        duration,
        experienceLevel,
        lastUpdated: new Date().toISOString(),
      },
    };

    setData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-blue-600">
          Atleta Digital
        </CardTitle>
        <CardDescription>
          Configura tu perfil físico y tu entrenamiento actual.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && (
          <Card className="mt-6 p-4 border bg-gray-50">
            <pre className="text-xs overflow-auto max-h-48">
              {JSON.stringify(data, null, 2)}
            </pre>
          </Card>
        )}

        <div className="mt-10 max-w-3xl mx-auto w-full space-y-6">
          {isAnalyzing && (
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </Card>
          )}

          {analysis && !isAnalyzing && (
            <Card className="p-6 border-blue-200 bg-blue-50/30">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">
                  Análisis de Atleta Digital
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold">Balance de la IA:</h4>
                  <p className="text-gray-700">.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border">
                    <h4 className="font-bold text-sm">Alimentos Sugeridos:</h4>
                    <ul className="list-disc ml-5 text-sm">.</ul>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <h4 className="font-bold text-sm">Ajuste Recomendado:</h4>
                    <p className="text-sm italic text-blue-600">.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Datos Biométricos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Edad</Label>
                <Input
                  type="number"
                  name="age"
                  placeholder="Ej: 30"
                  min={10}
                  max={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Peso (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  name="weight"
                  placeholder="Ej: 70.5"
                  min={30}
                  max={300}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Altura (cm)</Label>
                <Input
                  type="number"
                  name="height"
                  placeholder="Ej: 175"
                  min={100}
                  max={250}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Género</Label>
                <Select name="gender" required aria-required="true">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nivel de Actividad</Label>
                <Select name="activityLevel" required aria-required="true">
                  <SelectTrigger>
                    <SelectValue placeholder="Tu actividad diaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentario</SelectItem>
                    <SelectItem value="ligero">Ligero (1-2 días)</SelectItem>
                    <SelectItem value="moderado">
                      Moderado (3-5 días)
                    </SelectItem>
                    <SelectItem value="intenso">Intenso</SelectItem>
                    <SelectItem value="ateta">Atleta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Objetivo Principal</Label>
                <Select name="goal" required aria-required="true">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu meta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perder_grasa">Perder Grasa</SelectItem>
                    <SelectItem value="ganar_musculo">Ganar Músculo</SelectItem>
                    <SelectItem value="mantener">Mantener Peso</SelectItem>
                    <SelectItem value="mejorar_resistencia">
                      Mejorar Resistencia
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Detalles de Entrenamiento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Días/Semana</Label>
                <Input
                  type="number"
                  name="frequency"
                  placeholder="Ej: 3"
                  min={0}
                  max={14}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Minutos/Sesión</Label>
                <Input
                  type="number"
                  name="duration"
                  placeholder="Ej: 60"
                  min={5}
                  max={600}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Experiencia</Label>
                <Select name="experienceLevel" required aria-required="true">
                  <SelectTrigger>
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Describe tu rutina actual</Label>
              <Textarea
                placeholder="Ej: Hago push/pull/legs..."
                className="min-h-25"
                name="description"
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
              <ul className="list-disc ml-5">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analizando..." : "Guardar y Analizar con IA"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
