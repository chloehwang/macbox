const db = require('APP/db')
const api = module.exports = require('express').Router()
const { Product, User, Cart, LineItem, Order, Review } = require('../db/models')

api.param('productId', function(req, res, next, productId) {
  Product.findById(productId)
      .then(product => {
        req.product = product;
        next()
      })
})

api.get('/', function(req, res, next) {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
})


api.get('/:productId', function (req, res, next) {
  Review.findAll({
        where: {product_id: +req.params.productId},
        include: [{ model: User }]
      })
      .then(reviews => res.json([req.product, reviews]))
      .catch(next)
})

// api.get('/products/:productId', function (req, res, next) {
//   Review.scope('user').findAll()
//     .then(reviews => console.log(reviews))
//     .catch(console.error)
// })
