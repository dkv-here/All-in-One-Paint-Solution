import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminServices = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const markCompleted = async (id) => {
    try {
      const response = await fetch(`/api/services/${id}/complete`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Service marked as completed!");
        fetchServices();
      } else {
        toast.error(data.message || "Failed to update service.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Services</h2>
      <ul className="space-y-4">
        {services.map((service) => (
          <li
            key={service._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 border border-gray-200 rounded-lg shadow"
          >
            <div className="text-gray-700 space-y-1">
              <p>
                <strong>User:</strong> {service.user.username}
              </p>
              <p>
                <strong>Area:</strong> {service.area} sq. ft.
              </p>
              <p>
                <strong>Workers:</strong> {service.workers}
              </p>
              <p>
                <strong>Time:</strong> {service.time}
              </p>
              <p>
                <strong>Charges:</strong> ₹{service.charges}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    service.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {service.status}
                </span>
              </p>
            </div>
            {service.status === "Pending" && (
              <button
                onClick={() => markCompleted(service._id)}
                className="mt-4 md:mt-0 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServices;
