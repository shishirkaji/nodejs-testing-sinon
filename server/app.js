import express from "express";

import numberRouter from "./router/router";

const router = express.Router();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(numberRouter);


app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});

export default router;
