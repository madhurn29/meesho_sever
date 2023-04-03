const express = require("express");
const {
  getCartProducts,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
} = require("../Controller/cart.controller");
const { auth } = require("../middleware/auth.middleware");

const cartRouter = express.Router();

//*-------all the controllers are defined in "Controller/product.controller.js"
cartRouter.use(auth);

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
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
 *           type: integer
 *           description: The maximum quantity of the product that is available in stocks
 *         quantity:
 *           type: integer
 *           description: The quantity of the product that user want to purchase
 *         UserID:
 *           type: string
 *           description: The maximum quantity of the product that is available in stocks
 */

/**
 * @swagger
 * /cart/:
 *   get:
 *     tags: [cart]
 *     summary: Get all notes data for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: auth
 *         schema:
 *           type: string
 *           description: The authorization token in the format "Bearer {token}"
 *         required: true
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...
 *     responses:
 *       200:
 *         description: An array of all products associated with the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 */
cartRouter.get("/", getCartProducts);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     tags: [cart]
 *     summary: Add a product to the authenticated user's cart.
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
 *       - in: body
 *         name: product
 *         description: The product object to be added to the cart.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully added to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. The request body was missing or malformed.
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 *       404:
 *         description: Not found. The requested resource could not be found.
 */
cartRouter.post("/add", addCartProduct);

/**
 * @swagger
 * /cart/update/{itemId}:
 *   patch:
 *     tags: [cart]
 *     summary: Update a product in the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to update.
 *       - in: header
 *         name: auth
 *         schema:
 *           type: string
 *           description: The authorization token in the format "Bearer {token}"
 *         required: true
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...
 *       - in: body
 *         name: updatedProduct
 *         description: The updated product object.
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *         required: true
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
cartRouter.patch("/update/:id", updateCartProduct);

/**
 * @swagger
 * /cart/delete/{itemId}:
 *   delete:
 *     tags: [cart]
 *     summary: Delete a specific item from the user's cart.
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
 *         name: itemId
 *         schema:
 *           type: string
 *           description: The ID of the item to delete from the cart.
 *         required: true
 *         example: 123456
 *     responses:
 *       204:
 *         description: The item was successfully deleted.
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 *       404:
 *         description: The requested item was not found in the user's cart.
 *       500:
 *         description: An error occurred while deleting the item.
 */
cartRouter.delete("/delete/:id", deleteCartProduct);

module.exports = { cartRouter };
