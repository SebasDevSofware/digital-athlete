import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Flame } from "lucide-react";

export default function KcalCard({
  metabolismo,
}: {
  metabolismo: {
    tmb: number;
    calorias_mantenimiento: number;
    objetivo_calorico: number;
  };
}) {
  const progressPercentage = metabolismo
    ? (metabolismo.objetivo_calorico / metabolismo.calorias_mantenimiento) * 100
    : 0;
  const progress = progressPercentage > 100 ? 100 : progressPercentage;

  return (
    <Card className="md:col-span-2 border-primary/20 bg-linear-to-br from-primary/10 via-background to-background relative overflow-hidden">
      <CardHeader className="pb-2 relative z-10">
        <CardDescription>Objetivo Diario</CardDescription>
        <div className="flex items-baseline gap-1">
          <h2 className="text-5xl font-extrabold tracking-tighter text-foreground">
            {metabolismo.objetivo_calorico || "---"}
          </h2>
          <span className="text-lg font-medium text-muted-foreground">
            kcal
          </span>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex items-center gap-4 text-sm mb-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur">
            TMB: {metabolismo.tmb}
          </Badge>
          <span className="text-muted-foreground text-xs">
            Mant: {metabolismo.calorias_mantenimiento}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>

      <Flame className="absolute -right-6 -top-6 h-48 w-48 text-primary/5 rotate-12" />
    </Card>
  );
}
