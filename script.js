// declare variables and event listeners
let prevNumber = "";
let currentNumber = "";

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
    operator(operatorsClick[i].innerText);
  });
  operatorsClick[i].addEventListener("ontouchstart", function () {
    operator(operatorsClick[i].innerText);
  });
}

// functions

function clear() {
  currentNumber = "";
  prevNumber = "";
  currentDisplay.innerText = "";
  prevDisplay.innerText = "";
}

function deleteDigit() {
  currentNumber = currentNumber.toString().slice(0, -1);
  console.log(currentNumber);
  if (currentNumber === "" || currentNumber === "-") {
    currentNumber = 0;
  }
  updateDisplay();
}

function compute() {}

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
  currentNumber = currentNumber.toString() + number.toString();
  updateDisplay();
}

function operator() {
  console.log("clicked");
}

function updateDisplay() {
  // need to split currentNumber into two parts... before and after decimal
  if (currentNumber.toString().includes(".")) {
    let integer = currentNumber.split(".")[0];
    let decimal = currentNumber.split(".")[1];

    currentDisplay.innerText =
      parseInt(integer).toLocaleString("en") + "." + decimal;
    prevDisplay.innerText = prevNumber.toLocaleString("en");
  } else if (currentNumber.toString() === "0") {
    currentDisplay.innerText = "";
  } else {
    currentDisplay.innerText = parseInt(currentNumber).toLocaleString("en");
  }
  console.log(currentNumber);
}
