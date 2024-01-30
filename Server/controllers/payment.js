const catchAsyncError = require("../middleware/catchAsyncError");
const Error = require("../utils/Error");
let stripe

exports.initializeStripe = () => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    stripe = require('stripe')(stripeSecretKey);
};
  
exports.payment = catchAsyncError(async (req, res) => {
    let { amount } = req.body
    const { shippingDetails } = req.body

    if(!stripe) throw new Error("Stripe not initialized, please try after some time", 400)
    else if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error("Please provide a valid  amount for payment", 400);
    }
    else if(!shippingDetails) throw new Error("Shipping Details not provided", 400)

    amount = Number(amount)* 100
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr',
        payment_method_types: ['card'],
        description : "Card Payment for Best Buy(ecommerce)",
        shipping: {
          name: shippingDetails?.name,
          address: {
            line1: shippingDetails?.address,
            postal_code: shippingDetails?.pincode,
            city: shippingDetails?.city,
            state: shippingDetails?.state,
            country: shippingDetails?.country,
          },
        },

    });
    res.status(200).json({ message : "Payment Successfull", client_secret : paymentIntent.client_secret})
})