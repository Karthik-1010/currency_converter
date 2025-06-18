const currencyFirst = document.getElementById("Currency-first");
const currencySecond = document.getElementById("Currency-second");
const worthFirst = document.getElementById("worth-first");
const worthSecond = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchang-rate");

let currentRate = 1;


function getExchangeRate() {
  fetch(`https://v6.exchangerate-api.com/v6/a24aad0829cec319c6fe91cb/latest/${currencyFirst.value}`)
    .then(res => res.json())
    .then(data => {
      currentRate = data.conversion_rates[currencySecond.value];
      updateUI();
      convertCurrency();
    });
}

function convertCurrency() {
  const amount = parseFloat(worthFirst.value);
  if (isNaN(amount)) {
    worthSecond.value = "";
  } else {
    worthSecond.value = (amount * currentRate).toFixed(2);
  }
}


function updateUI() {
  exchangeRateEl.innerText = `1 ${currencyFirst.value} = ${currentRate} ${currencySecond.value}`;

}


currencyFirst.addEventListener("change", getExchangeRate);
currencySecond.addEventListener("change", getExchangeRate);
worthFirst.addEventListener("input", convertCurrency);


getExchangeRate();
