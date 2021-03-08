import quoteService from "./../quotes/quotes.service";
import constants from "./../constants";
const { quoteServiceUrl } = constants;

const internalFunctions = {
  /**
   *
   * @description function that takes in a number and returns a random integer
   * @param {number} number
   * @returns {integer}
   */

  _getRandomNumber: (number) => {
    return Math.floor(Math.random() * number);
  },
  _calculateBlessings: (number, randomNumber1, randomNumber2) => {
    let blessings = 1;

    if (number < randomNumber1 && number < randomNumber2) blessings = 3;

    if (number > randomNumber1 && number < randomNumber2) blessings = 10;

    if (number > randomNumber1 && number > randomNumber2) blessings = 1;

    return blessings;
  },
};

const getBlessings = async (userEnteredNumber) => {
  const randomNumber1 = internalFunctions._getRandomNumber(100);

  const randomNumber2 = internalFunctions._getRandomNumber(100);

  const numberOfBlessings = internalFunctions._calculateBlessings(
    userEnteredNumber,
    randomNumber1,
    randomNumber2
  );

  try {
    let quotes = await quoteService.getAllQuote(quoteServiceUrl);
    const blessingsObject = [];

    for (let i = 0; i < numberOfBlessings; i++) {
      blessingsObject.push(
        quotes[internalFunctions._getRandomNumber(quotes.length)]
      );
    }

    const resObject = {
      message: `Here are your ${numberOfBlessings} blessings my child! `,
      blessings: blessingsObject,
    };

    return resObject;
  } catch (error) {
    console.log(error);
    throw new Error("Error while getting quotes", error);
  }
};

export default { getBlessings, internalFunctions };
