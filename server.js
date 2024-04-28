const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./modules/User");
const cors = require("cors");

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// API routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
