import { User } from "lucide-react";
import MetricCard from "./MetriCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserData } from "@/app/types";

export default function UserBiomtricDataCard({
  userData,
}: {
  userData: UserData;
}) {
  const userGoal =
    userData.goal === "ganar_musculo"
      ? "Ganar musculo"
      : userData.goal === "mantener"
        ? "Mantener"
        : userData.goal === "mejorar_resistencia"
          ? "Mejorar Resistencia"
          : userData.goal === "perder_grasa"
            ? "Perder Grasa"
            : "Mejorar Salud";

  return (
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
            value={userData.bmi}
            sub="kg/m²"
            trend={
              userData.healthyWeightRange
                ? `Ideal: ${userData.healthyWeightRange.min}-${userData.healthyWeightRange.max}`
                : undefined
            }
          />
          <MetricCard label="Peso" value={userData.weight} sub="kg" />
          <MetricCard label="Altura" value={userData.height} sub="cm" />
          <MetricCard label="Edad" value={userData.age} sub="años" />
          <MetricCard label="Genero" value={userData.gender} />
          <MetricCard label="Objetivo" value={userGoal} />
          <MetricCard
            label="Nivel de Actividad"
            value={userData.activityLevel}
          />
        </div>
      </CardContent>
    </Card>
  );
}
