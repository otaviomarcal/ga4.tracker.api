import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import analyticsRoutes from "./routes/analyticsRoutes";

const app = express();

const allowedOrigins = [
  "http://redetvplus-dashboard.s3-website-sa-east-1.amazonaws.com",
  "https://admin.redetvplus.com.br",
  "http://localhost:8080",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "A política CORS para este site não permite acesso a partir da origem especificada.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

app.use("/v1/works", (_req, res) => {
  res.send("API is running");
});
app.use("/v1/Dashboard/ganalytics", analyticsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
