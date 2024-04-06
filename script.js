"use strict";

// ------------- VIEW ----------------
window.addEventListener("load", start);
let inputArray = [];
let sortedArr = [];
let loadingBars = [];

function addNumber() {
  event.preventDefault();
  let inputValue = document.querySelector("#inputNumbers");

  inputArray.push(inputValue.value);
  inputValue.value = "";
  console.log("input Array", inputArray);
  updateArrayContainer();
}

function updateArrayContainer() {
  let arrayContainer = document.querySelector(".array-container");
  arrayContainer.innerHTML = "";

  inputArray.forEach((number) => {
    let numberElement = document.createElement("span");
    numberElement.textContent = number + " ";
    arrayContainer.appendChild(numberElement);
  });
}

function sortArray() {
  sleepSort(inputArray);
}

function positionNumbers(num) {
  let sortedArrayContainer = document.querySelector(".sorted-array-container");
  let numberElement = document.createElement("span");
  numberElement.textContent = num + " ";
  sortedArrayContainer.appendChild(numberElement);
}

function clearArrayInput() {
  let throwUnsortedContainer = document.querySelector(".array-container");
  let throwSortedContainer = document.querySelector(".sorted-array-container");
  throwUnsortedContainer.textContent = "";
  throwSortedContainer.textContent = "";
  sortedArr = [];
  console.log(sortedArr);
  inputArray = [];
  console.log(inputArray);
  console.log("cleared data");
}

document.querySelector("#clearButton").addEventListener("click", clearArrayInput);
document.querySelector("#startSort").addEventListener("click", sortArray);
document.querySelector("#addButton").addEventListener("click", addNumber);

// ------------- Model -----------------

function createLoadingBars(arr) {
    let loadingBars = [];
    let sortedArrayContainer = document.querySelector(".sorted-array-container");
    sortedArrayContainer.innerHTML = "";
  
    for (let num of arr) {
      let loadingBarContainer = document.createElement("div");
      loadingBarContainer.classList.add("loading-bar-container");
      let loadingBar = document.createElement("div");
      loadingBar.classList.add("loading-bar");
      loadingBarContainer.appendChild(loadingBar);
      sortedArrayContainer.appendChild(loadingBarContainer);
      let valueTextNode = document.createTextNode(num);
      
      loadingBar.appendChild(valueTextNode);
      loadingBarContainer.appendChild(loadingBar);
      sortedArrayContainer.appendChild(loadingBarContainer);
      loadingBars.push(loadingBar);
    }
  
    return loadingBars;
  }
  
  function animateLoadingBar(loadingBar, totalTime, callback) {
    let startTime = performance.now();
    
    function updateAnimation() {
      let currentTime = performance.now();
      let elapsedTime = currentTime - startTime;
      let percentage = Math.max(0, Math.min(100, 100 * (1 - elapsedTime / totalTime)));
      loadingBar.style.width = percentage + "%";
      if (percentage > 0) {
        requestAnimationFrame(updateAnimation);
      } else {
        callback();
      }
    }
    
    requestAnimationFrame(updateAnimation);
  }
  
  function sleepSort(arr) {
    // Create an array to hold promises
    let promises = [];
    let sortedArr = []; // Use local sortedArr
    let loadingBars = createLoadingBars(arr);
  
    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
      let totalTime = num * 1000;
  
      // For each number, create a new promise that resolves after 'num' milliseconds
      let promise = new Promise((resolve) => {
        animateLoadingBar(loadingBars[i], totalTime, () => {
          sortedArr.push(num);
          resolve();
          positionNumbers(num);
        });
      });
  
      // Add the promise to the array
      promises.push(promise);
    }
  
    // Wait for all promises to resolve
    Promise.all(promises)
      .then(() => {
        console.log("Sorted Array:", sortedArr);
      })
      .catch((error) => console.error(error));
}


  

// Test the sleepSort function
/* let arr = [34, 23, 122, 9];
console.log(arr) */

// ------------- CONTROLLER --------------

function start() {}
