const express = require("express");

const productRouter = express.Router();

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsbyID,
} = require("../Controller/product.controller");
const { adminAuth } = require("../middleware/adminAuth.middleware");

//*-------all the controllers are defined in "Controller/product.controller.js"

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *         delivery:
 *           type: string
 *           description: Delivery details
 *         images:
 *           type: string
 *           description: The source of the product image
 *         rating:
 *           type: string
 *           description: The overall rating of the product
 *         reviews:
 *           type: string
 *           description: The revies of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         totalQuantity:
 *           type: number
 *           format: integer
 *           description: The maximum quantity of the product that is available in stocks
 */

/**
 * @swagger
 * /products/:
 *   get:
 *     tags: [product]
 *     summary: Retrieve all product data from the database.
 *     responses:
 *       200:
 *         description: A list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get("/", getProducts);

/**
 * @swagger
 * /products/:productID:
 *   get:
 *     tags: [product]
 *     summary: Get a product by ID
 *     description: Retrieves a single product with the specified ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
productRouter.get("/:id", getProductsbyID);

productRouter.use(adminAuth);

/**
 * @swagger
 * /products/add:
 *   post:
 *     tags: [product]
 *     summary: add data to the database.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: auth
 *         schema:
 *           type: string
 *           description: The authorization token in the format "{token}"
 *         required: true
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: A new product has been added.
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                     message:
 *                         type: string
 *                         example: S new Product has been added
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 */
productRouter.post("/add", addProduct);

/**
 * @swagger
 * /products/update/:{productId}:
 *   patch:
 *     tags: [product]
 *     summary: update data for a specific product in the database.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: auth
 *         schema:
 *           type: string
 *           description: The authorization token in the format "{token}"
 *         required: true
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *           description: The ID of the product to update
 *         required: true
 *         example: 6425ed42ffdc17d075cef6b0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 *       404:
 *         description: The requested product was not found.
 *       500:
 *         description: An error occurred while updating the product.
 */
productRouter.patch("/update/:id", updateProduct);

/**
 * @swagger
 * /products/delete/:{productId}:
 *   delete:
 *     tags: [product]
 *     summary: delete a specific product from the database.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: auth
 *         schema:
 *           type: string
 *           description: The authorization token in the format "Bearer {token}"
 *         required: true
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *           description: The ID of the product to delete.
 *         required: true
 *         example: 123456
 *     responses:
 *       200:
 *         description: The deleted product data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 *       404:
 *         description: The requested product was not found.
 *       500:
 *         description: An error occurred while deleting the product.
 */
productRouter.delete("/delete/:id", deleteProduct);

module.exports = { productRouter };
