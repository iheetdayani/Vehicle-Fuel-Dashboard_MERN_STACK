import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: true,
      trim: true
    },

    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    tripDate: {
      type: Date,
      required: true
    },

    startOdometer: {
      type: Number,
      required: true,
      min: 0
    },

    endOdometer: {
      type: Number,
      required: true,
      min: 0
    },

    fuelConsumed: {
      type: Number,
      required: true,
      min: 0
    },

    fuelPrice: {
      type: Number,
      required: true,
      min: 0
    },
  },
  {
    timestamps: true
  }
);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
