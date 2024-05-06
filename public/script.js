import showInfo from "../controller/ControllerTravelAgency.js";
import {
  clearInterface,
  showExchange,
  showConversionResult,
  showInfoConversion,
  showErrorMessage,
} from "../controller/ControllerCurrenciesConvert.js";
import currencies from "../model/ModelConvert.js";

const btnTravels = document.getElementById("btnTravels");
const selectCurrency = document.getElementById("selectCurrency");
const btnConvertCurrency = document.getElementById("btnConvertCurrency");
const titleCurrency = document.getElementById("titleCurrency");
const Result = document.getElementById("Result");

let countChanges = 0;

window.addEventListener("DOMContentLoaded", () => {
  if (btnTravels) {
    btnTravels.addEventListener("click", () => {
      window.location.href = "view/TravelsView.html";
    });
  }
});

showInfo("showDescription");

window.addEventListener("DOMContentLoaded", () => {
  if (selectCurrency) {
    selectCurrency.addEventListener("change", () => {
      const selectedCurrency = selectCurrency.value;

      showExchange(selectedCurrency, currencies);

      if (countChanges > 1) {
        clearInterface(false, "currencyCount");
      }
    });
  }

  if (selectCurrency && btnConvertCurrency && titleCurrency) {
    const numberResult = document.getElementById("numberResult");

    btnConvertCurrency.addEventListener("click", () => {
      const selectedCurrencyValue = selectCurrency.value;
      const currencyCountInput = document.getElementById("currencyCount");
      const amount = parseInt(currencyCountInput.value);
      const errorMessage = document.getElementById("errorMessage");
      const conversionHistory = document.getElementById("conversionHistory");

      clearInterface(false, currencyCountInput);

      showErrorMessage(errorMessage, amount);

      errorMessage.style.color = "#8E000C";
      errorMessage.style.fontWeight = "700";
      errorMessage.style.marginBottom = "10px";

      showConversionResult(amount, selectedCurrencyValue, amount);

      const listItem = document.createElement("li");
      let resultLi = document.createElement("li");

      resultLi.style.color = "#FFA500";
      resultLi.style.fontSize = "16px";

      showInfoConversion(
        titleCurrency,
        selectedCurrencyValue,
        listItem,
        resultLi,
        Result,
        amount,
        conversionHistory,
        numberResult
      );

      titleCurrency.style.whiteSpace = "pre-line";
      titleCurrency.style.fontSize = "20px";
      titleCurrency.style.margin = "0";

      conversionHistory.style.fontSize = "16px";
      conversionHistory.style.fontWeight = "bold";
      conversionHistory.style.color = "#FFA500";
      conversionHistory.style.margin = "0";

      numberResult.style.fontSize = "24px";
      numberResult.style.fontWeight = "bold";
      numberResult.style.color = "#FFA500";
      numberResult.style.margin = "0";
      numberResult.style.marginTop = "10px";
    });
  }
});
