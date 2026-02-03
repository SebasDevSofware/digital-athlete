import Link from "next/link";
import { Activity, Zap, Target, Bell, User as UserIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const metabolismo = {
    tmb: 1600,
    calorias_mantenimiento: 2200,
    objetivo_calorico: 1800,
  };

  return (
    <main className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-plt-primary p-1.5 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span>
              Atleta<span className="text-plt-primary"> Digital</span>
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        {/* --- HERO SECTION: CLEAN & BRIGHT --- */}
        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Tu rendimiento hoy está al{" "}
              <span className="text-plt-primary">88% de su potencial.</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
              Tu cuerpo está listo para una sesión de hipertrofia de alta
              intensidad.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-plt-primary hover:bg-plt-primary/80 text-white rounded-full px-8"
                asChild
              >
                <Link href="/createUser">Iniciar Entrenamiento</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                asChild
              >
                <Link href="/dashboard">Ver Métricas</Link>
              </Button>
            </div>
          </div>

          <Card className="border-none bg-plt-primary text-white shadow-xl shadow-indigo-200 dark:shadow-none overflow-hidden relative">
            <Zap className="absolute -right-4 -bottom-4 h-32 w-32 text-white/60 opacity-20" />
            <CardHeader>
              <CardTitle className="text-indigo-100 text-xs uppercase tracking-widest flex items-center gap-2">
                <Target className="h-4 w-4" /> Objetivo Diario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              Ejemplo:
              <div className="text-5xl font-black">
                {metabolismo.objetivo_calorico}
              </div>
              <p className="text-indigo-100 text-sm">
                Kilocalorías necesarias para tu meta de ganar músculo.
              </p>
              <div className="pt-4 border-t border-white">
                <div className="flex justify-between text-xs mb-2">
                  <span>Progreso Actual</span>
                  <span>1,450 kcal</span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[80%] rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="pt-12 pb-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-tighter">
              Atleta Digital
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} — Diseñado para el máximo rendimiento.
          </p>
        </footer>
      </div>
    </main>
  );
}
