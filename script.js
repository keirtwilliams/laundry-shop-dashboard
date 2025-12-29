let orders = [];

let list = document.querySelector("#order-list");
let handleOrder = document.querySelector("#add-order");

    handleOrder.addEventListener("submit", function(e){
    e.preventDefault();

    let customerName = document.querySelector("#name").value;
    let serviceType = document.querySelector("#service-type").value;
    let weight = document.querySelector("#weight").value;
    let priceNumber = document.querySelector("#price-number").value;
    let orderType = document.querySelector("#order-type").value;

    let newOrder = {
        id: Date.now(),
        name: customerName,
        serviceType: serviceType,
        weight: weight,
        price: priceNumber,
        orderType: orderType    
    }
        orders.push(newOrder);
        renderOrder();      
});

function renderOrder(){
    list.innerHTML = "";
     orders.forEach((order) => {
         let div = document.createElement("div");
         div.setAttribute("data-id", order.id);
         div.className = 'order-card';
         div.innerHTML = `
                       <h1 class="">${order.name} </h1> 
                       <p class="">${order.serviceType} </p> 
                       <p class="">${order.weight}kg</p> 
                       <p class="">₱${order.price} </p>
                       <p class="">${order.orderType} </p>
                          <div class="order-actions"> 
                       <button class="edit-order">Edit</button> 
                       <button class="delete-order">Delete</button> 
                    </div>
         `;  
         list.append(div);
     });

}

