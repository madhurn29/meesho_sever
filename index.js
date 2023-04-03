const express = require("express");
const { connection } = require("./config/db");
const { adminRouter } = require("./Routes/admin.route");
const { cartRouter } = require("./Routes/cart.route");
const { productRouter } = require("./Routes/product.route");
const { userRouter } = require("./Routes/user.route");
const { orderRouter } = require("./Routes/order.route");
const { homeProductsRouter } = require("./Routes/home.route");

var cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/orders", orderRouter);
app.use("/homeproducts", homeProductsRouter);

//Definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Meesho API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://long-lime-fly-tux.cyclic.app/",
      },
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

//Specification
const swaggerSpec = swaggerJSDoc(options);

//UI
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to database");
  } catch (error) {
    console.error(error.message);
  }

  console.log(`server listening on ${process.env.PORT}`);
});
