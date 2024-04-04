require("dotenv").config();
const { Resource } = require("../../models");
const api_Key = process.env.API_KEY;
// const api_Secret = process.env.API_SECRET

const dataArray = [];
const rawData = [];

function getPic() {
  const inputCategory = document.getElementById("#inputCategory").val();
  console.log(inputCategory);

  const url = `https://api.unsplash.com/photos/random?query=${inputCategory}&orientation=squarish&client_id=${api_Key}`;

  fetch(url)
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const img = document.createElement("img");
        img.setAttribute("src", data.urls.regular);
        img.setAttribute("alt", data.alt_description);
        img.setAttribute("id", "img");
        img.setAttribute("width", "150px");
        img.setAttribute("height", "150px");
        const selectpic = document.getElementById("#image");
        selectpic.innerHTML = "#image";
        selectpic.appendChild(img);
        rawData.push(data);
        savePicture();
    })
    .catch(function (error) {
        console.error("Error:", error);
    });
}

function savePicture() {
    localStorage.setItem("dataArray", JSON.stringify(dataArray));
    localStorage.setItem("rawData", JSON.stringify(rawData));
}




      

document.querySelector("#selectpic").addEventListener("click", getPic);

module.exports = { handleGetPick, renderPicture };



