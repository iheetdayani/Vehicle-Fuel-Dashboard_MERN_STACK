import { createvehicle,Deletevehicle,GetAllvehicle,GetAllvehicleById,Updatevehicle } from "../controller/VehicleController.js";
import express from "express";
const router=express.Router();

router.get("/",GetAllvehicle);

router.post("/",createvehicle);

router.get("/:id",GetAllvehicleById);

router.put("/:id",Updatevehicle);

router.delete("/:id",Deletevehicle);
export default router;