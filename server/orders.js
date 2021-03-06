'use strict'

const db = require('APP/db')
const { LineItem, Order } = require('../db/models')
const api = module.exports = require('express').Router()
const { transporter, createEmail } = require('./nodemailer');




api.get('/:id', (req, res, next) => {
  LineItem.scope('default').findAll({where: {order_id: req.params.id}})
        .then(items => res.send(items))
        .catch(console.error)
})



api.post('/', (req, res, next) => {
  let createdOrder;
  const itemsPromise = req.body.items.map(item => LineItem.findById(item.id));
  const { firstName, lastName, street1, street2, city, state, zip, shippingTotal, shippingMethod, shippingCost, email } = req.body.order;

  const shippingAddress = street1 + "\n" + street2 + "\n" + city + ", " + state + " " + zip;

  const orderDetails = {
    name: firstName + " " + lastName,
    shippingMethod,
    shippingCost,
    totalPrice: shippingTotal,
    shippingAddress,
    user_id: req.body.userId
  }

  Order.create(orderDetails)
      .then(order => {
        createdOrder = order;
        return Promise.all(itemsPromise)
      })
      .then(items => {
          const updateItems = items.map(item => item.update({order_id: createdOrder.id, cart_id: null}));
          return Promise.all(updateItems)
        }
      )
      .then(items => {
        res.send(createdOrder);
        return items
      })
      .then(items => {

        //send email confirmation
        transporter.sendMail(createEmail(email, createdOrder.id, shippingTotal, items, shippingMethod, shippingAddress, shippingCost), (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
      })
      .catch(console.error)


})
