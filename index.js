const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

function swapCurrency() {
  let currency_one = currencyOne.value;
  let currency_two = currencyTwo.value;
  currencyOne.value = currency_two;
  currencyTwo.value = currency_one;
  calculate();
}

// fetch exchange rates and update the DOM
function calculate() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[currencyTwoValue];

      rateElement.innerText = `1 ${currencyOneValue} = ${rate} ${currencyTwoValue}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);
swap.addEventListener("click", swapCurrency);
