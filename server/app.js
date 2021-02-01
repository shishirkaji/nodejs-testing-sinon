import express from "express";

import routes from "./router/routes";

const router = express.Router();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});

export default router;
