"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IAAnalysis, UserData, UserRoutine } from "../types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  User,
  LogOut,
  Apple,
  Flame,
  Zap,
  ShieldAlert,
  TrendingUp,
  Dumbbell,
  BrainCircuit,
  Utensils,
  RefreshCw,
} from "lucide-react";
import { aiService } from "../services/aiServices";
import { calculateBMI, getHealthyWeightRange } from "@/lib/utils";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import MetricCard from "@/components/MetriCard";

export default function DashboardPage() {
  const [data, setData] = useState<{
    userData: UserData;
    routine: UserRoutine;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<IAAnalysis | null>(null);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const localData = localStorage.getItem("userData");

        if (!localData) {
          toast.error("No se encontraron datos", {
            description: "Por favor completa el formulario de perfil primero.",
            action: {
              label: "Ir al Inicio",
              onClick: () => (window.location.href = "/"),
            },
          });
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(localData);
        setData(parsed);

        const iaResponse = await aiService.analyzeData(parsed);
        setRes(iaResponse as unknown as IAAnalysis);

        toast.success("Datos sincronizados", {
          description: "Tu análisis biométrico está actualizado.",
          duration: 2000,
        });
      } catch (err) {
        console.error(err);
        toast.error("Error de análisis", {
          description:
            "No pudimos procesar los datos con la IA en este momento.",
        });
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-muted p-6 rounded-full">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Esperando información</h2>
        <p className="text-muted-foreground max-w-sm">
          No hemos encontrado datos biométricos recientes. Necesitas configurar
          tu perfil para ver el dashboard.
        </p>
        <Button onClick={() => (window.location.href = "/")}>
          Configurar Perfil
        </Button>
      </div>
    );
  }

  const bmi = Number(calculateBMI(data.userData.weight, data.userData.height));
  const healthy = getHealthyWeightRange(data.userData.height);
  const progressPercentage = res?.metabolismo
    ? (res.metabolismo.objetivo_calorico /
        res.metabolismo.calorias_mantenimiento) *
      100
    : 0;

  return (
    <div className="min-h-screen bg-background/50 p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-widest">
              Sistema en línea
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Health Core</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.reload()}
            title="Recargar datos"
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast.promise(
                new Promise((resolve) => {
                  localStorage.clear();
                  setTimeout(resolve, 1000);
                }),
                {
                  loading: "Cerrando sesión...",
                  success: () => {
                    window.location.href = "/";
                    return "Sesión cerrada correctamente";
                  },
                  error: "Error al cerrar sesión",
                },
              );
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Salir
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden">
              <CardHeader className="pb-2 relative z-10">
                <CardDescription>Objetivo Diario</CardDescription>
                <div className="flex items-baseline gap-1">
                  <h2 className="text-5xl font-extrabold tracking-tighter text-foreground">
                    {res?.metabolismo.objetivo_calorico || "---"}
                  </h2>
                  <span className="text-lg font-medium text-muted-foreground">
                    kcal
                  </span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center gap-4 text-sm mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur"
                  >
                    TMB: {res?.metabolismo.tmb}
                  </Badge>
                  <span className="text-muted-foreground text-xs">
                    Mant: {res?.metabolismo.calorias_mantenimiento}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </CardContent>

              <Flame className="absolute -right-6 -top-6 h-48 w-48 text-primary/5 rotate-12" />
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <MetricCard
                    label="Proteína"
                    value={`${res?.macros.proteinas || 0}g`}
                    icon={<Dumbbell className="h-4 w-4 text-sky-500" />}
                    className="text-blue-600 dark:text-blue-400"
                  />
                  <MetricCard
                    label="Carbos"
                    value={`${res?.macros.carbohidratos || 0}g`}
                    icon={<Zap className="h-4 w-4 text-amber-500" />}
                    className="text-amber-600 dark:text-amber-400"
                  />
                  <MetricCard
                    label="Grasas"
                    value={`${res?.macros.grasas || 0}g`}
                    icon={<Apple className="h-4 w-4 text-emerald-500" />}
                    className="text-rose-600 dark:text-rose-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <User className="h-4 w-4" /> Datos Biométricos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <MetricCard
                  label="IMC"
                  value={bmi.toFixed(1)}
                  sub="kg/m²"
                  trend={
                    healthy ? `Ideal: ${healthy.min}-${healthy.max}` : undefined
                  }
                />
                <MetricCard
                  label="Peso"
                  value={data.userData.weight}
                  sub="kg"
                />
                <MetricCard
                  label="Altura"
                  value={data.userData.height}
                  sub="cm"
                />
                <MetricCard label="Edad" value={data.userData.age} sub="años" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="h-full border-none shadow-lg bg-card/50 backdrop-blur-sm ring-1 ring-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-indigo-500" />
                  <CardTitle className="text-lg">Análisis IA</CardTitle>
                </div>
                {res && (
                  <Badge
                    variant={
                      Number(res.analisis_rutina.puntuacion_eficiencia) >= 8
                        ? "default"
                        : "secondary"
                    }
                  >
                    Score: {res.analisis_rutina.puntuacion_eficiencia}/10
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-3 mt-2 text-xs md:text-sm">
                {res?.analisis_rutina.critica || "Analizando rutina..."}
              </CardDescription>
            </CardHeader>

            <Separator className="mb-4" />

            <CardContent className="space-y-6">
              <Alert className="bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900">
                <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <AlertTitle className="text-indigo-900 dark:text-indigo-200 text-sm font-bold">
                  Estrategia Clave
                </AlertTitle>
                <AlertDescription className="text-indigo-800 dark:text-indigo-300 text-xs mt-1">
                  {res?.plan_accion.ajuste_inmediato ||
                    "Generando estrategia..."}
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Utensils className="h-3 w-3" /> Recomendaciones Nutricionales
                </h4>
                <div className="flex flex-wrap gap-2">
                  {res?.plan_accion.alimentos_clave.map((item, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-background hover:bg-accent transition-colors"
                    >
                      {item}
                    </Badge>
                  )) || (
                    <div className="h-8 w-full bg-muted/50 rounded animate-pulse" />
                  )}
                </div>
              </div>

              {res?.advertencias && res.advertencias.length > 0 && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                  <div className="flex items-center gap-2 text-destructive mb-2">
                    <ShieldAlert className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase">
                      Precauciones
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                    {res.advertencias.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
