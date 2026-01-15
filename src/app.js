import express from "express";
import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("health is Good");
});
app.get("/run-manually", async (req, res) => {
  try {
    console.log("Manual Trigger is started");
    await hubspotToFilevine();

    res.status(200).send("Manual Trigger is completed");
  } catch (error) {
    console.error("Error running manually:", error);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export { app };
