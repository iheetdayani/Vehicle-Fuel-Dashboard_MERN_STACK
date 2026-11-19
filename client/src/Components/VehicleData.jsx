
import { useEffect, useState } from "react";
import { GetAllVehicle } from "../services/VehicleService";

function VehicleData() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all vehicle records
  const FetchVehicles = async () => {
    try {
      const response = await GetAllVehicle();

      // Adjust this if your controller returns a different response shape.
      setVehicles(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setError("Unable to fetch vehicle records.");
    } finally {
      setLoading(false);
    }
  };

  // Run when component loads
  useEffect(() => {
    FetchVehicles();
  }, []);

  return (
    <div className="container-fluid px-3 px-md-4 py-4">

      {/* Page Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Vehicle History</h3>
          <p className="text-secondary mb-0">
            View all your vehicle trips and fuel expenses.
          </p>
        </div>

        <span className="badge bg-primary fs-6">
          Total Trips: {vehicles.length}
        </span>
      </div>

      {/* Vehicle Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2 text-secondary">Loading vehicles...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-car-front fs-1 text-secondary"></i>
              <h5 className="mt-3">No Vehicle Records Found</h5>
              <p className="text-secondary">
                Add your first vehicle trip to see it here.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Vehicle Name</th>
                    <th>Vehicle Number</th>
                    <th>Trip Date</th>
                    <th>Distance (KM)</th>
                    <th>Mileage (KM/L)</th>
                    <th>Fuel Expense (₹)</th>
                    <th>Cost/KM (₹)</th>
                  </tr>
                </thead>

                <tbody>
                  {vehicles.map((vehicle, index) => (
                    <tr key={vehicle._id}>
                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {vehicle.vehicleName}
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border">
                          {vehicle.vehicleNumber}
                        </span>
                      </td>

                      <td>
                        {vehicle.tripDate
                          ? new Date(vehicle.tripDate).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td>{vehicle.distance} KM</td>

                      <td>
                        <span className="text-success fw-semibold">
                          {vehicle.mileage} KM/L
                        </span>
                      </td>

                      <td className="fw-semibold">
                        ₹{Number(vehicle.fuelExpense).toFixed(2)}
                      </td>

                      <td>
                        ₹{Number(vehicle.costPerKM).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default VehicleData;
