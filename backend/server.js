import { config } from "dotenv";
import app from "./app.js";
import { connectingDB } from "./config/database.js";
config({ path: "backend/config/config.env" });

// Connect to Database or MongoDB
connectingDB();

// Server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT} 🔥`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting down server due to unhandled promise rejection!`);
  server.close(() => process.exit(1));
});
