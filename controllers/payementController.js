const catchAsync = require("../middleware/captureAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayement = catchAsync(async (req , res , next) => {

    const myPayement = await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency : 'inr',
        metadata : {
            company : "Homie_shop"
        }
    });

    res.status(200).json({success : true , client_secret  : myPayement.client_secret })
});

exports.sendStripeApiKey = catchAsync(async (req , res , next) => {

    res.status(200).json({success : true , stripe_api_key  : process.env.STRIPE_API })
});