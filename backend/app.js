import express, { json } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// import routes
import errorMiddleware from "./middleware/errorMiddleware.js";

// import routes
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(json());
app.use(cookieParser());

// Routes
app.use("/api/v1/", user);
app.use("/api/v1/", product);

// client error handler
app.use((req, res, next) => {
  res.status(404).json({ message: "route is not found" });
  next();
});
// server error handler
app.use(errorMiddleware);

export default app;
