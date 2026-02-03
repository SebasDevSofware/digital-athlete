import { ShieldAlert, TrendingUp, Utensils } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface Props {
  ajuste_inmediato: string;
  alimentos_clave: string[];
  advertencias: string[];
}

export default function IaResponseCard({
  ajuste_inmediato,
  alimentos_clave,
  advertencias,
}: Props) {
  return (
    <CardContent className="space-y-6">
      <Alert className="bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900">
        <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        <AlertTitle className="text-indigo-900 dark:text-indigo-200 text-sm font-bold">
          Estrategia Clave
        </AlertTitle>
        <AlertDescription className="text-indigo-800 dark:text-indigo-300 md:text-lg text-xs mt-1">
          {ajuste_inmediato || "Generando estrategia..."}
        </AlertDescription>
      </Alert>

      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Utensils className="h-3 w-3" /> Recomendaciones Nutricionales
        </h4>
        <div className="flex flex-wrap gap-2">
          {alimentos_clave.map((item, i) => (
            <Badge
              key={i}
              variant="outline"
              className="bg-background hover:bg-accent transition-colors max-w-full whitespace-normal wrap-break rounded-lg"
            >
              {item}
            </Badge>
          )) || (
            <div className="h-8 w-full bg-muted/50 rounded animate-pulse" />
          )}
        </div>
      </div>

      {advertencias && advertencias.length > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <ShieldAlert className="h-4 w-4" />
            <span className="text-xs font-bold uppercase">Precauciones</span>
          </div>
          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
            {advertencias.map((adv, i) => (
              <li key={i}>{adv}</li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  );
}
