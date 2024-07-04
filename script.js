let selectedCategory = '';
const selectCategory = async (s) => {
    selectedCategory = s;
    document.querySelectorAll('.category button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.category button[onclick="selectCategory('${s}')"]`).classList.add('active');

    const response = await fetch(`https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`);
    const data = await response.json();
    filterData(data);
}

const filterData = (data) => {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    if (selectedCategory) {
        const filteredCategory = data.categories.find(category => category.category_name === selectedCategory);
        if (filteredCategory && filteredCategory.category_products) {
            filteredCategory.category_products.forEach(product => {
                console.log(product)
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-detail">
                        <h1 class="title">${product.title.length>13?product.title.slice(0,10)+"...":product.title}</h1>
                        <h2 class="vendor">• ${product.vendor}</h2>
                    </div>
                    <div class="product-price">
                        <span class="price">Rs ${product.price}</span>
                        <span class="compare-price">Rs ${product.compare_at_price}</span>
                        <span class="percentage-change">${Math.ceil(((product.compare_at_price-product.price)/product.compare_at_price)*100)}% OFF</span>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                productsContainer.appendChild(productCard);
            });
        } else {
            console.log("No products found for the selected category.");
        }
    } else {
        console.log("No category selected.");
    }
}
