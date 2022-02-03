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
  panier(kanapData);
}

//ajout lien pour la page panier

let btn_ajoutPanier = document.getElementById("addToCart");

btn_ajoutPanier.addEventListener("click", (e) => {
  e.preventDefault();
  let color = document.getElementById("colors").value;
  let quantity = Number(document.getElementById("quantity").value);
  // récuperation des choix du cient
  let choixDuClient = {
    idProduct: kanapData._id,
    nameProduct: kanapData.name,
    colorProduct: color,
    quantityProduct: quantity,
    priceProduct: kanapData.price,
    imageProduct: kanapData.imageUrl,
    altProduct: kanapData.altTxt,
    description: kanapData.description,
  };
  console.log(choixDuClient);
  // déclaration de variables, JSON.parse permet de convertir des données JSON en format javascript
  let addProduit = JSON.parse(localStorage.getItem("produitKanap"));

  // envoie des produits dans le localstorage
  if (addProduit) {
    addProduit.push(choixDuClient);
    localStorage.setItem("produitKanap", JSON.stringify(addProduit));
    console.log(addProduit);
  } else {
    addProduit = [];
    addProduit.push(choixDuClient);
    localStorage.setItem("produitKanap", JSON.stringify(addProduit));

    console.log(addProduit);
  }

  // une alerte se crée si le client n'a pas choisi de couleur
  if (!color) {
    alert("veuillez ajouter une couleur");
    return;
  }
  // une alerte se crée si le client n'a pas choisi de quantité
  if (!quantity > 0 && quantity <= 100) {
  } else {
    alert("veuillez ajouter un nombre d'article");
  }
  //ajout du lien pour accéder au panier
  document.querySelector(".item__content__addButton").innerHTML = `
  <a href="../html/cart.html">
  <button id="addToCart">Ajouter au panier</button>
  </a>
  `;
});
