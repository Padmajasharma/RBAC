import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  permissions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Permission",
  },
});

export default mongoose.model("Role", roleSchema);
