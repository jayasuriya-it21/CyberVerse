require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const basicQuizRoute = require("./routes/basicQuiz");
const intermediateQuizRoute = require("./routes/intermediateQuiz");
const advancedQuizRoute = require("./routes/advancedQuiz");
const quizResultRoute = require("./routes/quizResult"); // Route for handling quiz results
const supportRoute = require("./routes/support"); // Route for handling support queries

// Set up CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow requests only from localhost:3000
  methods: ["GET", "POST"], // Allow only GET and POST methods
  credentials: true, // Allow credentials if needed (for sessions, cookies, etc.)
}));

// Establish database connection
connection();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the route handlers for the different routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/basicQuiz", basicQuizRoute);
app.use("/api/intermediateQuiz", intermediateQuizRoute);
app.use("/api/advancedQuiz", advancedQuizRoute);
app.use("/api/quizResults", quizResultRoute); // Add route for handling quiz results
app.use("/api/support", supportRoute); // Add route for handling support queries

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
