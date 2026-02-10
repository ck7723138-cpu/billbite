document.addEventListener("DOMContentLoaded", function () {

let currentTable = null;
let order = {};
let total = 0;

const items = [
    {name:"Biryani",price:180,img:"https://picsum.photos/100?1"},
    {name:"Pizza",price:250,img:"https://picsum.photos/100?2"},
    {name:"Burger",price:120,img:"https://picsum.photos/100?3"},
    {name:"Momos",price:90,img:"https://picsum.photos/100?4"},
    {name:"Fried Rice",price:140,img:"https://picsum.photos/100?5"},
    {name:"Paneer",price:200,img:"https://picsum.photos/100?6"},
    {name:"Coffee",price:60,img:"https://picsum.photos/100?7"},
    {name:"Cold Drink",price:40,img:"https://picsum.photos/100?8"}
];

// TABLE BUTTONS
const tablesDiv = document.getElementById("tables");
for (let i = 1; i <= 10; i++) {
    const btn = document.createElement("button");
    btn.textContent = "T" + i;
    btn.onclick = () => selectTable(i);
    tablesDiv.appendChild(btn);
}

// SELECT TABLE
function selectTable(t) {
    currentTable = t;
    document.getElementById("menu-title").style.display = "block";
    loadMenu();
}

// LOAD MENU
function loadMenu() {
    const menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<img src="${item.img}">
                         <h4>${item.name}</h4>
                         <p>₹${item.price}</p>`;
        div.onclick = () => addItem(item.name, item.price);
        menuDiv.appendChild(div);
    });
}

// ADD ITEM
function addItem(name, price) {
    if (!order[name]) order[name] = { qty: 0, price };
    order[name].qty++;
    updateOrder();
}

// UPDATE ORDER LIST
function updateOrder() {
    const list = document.getElementById("order-list");
    list.innerHTML = "";
    total = 0;

    for (let item in order) {
        let itemTotal = order[item].qty * order[item].price;
        total += itemTotal;
        const li = document.createElement("li");
        li.textContent = `${item} x${order[item].qty} = ₹${itemTotal}`;
        list.appendChild(li);
    }

    document.getElementById("total").textContent = total;
    document.getElementById("actions").style.display = "block";
}

// KOT BUTTON
document.getElementById("kot-btn").addEventListener("click", function () {
    if (!currentTable) return alert("Select table first!");
    alert("KOT Printed for Table " + currentTable);
});

// SHOW BILL OPTIONS
document.getElementById("bill-btn").addEventListener("click", function () {
    document.getElementById("bill-options").style.display = "block";
});

// GENERATE BILL
document.getElementById("confirm-bill").addEventListener("click", function () {
    if (!currentTable) return alert("Select table!");
    const pay = document.getElementById("payment").value;
    alert(`Bill for Table ${currentTable}\nPayment: ${pay}\nTotal: ₹${total}`);

    order = {};
    total = 0;
    document.getElementById("order-list").innerHTML = "";
    document.getElementById("total").textContent = "0";
    document.getElementById("bill-options").style.display = "none";
});

});
