//afficher le numéro de commande

function OrderNumber() {
  const numberID = new URLSearchParams(document.location.search);
  let id = numberID.get("id");
  console.log(id);
  document.getElementById("orderId").innerHTML = id;
}

OrderNumber();
