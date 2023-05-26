import express, { json } from "express";
import morgan from "morgan";

// import routes
import errorMiddleware from "./middleware/errorMiddleware.js";
import product from "./routes/productRoute.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(json());
app.use("/api/v1/", product);

// Middleware for error messages
app.use(errorMiddleware);

export default app;
