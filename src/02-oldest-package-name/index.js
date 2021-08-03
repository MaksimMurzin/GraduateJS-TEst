"use strict";

const { default: axios } = require("axios");
let cmp = require('semver-compare')


 //Make the following POST request with either axios or node-fetch:

const url =  "http://ambush-api.inyourarea.co.uk/ambush/intercept";
const body =  {
    url: "https://api.npms.io/v2/search/suggestions?q=react",
    method : "GET",
    return_payload: true
}


// The results should have this structure:
// {
//     "status": 200.0,
//     "location": [
//       ...
//     ],
//     "from": "CACHE",
//     "content": [
//       ...
//     ]
// }



//    With the results from this request, inside "content", return
//    the "name" of the package that has the oldest "date" value
 

module.exports = async function oldestPackageName() {

  // TODO
//do the same stuff as before in terms of axios, now we will get a list of packages,
//we will assume that the first one has the oldest date, we will compare it to the next one
//if that one is older we increase the position variable 
let name;
const data = await axios.post(url, body);
const listOfContents = data.data.content;

const temp1 = listOfContents[0]["package"]["date"];
let oldestDate = new Date(temp1);
let currentOldestPackagePosition = 0;

// using a selection sort type comparison
for (let i = 1; i < listOfContents.length; i++){
  let currentPackageDate = new Date(listOfContents[i]["package"]["date"]);
  if (  currentPackageDate < oldestDate ){
    oldestDate = currentPackageDate;
    currentOldestPackagePosition = i;
  }
}
  name = listOfContents[currentOldestPackagePosition]["package"]["name"];
  return name
};
