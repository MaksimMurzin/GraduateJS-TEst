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



//  *  With the results from this request, inside "content", count
//  *  the number of packages that have a MAJOR semver version 
//  *  greater than 10.x.x
//  */

 module.exports = async function countMajorVersionsAbove10() {

  // TODO
    //axios returns a response object so we should be good
  let count = 0;
  const data = await axios.post(url, body);

  //that data.data.content was too verbose for me
  const listOfContents = data.data.content;

  listOfContents.forEach(obj => {

    // count += cmp(obj.package.version, "10.0.0");
    if(cmp(obj.package.version, "10.0.0") > 0 ){count++}
  })
  return count;
};

