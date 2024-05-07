import destinations from "../model/ModelAgency.js";

function showInfo(descriptionContainerId) {
  console.log("executed");
  const showDescription = document.getElementById(descriptionContainerId);
  const selectCountry = document.getElementById("selectCountry");
  const peopleCountInput = document.getElementById("peopleCount");
  const chooseButton = document.getElementById("chooseButton");
  const selectedCountries = document.getElementById("selectedCountries");

  window.addEventListener("DOMContentLoaded", () => {
    if (selectCountry) {
      selectCountry.addEventListener("change", () => {
        const selectedCountry = selectCountry.value;
        const errorMessage = document.getElementById("errorMessage");

        selectCountry.style.color = "#FFA500";

        errorMessage.innerHTML = "";

        if (selectedCountry) {
          const selectedCountryDescription =
            destinations[selectedCountry].conditions;
          showDescription.innerHTML = selectedCountryDescription;
        } else {
          showDescription.innerHTML = "";
        }
      });

      const titleSelectedCountry = document.getElementById(
        "titleSelectedCountry"
      );
      titleSelectedCountry.style.display = "none";

      chooseButton.addEventListener("click", () => {
        const selectedCountry = selectCountry.value;
        const peopleCount = parseInt(peopleCountInput.value);
        const errorMessage = document.getElementById("errorMessage");

        peopleCountInput.value = "";

        errorMessage.style.color = "#8E000C";
        errorMessage.style.fontWeight = "700";
        errorMessage.style.marginBottom = "10px";

        if (!peopleCount) {
          errorMessage.textContent = "Please enter the number of people";
          return;
        } else {
          errorMessage.textContent = "";
        }

        if (selectedCountry && peopleCount > 0) {
          const listItem = document.createElement("li");

          titleSelectedCountry.style.display = "block";
          titleSelectedCountry.style.fontSize = "24px";
          titleSelectedCountry.style.margin = "0";
          titleSelectedCountry.style.marginTop = "7%";

          listItem.textContent = `${destinations[selectedCountry].name}: ${peopleCount} people`;
          listItem.style.color = "#FFA500";
          listItem.style.listStyle = "none";
          listItem.style.display = "flex";
          listItem.style.justifyContent = "center";
          listItem.style.alignItems = "center";
          listItem.style.fontSize = "16px";

          selectedCountries.appendChild(listItem);
        }
      });
    }
  });
}

export default showInfo;
