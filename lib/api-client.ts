import axios from "axios";
import { UserData, UserRoutine } from "@/app/types";

export async function apiClient(
  endpoint: string,
  data?: {
    userData: UserData;
    routine: UserRoutine;
  },
) {
  try {
    const response = await axios.post(`/api/${endpoint}`, data ?? {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    let message = "Unknown Error";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || err.message;
      console.log("API Client Error: " + message);
      throw new Error(message);
    }

    if (err instanceof Error) {
      message = err.message;
      console.log("API Client Error: " + message);
      throw err;
    }

    console.log("API Client Error: " + message);
    throw new Error(message);
  }
}
