import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ["CREATE", "UPDATE", "DELETE"],
  },
  entity: {
    type: String,
    required: true,
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: Object,
  },
});

export default mongoose.model("Log", logSchema);
