
import { useState } from "react";
import { createVehicle } from "../services/VehicleService";

function AddVehicle() {
  const initialData = {
    vehicleName: "",
    vehicleNumber: "",
    tripDate: "",
    startOdometer: "",
    endOdometer: "",
    fuelConsumed: "",
    fuelPrice: ""
  };

  const [data, setData] = useState(initialData);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vehicleData = {
        ...data,
        startOdometer: Number(data.startOdometer),
        endOdometer: Number(data.endOdometer),
        fuelConsumed: Number(data.fuelConsumed),
        fuelPrice: Number(data.fuelPrice),
        distance: distance(data),
        mileage: Number(Milage(data).toFixed(2)),
        fuelExpense: fuelexpense(data),
        costPerKM: Number((fuelexpense(data) / distance(data)).toFixed(2))
      };

      const response = await createVehicle(vehicleData);

      alert("Vehicle inserted successfully!");
      console.log(response);
      setData({ ...initialData });

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to add vehicle");
    }
  };

  const HandleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const distance = (data) => {
    return Number(data.endOdometer) - Number(data.startOdometer);
  };

  const Milage = (data) => {
    return distance(data) / Number(data.fuelConsumed);
  };

  const fuelexpense = (data) => {
    return Number(data.fuelConsumed) * Number(data.fuelPrice);
  };

  const costPerKM = (data) => {
    return fuelexpense(data) / distance(data);
  };

  const hasValidDistance =
    data.startOdometer !== "" &&
    data.endOdometer !== "" &&
    distance(data) > 0;

  const hasValidFuel =
    data.fuelConsumed !== "" &&
    Number(data.fuelConsumed) > 0;

  const formatValue = (value) =>
    Number.isFinite(value) ? value.toFixed(2) : "0.00";

  return (
    <div className="container-fluid px-3 px-md-4 py-4 bg-light min-vh-100">

      {/* Page Heading */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Add Vehicle Trip</h3>
        <p className="text-secondary mb-0">
          Enter vehicle and fuel details to calculate mileage and expenses.
        </p>
      </div>

      {/* Calculation Cards */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Total Distance</span>
                <i className="bi bi-speedometer2 text-primary fs-4"></i>
              </div>
              <h3 className="fw-bold mt-3">
                {hasValidDistance ? distance(data) : "0"}
                <small className="fs-6 text-secondary"> KM</small>
              </h3>
              <small className="text-secondary">Distance travelled</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Mileage</span>
                <i className="bi bi-fuel-pump text-success fs-4"></i>
              </div>
              <h3 className="fw-bold mt-3">
                {hasValidDistance && hasValidFuel
                  ? formatValue(Milage(data))
                  : "0.00"}
                <small className="fs-6 text-secondary"> KM/L</small>
              </h3>
              <small className="text-secondary">Fuel efficiency</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Fuel Expense</span>
                <i className="bi bi-currency-rupee text-warning fs-4"></i>
              </div>
              <h3 className="fw-bold mt-3">
                ₹{formatValue(fuelexpense(data))}
              </h3>
              <small className="text-secondary">Total fuel cost</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Cost Per KM</span>
                <i className="bi bi-graph-up-arrow text-danger fs-4"></i>
              </div>
              <h3 className="fw-bold mt-3">
                ₹{hasValidDistance
                  ? formatValue(costPerKM(data))
                  : "0.00"}
              </h3>
              <small className="text-secondary">Running cost per KM</small>
            </div>
          </div>
        </div>

      </div>

      {/* Vehicle Form */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-car-front me-2 text-primary"></i>
            Vehicle Information
          </h5>
        </div>

        <div className="card-body p-3 p-md-4">
          <form onSubmit={HandleSubmit}>

            <div className="row g-3">

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Vehicle Name</label>
                <input
                  type="text"
                  name="vehicleName"
                  value={data.vehicleName}
                  onChange={HandleChange}
                  className="form-control"
                  placeholder="e.g. Honda Activa 6G"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={data.vehicleNumber}
                  onChange={HandleChange}
                  className="form-control"
                  placeholder="e.g. GJ05AB1234"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Trip Date</label>
                <input
                  type="date"
                  name="tripDate"
                  value={data.tripDate}
                  onChange={HandleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Starting Odometer (KM)</label>
                <input
                  type="number"
                  name="startOdometer"
                  value={data.startOdometer}
                  onChange={HandleChange}
                  className="form-control"
                  min="0"
                  placeholder="Starting reading"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Ending Odometer (KM)</label>
                <input
                  type="number"
                  name="endOdometer"
                  value={data.endOdometer}
                  onChange={HandleChange}
                  className="form-control"
                  min="0"
                  placeholder="Ending reading"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Fuel Consumed (Litres)</label>
                <input
                  type="number"
                  name="fuelConsumed"
                  value={data.fuelConsumed}
                  onChange={HandleChange}
                  className="form-control"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter litres"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Fuel Price Per Litre (₹)</label>
                <input
                  type="number"
                  name="fuelPrice"
                  value={data.fuelPrice}
                  onChange={HandleChange}
                  className="form-control"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter fuel price"
                  required
                />
              </div>

            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setData({ ...initialData })}
              >
                Clear Form
              </button>

              <button type="submit" className="btn btn-primary px-4">
                <i className="bi bi-plus-circle me-2"></i>
                Add Vehicle Trip
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default AddVehicle;
