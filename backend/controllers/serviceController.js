import asyncHandler from "../middlewares/asyncHandler.js";
import ServiceBooking from "../models/serviceBookingModel.js";

// Book a painting service
export const bookService = asyncHandler(async (req, res) => {
  const { area, contact } = req.body;

  if (!area || !contact) {
    return res.status(400).json({ message: "Area and contact are required." });
  }

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  // Simple formula to calculate number of workers and time
  const workers = Math.ceil(area / 500); // 1 worker per 500 sq. ft.
  const timeInHours = Math.ceil(area / 100); // 100 sq. ft. takes 1 hour
  const days = Math.floor(timeInHours / 8); // 8 hours per workday
  const hours = timeInHours % 8;
  const charges = area * 10; // ₹10 per square foot

  const serviceBooking = await ServiceBooking.create({
    user: req.user._id,
    area,
    workers,
    time: `${days} day(s), ${hours} hour(s)`,
    charges,
    contact,
  });

  res.status(201).json(serviceBooking);
});

// Get services for the logged-in user
export const getUserServices = asyncHandler(async (req, res) => {
  const services = await ServiceBooking.find({ user: req.user._id });
  res.status(200).json(services);
});

// Get all services (Admin only)
export const getAllServices = asyncHandler(async (req, res) => {
  const services = await ServiceBooking.find({}).populate("user", "username email");
  res.status(200).json(services);
});

// Mark service as completed (Admin only)
export const markServiceAsCompleted = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await ServiceBooking.findById(id);

  if (!service) {
    return res.status(404).json({ message: "Service not found." });
  }

  service.status = "Completed";
  await service.save();
  res.status(200).json(service);
});

// Delete a service booking
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await ServiceBooking.findOneAndDelete({ _id: id, user: req.user._id });

  if (!service) {
    return res.status(404).json({ message: "Service not found." });
  }

  res.status(200).json({ message: "Service deleted successfully." });
});
