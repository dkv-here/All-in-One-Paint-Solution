import mongoose from "mongoose";

const serviceBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  area: { type: Number, required: true },
  workers: { type: Number, default: 1 }, // Default 1 worker
  time: { type: String, required: true },
  charges: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" }, // Default to Pending
  contact: { type: String, required: true },
}, { timestamps: true });

const ServiceBooking = mongoose.model("ServiceBooking", serviceBookingSchema);

export default ServiceBooking;
