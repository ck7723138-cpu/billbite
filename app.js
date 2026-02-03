const items = [
  {name: "Burger", price: 120},
  {name: "Pizza", price: 250},
  {name: "Cold Drink", price: 40}
];

let cart = [];

const menuDiv = document.getElementById("menu");
const cartUl = document.getElementById("cart");
const totalSpan = document.getElementById("total");

items.forEach(item => {
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `${item.name} <br> ₹${item.price}`;
  div.onclick = () => addToCart(item);
  menuDiv.appendChild(div);
});

function addToCart(item) {
  cart.push(item);
  renderCart();
}

function renderCart() {
  cartUl.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.name} - ₹${i.price}`;
    cartUl.appendChild(li);
    total += i.price;
  });
  totalSpan.textContent = total;
}

function placeOrder() {
  alert("Order Placed! आगे Firebase se connect karenge.");
    }
