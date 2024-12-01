import express from 'express';
import { saveDesign, getUserDesigns, deleteDesign } from '../controllers/customDesignController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/", authenticate, saveDesign);

router.get("/", authenticate, getUserDesigns);

router.delete("/:id", authenticate, deleteDesign);

export default router;
