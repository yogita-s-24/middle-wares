import express from "express";
import dotenv from 'dotenv'
import { gethealthApi } from "./controllers/health.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/healths", gethealthApi);

const checkApi = (req, res, next) => {
  const { apiKey } = req.query;

  if (apiKey === "yogita") {
    next();
  } else {
    res.json({
      success: false,
      message: "Invalid API Key.",
    });
  }
};

const validateParams = (req, res, next) => {
  const { title, description, price } = req.body;
  if (!title) {
    res.json({
      success: false,
      message: "Title is required.",
    });
}
    if (!description) {
      res.json({
        success: false,
        message: "Description is required.",
      });
    }
    if (!price) {
      res.json({
        success: false,
        message: "Price is required.",
      });
    }
    next();
  }

  let counter = 0;

  const apiCallCounter= async(req, res, next)=>{
    counter++;
    console.log(`API Calls : ${counter}`);
    next();
  }

  app.use(apiCallCounter); 

  app.get("/orders", checkApi, async (req, res) => {
    res.json({
      success: true,
      data: [],
      message: "All products fetch Successfully.",
    });
  });

app.post("/orders", checkApi, validateParams, async (req, res) => {

    res.json({
      success: true,
      data: {},
      message: "Order created Successfully.",
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
