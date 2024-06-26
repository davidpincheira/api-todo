const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const CategoryController = require('../controllers/CategoryController')
const ProductController = require('../controllers/ProductController')
const OrderDetailController = require('../controllers/OrderDetailController')
const MealTimeController = require('../controllers/MealTimeController')
const auth = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.json({hello: "world"})
})

//user
router.post('/api/login', AuthController.signIn)
//registro
router.post('/api/signup', AuthController.signUp)
router.get('/api/profile', AuthController.profile)
//product
router.get('/api/products/:id', auth, ProductController.getProductById)
router.get('/api/products', auth, ProductController.getProducts)
router.post('/api/products', auth, ProductController.createProduct)
router.put('/api/products/:id', auth, ProductController.updateProduct)
router.delete('/api/products/:id', auth, ProductController.deleteProduct)
//category
router.get('/api/categories', auth, CategoryController.getCategories)
router.post('/api/categories', auth, CategoryController.createCategory)
router.put('/api/categories/:id', auth, CategoryController.updateCategory)
router.delete('/api/categories/:id', auth, CategoryController.deleteCategory)
//orderDetail
router.get('/api/orderdetails/:id', auth, OrderDetailController.getOrderDetailById)
router.get('/api/orderdetails', auth, OrderDetailController.getOrderDetails)
router.post('/api/orderdetails', auth, OrderDetailController.createOrderDetail)
router.put('/api/orderdetails/:id', auth, OrderDetailController.updateOrderDetail)
router.delete('/api/orderdetails/:id', auth, OrderDetailController.deleteOrderDetail)
//mealTime
router.get('/api/mealtimes/:id', auth, MealTimeController.getMealTimeById)
router.get('/api/mealtimes', auth, MealTimeController.getMealTimes)
router.post('/api/mealtimes', auth, MealTimeController.createMealTime)
router.put('/api/mealtimes/:id', auth, MealTimeController.updateMealTime)
router.delete('/api/mealtimes/:id', auth, MealTimeController.deleteMealTime)

module.exports = router