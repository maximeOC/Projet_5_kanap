let addProduit = JSON.parse(localStorage.getItem("produitKanap"));

function basketKanap() {
  for (let a = 0; a < addProduit.length; a++)
    document.getElementById(
      "cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${addProduit[a].idProduct}" data-color="${addProduit[a].colorProduct}">
        <div class="cart__item__img">
          <img src="${addProduit[a].imageProduct}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${addProduit[a].nameProduct}</h2>
            <p>${addProduit[a].colorProduct}</p>
            <p>${addProduit[a].priceProduct}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProduit[a].quantityProduct}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> `;
}

basketKanap();

// calcul prix total

let prixTotal = [];
let quantityTotalPanier = [];

for (let m = 0; m < addProduit.length; m++) {
  let prixDansLePanier = addProduit[m].priceProduct;
  prixTotal.push(prixDansLePanier);

  console.log(prixTotal);
}

//addition du panier
const reducer = (accumulator, cur) => accumulator + cur;
const prixTotalCalcul = prixTotal.reduce(reducer);

console.log(prixTotalCalcul);

//injection variable dans le code html

let prixTotaux = (document.getElementById(
  "totalPrice"
).innerHTML = `${prixTotalCalcul}`);

//ajout quantité total

for (let y = 0; y < addProduit.length; y++) {
  let quantiteDansLePanier = addProduit[y].quantityProduct;
  quantityTotalPanier.push(quantiteDansLePanier);

  console.log(quantiteDansLePanier);
}

// constante pour cumuler les quantités
const reduceQuan = (accumulator, cur) => accumulator + cur;
const quantiteTotalCalcul = quantityTotalPanier.reduce(reduceQuan);

console.log(quantiteTotalCalcul);

let quantiteTotaux = (document.getElementById(
  "totalQuantity"
).innerHTML = `${quantiteTotalCalcul}`);

//bouton supprimé

/*function deleteProduct() {
  let addProduit = JSON.parse(localStorage.getItem("produitKanap"));
  let btnSupp = document.querySelectorAll(".deleteItem");
  console.log(btnSupp);

  for (let w = 0; w < btnSupp.length; w++) {
    btnSupp[w].addEventListener("click", (event) => {
      event.preventDefault();
      let recupIdSupp = addProduit[w].idProduct;
      let id = article.dataset.id;
      let
      addProduit = addProduit.filter((el) => el.idProduct !== recupIdSupp);
    });
  }
}*/

function SuppArticle() {
  let addProduit = JSON.parse(localStorage.getItem("produitKanap"));
  const buttonDelete = document.querySelectorAll(".deleteItem");
  for (let w = 0; w < buttonDelete.length; w++) {
    buttonDelete[w].addEventListener("click", (event) => {
      let article = event.target.closest("article");
      let id = article.dataset.id;
      let color = article.dataset.color;

      addProduit = addProduit.filter(
        (el) => el.id !== id || el.color !== color
      );
      localStorage.setItem("produitKanap", JSON.stringify(addProduit));
      article.remove();
      findindex();
    });
  }
}
SuppArticle();

//formulaire regex

function commanderKanap() {
  const btnEnvoie = document.getElementById("order");
  btnEnvoie.addEventListener =
    ("click",
    (event) => {
      let lastname = document.getElementById("lastname");
      let city = document.getElementById("city");
      let adresse = document.getElementById("adresse");
      let email = document.getElementById("email");
      let firstname = document.getElementById("firstname");

      const textAlert = (valeur) => {
        return `${valeur}: symboles et chiffres ne sont pas autorisés, maximum 20 caractères`;
      };

      const regexVilleNomPrenom = () => {};
    });
}
