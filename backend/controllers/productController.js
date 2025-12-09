import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc   Get all products
// @route  GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json({ success: true, products });
});

// @desc   Get single product by id
// @route  GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json({ success: true, product });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


// @desc   Create a new product (admin)
// @route  POST /api/products
// @access Private/Admin
// Helper to sanitize
const sanitize = (val) => (val && typeof val === 'string' ? val.trim() : "");

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, stock } = req.body;

  const product = new Product({
    name,
    description,
    price,
    image: sanitize(image),
    stock: stock || 0,
  });

  const createdProduct = await product.save();
  res.status(201).json({ success: true, product: createdProduct });
});

// @desc   Update product (admin)
// @route  PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, stock } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.image = image !== undefined ? sanitize(image) : product.image;
  product.stock = stock !== undefined ? stock : product.stock;

  const updatedProduct = await product.save();
  res.json({ success: true, product: updatedProduct });
});

// @desc   Delete product (admin)
// @route  DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ success: true, message: "Product removed" });
});

