# meesho_sever
## home routes
### get HomeProducts => /homeproducts/
### add HomeProducts => /homeproducts/add



## product routes
### get products => /products/
- query for get routes 
1. by category
2. sortBy= price/rating
3. order =asc/desc
4. page and limit

### get products by id => /products/:id
### add products => /products/add  (need admin access)
### update products => /products/update/:id (need admin access)
### delete products => /products/delete/:id (need admin access)


## cart routes 
### get cart products => /cart/ (login first and pass token)
### add cart products => /cart/add (login first and pass token)
### update cart products => /cart/update/:id (login first and pass token)
### delete cart products => /cart/delete (login first and pass token)
