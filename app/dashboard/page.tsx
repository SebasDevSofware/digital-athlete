"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IAAnalysis, UserData, UserRoutine } from "../types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, LogOut, BrainCircuit, HomeIcon } from "lucide-react";
import { aiService } from "../services/aiServices";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import IaResponseCard from "@/components/IaResponseCard";
import KcalCard from "@/components/KcalCard";
import EnergyDataCard from "@/components/EnergyDataCard";
import UserBiomtricDataCard from "@/components/UserBiomtricDataCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
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
        const localIARes = localStorage.getItem("iaAnalysis");

        if (!localData) {
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(localData);
        setData(parsed);

        if (localIARes) {
          const localRes = JSON.parse(localIARes);
          setLoading(false);
          setRes(localRes);
          return;
        }

        const iaResponse = await aiService.analyzeData(parsed);
        setRes(iaResponse as unknown as IAAnalysis);

        localStorage.setItem("iaAnalysis", JSON.stringify(iaResponse));

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

  if (!data || !res) {
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
        <Button
          className="bg-plt-primary hover:bg-plt-primary/80"
          onClick={() => (window.location.href = "/createUser")}
        >
          Configurar Perfil
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div className="flex justify-center items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-plt-primary animate-pulse" />
          <h1 className="sm:text-3xl text-lg font-bold tracking-tight text-plt-primary">
            Recomendaciones de salud
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-plt-primary text-white hover:bg-plt-primary/85 hover:text-white hover:cursor-pointer"
            onClick={() => {
              toast.promise(
                new Promise((resolve) => {
                  localStorage.removeItem("userData");
                  localStorage.removeItem("iaAnalysis");
                  setTimeout(resolve, 1000);
                }),
                {
                  loading: "Cerrando sesión...",
                  success: () => {
                    router.push("/");
                    return "Sesión cerrada correctamente";
                  },
                  error: "Error al cerrar sesión",
                },
              );
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesion
          </Button>
          <Button
            variant="outline"
            className="flex justify-center items-center"
            asChild
          >
            <Link href="/">
              <HomeIcon />
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6 self-start md:sticky block top-5 md:top-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KcalCard metabolismo={res.metabolismo} />

            <EnergyDataCard macros={res.macros} />
          </div>

          <UserBiomtricDataCard userData={data.userData} />
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
                      Number(
                        res.analisis_rutina.puntuacion_eficiencia.toString()[0],
                      ) <= 4
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    Score: {res.analisis_rutina.puntuacion_eficiencia}
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-3 mt-2 text-xs md:text-sm">
                {res?.analisis_rutina.critica || "Analizando rutina..."}
              </CardDescription>
            </CardHeader>

            <Separator className="mb-4" />

            <IaResponseCard
              ajuste_inmediato={res?.plan_accion.ajuste_inmediato}
              alimentos_clave={res?.plan_accion.alimentos_clave}
              advertencias={res?.advertencias}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
