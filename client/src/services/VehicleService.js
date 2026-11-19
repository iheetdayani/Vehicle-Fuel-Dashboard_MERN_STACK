
import axios from "axios";

const API_URL = "http://localhost:5000/api/Vehicles";

// CREATE VEHICLE
export const createVehicle = async (vehicle) => {
  const response = await axios.post(API_URL, vehicle);
  return response.data;
};

// GET ALL VEHICLES
export const GetAllVehicle = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET VEHICLE BY ID
export const GetVehicleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// UPDATE VEHICLE
export const UpdateVehicle = async (id, vehicle) => {
  const response = await axios.put(`${API_URL}/${id}`, vehicle);
  return response.data;
};

// DELETE VEHICLE
export const DeleteVehicle = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
