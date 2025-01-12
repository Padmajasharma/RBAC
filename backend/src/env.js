import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = "mongodb+srv://padmaja121003:Mowgli12%40%40assign1.uiwr0.mongodb.net/?retryWrites=true&w=majority&appName=assign1
"
export const JWT_SECRET = process.env.JWT_SECRET;
