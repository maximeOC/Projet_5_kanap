let addProduit = JSON.parse(localStorage.getItem("kanap"));

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

function panierTotalArticles() {
  let quantityTotalPanier = 0;
  for (let m = 0; m < addProduit.length; m++) {
    quantityTotalPanier += Number(addProduit[m].quantityProduct);
  }
  document.getElementById("totalQuantity").innerHTML = quantityTotalPanier;
}
panierTotalArticles();

function panierTotalPrix() {
  let prixTotal = [];
  for (let n = 0; n < addProduit.length; n++) {
    let prixDansLePanier =
      addProduit[n].priceProduct * addProduit[n].quantityProduct;
    prixTotal.push(prixDansLePanier);
  }
  const reducer = (accumulator, cur) => accumulator + cur;
  const prixTotalCalcul = prixTotal.reduce(reducer, 0);
  document.getElementById("totalPrice").innerHTML = prixTotalCalcul;
}

panierTotalPrix();

//bouton supprimé

function SuppArticle() {
  // let addProduit = JSON.parse(localStorage.getItem("produitKanap"));
  const buttonDelete = document.querySelectorAll(".deleteItem");
  for (let w = 0; w < buttonDelete.length; w++) {
    buttonDelete[w].addEventListener("click", (event) => {
      let article = event.target.closest("article");
      let id = article.dataset.id;
      let color = article.dataset.color;

      addProduit = addProduit.filter(
        (el) => el.id !== id && el.color !== color
      );
      localStorage.setItem("kanap", JSON.stringify(addProduit));
      localStorage.removeItem(buttonDelete[w]);
      article.remove();
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
      event.preventDefault();
      let contact = {
        lastname: document.getElementById("lastname").value,
        city: document.getElementById("city").value,
        adresse: document.getElementById("adresse").value,
        email: document.getElementById("email").value,
        firstname: document.getElementById("firstname").value,
      };

      const alertValue = (vrb) => {
        return `${vrb}: symboles et chiffres ne sont pas autorisés, maximum 20 caractères`;
      };
      // expressions régulières pour un nom, une ville et un nom de famille utilisant que des caractères
      let regexCfl = new RegExp("/^[a-zA-Z]{3,20}$/");

      function validFirstName() {
        if (regexCfl.test(contact.firstname)) {
          console.log("ok");
          return true;
        } else {
          console.log("ko");
          alert(alertValue("Prénom"));
          return false;
        }
      }

      function validLastName() {
        if (regexCfl.test(contact.lastname)) {
          console.log("ok");
          return true;
        } else {
          console.log("ko");
          alert(alertValue("nom"));
          return false;
        }
      }

      function validCity() {
        if (regexCfl.test(contact.city)) {
          console.log("ok");
          return true;
        } else {
          console.log("ko");
          alert(alertValue("ville"));
          return false;
        }
      }
      // expressions régulières pour une addresse email valide
      let regexEmail = new RegExp(
        "/^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/"
      );

      function validEmail() {
        if (regexEmail.test(contact.email)) {
          console.log("ok");
          return true;
        } else {
          console.log("ko");
          alert("l'email n'est pas valide");
          return false;
        }
      }

      // expressions régulières pour une addresse valide
      let regexAdresse = new RegExp(
        "/^[sA-Za-z0-9,.]{5,35}[sA-Za-z0-9]{5,35}$/"
      );

      function validAdresse() {
        if (regexAdresse.test(contact.adresse)) {
          console.log("ok");
          return true;
        } else {
          console.log("ko");
          alert("l'adresse n'est pas valide");
          return false;
        }
      }
      let verification = false;
      if (
        validFirstName() &&
        validLastName() &&
        validCity() &&
        validAdresse() &&
        validEmail()
      ) {
        localStorage.setItem("contact", JSON.stringify(contact));
        verification = true;
      } else {
        //Pas d'actions nécessaire
      }

      //Objet contenant les produits et le contact
      let addProduit = JSON.parse(localStorage.getItem("kanap"));

      let products = [];
      addProduit.forEach((element) => products.push(element.id));

      const SENDINFOALL = {
        products,
        contact,
      };
      console.log(SENDINFOALL);
    });
}
commanderKanap();
