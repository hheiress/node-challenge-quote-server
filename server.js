// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
  response.send(pickFromArray(quotes));
});

app.get("/quotes/search", function (req, response){
  const term=req.query.term;
  console.log(term);

  //gettig the quotes that contain the word
let answer=quotes.filter(function(quote){
  return quote.quote.includes(term) || quote.author.includes(term);
})
  //return the response object, new set of quotes
  response.send(answer)
})

app.get("/quotes2/search", function (req, response){
  const term=req.query.term;
  console.log(term);
  const result=quotes.filter(function(quote){
  return quote.quote.includes(term) || quote.author.includes(term);
})
  response.send(result);
} )

app.get("/quotes3/search", function (req, response){
  const term=req.query.term;
  console.log(term);
  const result=quotes.filter(function(quote){
    return quote.quote.includes(term) || quote.author.includes(term);;
  })
  response.send(result);
} )

app.get("/quotes/search/echo", function (req, response){
  const word=req.query.word;
  console.log(word);
  const newstring= "You said: " + word ;
  const result=quotes.filter(function(quote){
    return quote.quote.includes(word) || quote.author.includes(word);;
  })
  result.push(newstring);
  response.send(result);
} )

//...END OF YOUR CODE 

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
