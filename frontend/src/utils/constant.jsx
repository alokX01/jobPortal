// API base is env-driven so the same code works in local and deployed setup.
const apiBaseFromEnv = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
const API_BASE_URL = apiBaseFromEnv.replace(/\/+$/, "");

export const USER_API_END_POINT = `${API_BASE_URL}/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/company`;
