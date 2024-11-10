import cors from "cors";

const urlsPermitidos = [
  "http://localhost:5173",  
  "http://localhost:3000"  
];

export const corsMiddleware = ({ acceptedOrigins = urlsPermitidos } = {}) =>
  cors({
    origin: (origin, callback) => {
      // Si no hay origen (por ejemplo, en ciertas solicitudes locales), permitimos
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  });
