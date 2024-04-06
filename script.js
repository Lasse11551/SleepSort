'use strict';

// ------------- VIEW ----------------
window.addEventListener("load", start)

// ------------- Model -----------------

function sleepSort(arr) {
    // Create an array to hold promises
    let promises = [];
 
    for (let num of arr) {
        // For each number, create a new promise that resolves after 'num' milliseconds
        let promise = new Promise((resolve) => {
            setTimeout(() => {
                console.log(num);  // Print the number after 'num' milliseconds
                resolve();
            }, num);
        });
 
        // Add the promise to the array
        promises.push(promise);
    }
 
    // Wait for all promises to resolve
    Promise.all(promises).catch((error) => console.error(error));
}
 
// Test the sleepSort function
let arr = [34, 23, 122, 9];
sleepSort(arr);

// ------------- CONTROLLER --------------

function start() {

}
