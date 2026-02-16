import { useEffect, useState } from "react";
import { IAAnalysis, UserData, UserRoutine } from "../types";
import { aiService } from "../services/aiServices";
import { toast } from "sonner";
import { calculateBMI, getHealthyWeightRange } from "@/lib/utils";
import { getCoords } from "../services/getUserCoords";

export default function useIAResponse() {
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

        const parsed = JSON.parse(localData) as {
          userData: UserData;
          routine: UserRoutine;
        };

        let lat = 0;
        let lot = 0;
        try {
          const coords = await getCoords();
          lat = coords.lat;
          lot = coords.lon;
        } catch (geoErr) {
          console.warn(
            "No se puediron obtener las coordenadas del usuario:",
            geoErr,
          );
        }
        const bmi = Number(
          calculateBMI(parsed.userData.weight, parsed.userData.height),
        );
        const healty = getHealthyWeightRange(parsed.userData.height);

        const newData = {
          ...parsed,
          userData: {
            ...parsed.userData,
            bmi: bmi,
            healthyWeightRange: healty,
            lat: lat,
            lot: lot,
          },
        };
        console.log(newData);

        setData(newData);

        if (localIARes) {
          const localRes = JSON.parse(localIARes);
          setLoading(false);
          setRes(localRes);
          return;
        }

        const iaResponse = await aiService.analyzeData(newData);
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

  return { res: res, loading: loading, data: data };
}
