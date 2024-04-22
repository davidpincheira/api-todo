# barQR
Carrito de compra -- master 

### DER

https://app.diagrams.net/#G1R8e8UOpnL_O8pS9DYrKyQqHcahF1q9Zc

### comandos para crear estructura de tablas
sequelize model:generate --name Product --attributes name:string, price:decimal, quantity:integer, images:string, categoryId:integer 
sequelize model:generate --name Category --attributes nombre:string, image:string
sequelize model:generate --name User --attributes name:string,lastname:string,email:string,password:string,phone:string,status:boolean,type:enum,companyId:integer

<!-- sequelize model:generate --name City --attributes name:string
sequelize model:generate --name Company --attributes name:string,type:enum,address:string,phone:string,logo:string,zip_code:string,cityId:integer
sequelize model:generate --name User --attributes name:string,lastname:string,email:string,password:string,phone:string,status:boolean,type:enum,companyId:integer
sequelize model:generate --name Order --attributes type:enum,comments:text,payment_method:enum,total_amount:float,userId:integer,status_orderId:integer,destinationId:integer
sequelize model:generate --name StatusOrder --attributes name:string
sequelize model:generate --name Invoice --attributes status:boolean,detail:string,orderId:integer
sequelize model:generate --name Destination --attributes number:integer,capacity:integer,status:boolean,address:string,description:string
sequelize model:generate --name Coupon --attributes name:string,code:string,discount:integer,valid_to:date,status:boolean,type:enum
sequelize model:generate --name OrderDetail --attributes quantity:integer,orderId:integer,productId:integer,couponId:integer
sequelize model:generate --name Photo --attributes path:string,productId:integer
sequelize model:generate --name Product --attributes name:string,description:text,price:float,mealtime:boolean,price_mealtime:float,start_date:datetime,end_date:datetime,active_days:integer,categoryId:integer
sequelize model:generate --name Category --attributes name:enum -->

despues de todo esto ejecutar las migraciones y correrlas
sequelize db:migrate


///api/signin
"email":"test@test.com",
"password":"12345678"