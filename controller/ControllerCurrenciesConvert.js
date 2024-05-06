import currencies from "../model/ModelConvert.js";

let currencyCount = 0;
let totalAmountConverted = 0;
const conversionMessages = [];
let resultConversions = 0;
let conversionSuccessful = false;
let totalConversions = 0;
let ResumenConversions = 0;
let totalCop = 0;

function clearInterface(counter, ...args) {
  args.forEach((arg) => {
    if (typeof arg === "string") {
      const element = document.getElementById(arg);
      if (element) {
        element.innerHTML = "";
      } else if (arg instanceof HTMLElement) {
        arg.innerHTML = "";
      }
    }
  });
  if (counter) {
    totalConversions = 0;
    currencyCount = 0;
    totalAmountConverted = 0;
  }
}

function showExchange(selectedCurrency, currencies) {
  const selectedCurrencySymbol = currencies[selectedCurrency].symbol;
  const selectedCurrencyExchangeRate =
    currencies[selectedCurrency].textExchangeRate;
  showInfoCurrency.innerHTML = `Exchange Rate: ${selectedCurrency} ${selectedCurrencySymbol} ${selectedCurrencyExchangeRate}`;
}

function showConversionResult(currencyCountInput, selectedCurrency, amount) {
  if (selectedCurrency && amount > 0) {
    totalConversions++;
    totalAmountConverted = amount / currencies[selectedCurrency].exchangeRate;
    totalCop += totalAmountConverted;
    ResumenConversions = totalCop;
    resultConversions = currencyCount += amount;

    conversionSuccessful = true;
  } else {
    conversionSuccessful = false;
  }
  return conversionSuccessful;
}

function showInfoConversion(
  titleToShow,
  selectedCurrency,
  listItem,
  resultLi,
  result,
  amount,
  conversionHistory,
  numberResult
) {
  if (conversionSuccessful) {
    const title = `${resultConversions.toLocaleString()} COP converted to ${
      currencies[selectedCurrency].name
    }`;

    titleToShow.textContent = title;

    const numberResultText = `${ResumenConversions.toFixed(2)}`;

    numberResult.textContent = numberResultText;

    const conversionText =
      totalConversions === 1 ? "Conversion" : "Conversions";
    ConversionTextInfo.textContent = `${totalConversions} ${conversionText}`;
    
    listItem.textContent = `${totalAmountConverted} ${selectedCurrency}`;

    conversionHistory.textContent = "Conversion History";

    resultLi.textContent = ` ${amount.toLocaleString()} COP = ${
      currencies[selectedCurrency].symbol
    } ${totalAmountConverted.toFixed(2)}`;
    result.appendChild(resultLi);
  }
}

function showErrorMessage(error, amount) {
  if (!amount) {
    error.textContent = "Please enter amount";
    return;
  } else {
    error.textContent = "";
  }
}

export {
  clearInterface,
  showExchange,
  showConversionResult,
  showInfoConversion,
  showErrorMessage,
};
