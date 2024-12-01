import CustomDesign from "../models/customDesignModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Save custom design to the database
export const saveDesign = asyncHandler(async (req, res) => {
  const { wallColors, sofaColor } = req.body;

  if (!wallColors || !sofaColor) {
    return res.status(400).json({ message: "Wall colors and sofa color are required" });
  }

  const customDesign = new CustomDesign({
    user: req.user._id,
    wallColors,
    sofaColor,
  });

  const savedDesign = await customDesign.save();
  res.status(201).json(savedDesign);
});


export const getUserDesigns = asyncHandler(async (req, res) => {
  const designs = await CustomDesign.find({ user: req.user._id });
  res.status(200).json(designs);
});

export const deleteDesign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const design = await CustomDesign.findOneAndDelete({ _id: id, user: req.user._id });

  if (!design) {
      return res.status(404).json({ message: "Design not found" });
  }

  res.status(200).json({ message: "Design deleted successfully" });
});