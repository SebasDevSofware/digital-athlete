import { apiClient } from "@/lib/api-client";
import { UserData, UserRoutine } from "../types";

export const aiService = {
  analyzeData: async (data: { userData: UserData; routine: UserRoutine }) => {
    try {
      const res = await apiClient("analyze", data);
      return res;
    } catch (err) {
      const errM = err instanceof Error ? err.message : "Unknow Error";
      console.log("AI Services Error: " + errM);
      throw err;
    }
  },
};
