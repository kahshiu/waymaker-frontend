import { generateSerial } from "./numbers.ts";

// export const backendApi = "http://localhost:8020/api";
export const backendApi = "http://backend-api:8000/api";
export const globalSerial = generateSerial(0);
