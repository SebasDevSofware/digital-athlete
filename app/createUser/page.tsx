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
import {
  ActivityLevel,
  ExperienceLevel,
  Gender,
  Goal,
  UserData,
  UserRoutine,
} from "../types";
import validationsInputsErrors from "../services/validationsInputsErrors";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<{
    userData: UserData;
    routine: UserRoutine;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
    localStorage.removeItem("iaAnalysis");
    router.push("/dashboard");
  };

  return (
    <Card className="w-full mx-auto border-none shadow-xl bg-gray-100">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-plt-primary">
          Atleta Digital - Crea tu Perfil de Usuario
        </CardTitle>
        <CardDescription className="sm:text-lg text-sm">
          Configura tu perfil físico y tu entrenamiento actual.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Datos Biométricos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Edad</Label>
                <Input
                  className="border-slate-500"
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
                  className="border-slate-500"
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
                  className="border-slate-500"
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
                  <SelectTrigger className="border-slate-500">
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
                  <SelectTrigger className="border-slate-500">
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
                  <SelectTrigger className="border-slate-500">
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
                  className="border-slate-500"
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
                  className="border-slate-500"
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
                  <SelectTrigger className="border-slate-500">
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
                placeholder="Ej: Hago push/pull/legs, No tengo una Rutina"
                className="min-h-25 border-slate-500"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 border-slate-500"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-2" /> Cancelar
              </Link>
            </Button>

            <Button
              type="submit"
              className="w-full bg-plt-primary hover:bg-plt-primary/80 h-12 text-lg hover:cursor-pointer"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analizando..." : "Guardar y Analizar con IA"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
