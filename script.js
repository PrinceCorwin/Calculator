// declare variables and event listeners
let prevNumber = "";
let currentNumber = "";
// let operator = "";
let prevOperator = "";
let answer;
let equal = false;

const currentDisplay = document.getElementById("current-display");
const prevDisplay = document.getElementById("prev-display");
const numbersClick = document.querySelectorAll(".number");
const operatorsClick = document.querySelectorAll(".operator");

const allClearClick = document.querySelector(".allClear");
allClearClick.ontouchstart = function () {
  clear();
};
allClearClick.onclick = function () {
  clear();
};
const equalClick = document.querySelector(".equal");
equalClick.onclick = function () {
  equal = true;
  compute();
};
equalClick.ontouchstart = function () {
  compute();
};
const deleteClick = document.querySelector(".delete");
deleteClick.onclick = function () {
  deleteDigit();
};
deleteClick.ontouchstart = function () {
  deleteDigit();
};
const signClick = document.querySelector(".changeSign");
signClick.onclick = function () {
  changeSign();
};
signClick.ontouchstart = function () {
  changeSign();
};

for (let i = 0; i < numbersClick.length; i++) {
  numbersClick[i].addEventListener("click", function () {
    appendNumber(numbersClick[i].innerText);
  });
  numbersClick[i].addEventListener("ontouchstart", function () {
    appendNumber(numbersClick[i].innerText);
  });
}
for (let i = 0; i < operatorsClick.length; i++) {
  operatorsClick[i].addEventListener("click", function () {
    operator = operatorsClick[i].innerText;
    setOperator();
  });
  operatorsClick[i].addEventListener("ontouchstart", function () {
    operator = operatorsClick[i].innerText;
    setOperator();
  });
}

// functions

function clear() {
  currentNumber = "";
  prevNumber = "";
  currentDisplay.innerText = "";
  prevDisplay.innerText = "";
  operator = "";
  prevOperator = "";
}

function deleteDigit() {
  if (currentNumber === "") {
    return;
  }
  currentNumber = currentNumber.toString().slice(0, -1);
  console.log(currentNumber);
  if (currentNumber === "" || currentNumber === "-") {
    currentNumber = 0;
  }
  updateDisplay();
}

function compute() {
  if (operator === "" || prevNumber === "" || currentNumber === "") {
    return;
  }
  console.log("compute");
  console.log("operator " + operator);
  if (equal) {
    prevOperator = operator;
    // console.log("prevOP: " + prevOperator);
    // console.log("operator: " + operator);
  }
  switch (prevOperator) {
    case "÷":
      answer = Number(prevNumber) / Number(currentNumber);
      break;
    case "×":
      answer = Number(prevNumber) * Number(currentNumber);
      break;
    case "-":
      answer = Number(prevNumber) - Number(currentNumber);
      break;
    case "+":
      answer = Number(prevNumber) + Number(currentNumber);
      break;
    default:
      return;
  }
  currentNumber = answer.toFixed(4);
  prevNumber = currentNumber;
  if (equal) {
    prevOperator = "";
  }
  updateDisplay();
  //   next line preventing operator reassignment
  currentNumber = "";
}

function changeSign() {
  if (currentNumber.toString() === "0" || currentNumber.toString() === "") {
    return;
  }
  currentNumber = (Number(currentNumber) * -1).toString();
  updateDisplay();
}

function appendNumber(number) {
  if (number === "." && currentNumber.toString().includes(".")) {
    return;
  }
  if (equal) {
    prevNumber = "";
  }
  currentNumber = currentNumber.toString() + number.toString();
  updateDisplay();
  equal = false;
}

function setOperator() {
  if (currentNumber === "" && equal === false) {
    return;
  }
  //   console.log("clicked");
  equal = false;
  if (prevOperator === "") {
    prevOperator = operator;
  }
  //   operator = currentOperator;
  //   console.log("operator: " + operator);
  //   console.log("prevOp: " + prevOperator);
  if (prevNumber === "") {
    prevNumber = currentNumber;
    currentNumber = "";
    // console.log("current" + currentNumber);
    // console.log("prev" + prevNumber);
    // console.log(currentOperator);

    updateDisplay();
  } else {
    compute();
    prevOperator = operator;
  }
  equal = false;
}

function updateDisplay() {
  //split currentNumber into two parts... before and after decimal
  if (currentNumber.toString().includes(".")) {
    let integer = currentNumber.toString().split(".")[0];
    let decimal = currentNumber.toString().split(".")[1];
    // need to add if statement to remove zeros from decimal if there are no other numbers
    console.log(decimal);
    if (integer === "") {
      currentDisplay.innerText = "0" + "." + decimal;
    } else {
      currentDisplay.innerText =
        parseInt(integer).toLocaleString("en") + "." + decimal;
    }
    if (prevNumber != "") {
      prevDisplay.innerText = Number(prevNumber)
        .toFixed(4)
        .toLocaleString("en");
    }
  } else if (
    // currentNumber.toString() === "0" ||
    currentNumber.toString() === ""
  ) {
    currentDisplay.innerText = "";
  } else {
    currentDisplay.innerText = parseInt(currentNumber).toLocaleString("en");
  }
  if (prevNumber != "") {
    prevDisplay.innerText = Number(prevNumber).toFixed(4).toLocaleString("en");
  }
  console.log(currentNumber);
  //   return;
}
