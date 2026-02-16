import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudSun, HeartPulse, Wind, Droplets } from "lucide-react";
import { IAEnvAnalysis } from "@/app/types";

export default function EnvironmentDataCard({ data }: { data: IAEnvAnalysis }) {
  if (!data) return null;

  const getRiskStyles = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "bajo":
        return "bg-emerald-500/15 text-emerald-600 border-emerald-200 hover:bg-emerald-500/25";
      case "medio":
        return "bg-amber-500/15 text-amber-600 border-amber-200 hover:bg-amber-500/25";
      case "alto":
        return "bg-rose-500/15 text-rose-600 border-rose-200 hover:bg-rose-500/25";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm ring-1 ring-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-plt-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">
            Clima y Entorno
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className={`${getRiskStyles(
            data.riesgo_exposicion,
          )} capitalize px-3 py-1`}
        >
          Riesgo {data.riesgo_exposicion}
        </Badge>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Card: Impacto Cardiovascular */}
        <div className="flex flex-col gap-3 p-3 rounded-lg bg-background/40 border border-border/50">
          <div className="flex items-center gap-2 text-rose-500">
            <HeartPulse className="h-4 w-4" />
            <span className="text-sm font-medium">Cardiovascular</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.impacto_cardiovascular}
          </p>
        </div>

        {/* Card: Contaminación */}
        <div className="flex flex-col gap-3 p-3 rounded-lg bg-background/40 border border-border/50">
          <div className="flex items-center gap-2 text-slate-500">
            <Wind className="h-4 w-4" />
            <span className="text-sm font-medium">Calidad de Aire</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.ajuste_por_contaminacion}
          </p>
        </div>

        {/* Card: Hidratación */}
        <div className="flex flex-col gap-3 p-3 rounded-lg bg-background/40 border border-border/50">
          <div className="flex items-center gap-2 text-blue-500">
            <Droplets className="h-4 w-4" />
            <span className="text-sm font-medium">Hidratación</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.hidratacion_climatica}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
