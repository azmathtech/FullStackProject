const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //console.log(req.body);

    // //checks to see if a user is logged in and authenticated
    // if (!req.user) {
    //   return res.status(401).send({ error: 'You must log in!' });
    // }
    //middleware function requireLogin replaces this if statement

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    //console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });

  app.get('/api/stripe', (req, res) => {
    res.redirect('/');
  });
};

//----------------------------------Notes--------------------------------------

// Create a charge
// Example Request
// var stripe = require("stripe")(
//   "sk_test_qpZDnmDuguzdGqYDGAjKlAq7"
// );
//
// stripe.charges.create({
//   amount: 2000,
//   currency: "usd",
//   source: "tok_mastercard", // obtained with Stripe.js
//   description: "Charge for charlotte.anderson@example.com"
// }, function(err, charge) {
//   // asynchronously called
// });

//needed to install body parser module to process the request we get back from stripe
// Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

//Stripe returns a promise - example below
// Using Promises
// Every method returns a chainable promise which can be used instead of a regular callback:
//
// // Create a new customer and then a new charge for that customer:
// stripe.customers.create({
//   email: 'foo-customer@example.com'
// }).then(function(customer){
//   return stripe.customers.createSource(customer.id, {
//     source: {
//        object: 'card',
//        exp_month: 10,
//        exp_year: 2018,
//        number: '4242 4242 4242 4242',
//        cvc: 100
//     }
//   });
// }).then(function(source) {
//   return stripe.charges.create({
//     amount: 1600,
//     currency: 'usd',
//     customer: source.customer
//   });
// }).then(function(charge) {
//   // New charge created on a new customer
// }).catch(function(err) {
//   // Deal with an error
// });

//In our code the below returns a promise
// stripe.charges.create({
//   amount: 500,
//   currency: 'usd',
//   description: '$5 for 5 credits',
//   source: req.body.id
// });

//requireLogin is a middleware function that makes it a requirement to be logged in
//to access the /api/stripe path
