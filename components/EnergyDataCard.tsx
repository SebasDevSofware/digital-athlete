import { Apple, Dumbbell, Zap } from "lucide-react";
import MetricCard from "./MetriCard";
import { Card, CardContent } from "./ui/card";

export default function EnergyDataCard({
  macros,
}: {
  macros: {
    proteinas: string;
    grasas: string;
    carbohidratos: string;
  };
}) {
  return (
    <Card className="md:col-span-2">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            label="Proteína"
            value={`${macros.proteinas || 0}g`}
            icon={<Dumbbell className="h-4 w-4 text-sky-500" />}
            className="text-blue-600 dark:text-blue-400"
          />
          <MetricCard
            label="Carbos"
            value={`${macros.carbohidratos || 0}g`}
            icon={<Zap className="h-4 w-4 text-amber-500" />}
            className="text-amber-600 dark:text-amber-400"
          />
          <MetricCard
            label="Grasas"
            value={`${macros.grasas || 0}g`}
            icon={<Apple className="h-4 w-4 text-emerald-500" />}
            className="text-rose-600 dark:text-rose-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}
