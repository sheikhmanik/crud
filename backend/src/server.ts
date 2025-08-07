import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import authMiddleware from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("API is running...");
});

app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
