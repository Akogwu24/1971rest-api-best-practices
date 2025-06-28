import { CorsOptions } from "cors";

// const ALLOWED_ORIGINS = ['"http://localhost:4040", "http://localhost:8080"'];
const ALLOWED_ORIGINS = ["*"];

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
