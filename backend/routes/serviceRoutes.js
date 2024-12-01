import express from "express";
import {
  bookService,
  getUserServices,
  getAllServices,
  markServiceAsCompleted,
  deleteService,
} from "../controllers/serviceController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, bookService); // Book a service
router.get("/", authenticate, getUserServices); // Get services for the logged-in user
router.get("/admin", authenticate, authorizeAdmin, getAllServices); // Admin: Get all services
router.put("/:id/complete", authenticate, authorizeAdmin, markServiceAsCompleted); // Admin: Mark service as completed
router.delete("/:id", authenticate, deleteService); // Delete a service booking

export default router;
