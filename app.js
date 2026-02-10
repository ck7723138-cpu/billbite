const items = [
    {name:"Chicken Biryani", price:180},
    {name:"Veg Thali", price:120},
    {name:"Paneer Butter Masala", price:200},
    {name:"Dal Tadka", price:110},
    {name:"Fried Rice", price:130},
    {name:"Noodles", price:140},
    {name:"Burger", price:90},
    {name:"Pizza", price:250},
    {name:"Momos", price:80},
    {name:"Sandwich", price:70},
    {name:"Cold Drink", price:40},
    {name:"Coffee", price:60},
    {name:"Tea", price:20},
    {name:"Ice Cream", price:50},
    {name:"Manchurian", price:150},
    {name:"Chowmein", price:130},
    {name:"Roll", price:100},
    {name:"Tandoori Roti", price:15},
    {name:"Butter Naan", price:25},
    {name:"Paratha", price:30},
    {name:"Soup", price:90},
    {name:"Salad", price:60},
    {name:"Fish Fry", price:220},
    {name:"Chicken Curry", price:190},
    {name:"Mutton Curry", price:260},
    {name:"Pasta", price:170},
    {name:"French Fries", price:80},
    {name:"Spring Roll", price:120},
    {name:"Dosa", price:90},
    {name:"Idli", price:50},
    {name:"Vada", price:40},
    {name:"Upma", price:60},
    {name:"Poha", price:50},
    {name:"Pav Bhaji", price:100},
    {name:"Chole Bhature", price:120},
    {name:"Rajma Rice", price:110},
    {name:"Curd Rice", price:90},
    {name:"Chicken Wings", price:210},
    {name:"Grilled Chicken", price:230},
    {name:"Paneer Tikka", price:180},
    {name:"Veg Burger", price:80},
    {name:"Cheese Pizza", price:270},
    {name:"Margarita Pizza", price:220},
    {name:"Chicken Roll", price:110},
    {name:"Egg Roll", price:90},
    {name:"Omelette", price:50},
    {name:"Boiled Egg", price:20},
    {name:"Milkshake", price:100},
    {name:"Lassi", price:70},
    {name:"Juice", price:60},
    {name:"Biryani Family Pack", price:400},
    {name:"Special Thali", price:220},
    {name:"Chicken Tikka", price:210},
    {name:"Veg Fried Rice", price:120},
    {name:"Chicken Fried Rice", price:150},
    {name:"Paneer Roll", price:100},
    {name:"Cheese Sandwich", price:90},
    {name:"Chocolate Cake", price:80},
    {name:"Brownie", price:70}
];

let total = 0;
let billItems = [];

const menuDiv = document.getElementById("menu");
const billList = document.getElementById("bill-list");

items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<h4>${item.name}</h4>
                     <p>₹${item.price}</p>
                     <button onclick="addItem('${item.name}',${item.price})">Add</button>`;
    menuDiv.appendChild(div);
});

function addItem(name, price) {
    billItems.push(name);
    total += price;

    const li = document.createElement("li");
    li.textContent = `${name} - ₹${price}`;
    billList.appendChild(li);

    document.getElementById("total").textContent = total;
}

function printBill() {
