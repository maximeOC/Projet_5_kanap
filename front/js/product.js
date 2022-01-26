const idProduit = new URL(window.location.href).searchParams.get("id");
const url2 = `http://localhost:3000/api/products/${idProduit}`;
let kanapData = "";
const fetchconst = fetch(url2)
  .then((reponse) => {
    return reponse.json();
  })

  .then(async function (resultApi) {
    kanapData = await resultApi;
    if (kanapData) {
      getPost(kanapData);
    }
  })

  .catch(function (error) {
    console.log("erreur de chargement");
  });

function fetchProduct() {
  fetchconst;
}

fetchProduct();

function getPost(kanapData) {
  let productPrice = document.querySelector("#price");
  productPrice.innerHTML = kanapData.price;

  let kanapImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(kanapImg);
  kanapImg.src = kanapData.imageUrl;
  kanapImg.alt = kanapData.altTxt;

  let kanapName = document.querySelector("#title");
  kanapName.innerHTML = kanapData.name;

  let productDescription = document.querySelector("#description");
  productDescription.innerHTML = kanapData.description;

  for (let colors of kanapData.colors) {
    let kanapColors = document.querySelector("#colors");
    kanapColors.innerHTML += `<option value="${colors}"> ${colors}</option>`;
  }
}

const idForm = document.querySelector("#colors");
console.log(idForm);

let btn_ajoutPanier = document.getElementById("addToCart");
btn_ajoutPanier.addEventListener("click", () => {
  let color = document.getElementById("colors");
  let quantity = document.getElementById("quantity");
  let price = document.getElementById("price");
  let title = document.getElementById("title");

  console.log();
});
