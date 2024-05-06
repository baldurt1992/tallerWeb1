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

    resultLi.textContent = `${amount.toLocaleString()} COP = ${
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

function showCurrencyConverted() {
  const selectCurrency = document.getElementById("selectCurrency");
  const showInfoCurrency = document.getElementById("showInfoCurrency");
  const btnConvertCurrency = document.getElementById("btnConvertCurrency");
  const titleCurrency = document.getElementById("titleCurrency");
  const Result = document.getElementById("Result");
  const textResults = document.getElementById("textResults");

  clearInterface();

  window.addEventListener("DOMContentLoaded", () => {
    if (selectCurrency) {
      selectCurrency.addEventListener("change", () => {
        changeCount++;
        const selectedCurrency = selectCurrency.value;

        if (selectedCurrency) {
          const selectedCurrencySymbol = currencies[selectedCurrency].symbol;
          const selectedCurrencyExchangeRate =
            currencies[selectedCurrency].textExchangeRate;
          showInfoCurrency.innerHTML = `Exchange Rate: ${selectedCurrency} ${selectedCurrencySymbol} ${selectedCurrencyExchangeRate}`;
        }
        if (totalConversions > 0) {
          const conversionMessage = document.createElement("h3");
          const totalConversionMessage = document.createElement("h3");
          conversionMessage.textContent = `Total COP converted to ${selectedCurrency}: ${currencyCount.toLocaleString()} = 
          ${totalAmountConverted.toFixed(2)}`;
          totalConversionMessage.textContent = `Total conversions: ${totalConversions}`;

          conversionMessages.push(conversionMessage);
          conversionMessages.push(totalConversionMessage);

          conversionMessage.style.width = "100%";
          conversionMessage.style.display = "flex";
          conversionMessage.style.justifyContent = "center";
          conversionMessage.style.alignItems = "center";

          textResults.style.display = "flex";
          textResults.style.justifyContent = "center";
          textResults.style.alignItems = "center";
          textResults.style.flexDirection = "column";

          conversionMessages.forEach((message) => {
            textResults.appendChild(message);
            textResults.appendChild(totalConversionMessage);
          });
        }
      });

      showInfoCurrency.style.marginBottom = "20px";

      if (selectCurrency && btnConvertCurrency && titleCurrency) {
        btnConvertCurrency.addEventListener("click", () => {
          const selectedCurrencyValue = selectCurrency.value;
          const currencyCountInput = document.getElementById("currencyCount");
          const amount = parseInt(currencyCountInput.value);
          const errorMessage = document.getElementById("errorMessage");

          errorMessage.textContent = "";

          errorMessage.style.color = "#8E000C";
          errorMessage.style.fontWeight = "700";
          errorMessage.style.marginBottom = "10px";

          if (!amount) {
            errorMessage.textContent = "Please enter amount";
            return;
          } else {
            errorMessage.textContent = "";
          }

          currencyCountInput.value = "";

          if (selectedCurrencyValue && amount > 0) {
            totalConversions++;
            currencyCount += amount;
            totalAmountConverted =
              amount / currencies[selectedCurrencyValue].exchangeRate;

            const title = `${currencyCount.toLocaleString()} COP converted to ${
              currencies[selectedCurrencyValue].name
            }:`;

            titleCurrency.textContent = title;

            const conversionText =
              totalConversions === 1 ? "Conversion" : "Conversions";
            ConversionTextInfo.textContent = `${totalConversions} ${conversionText}`;

            const listItem = document.createElement("li");
            listItem.textContent = `${totalAmountConverted} ${selectedCurrencyValue}`;

            let resultLi = document.createElement("li");
            resultLi.style.color = "#FFA500";
            resultLi.style.fontSize = "16px";

            resultLi.textContent = `${amount.toLocaleString()} COP = ${
              currencies[selectedCurrencyValue].symbol
            } ${totalAmountConverted.toFixed(2)}`;
            Result.appendChild(resultLi);
          }
        });
      }
    }
  });
}

export {
  clearInterface,
  showExchange,
  showConversionResult,
  showInfoConversion,
  showErrorMessage,
  showCurrencyConverted,
};
