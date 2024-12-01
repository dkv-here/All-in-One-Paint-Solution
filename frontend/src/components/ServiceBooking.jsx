import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";


const ServiceBooking = () => {
  const [area, setArea] = useState("");
  const [contact, setContact] = useState("");
  const [services, setServices] = useState([]);
  const contactInputRef = useRef(null);
  const bookButtonRef = useRef(null);

  const fetchServices = async (isAdmin = false) => {
    try {
      const url = isAdmin ? "/api/services/admin" : "/api/services";
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch services.");
        return;
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Network error! Please try again later.");
    }
  };

  const bookService = async () => {
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ area, contact }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Service booked successfully!");
        fetchServices();
      } else {
        toast.error(data.message || "Failed to book service.");
      }
    } catch (error) {
      console.error("Error booking service:", error);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Service deleted successfully!");
        fetchServices();
      } else {
        toast.error(data.message || "Failed to delete service.");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleKeyDown = (e, targetRef) => {
    if (e.key === "Enter") {
      if (targetRef && targetRef.current) {
        targetRef.current.focus(); // Move focus to the target input or button
      } else {
        bookService(); // Trigger the button if it's the last field
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Booking Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Painting Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Enter area (sq. ft.)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, contactInputRef)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Enter contact info"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, bookButtonRef)}
            ref={contactInputRef}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={bookService}
          ref={bookButtonRef}
          className="mt-4 w-full md:w-auto bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
        >
          Book Service
        </button>
      </div>

      {/* Services List */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Services</h3>
        {services.length === 0 ? (
          <p className="text-gray-600">You have no services booked yet.</p>
        ) : (
          <ul className="space-y-4">
            {services.map((service) => (
              <li
                key={service._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 border border-gray-200 rounded-lg shadow"
              >
                <div className="text-gray-700 space-y-1">
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
                <button
                  onClick={() => deleteService(service._id)}
                  className="mt-4 md:mt-0 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ServiceBooking;
