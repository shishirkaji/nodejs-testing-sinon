import express from "express";
import blessings from "./../handler/blessings";

const router = express.Router();

router.get("/api/v1/blessings", (req, res) =>
  blessings.blessingsHandler(req, res)
);

export default router;
