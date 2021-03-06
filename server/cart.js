'use strict'

const db = require('APP/db')
const { Cart, LineItem } = require('../db/models')
const api = module.exports = require('express').Router()

// const {mustBeLoggedIn, forbidden,} = require('./auth.filters')


api.post('/:userId', (req, res, next) => {
    let cartInfo = req.params.userId === "unauthUser" ? {where: {session_id: req.sessionID}}
                                                      : {where: {user_id: req.params.userId}}
    let product = req.body.product;

    Cart.findOrCreate(cartInfo)
        .then(([cart, _]) => LineItem.findOrCreate({where: {
            product_id: product.id,
            cart_id: cart.id
        }}))
        .then(([line, isCreated]) => {
            let quantity = !isCreated ? line.quantity + +req.body.quantity : req.body.quantity;

            return line.update({
                quantity: quantity,
                orderedPrice: quantity * product.price
            })
        })
        .then(line => LineItem.scope('default').findById(line.id))
        .then(line => res.send(line))
        .catch(next)
})


api.get('/:userId', (req, res, next) => {
    let cartInfo = req.params.userId === "unauthUser" ? {where: {session_id: req.sessionID}}
                                                      : {where: {user_id: req.params.userId}}

    Cart.findOne(cartInfo)
        .then(cart => !cart ? [] : LineItem.scope('default').findAll({where: {cart_id: cart.id}}))
        .then(lineItems => res.send(lineItems))
        .catch(next)
})

api.delete(`/item/:lineItemId`, (req, res, next) => {
    LineItem.destroy({where: {id: req.params.lineItemId}})
        .then(destroyed => res.sendStatus(204))
        .catch(next)
})

api.put(`/item/:lineItemId`, (req, res, next) => {
    LineItem.update({quantity: req.body.newQuantity}, {where: {id: req.params.lineItemId}})
        .then(updated => res.send(req.body.newQuantity))
        .catch(next)
})
