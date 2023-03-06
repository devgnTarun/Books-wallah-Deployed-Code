const Product = require("../models/productSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("../middleware/captureAsync");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require('cloudinary')


//Create product -- Admin
exports.createProduct = catchAsync( async (req, res, next) => {

  let images = [];

  if(typeof req.body.images === 'string') {
    images.push(req.body.images)
  }
  else {
  images = req.body.images
}
  const imageLinks = [];
  
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imageLinks;

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product  });

});

//Get all product api
exports.getAllProduct = catchAsync(async (req, res, next) => {
  const resultPerPage = 8; // For pagination
  const productCounts = await Product.countDocuments(); // For counting total documents

  
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage) 

    let products = await apiFeature.query;


  if(!products) {
    next(new ErrorHandler('Product Not Found' , 404))
  }

  res.status(200).json({ success: true, products, productCounts , resultPerPage  });
});

//Get all product ----- Admin
exports.getAdminProduct = catchAsync(async (req, res, next) => {


    let products = await Product.find()


  if(!products) {
    next(new ErrorHandler('Product Not Found' , 404))
  }

  res.status(200).json({ success: true, products });
});


//Get single product

exports.getProductDeatils = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

//Update product -- admin

exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found for update", 404));
  }
  let images = [];

  if(typeof req.body.images === 'string') {
    images.push(req.body.images)
  }
  else {
  images = req.body.images
}

if(images !== undefined) {
    
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[0].public_id)
     }
     const imageLinks = [];

     for (let i = 0; i < images.length; i++) {
       const result = await cloudinary.v2.uploader.upload(images[i], {
         folder: 'products',
       });
       imageLinks.push({
         public_id: result.public_id,
         url: result.secure_url,
       });
     }
     req.body.images = imageLinks;
}


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //{new ; true , ruValidator : true , useFindandModify : false}

  res.status(200).json({ success: true, product });
});

//Delete product function  -- admin

exports.deleteProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //Deleting products from cloudinary

  for (let i = 0; i < product.images.length; i++) {

 await cloudinary.v2.uploader.destroy(product.images[0].public_id)

  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});

//Product Reviews

exports.UserProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed =  product.reviews.find(
    (key) => key.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((key) => {
      if (key.user.toString() === req.user._id.toString()) {
        (key.rating = rating), (key.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((key) => {
    avg += key.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.json({ success: true }).status(200);
});

//Get all reviews of 1 product

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found"), 404);
  }
  res.status(200).json({ success: true, reviews : product.reviews });
});

//Delete Reviews

exports.deleteReviews = catchAsync(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found"), 404);
  }
  

  const reviews =  await product.reviews.filter((key) => key._id.toString() !==  req.query.id.toString());
  
  let avg = 0;
  reviews.forEach((key) => {
    avg += key.rating;
  });

  let ratings = 0;

  if(reviews.length === 0) {
    ratings === 0
  }
  else {
    ratings = avg / reviews.length;
  }

  
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId , {
    reviews , ratings ,  numOfReviews
  },{
    new : true,
    runValidators : true,
    useFindAndModify : false,
  })

  res.status(200).json({ success: true });
});

