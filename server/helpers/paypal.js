const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox",   // "sandbox" for testing
  client_id: process.env.PAYPAL_CLIENT_ID || "dummy_id",
  client_secret: process.env.PAYPAL_CLIENT_SECRET || "dummy_secret",
});

module.exports = paypal;
