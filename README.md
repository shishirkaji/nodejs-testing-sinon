# NodeJS testing with Mocha Chai and Sinon.

What does the code do ? 

This express REST api takes in a number between 0 to 100 as a query param and then returns 1,3 or 10 quotes depending on a very simple random number generator algorithm. It is written in ES6 syntax and is compiled using babel and babel register.

What technologies are inolved ? 

Javascript language, NodeJS runtime environment , Mocha for testing and sinon for mocking.

What will you get from this tutorial ? 

This tutorial is a basic start for any one willing to understand how we can use sinon to stub all kinds of functions. This will show you how we can test functions that is in same as well as different module.
The scope of this tutorial is limited to only testing in functional paradigm. I will extend this tutorial in the future to show how we can test object oriented class based NodeJS codes.

I found it tricky in the beginning to understand the concept of mocking different functions. Let us suppose you have 2 functions a and b in a file called somefile.js and function a is being used by function b. Now we need
to unit test each function. Question is how will you make sure that function b does not call function a when testing(as it is unit test and should not depend on any other functions) ? You will need to mock / stub function a. How will you mock function a ? This is explained in this tutorial.

This will be my first contribution to help people learn programming. This is not an absolute basic f, I understand but is required to write a robust code.

lets learn!

PS: If you have any suggestions feel free to ping me on shishirkaji@gmail.com
