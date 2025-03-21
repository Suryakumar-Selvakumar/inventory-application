const db = require("../db/queries");

// utils
const getCategory = require("../utils/getCategory");
const formatFormData = require("../utils/formatFormData");

const getProducts = async (req, res) => {
  const products = await db.getAllProducts();

  res.render("products/products", { products: products });
};

const addProductsGet = (req, res) => {
  const { category } = req.params;

  res.render("products/add-product", {
    category: category,
    getCategory: getCategory,
  });
};

const chooseCategoryGet = (req, res) => {
  res.render("products/choose-category");
};

const addProductsPost = async (req, res) => {
  const { category } = req.params;
  const newProduct = req.body;

  newProduct.category = category;
  newProduct.image = req.file.buffer;
  newProduct.imageType = req.file.mimetype;

  console.log(formatFormData(newProduct));

  await db.addProduct(formatFormData(newProduct));

  res.redirect("/products/new");
};

const getProduct = async (req, res) => {
  const product = await db.getProduct();

  res.render("products/product-page", { product: product });
};

module.exports = {
  getProducts,
  addProductsGet,
  addProductsPost,
  getProduct,
  chooseCategoryGet,
};
