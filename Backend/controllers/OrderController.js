const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("../middleware/captureAsync");
const Product = require("../models/productSchema");

exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo, 
    orderItem,
    payementInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItem,
    payementInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice, 
    paidAt: Date.now(),
    user: req.user._id,
  });
  await order.save();

  res.status(201).json({ success: true, order });
});

//Get single order
exports.singleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({ success: true, order });
});

//Get logged in user order details
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({ success: true, orders });
});

//Get all orders ---- Admin

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach(order => {
    
    totalAmount += order.payementInfo.totalPrice;
  });


  res.status(200).json({ success: true, totalAmount, orders });
});

//Update order status ---- Admin

exports.updateOrders = catchAsync(async (req, res, next) => {

  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }


  if (orders.orderStatus === "Delivered") {
    next(new ErrorHandler("You have already delivered this order", 400));
  }

 if(req.body.status === 'Shipped') {
  orders.orderItem.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });
 }

  orders.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    orders.delieverdAt = Date.now();
  }

  await orders.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  console.log(product)
   product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//Delete orders ---- Admin

exports.deleteOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await order.remove();

  res.status(200).json({ success: true});
});
