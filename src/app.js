import express from "express";
import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("health is Good");
});
app.get("/run-manually", (req, res) => {
  res.status(200).send("health is Good");

  setImmediate(async () => {
    await hubspotToFilevine();
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export { app };
