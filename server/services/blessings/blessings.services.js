import axios from "axios";
import quoteService from "./../quotes/quotes.service";

const _getRandomNumber = (number) => {
  return Math.floor(Math.random() * number);
  
};
let internalFunctions = {
  _getRandomNumber,
};

const _calculateBlessings = async (number) => {
  const random1 = internalFunctions._getRandomNumber(100);

  const random2 = internalFunctions._getRandomNumber(100);

  let blessing = 0;
  console.log(number);
  if (number > random1) blessings = 1;
  console.log("random1");
  console.log(random1);
  console.log("random2");
  console.log(random2);
  if (number > random2) blessings = 3;
  if (number > random1 && number < random2) blessings = 10;

  return blessing;
};

internalFunctions._calculateBlessings = _calculateBlessings;

const getBlessings = async (userEnteredNumber) => {
  const numberOfBlessings = await internalFunctions._calculateBlessings(
    userEnteredNumber
  );
  console.log(numberOfBlessings);
  let quotes = await quoteService.getAllQutoes();
  console.log(quotes);
  const blessingObject = [];

  for (i = 0; i < numberOfBlessings; i++) {
    blessingObject.push(quotes[_getRandomNumber(quotes.length)]);
  }

  const resObject = {
    message: `you are blessed my fiend. Here are your ${numberOfBlessings} `,
    blessings: blessingsObject,
  };

  return resObject;
};

export default { getBlessings };
