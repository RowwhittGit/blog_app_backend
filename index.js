import express from 'express';
import connectDB from './src/configs/db.js';
import config from './src/configs/config.js';
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import likeRoutes from "./src/routes/likeRoutes.js";

const app = express();
const { port } = config();
connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(("/api/posts"), postRoutes);
app.use("/api/posts", likeRoutes); 
app.use("/api/comments", commentRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});