const express = require("express");
const { processPayement, sendStripeApiKey } = require("../controllers/payementController");
const {isAuthenticatedUser} = require("../middleware/auth")
let router = express.Router();

router.route("/payement/process").post(isAuthenticatedUser , processPayement)
router.route("/stripeApikey").get(isAuthenticatedUser , sendStripeApiKey)

module.exports = router;