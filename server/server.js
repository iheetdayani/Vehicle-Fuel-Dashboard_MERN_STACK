import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDb from "./Config/db.js";
import VehicleRoutes from "./Routes/VehicleRoutes.js";
dotenv.config();
ConnectDb();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/Vehicles",VehicleRoutes);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log(`server is running on PORT ${PORT}`);
});