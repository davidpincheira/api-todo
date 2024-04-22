const { faker } = require('@faker-js/faker');
// or, if desiring a different locale
// const { fakerDE: faker } = require('@faker-js/faker');
const { Product, Category } = require('../models/index')

//categorias
for (let index = 0; index < 10; index++) {
    Category.create({
        name: faker.commerce.department()
    });
}
//productos
for (let index = 0; index < 100; index++) {    
    Product.create({
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        mealtime: faker.datatype.boolean(),
        price_mealtime: faker.commerce.price({ min: 100, max: 10000 }),
        active_days: faker.number.int({ min: 1, max: 7 }),
        categoryId: faker.number.int({ min: 1, max: 7 }),
        image: `https://picsum.photos/id/${Math.floor(Math.random() * 10) + 1}/200/300`
    });
}

