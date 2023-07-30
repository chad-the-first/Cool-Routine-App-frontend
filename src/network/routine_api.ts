import { Routine } from "../models/routine";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchRoutines(): Promise<Routine[]> {
    const response = await fetchData("/api/routines", {
        method: "GET",
      });
      return await response.json();
}

export interface RoutineInput {
    title: string,
    text?: string,
}

export async function creatRoutine(routine: RoutineInput): Promise<Routine> {
    const response = await fetchData("api/routines", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(routine),
    });
    return response.json();
}

export async function deletRoutine(routineId: string) {
    await fetchData("/api/routines/" + routineId, { method: "DELETE" });
}