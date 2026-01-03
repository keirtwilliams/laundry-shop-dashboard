let orders = [];

let list = document.querySelector("#order-list")

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
        id: Date.now(),
        customerName: customerName,
        serviceType: serviceType,                                                                             
        weight: weight,
        price: price,
        orderType: orderType    
    }
     
          //returns a new array 
        orders.push(newOrder);
        renderOrder();    
         
        //reset after submitting
        
});

    //render list to the UI
    function renderOrder(){
    list.innerHTML = "";
     orders.forEach((order) => {
         let div = document.createElement("div");
         div.setAttribute("data-id", order.id);
         div.className = 'order-card';
         div.innerHTML = `
                       <h1 class="">${order.customerName} </h1> 
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