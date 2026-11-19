
import { useEffect, useState } from "react";
import { GetAllVehicle } from "../services/VehicleService";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchVehicles = async () => {
    try {
      const response = await GetAllVehicle();

      setVehicles(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchVehicles();
  }, []);

  // Dashboard calculations
  const totalTrips = vehicles.length;

  const totalVehicles = new Set(
    vehicles.map((v) => v.vehicleNumber)
  ).size;

  const totalDistance = vehicles.reduce(
    (total, v) => total + Number(v.distance || 0), 0
  );

  const totalFuel = vehicles.reduce(
    (total, v) => total + Number(v.fuelConsumed || 0), 0
  );

  const totalExpense = vehicles.reduce(
    (total, v) => total + Number(v.fuelExpense || 0), 0
  );

  const averageMileage = totalFuel > 0
    ? totalDistance / totalFuel
    : 0;

  const averageCostPerKM = totalDistance > 0
    ? totalExpense / totalDistance
    : 0;

  const stats = [
    {
      title: "Total Vehicles",
      value: totalVehicles,
      unit: "Vehicles",
      icon: "bi-car-front",
      color: "primary"
    },
    {
      title: "Total Trips",
      value: totalTrips,
      unit: "Trips",
      icon: "bi-signpost-2",
      color: "success"
    },
    {
      title: "Total Distance",
      value: totalDistance.toFixed(2),
      unit: "KM",
      icon: "bi-speedometer2",
      color: "info"
    },
    {
      title: "Total Fuel Consumed",
      value: totalFuel.toFixed(2),
      unit: "Litres",
      icon: "bi-fuel-pump",
      color: "warning"
    },
    {
      title: "Average Mileage",
      value: averageMileage.toFixed(2),
      unit: "KM/L",
      icon: "bi-graph-up-arrow",
      color: "success"
    },
    {
      title: "Total Fuel Expense",
      value: `₹${totalExpense.toFixed(2)}`,
      unit: "Total Cost",
      icon: "bi-currency-rupee",
      color: "danger"
    },
    {
      title: "Average Cost Per KM",
      value: `₹${averageCostPerKM.toFixed(2)}`,
      unit: "Per KM",
      icon: "bi-cash-stack",
      color: "primary"
    }
  ];

  return (
    <div className="container-fluid px-3 px-md-4 py-4 bg-light min-vh-100">

      {/* Heading */}
      <div className="mb-4">
        <h3 className="fw-bold">Dashboard</h3>
        <p className="text-secondary">
          Overview of your vehicle mileage and fuel expenses.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="row g-3">
            {stats.map((item, index) => (
              <div className="col-12 col-sm-6 col-xl-3" key={index}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-secondary fw-semibold">
                        {item.title}
                      </span>

                      <i className={`bi ${item.icon} fs-3 text-${item.color}`}></i>
                    </div>

                    <h3 className="fw-bold mt-3 mb-1">
                      {item.value}
                    </h3>

                    <small className="text-secondary">
                      {item.unit}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Vehicle Trips */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0">Recent Vehicle Trips</h5>
            </div>

            <div className="card-body">
              {vehicles.length === 0 ? (
                <p className="text-secondary text-center mb-0">
                  No vehicle trips available.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Vehicle</th>
                        <th>Number</th>
                        <th>Distance</th>
                        <th>Mileage</th>
                        <th>Fuel Expense</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[...vehicles]
                        .sort(
                          (a, b) =>
                            new Date(b.tripDate) - new Date(a.tripDate)
                        )
                        .slice(0, 5)
                        .map((vehicle) => (
                          <tr key={vehicle._id}>
                            <td>{vehicle.vehicleName}</td>
                            <td>{vehicle.vehicleNumber}</td>
                            <td>{vehicle.distance} KM</td>
                            <td>{vehicle.mileage} KM/L</td>
                            <td>
                              ₹{Number(vehicle.fuelExpense).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
