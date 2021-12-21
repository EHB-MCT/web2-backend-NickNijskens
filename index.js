const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const {ObjectID} = require("mongodb");

// Drinks class
class Drink{
  constructor(){
    this.name = "";
    this.stock = 0
  }
}
// Cocktail class
class Cocktail{
  constructor(){
    this.name = "",
    this.img = "",
    this.instructions = "",
    this.amountOfIngredients = 0,
    this.ingredients = [],
    this.measures = [],
    this.price = 0
  }
}

// MongoDB
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.FINAL_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const DB_NAME = "2021-2022-Web2-project";

// Middleware

let db, collection;
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

router
// Cocktails Router
router
.route('/cocktails')
.get((req, res) => {
  collection = db.collection("Cocktails");
  collection.find({}).toArray((error, result) => {
    if(error){
      return res.status(500).send(error);
    }
    res.json(result);
  })
})
.post((req, res) => {
  let cocktail = new Cocktail;
  cocktail.name = req.body.name;
  cocktail.img = req.body.img;
  cocktail.instructions = req.body.instructions;
  cocktail.ingredients = req.body.ingredients;
  cocktail.amountOfIngredients = cocktail.ingredients.length;
  cocktail.measures = req.body.measures;
  cocktail.price = req.body.price;

  collection = db.collection("Cocktails");
  collection.insertOne(cocktail).then(result => {
    console.log(result);
  });
  res.send(`Succesfully added cocktail ${cocktail.name} to the database`);
});

// Cocktail by ID Router
router
.route('/cocktails/:id')
.get((req, res) => {
  async function run(){
    try{
      collection = db.collection("Cocktails");
      let id = new ObjectID(req.params.id);
      const result = await collection.findOne({_id : id});
      res.json(result);
    }
    catch(err){
      return err;
    }
  }
  run();
})
.delete((req, res) => {
  async function run(){
    try{
      collection = db.collection("Cocktails");
      let id = new ObjectID(req.params.id);
      collection.deleteOne({_id : id});
      res.send('deleted');
    }
    catch(err){
      return err;
    }
  }
  run();
})
// Drinks Router
router
.route('/drinks')
.get((req, res) => {
  collection = db.collection("Drinks");
  collection.find({}).toArray((error, result) => {
    if(error){
      return res.status(500).send(error);
    }
    res.json(result);
  })
})
.post((req, res) => {
  let drink = new Drink;
  drink.name = req.body.name;
  drink.stock = 0;

  collection = db.collection("Drinks");
  collection.insertOne(drink).then(result => {
    console.log(result);
  });
  res.send(`Succesfully added drink ${drink.name} to the database`)
})

// Drinks by ID Router
router
.route('/drinks/:id')
.get((req, res) => {
  async function run(){
    try{
      collection = db.collection("Drinks");
      let id = new ObjectID(req.params.id);
      const result = await collection.findOne({_id : id})
      res.json(result);
    }
    catch(err){
      return err;
    }
  }
  run();
})
.put((req, res) => {
  async function run(){
    collection = db.collection("Drinks");
    let id = new ObjectID(req.params.id);
    let newStock = req.body.value;
    collection.updateOne({_id : id}, 
      {$set : {"stock" : newStock}});
      res.send('updated');
  }
  run();
})
.delete((req, res) => {
  async function run(){
    try{
      collection = db.collection("Drinks");
      let id = new ObjectID(req.params.id);
      collection.deleteOne({_id : id})
      res.send('deleted');
    }
    catch(err){
      return err;
    }
  }
  run();
})

// App use and listen

app.use("/api", router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  client.connect(err => {
    if(err){
      throw err;
    }
    db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
  });
})