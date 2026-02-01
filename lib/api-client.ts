import { UserData, UserRoutine } from "@/app/types";

export async function apiClient(
  endpoint: string,
  data?: {
    userData: UserData;
    routine: UserRoutine;
  },
) {
  const config: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) config.body = JSON.stringify(data);

  try {
    const response = await fetch(`/api/${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Something was bad in request");
    }

    return await response.json();
  } catch (err) {
    const errM = err instanceof Error ? err.message : "Unknow Error";
    console.log("API Client Error: " + errM);
    throw err;
  }
}
