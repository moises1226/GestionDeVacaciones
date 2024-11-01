import cors from "cors";

const urlsPermitidos = [

    "http://localhost:5173",
    "http://localhost:3000"

]


export const corsMiddleware = ({ acceptedOrigins = urlsPermitidos } = {}) =>
    cors({
      origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
          return callback(null, true);
        }
  
        if (!origin) {
          return callback(null, true);
        }
  
        return callback(new Error('Not allowed by CORS'));
      },
    });



