let products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 55000 },
    { id: 2, name: "Book", category: "Education", price: 500 },
    { id: 3, name: "Phone", category: "Electronics", price: 25000 },
    { id: 4, name: "Shoes", category: "Fashion", price: 3000 },
    { id: 5, name: "Headphones", category: "Electronics", price: 4000 }
];

function displayProducts(){
    let tableBody=document.getElementById("productTableBody");
    tableBody.innerHTML="";

    products.forEach((product)=>{
        let tableRow = `<tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
        </tr>`
        ;
        tableBody.innerHTML += tableRow;
    });
}
displayProducts(); //initial call
// func to add new product
function addProduct(){
    let nameip=document.getElementById("name").value;
    let categoryip =document.getElementById("category").value;
    let priceip=Number(document.getElementById("price").value);

    if (nameip==="" || categoryip=== "" || priceip <=0){
        alert("Please fill all the fields");
        return;
    }

    let newProduct= { // object is made 
        id : products.length+1,
        name :nameip,
        category :categoryip,
        price : priceip
    }
    products.push(newProduct); // adding object to array

    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    
    displayProducts();
}
function deleteProduct(){
    let idip =Number(document.getElementById("id").value);
    products = products.filter ((product) => product.id !== idip);
    displayProducts();
}

function searchProduct(){
    let searchip = document.getElementById("searchName").value;
    if(searchip===""){
        alert("Please enter product to search");
        return;
    }

    let searchedProduct = products.filter ((product) => 
    product.name.toLowerCase().includes(searchip.toLowerCase())
    );

    let resultDiv = document.getElementById("searchResult");
    if (searchedProduct.length > 0){
        let resultHTML ="";
        
        searchedProduct.forEach((product) => {
            resultHTML += `<p>
                ID : ${product.id},
                Name :${product.name},
                Category :${product.category},
                Price :${product.price}
        </p>`;
    });
    resultDiv.innerHTML = resultHTML;
    }
    else{
    resultDiv.innerHTML ="<p>Product not found in the records.</p>";
    }
}

function searchByCategory(){
     let categoryip = document.getElementById("search-category").value;
     if(categoryip === ""){
        alert("Please enter product to search");
        return;
    }
    let searchCategory = products.filter((product) =>
    product.category.toLowerCase().includes(categoryip.toLowerCase()));

    let resultDiv = document.getElementById("categoryResult");
    if(searchCategory.length > 0){
        let resultHTML="";
        searchCategory.forEach((product) =>{
            resultHTML += `<p>
            id:${product.id},
            name:${product.name},
            category :${product.category},
            price : ${product.price}
            </p>`
        });
        resultDiv.innerHTML = resultHTML;
    }
    else {
        resultDiv.innerHTML = `<p>No product found by this category</p>`
    }
}
function sortPriceAsc(){
    products.sort((a,b) => a.price - b.price);
    displayProducts();
}

function sortPriceDesc (){
    products.sort((a,b) => b.price - a.price);
    displayProducts();
}

function showStatistics(){
    let totalProducts = products.length;
    let averagePrice = products.reduce((sum,product)=> sum+product.price,0 / totalProducts);
    let highestPrice=Math.max(...products.map(product=> product.price));
    let lowestPrice=Math.min(...products.map(product=>product.price));

    let resultDiv= document.getElementById("statisticsResult");
    resultDiv.innerHTML =`
    <p>Total Products: ${totalProducts}</p>
    <p>Average Price : ${averagePrice}</p>
    <p>Highest Price : ${highestPrice} </p>
    <p>Lowest Price : ${lowestPrice} </p>`;
}

function highlightPremium(){
    let premium = products.filter((product) => product.price >= 20000);
    let resultDiv = document.getElementById("premiumResult");

    if(premium.length >0){
        let resultHTML="";
        premium.forEach((product) => {
            resultHTML += `<p>Id :${product.id} ,Name:${product.name}, Price:${product.price}</p>`;
        });
        resultDiv.innerHTML=resultHTML;
    }
    else{
        resultDiv.innerHTML="<p>No products found.</p>";
    }
}