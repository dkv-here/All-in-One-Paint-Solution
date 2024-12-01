import mongoose from 'mongoose';

const customDesignSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wallColors: {
    wall1: { type: String, required: true },
    wall2: { type: String, required: true },
    wall3: { type: String, required: true },
    wall4: { type: String, required: true },
    floor: { type: String, required: true },
    ceiling: { type: String, required: true },
  },
  sofaColor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("CustomDesign", customDesignSchema);
