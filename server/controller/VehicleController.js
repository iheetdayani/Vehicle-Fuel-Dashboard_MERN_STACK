
import Vehicle from "../Models/VehicleModels.js";

// CREATE VEHICLE
const createvehicle = async (req, res) => {
  try {
    const data = await Vehicle.create(req.body);

    res.status(201).json({
      data: data,
      message: "Vehicle created successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error while creating vehicle",
      error: error.message
    });
  }
};

// GET ALL VEHICLES
const GetAllvehicle = async (req, res) => {
  try {
    const data = await Vehicle.find();

    res.status(200).json({
      data: data,
      message: "Vehicles fetched successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while fetching all vehicles",
      error: error.message
    });
  }
};

// GET VEHICLE BY ID
const GetAllvehicleById = async (req, res) => {
  try {
    const data = await Vehicle.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      data: data,
      message: "Vehicle fetched successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error while fetching vehicle",
      error: error.message
    });
  }
};

// DELETE VEHICLE
const Deletevehicle = async (req, res) => {
  try {
    const data = await Vehicle.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      data: data,
      message: "Vehicle deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error while deleting vehicle",
      error: error.message
    });
  }
};

// UPDATE VEHICLE
const Updatevehicle = async (req, res) => {
  try {
    const data = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!data) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      data: data,
      message: "Vehicle updated successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error while updating vehicle",
      error: error.message
    });
  }
};

export {
  createvehicle,
  GetAllvehicle,
  GetAllvehicleById,
  Deletevehicle,
  Updatevehicle
};
