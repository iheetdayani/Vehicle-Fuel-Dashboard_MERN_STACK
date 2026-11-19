const Sidebar = ({ activePage, setActivePage }) => {

  const menuItems = [
    { name: "Dashboard", icon: "bi-speedometer2" },
    { name: "Add Trip", icon: "bi-plus-circle" },
    { name: "Vehicle History", icon: "bi-car-front" },
    { name: "Reports", icon: "bi-bar-chart" }
  ];

  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >

      {/* Logo */}
      <h5 className="text-center mb-4 mt-2">
        <i className="bi bi-fuel-pump-fill text-warning me-2"></i>
        Vehicle Tracker
      </h5>

      <hr className="text-secondary" />

      {/* Menu */}
      <ul className="nav nav-pills flex-column gap-2">

        {menuItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link w-100 text-start ${activePage === item.name
                  ? "active bg-primary text-white"
                  : "text-white"
                }`}
              onClick={() => setActivePage(item.name)}
            >
              <i className={`bi ${item.icon} me-3`}></i>
              {item.name}
            </button>
          </li>
        ))}

      </ul>

      {/* Footer */}
      <div className="mt-auto pt-4">
        <hr className="text-secondary" />
        <div className="small text-secondary text-center">
          Vehicle Mileage Dashboard
          <br />
          Version 1.0.0
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
