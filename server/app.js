import express from "express";

const router = express.Router();

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});

export default router;
