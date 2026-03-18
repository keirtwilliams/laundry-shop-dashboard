
let orders = JSON.parse(localStorage.getItem('myLaundryOrders')) || [];
let editingID = localStorage.getItem('editingID') || null;

function saveToLocalStorage() {
    localStorage.setItem('myLaundryOrders', JSON.stringify(orders));
}

const tbody = document.querySelector("#order-list");
const handleOrder = document.querySelector("#add-order");
const btn = document.getElementById("showForm");
const cancelBtn = document.getElementById('cancel-btn');


if (btn) {
    btn.addEventListener("click", function(){
        window.location.href = '/html/addForm.html'; 
    });
} 

if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
        localStorage.removeItem('editingID');
       window.location.href = '/html/main.html';
    });
}


if (handleOrder) {
    
    if (editingID) {
        const orderToEdit = orders.find(order => order.id === editingID);
        if (orderToEdit) {
            document.querySelector("#name").value = orderToEdit.customerName;
            document.querySelector("#service-type").value = orderToEdit.serviceType;
            document.querySelector("#weight").value = orderToEdit.weight;
            document.querySelector("#price-number").value = orderToEdit.price;
            document.querySelector("#payment-type").value = orderToEdit.paymentType;
            document.querySelector("#status-type").value = orderToEdit.statusType;
            
            const addbtn = document.querySelector(".add-btn");
            if(addbtn) addbtn.textContent = "Save Changes";
        }
    }

    handleOrder.addEventListener("submit", function(e){
        e.preventDefault();
        
        // Get all values
        let customerName = document.querySelector("#name").value;
        let serviceType = document.querySelector("#service-type").value;
        let weight = document.querySelector("#weight").value;
        let price = document.querySelector("#price-number").value;
        let paymentType = document.querySelector("#payment-type").value;
        let statusType = document.querySelector("#status-type").value;
        
        // Validation
        const isValid = orderValidation(customerName, serviceType, weight, price, paymentType, statusType);
        if(!isValid) return;
        
        let newOrder = {
            id: String(Date.now()).slice(8),
            customerName: customerName,
            serviceType: serviceType,                                                                                
            weight: Number(weight),
            price: Number(price),   
            paymentType: paymentType,
            statusType: statusType
        };

        if(editingID){
            // Update existing order
            const foundOrder = orders.find(order => order.id === editingID);
            if(foundOrder){
                foundOrder.customerName = customerName;
                foundOrder.serviceType = serviceType;
                foundOrder.weight = weight;
                foundOrder.price = price;
                foundOrder.paymentType = paymentType;
                foundOrder.statusType = statusType;
            }
            localStorage.removeItem('editingID');
        } else {
            orders.push(newOrder);
        }
        
        saveToLocalStorage();
       window.location.href = '/html/main.html';
    });
}


if(tbody){
    // Delete Function
    tbody.addEventListener("click", function(e){
        if(e.target.classList.contains("order-delete")){
            const card = e.target.closest(".order-table");
            const id = card.dataset.id;
            
            orders = orders.filter(order => order.id !== id);   
            saveToLocalStorage();
            renderOrder();
            totalOrders();
        }   
    });

    // Edit Function
    tbody.addEventListener("click", function(e){
        if(e.target.classList.contains("order-edit")){
            const card = e.target.closest(".order-table");
            const id = card.dataset.id;
            
            localStorage.setItem('editingID', id);
                
            window.location.href = '/html/addForm.html';
        }     
    });
}


function renderOrder(){
    tbody.innerHTML = "";
    const fragment = document.createDocumentFragment();
    orders.forEach(order =>  {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", order.id);
        tr.className = "order-table";
        tr.innerHTML = `
            <td>${order.id} </td>
            <td>${order.customerName}</td>
            <td>${order.serviceType}</td>
            <td>${order.weight}kg</td>
            <td>₱${order.price}</td>
            <td>${order.paymentType}</td>      
            <td>${order.statusType}</td>   
            <td>
                <button class="order-edit">Edit</button>
                <button class="order-delete">Delete</button>
            </td>
        `;
        fragment.append(tr); 
    });
    tbody.append(fragment);
}

function orderValidation(customerName, serviceType, weight, price, paymentType, statusType){
    if(customerName === ""){ alert("Please input a name."); return false; }  
    if(serviceType === ""){ alert("Please select a Service Category."); return false; } 
    if(weight === ""){ alert("Please input a kilogram/s."); return false; } 
    if(price === ""){ alert("Please input a price."); return false; }
    if(paymentType === ""){ alert("Please select a Payment Category."); return false; }
    if(statusType === ""){ alert("Please select a Status Category."); return false; } 
    return true;
} 

function totalOrders(){
    const totalOrder = orders.length;
    const TotalRevenue  = orders.reduce((acc, curr) => acc + curr.price, 0);

    const paraTotalOrder = document.querySelector("#total-orders");
    if(paraTotalOrder) paraTotalOrder.textContent = totalOrder;
    
    const paraTotalRevenue = document.querySelector("#total-revenue");
    if(paraTotalRevenue) {
        paraTotalRevenue.textContent = new Intl.NumberFormat("PH", {
            style: "currency", 
            currency:"PHP"
        }).format(TotalRevenue);
    }
}


if (tbody) {
    renderOrder();
    totalOrders();
}