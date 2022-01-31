let itemData = [];

const fetchKanap = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((response2) => (itemData = response2));
};

const kanapDisplay = async () => {
  await fetchKanap();
  document.getElementById("items").innerHTML = itemData
    .map(
      (items) =>
        `
          <a href="./product.html?id=${items._id}">
            <article>
              <img src=${items.imageUrl} alt=${items.altTxt}>
              <h3 class="productName">${items.name}</h3>
              <p class="productDescription">${items.description}</p>
            </article>
          </a> 
         `
    )
    .join("");
};

kanapDisplay();
