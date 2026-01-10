let orders = [];
let editingID = null;

let list = document.querySelector("#order-list");
         //submit handler
let handleOrder = document.querySelector("#add-order");
        //event happens with preventdefault
handleOrder.addEventListener("submit", function(e){
    e.preventDefault();

        //getting all the values
    let customerName = document.querySelector("#name").value;
    let serviceType = document.querySelector("#service-type").value;
    let weight = document.querySelector("#weight").value;
    let price = document.querySelector("#price-number").value;
    let orderType = document.querySelector("#order-type").value;
      
         //boolean validation if isvalid false -> return ordervalidation()
       const isValid = orderValidation(customerName,serviceType,weight,price,orderType);
    if(!isValid){
        return;
    }  else {
        handleOrder.reset()
    }

        //persistent in-memory array for application state
    let newOrder = {
        id: String(Date.now()).slice(6),
        customerName: customerName,
        serviceType: serviceType,                                                                             
        weight: Number(weight),
        price: Number(price),   
        orderType: orderType   
    }

   if(editingID){
        const foundOrder = orders.find(newOrders => newOrders.id === editingID);
        if(foundOrder){
            foundOrder.customerName = customerName;
            foundOrder.serviceType = serviceType;
            foundOrder.weight = weight;
            foundOrder.price = price;
            foundOrder.orderType = orderType;
        }
        addbtn = document.querySelector(".add-btn");
        addbtn.textContent = "Add Order";
        editingID = null;
     } else {

        orders.push(newOrder);
        console.log(newOrder);
          }
        renderOrder();
});
        //delete function
    list.addEventListener("click", function(e){
        if(e.target.classList.contains("delete-order")){
            const card = e.target.closest(".order-card");
            const id = card.dataset.id;
        orders = orders.filter(
            order => order.id !== id);   
         renderOrder();
        }   

    });

    list.addEventListener("click", function(e){
        if(e.target.classList.contains("edit-order")){
           const card = e.target.closest(".order-card");
           const id = card.dataset.id;
       
       const newOrders = orders.find(newOrders => newOrders.id == id);
             addbtn = document.querySelector(".add-btn");
             addbtn.textContent = "Save Changes";

            document.querySelector("#name").value = newOrders.customerName;
            document.querySelector("#service-type").value = newOrders.serviceType;
            document.querySelector("#weight").value = newOrders.weight;
            document.querySelector("#price-number").value = newOrders.price;
            document.querySelector("#order-type").value = newOrders.orderType;
            editingID = id;
         }     
    });

        //render list to the UI
   function renderOrder() {
    list.innerHTML = ""; 
    const fragment = document.createDocumentFragment();
    orders.forEach((order) => {
        let div = document.createElement("div");
        div.setAttribute("data-id", order.id);
        div.className = 'order-card';
        div.innerHTML = `
            <h1>${order.customerName}</h1> 
            <p>${order.serviceType}</p> 
            <p>${order.weight}kg</p> 
            <p>₱${order.price}</p>
            <p>${order.orderType}</p>
            <div class="order-actions"> 
                <button class="edit-order">Edit</button> 
                <button class="delete-order">Delete</button> 
            </div>
        `;
        fragment.append(div);
    });
    list.append(fragment);
}

        //basic validaiton using boolean
     function orderValidation(customerName, serviceType, weight, price, orderType){
    if(customerName === ""){
        alert("Please input a name.");
        return false;
    }  
    if (serviceType === ""){
        alert("Please select a Service Category.");
        return false;
    } 
    if (weight === ""){
        alert("Please input a kilogram/s");
        return false;
    } 
    if(price === ""){
        alert("Please input a price.");
        return false;
    }
    if(orderType === ""){
        alert("Please select a Order Category.");
        return false;
    }
    return true;
  } 


  

 