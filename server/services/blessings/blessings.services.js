import quoteService from "./../quotes/quotes.service";
import constants from "./../constants";
const { quoteServiceUrl } = constants;

const internalFunctions = {
  /**
   *
   * @description function that takes in a number and returns a random integer between 0 and provided param number
   * @param {number} number
   * @returns {integer} number
   */

  _getRandomNumber: (number) => {
    return Math.floor(Math.random() * number);
  },

  /**
   *
   * @description function that takes in a number from req and two random numbers and returns how many blessings the person gets lucky with.
   * @param {number} number
   * @param {number} randomNumber1
   * @param {number} randomNumber2
   * @returns {integer} 1 | 3 |10
   */

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
      const randomQuoteIndex = internalFunctions._getRandomNumber(
        quotes.length
      );
      blessingsObject.push(quotes[randomQuoteIndex]);
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
