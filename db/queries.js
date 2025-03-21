const pool = require("./pool");

async function getAllProducts() {
  const { rows } = pool.query("SELECT * FROM products");

  return rows;
}

async function getProductsInCategory(category) {
  const { rows } = pool.query("SELECT * FROM products WHERE category=$1", [
    category,
  ]);

  return rows;
}

async function addProduct(newProduct) {
  await pool.query(
    "INSERT INTO products (name, category, price, brand, quantity, image, image_type, details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      newProduct.name,
      newProduct.category,
      newProduct.price,
      newProduct.brand,
      newProduct.quantity,
      newProduct.image,
      newProduct.imageType,
      JSON.stringify(newProduct.details),
    ]
  );
}

async function getProduct(productId) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [
    productId,
  ]);

  return rows[0];
}

async function searchProducts(searchKey) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE name LIKE '%' || $1 || '%'",
    [searchKey]
  );
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

module.exports = {
  getAllProducts,
  getProductsInCategory,
  addProduct,
  getProduct,
  searchProducts,
  getCategories,
};
