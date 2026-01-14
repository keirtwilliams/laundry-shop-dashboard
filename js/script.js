let orders = [];
let editingID = null;

let tbody = document.querySelector("#order-list");
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
    let paymentType = document.querySelector("#payment-type").value;
      
         //boolean validation if isvalid false -> return ordervalidation()
       const isValid = orderValidation(customerName,serviceType,weight,price,paymentType);
    if(!isValid){
        return;
    }  else {
        handleOrder.reset()
    }

        //persistent in-memory array for application state
    let newOrder = {
        id: String(Date.now()).slice(8),
        customerName: customerName,
        serviceType: serviceType,                                                                             
        weight: Number(weight),
        price: Number(price),   
        paymentType: paymentType  
    }

   if(editingID){
        const foundOrder = orders.find(newOrders => newOrders.id === editingID);
        if(foundOrder){
            foundOrder.customerName = customerName;
            foundOrder.serviceType = serviceType;
            foundOrder.weight = weight;
            foundOrder.price = price;
            foundOrder.paymentType = paymentType;
        }
        addbtn = document.querySelector(".add-btn");
        addbtn.textContent = "Add Order";

               //RESET AFTER THE ORDER WAS SAVED
         editingID = null;

     } else {

        orders.push(newOrder);
        console.log(newOrder);
          }
        renderOrder();
});
        //delete function
    tbody.addEventListener("click", function(e){
        if(e.target.classList.contains("order-delete")){
            const card = e.target.closest(".order-table");
            const id = card.dataset.id;
        orders = orders.filter(
            order => order.id !== id);   
         renderOrder();
        }   

    });
            //MODIFYING ARRAY
    tbody.addEventListener("click", function(e){
        if(e.target.classList.contains("order-edit")){
           const card = e.target.closest(".order-table");
           const id = card.dataset.id;
       
       const newOrders = orders.find(newOrders => newOrders.id == id);
             addbtn = document.querySelector(".add-btn");
             addbtn.textContent = "Save Changes";

            document.querySelector("#name").value = newOrders.customerName;
            document.querySelector("#service-type").value = newOrders.serviceType;
            document.querySelector("#weight").value = newOrders.weight;
            document.querySelector("#price-number").value = newOrders.price;
            document.querySelector("#payment-type").value = newOrders.paymentType;
            editingID = id;
         }     
    });

        //render list to the UI
 
function renderOrder(){
  tbody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  orders.forEach(order =>  {
   const tr = document.createElement("tr");
      tr.setAttribute("data-id", order.id);
      tr.className = "order-table";
      tr.innerHTML = 
                   `
                   <td>${order.id} </td>
                   <td>${order.customerName}</td>
                    <td>${order.serviceType}</td>
                     <td>${order.weight}kg</td>
                      <td>₱${order.price}</td>
                       <td>${order.paymentType}</td>            
                        <td>
                           <button class="order-edit">Edit</button>
                           <button class="order-delete">Delete</button>
                       </td>
                      
                   `;
       fragment.append(tr); 
  });
   tbody.append(fragment);
}

        //basic validaiton using boolean
     function orderValidation(customerName, serviceType, weight, price, paymentType){
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
    if(paymentType === ""){
        alert("Please select a Payment Category.");
        return false;
    }
    return true;
  } 


  

 