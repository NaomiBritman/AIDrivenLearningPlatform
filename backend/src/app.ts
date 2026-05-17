import express from "express";
import cors from "cors";
// ייבוא כל הנתיבים של האפליקציה
import userRouter from "./routes/user_routes";
import categoryRouter from "./routes/category_routes";
import subCategoryRouter from "./routes/sub_category_routes";
import promptRouter from "./routes/prompts_routes";

const app = express();

// הגדרת middleware - CORS לחיבור עם Frontend ו-JSON parser
app.use(cors());
app.use(express.json());

// הגדרת נתיבי API עם prefix לכל קבוצת endpoints
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/sub-categories", subCategoryRouter);
app.use("/prompts", promptRouter);

app.get("/", (req, res) => {
  res.send("AI Teacher Platform API is running!");
});

export default app;
