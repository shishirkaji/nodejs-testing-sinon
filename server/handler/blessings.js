import axios from "axios";
import blessingService from "./../services/blessings/blessings.services";

const blessingsHandler = async (req, res) => {
  const { number } = req.query;

  const resObject = await blessingService.getBlessings(number);

  console.log(number);
  res.status(200).send(resObject);
};

export default { blessingsHandler };
