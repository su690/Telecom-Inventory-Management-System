let products = JSON.parse(localStorage.getItem('products')) || [];
let editIndex = null;

// Save data to local storage
function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Add or Edit Product
function handleForm(event) {
  event.preventDefault();

  const name = document.getElementById('productName').value;
  const category = document.getElementById('productCategory').value;
  const description = document.getElementById('productDescription').value;
  const stockLevel = parseInt(document.getElementById('stockLevel').value);
  const reorderPoint = parseInt(document.getElementById('reorderPoint').value);
  const supplierName = document.getElementById('supplierName').value;
  const imageFile = document.getElementById('productImage').files[0];
  const imageURL = imageFile ? URL.createObjectURL(imageFile) : '';

  const product = { name, category, description, stockLevel, reorderPoint, supplierName, imageURL };

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
    document.getElementById('formTitle').textContent = 'Add Product';
  } else {
    products.push(product);
  }

  document.getElementById('productForm').reset();
  saveToLocalStorage(); // Save changes to local storage
  renderTable();
}

// Render Products Table
function renderTable() {
  const tableBody = document.querySelector('#productTable tbody');
  tableBody.innerHTML = '';

  products.forEach((product, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.description}</td>
      <td>${product.stockLevel}</td>
      <td>${product.reorderPoint}</td>
      <td>${product.supplierName}</td>
      <td>${product.imageURL ? `<img src="${product.imageURL}" alt="${product.name}">` : 'No Image'}</td>
      <td>
        <button class="edit" onclick="editProduct(${index})">Edit</button>
        <button class="delete" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Edit Product
function editProduct(index) {
  const product = products[index];
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('stockLevel').value = product.stockLevel;
  document.getElementById('reorderPoint').value = product.reorderPoint;
  document.getElementById('supplierName').value = product.supplierName;

  editIndex = index;
  document.getElementById('formTitle').textContent = 'Edit Product';
}

// Delete Product
function deleteProduct(index) {
  products.splice(index, 1);
  saveToLocalStorage(); // Save changes to local storage
  renderTable();
}

// Load products from local storage on page load
document.addEventListener('DOMContentLoaded', renderTable);
