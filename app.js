let currentTable=null;
let order={};
let total=0;

const items=[
{name:"Biryani",price:180,img:"https://picsum.photos/100?1"},
{name:"Pizza",price:250,img:"https://picsum.photos/100?2"},
{name:"Burger",price:120,img:"https://picsum.photos/100?3"},
{name:"Momos",price:90,img:"https://picsum.photos/100?4"},
{name:"Fried Rice",price:140,img:"https://picsum.photos/100?5"},
{name:"Paneer",price:200,img:"https://picsum.photos/100?6"},
{name:"Coffee",price:60,img:"https://picsum.photos/100?7"},
{name:"Cold Drink",price:40,img:"https://picsum.photos/100?8"}
];

const tablesDiv=document.getElementById("tables");
for(let i=1;i<=10;i++){
    const btn=document.createElement("button");
    btn.textContent="T"+i;
    btn.onclick=()=>selectTable(i);
    tablesDiv.appendChild(btn);
}

function selectTable(t){
    currentTable=t;
    document.getElementById("menu-title").style.display="block";
    loadMenu();
}

function loadMenu(){
    const menuDiv=document.getElementById("menu");
    menuDiv.innerHTML="";
    items.forEach(item=>{
        const div=document.createElement("div");
        div.className="item";
        div.innerHTML=`<img src="${item.img}">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>`;
        div.onclick=()=>addItem(item.name,item.price);
        menuDiv.appendChild(div);
    });
}

function addItem(name,price){
    if(!order[name]) order[name]={qty:0,price};
    order[name].qty++;
    updateOrder();
}

function updateOrder(){
    const list=document.getElementById("order-list");
    list.innerHTML="";
    total=0;
    for(let i in order){
        let itemTotal=order[i].qty*order[i].price;
        total+=itemTotal;
        const li=document.createElement("li");
        li.textContent=`${i} x${order[i].qty} = ₹${itemTotal}`;
        list.appendChild(li);
    }
    document.getElementById("total").textContent=total;
    document.getElementById("actions").style.display="block";
}

function generateKOT(){
    alert("KOT Printed for Table "+currentTable);
}

function showBillOptions(){
    document.getElementById("bill-options").style.display="block";
}

function generateBill(){
    const pay=document.getElementById("payment").value;
    alert(`Bill for Table ${currentTable}\nPayment: ${pay}\nTotal: ₹${total}`);
}
