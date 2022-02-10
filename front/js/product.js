const idProduit = new URL(window.location.href).searchParams.get("id");
const url2 = `http://localhost:3000/api/products/${idProduit}`;
let kanapData = "";

// utilisation de la méthode Fetch pour aller chercher des données dans un bdd local

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

// ajout des différents éléments du kanap dans le html

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
  // une alerte se crée si le client n'a pas choisi de couleur
  if (!color) {
    alert("veuillez ajouter une couleur");
    return;
  }
  // une alerte se crée si le client n'a pas choisi de quantité
  if (quantity > 0 && quantity <= 100 && quantity != 0) {
  } else {
    alert("veuillez ajouter un nombre d'article");
  }
  // déclaration de variables, JSON.parse permet de convertir des données JSON en format javascript
  let addProduit = JSON.parse(localStorage.getItem("kanap"));
  console.log(addProduit);
  // envoie des produits dans le localstorage
  if (!addProduit) {
    addProduit = [];
    addProduit.push(choixDuClient);
    // localStorage.setItem("produitKanap", JSON.stringify(addProduit));
  } else {
    for (let h = 0; h < addProduit.length; h++) {
      if (addProduit[h].id == kanapData._id && addProduit[h].color == color) {
        addProduit[h].quantity += quantity;
        localStorage.setItem("kanap", JSON.stringify(addProduit));
        return;
      }
    }
    addProduit.push(choixDuClient);
  }
  localStorage.setItem("kanap", JSON.stringify(addProduit));

  //ajout du lien pour accéder au panier
  document.querySelector(".item__content__addButton").innerHTML = `
  <a href="../html/cart.html">
  <button id="addToCart">Ajouter au panier</button>
  </a>
  `;
});
