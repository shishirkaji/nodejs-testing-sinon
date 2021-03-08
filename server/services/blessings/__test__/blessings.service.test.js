import sinon from "sinon";
import { assert } from "chai";

import blessingService from "../blessings.services";
import quoteService from "../../quotes/quotes.service";
import constants from "../../constants";
import { before, describe } from "mocha";

const { internalFunctions, getBlessings } = blessingService;

describe("Blessings Service", () => {
  beforeEach(() => {
    sinon.stub(console, "log");
  });
  describe("Internal Function", () => {
    afterEach(() => {
      sinon.restore();
    });
    describe("_getRandomNumber", () => {
      it("must be a function that takes in 1 parameter", () => {
        assert.typeOf(internalFunctions._getRandomNumber, "function");
        assert.lengthOf(internalFunctions._getRandomNumber, 1);
      });

      it("must return integer value and call Math.random", () => {
        // arrange

        const mathRandomStub = sinon.stub(Math, "random").returns(0.69);
        const mathFloorStub = sinon
          .stub(Math, "floor")
          .withArgs(34.5)
          .returns(34);

        const expectedResult = 34;

        // act

        const result = internalFunctions._getRandomNumber(50);

        // assert

        assert.equal(expectedResult, result);

        sinon.assert.calledOnce(mathRandomStub);
        sinon.assert.calledOnce(mathFloorStub);
      });
    });

    describe("_calculateBlessings", () => {
      it("must be a function that takes in 3 parameter", () => {
        assert.typeOf(internalFunctions._calculateBlessings, "function");
        assert.lengthOf(internalFunctions._calculateBlessings, 3);
      });

      it("must return expected value", () => {
        // arrange

        const mockDataSet = [
          { arg1: 12, arg2: 70, arg3: 71, expectedResult: 3 },
          { arg1: 20, arg2: 10, arg3: 13, expectedResult: 1 },
          { arg1: 12, arg2: 10, arg3: 20, expectedResult: 10 },
        ];

        for (let i = 0; i < mockDataSet.length; i++) {
          // act

          const data = mockDataSet[i];

          const result = internalFunctions._calculateBlessings(
            data.arg1,
            data.arg2,
            data.arg3
          );

          // assert

          assert.equal(result, data.expectedResult);
        }
      });
    });
    ``;
  });

  describe("getBlessing", () => {
    // arrange

    const fakeQuotes = ["fakeQuote1", "fakeQuote2", "fakeQuote3"];
    let _getRandomNumberStub;
    let getAllQuoteStub;

    beforeEach(() => {
      // arrange

      _getRandomNumberStub = sinon.stub(internalFunctions, "_getRandomNumber");

      _getRandomNumberStub.onFirstCall().returns(15);
      _getRandomNumberStub.onSecondCall().returns(20);
      _getRandomNumberStub.onThirdCall().returns(0);

      _calculateBlessingsStub = sinon
        .stub(internalFunctions, "_calculateBlessings")
        .returns(1);

      getAllQuoteStub = sinon.stub(quoteService, "getAllQuote");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("must call getRandomNumber Function twice and throw right error in case of failure", async () => {
      // arrange

      getAllQuoteStub.rejects("fake error");

      // act

      let errorExits = false;
      try {
        const blessings = await getBlessings(50);
      } catch (error) {
        assert.equal(error.message, "Error while getting quotes");

        errorExits = true;
      }

      assert.isTrue(errorExits);
      sinon.assert.calledTwice(_getRandomNumberStub);
    });

    it("must return expected object if there are no errors", async () => {
      // arrange

      const mockBlessingObject = ["fake quote"];
      getAllQuoteStub.resolves(mockBlessingObject);
      let errorExits = false;

      const expectedResult = {
        message: `Here are your 1 blessings my child! `,
        blessings: mockBlessingObject,
      };

      // act

      let resObject;

      try {
        resObject = await getBlessings(50);
      } catch (error) {
        errorExits = true;
      }

      assert.deepEqual(resObject, expectedResult);
      assert.isFalse(errorExits);

      sinon.assert.calledThrice(_getRandomNumberStub);
    });
  });
});
