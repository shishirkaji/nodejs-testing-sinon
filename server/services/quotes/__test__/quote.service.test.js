import { assert } from "chai";
import sinon from "sinon";

import axios from "axios";

import quoteService from "../quotes.service";

const { getAllQuote } = quoteService;
describe("Quote Service", () => {
  it("must be a function that takes in 1 parameter.", () => {
    assert.lengthOf(getAllQuote, 1);

    assert.typeOf(getAllQuote, "function");
  });

  it("must call axios.get function with given param", async () => {
    // arrange

    const fakeUrl = "https://service.somefakeurl.com";
    const fakeResponse = { data: "some fake data" };

    const axiosGetStub = sinon.stub(axios, "get");
    axiosGetStub.withArgs(fakeUrl).resolves(fakeResponse);

    // act

    const response = await getAllQuote(fakeUrl);

    //assert

    sinon.assert.calledOnceWithExactly(axiosGetStub, fakeUrl);

    assert.deepEqual(fakeResponse.data, response);
  });
});
