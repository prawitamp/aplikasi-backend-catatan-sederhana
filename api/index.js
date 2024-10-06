import express from "express";
import dotenv from "dotenv";
// import cors from "cors";

// import app routes
import appRoutes from "../src/routes/index.js";
// app.use(cors());

const app = express();
dotenv.config();
app.use(express.json());

// App routes
app.use(appRoutes);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running in port http://localhost:${port}`);
});
