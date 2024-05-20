require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/connection");
const errorHandler = require("./middleware/errorHandler");
const commonRoutes = require("./routes/common");
const adminRoutes = require("./routes/admin/admin");
const categoryRoutes = require("./routes/admin/categoryRoutes");
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api", commonRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", categoryRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
