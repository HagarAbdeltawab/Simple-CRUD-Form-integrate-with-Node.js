// get data from db and show it in browser
let products = []
let productNameInput = document.getElementById("productName")
let productPriceInput = document.getElementById("productPrice")
let productDescInput = document.getElementById("productDesc")
getData()
function getData() {
    fetch('http://localhost:3000/product')
    .then(response => response.json())
    .then(({message, results}) => {
        if (message == 'success'){
            products = results
            showProducts()
        }
    })
}
function showProducts(){
    let container = '';
    for(let i = 0; i < products.length; i++){
        container += `
        <tr>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].description}</td>
            <td>
                <button onClick="deleteProduct(${products[i].id})" class="btn btn-danger">Delete</button>
                <button onClick="updateValues(${i},${products[i].id})"  class="btn btn-success">Update</button>
            </td>
        </tr>`
    }   
    document.getElementById('tbody').innerHTML =container
}

// add product from browser into API
function addProduct() {
    fetch("http://localhost:3000/product", {
    method: "POST",
    body: JSON.stringify({
        title: productNameInput.value,
        price: productPriceInput.value,
        description: productDescInput.value
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    }).then(response => response.json())
    .then(({message}) => {
        if (message == 'success'){
            getData()
            clear()
        }   
    });
}

// delete product
function deleteProduct(id) { 
    fetch(`http://localhost:3000/product/${id}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    }).then(response => response.json())
    .then(({message}) => {
        if (message == 'success'){
            getData()
        }   
    });
}

//update product
let input ;
function updateValues(i,id) { 
    input=id;
    productNameInput.value = products[i].title;
    productPriceInput.value = products[i].price;
    productDescInput.value = products[i].description;
    document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'block';
}
function updateProduct(){
    fetch(`http://localhost:3000/product/${input}`,{
        method: "PUT",
        body: JSON.stringify({
            title: productNameInput.value,
            price: productPriceInput.value,
            description: productDescInput.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response =>response.json())
    .then(({message}) => {
        if (message == 'success'){
            getData()
            clear()
        }
    });
}

// reset fields
function clear() {
    productNameInput.value ='';
    productPriceInput.value ='';
    productDescInput.value =''; 
    document.getElementById('add').style.display = 'block';
    document.getElementById('update').style.display = 'none';
}