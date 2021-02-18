/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

// "use strict";
//
//
const Table = require("cli-table");
const table = new Table({
  chars: {
    top: "═",
    "top-mid": "╤",
    "top-left": "╔",
    "top-right": "╗",
    bottom: "═",
    "bottom-mid": "╧",
    "bottom-left": "╚",
    "bottom-right": "╝",
    left: "║",
    "left-mid": "╟",
    mid: "─",
    "mid-mid": "┼",
    right: "║",
    "right-mid": "╢",
    middle: "│",
  },
});

var inquirer = require("inquirer");

console.log("Hi, welcome to Porty Pizza💫");

var questions = [
  {
    type: "confirm",
    name: "toBeDelivered",
    message: "Is this for delivery?",
    default: false,
  },
  {
    type: "input",
    name: "phone",
    message: "What's your phone number?",
    validate: function (value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }

      return "Please enter a valid phone number";
    },
  },
  {
    type: "checkbox",
    name: "size",
    message: "What size do you need?",
    choices: ["Large", "Medium", "Small"],
  },
  {
    type: "input",
    name: "quantity",
    message: "How many do you need?",
    validate: function (value) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number,
  },
  {
    type: "expand",
    name: "toppings",
    message: "What about the toppings?",
    choices: [
      {
        key: "p",
        name: "Pepperoni and cheese",
        value: "PepperoniCheese",
      },
      {
        key: "a",
        name: "All dressed",
        value: "alldressed",
      },
      {
        key: "w",
        name: "Hawaiian",
        value: "hawaiian",
      },
    ],
  },
  {
    type: "rawlist",
    name: "beverage",
    message: "You also get a free 2L beverage",
    choices: ["Pepsi", "7up", "Coke"],
  },
  {
    type: "input",
    name: "comments",
    message: "Any comments on your purchase experience?",
    default: "Nope, all good!",
  },
  {
    type: "list",
    name: "prize",
    message: "For leaving a comment, you get a freebie",
    choices: ["cake", "fries"],
    when: function (answers) {
      return answers.comments !== "Nope, all good!";
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  const keyArr = Object.keys(answers);
  const keyValues = Object.values(answers);
  table.push(keyArr, keyValues);

  console.log(table.toString());
});
