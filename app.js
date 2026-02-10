const items = Array.from({length:60}, (_,i)=>({name:"Item "+(i+1), price: (i+1)*5}));

let total = 0;
let billItems = [];
let kotHistory = JSON.parse(localStorage.getItem("kotHistory")) || [];
let billHistory = JSON.parse(localStorage.getItem("billHistory")) || [];

const menuDiv = document.getElementById("menu");
const billList = document.getElementById("bill-list");

items.forEach(item=>{
    const div=document.createElement("div");
    div.className="item";
    div.innerHTML=`<h4>${item.name}</h4><p>₹${item.price}</p>
    <button onclick="addItem('${item.name}',${item.price})">Add</button>`;
    menuDiv.appendChild(div);
});

function addItem(name,price){
    billItems.push({name,price});
    total+=price;

    const li=document.createElement("li");
    li.textContent=`${name} - ₹${price}`;
    billList.appendChild(li);
    document.getElementById("total").textContent=total;
}

function generateBill(){
    const name=document.getElementById("name").value;
    const table=document.getElementById("table").value;
    const payment=document.getElementById("payment-mode").value;

    if(!name||!table||billItems.length===0){alert("Fill details!");return;}

    const data={
        name, table, items:billItems, total, payment,
        date:new Date().toISOString()
    };

    billHistory.push(data);
    kotHistory.push({table, items:billItems, date:data.date});

    localStorage.setItem("billHistory",JSON.stringify(billHistory));
    localStorage.setItem("kotHistory",JSON.stringify(kotHistory));

    updateSummary();
    alert("Bill Saved!");

    billItems=[]; total=0;
    billList.innerHTML="";
    document.getElementById("total").textContent=0;
}

function viewHistory(){
    let txt="--- BILL HISTORY ---\n";
    billHistory.forEach(b=>txt+=`${b.date}\nTable:${b.table}\n₹${b.total} (${b.payment})\n\n`);
    alert(txt);
}

function viewKOT(){
    let txt="--- KOT HISTORY ---\n";
    kotHistory.forEach(k=>txt+=`${k.date}\nTable:${k.table}\nItems:${k.items.map(i=>i.name).join(", ")}\n\n`);
    alert(txt);
}

function updateSummary(){
    let cash=0,upi=0,credit=0;
    billHistory.forEach(b=>{
        if(b.payment==="Cash") cash+=b.total;
        if(b.payment==="UPI") upi+=b.total;
        if(b.payment==="Credit") credit+=b.total;
    });
    document.getElementById("cash-total").textContent=cash;
    document.getElementById("upi-total").textContent=upi;
    document.getElementById("credit-total").textContent=credit;
}

function cleanOld(){
    const now=new Date();
    billHistory=billHistory.filter(b=>(now-new Date(b.date))/(1000*60*60*24)<=60);
    kotHistory=kotHistory.filter(k=>(now-new Date(k.date))/(1000*60*60*24)<=60);
    localStorage.setItem("billHistory",JSON.stringify(billHistory));
    localStorage.setItem("kotHistory",JSON.stringify(kotHistory));
}

cleanOld();
updateSummary();
