const reverseString = require("../components/reverse-string.js");

test("ReverseString function exists", () => {
  expect(reverseString).toBeDefined();
});

test("String reverses", () => {
  expect(reverseString("hello")).toEqual("olleh");
});

test("String reverses wtih uppercase", () => {
  expect(reverseString("Hello")).toEqual("olleh");
});
