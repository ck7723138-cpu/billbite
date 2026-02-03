import { db, collection, addDoc } from "./firebase.js";

const items = [
  { name: "Burger", price: 120 },
  { name: "Pizza", price: 250 },
  { name: "Cold Drink", price: 40 },
  { name: "Pasta", price: 180 },
  { name: "Sandwich", price: 90 }
];

let cart = [];

const menuDiv = document.getElementById("menu");
const cartUl = document.getElementById("cart");
const totalSpan = document.getElementById("total");

// 🔹 MENU SHOW
items.forEach(item => {
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    <h3>${item.name}</h3>
    <p>₹${item.price}</p>
  `;
  div.onclick = () => addToCart(item);
  menuDiv.appendChild(div);
});

// 🔹 ADD TO CART
function addToCart(item) {
  cart.push(item);
  renderCart();
}

// 🔹 CART DISPLAY
function renderCart() {
  cartUl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartUl.appendChild(li);
    total += item.price;
  });

  totalSpan.textContent = total;
}

// 🔹 REMOVE ITEM
window.removeItem = function(index) {
  cart.splice(index, 1);
  renderCart();
};

// 🔹 PLACE ORDER → FIREBASE SAVE
window.placeOrder = async function () {
  if (cart.length === 0) {
    alert("Cart empty!");
    return;
  }

  const orderData = {
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price, 0),
    date: new Date().toLocaleString()
  };

  try {
    await addDoc(collection(db, "orders"), orderData);
    alert("Order Saved Successfully ✅");
    cart = [];
    renderCart();
  } catch (error) {
    alert("Error saving order ❌");
    console.error(error);
  }
};
