const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const {ObjectID} = require("mongodb");

// Drinks class
class Drink{
  constructor(){
    this.name = "";
    this.id = "";
    this.stock = 0
  }
}
// Cocktail class
class Cocktail{
  constructor(){
    this.id = "",
    this.name = "",
    this.img = "",
    this.instructions = "",
    this.amountofIngredients = 0,
    this.ingredients = [],
    this.measures = []
  }
}

// MongoDB

// Middleware

// Cocktails Router

// Cocktail by ID Router

// Drinks Router

// Drinks by ID Router