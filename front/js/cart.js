let addProduit = JSON.parse(localStorage.getItem("produitKanap"));

function basketKanap() {
  if (addProduit === null) {
  } else {
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
}

basketKanap();

// calcul prix total

let prixTotal = [];

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
Element.insertAdjacentElement("beforeend", prixTotaux);
