import { CorsOptions } from "cors";

const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:8080"];

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (ALLOWED_ORIGINS.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  optionsSuccessStatus: 200,
};
