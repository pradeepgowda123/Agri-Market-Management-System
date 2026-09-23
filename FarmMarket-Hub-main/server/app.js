const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const dailyPriceRoutes = require("./routes/dailyPriceRoutes");

const noticeRoutes = require("./routes/noticeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/vegetables", require("./routes/vegetableRoutes"));
app.use("/api/markets", require("./routes/marketRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/daily-prices", require("./routes/dailyPriceRoutes"));
app.use("/api/daily-prices", dailyPriceRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to AgriMandi API");
});

// Global Error Handler (Must be last)
app.use(errorHandler);

module.exports = app;