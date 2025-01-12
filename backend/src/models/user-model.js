import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Role",
  },
  permissions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Permission",
  },
});

export default mongoose.model("User", userSchema);
