document.addEventListener("DOMContentLoaded", getProducts);
let products = [];
let filteredProducts = [];

//Fetching data from API
async function getProducts(){
    try{
        const response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
        filteredProducts = products;
        // console.log(products);
        showingProducts(filteredProducts);
    }
    catch(error){
        console.error("Error fetching products:", error)
    }
}

//showing Function
function showingProducts(productsToShow){
    const appElement = document.getElementById("app");
    appElement.innerHTML = "";

    productsToShow.forEach(product => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
            <h1 class="title">Title: ${product.title}</h1>
            <h3>Description: ${product.description}</h3>
            <p>ID: ${product.id}</p>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            <img src="${product.image}" alt="${product.title}">
            <hr>
        `;

        appElement.appendChild(productElement);
    });
}

//Sorting Function
function sortingProducts(){
    const sortingVal = document.getElementById("sort").value;

    if(sortingVal === "asc"){
        filteredProducts.sort((a, b) => a.price - b.price);
    }else{
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    showingProducts(filteredProducts);
}

//Filtering By Category
function filterCategory(){
    const filterVal = document.getElementById("filter").value;
    // alert("Filter value:", filterVal);
    

    if(filterVal === "all"){
        // alert("miew")
        filteredProducts = products;
    } else{
        filteredProducts = products.filter(product => product.category === filterVal);
        // alert("Filtered products:", filteredProducts);
    }
    showingProducts(filteredProducts);
}
