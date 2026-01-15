import express from "express";
import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("health is Good");
});
app.get("/run-manually", (req, res) => {
  res.status(200).send("health is Good");

  setImmediate(async () => {
    try {
      console.log("Manual trigger started");
      await hubspotToFilevine();
      console.log("Manual trigger completed");
    } catch (err) {
      console.error("Manual trigger failed:", err);
    }
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export { app };
