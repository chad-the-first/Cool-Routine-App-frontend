// import { ConflictError, UnautorizedError } from "../errors/http_errors";
import { Routine } from "../models/routine";
import { User } from "../models/user";
import axios from "axios";

axios.defaults.baseURL = 'https://routine-app-backend-1.onrender.com';
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.withCredentials = true;

// async function fetchData(input: RequestInfo, init?: RequestInit) {
//     const response = await fetch(input, init);
//     if (response.ok) {
//         return response;
//     } else {
//         const errorBody = await response.json();
//         const errorMessage = errorBody.error;
//         if (response.status === 401) {
//             throw new UnautorizedError(errorMessage);
//         } else if (response.status === 409) {
//             throw new ConflictError(errorMessage);
//         }else {
//             throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
//         }
//     }
// }

export async function getLoggedInUser(): Promise<User> {
    const response = await axios({
        url: "/api/users",
        method: "GET" 
    });
    return response.data;
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await axios({
        url: "/api/users/signup", 
        method: "POST",
        data: JSON.stringify(credentials),
    });
    return response.data;
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await axios({
        url: "/api/users/login", 
        method: "POST",
        data: JSON.stringify(credentials),
    });
    return response.data;
}

export async function logout() {
    await axios({
        url: "/api/users/logout", 
        method: "POST" 
    });
}

export async function fetchRoutines(): Promise<Routine[]> {
    const response = await axios({
        url: "/api/routines",
        method: "GET",
      });
      return await response.data;
}

export interface RoutineInput {
    fun: string,
    knowledge: string,
    work: string,
    service: string,
    self_care: string,
    family: string,
    date: string,
}

export async function createRoutine(routine: RoutineInput): Promise<Routine> {
    const response = await axios({
        url: "api/routines",
        method: "POST",
        data: JSON.stringify(routine),
    });
    return response.data;
}

export async function updateRoutine(routineId: string, routine: RoutineInput): Promise<Routine> {
    const response = await axios({
        url: "/api/routines/" + routineId,
        method: "PATCH",
        data: JSON.stringify(routine),
    });
    return response.data;
}

export async function deletRoutine(routineId: string) {
    await axios({
        url: "/api/routines/" + routineId, 
        method: "DELETE" 
    });
}