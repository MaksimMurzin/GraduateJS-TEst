"use strict";

const { default: axios } = require("axios");
 //Make the following POST request with either axios or node-fetch:

const url =  "http://ambush-api.inyourarea.co.uk/ambush/intercept";
const body =  {
    url: "https://api.npms.io/v2/search/suggestions?q=react",
    method : "GET",
    return_payload: true
}





  // With the results from this request, inside "content", 
  // list every maintainer and each package name that they maintain,
  // return an array with the following shape:
// [
//     ...
//     {
//         username: "a-username",
//         packageNames: ["a-package-name", "another-package"]
//     }
//     ...
// ]
//  * NOTE: the parent array and each "packageNames" array should 
//  * be in alphabetical order.
//  */


module.exports = async function organiseMaintainers() {

//async function organiseMaintainers() {

  //create a unique list of all maintainers, then map all their packages to each maintainer
  const setOfMaintainers = new Set();
  const listOfMaintainers = []
  const data = await axios.post(url, body);

  //that data.data.content was too verbose for me
  const listOfContents = data.data.content;

  listOfContents.forEach(obj => {
    obj["package"]["maintainers"].forEach(maintainer => {
      setOfMaintainers.add(maintainer["username"])
    })
  });
  
  //of course there are cleaner implementations using external libraries but this is quick and dirty
  const arrayOfMaintainers = [...setOfMaintainers].sort()
  arrayOfMaintainers.forEach(maint => {
    const maintainer = {username: maint, packageNames: []};
    listOfContents.forEach(obj => {
      if( obj["package"]["maintainers"].some(m => m["username"] == maint )){
        maintainer.packageNames.push(obj["package"]["name"])
        // console.log(obj["package"]["name"])
      }
    
    })
    maintainer.packageNames.sort()
    listOfMaintainers.push(maintainer)
  })
 
//  console.log(listOfMaintainers)
   return listOfMaintainers
};

// organiseMaintainers()
