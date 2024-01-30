const catchAsyncError = require("../middleware/catchAsyncError");
const { Product } = require("../schema/product");
const { ProductReview } = require("../schema/productReview");

exports.getProductReviews = catchAsyncError(async (req, res) => {
    const productId = req.query.productId;
    const product = await Product.findById(productId);
    if (product) {
        const reviews = await ProductReview.find({ product: productId });
        res.status(200).json({
            response: reviews,
            reviewCount: reviews?.length,
        });
    } else {
        throw new Error("Invalid Product ID", 404);
    }
});
exports.getReview = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const review = await ProductReview.findById(id);
    if (review) {
        res.status(200).json({ response: review });
    } else {
        throw new Error("Invalid Review ID", 404);
    }
});

exports.addProductReview = catchAsyncError(async (req, res) => {
    const { productId, rating, comment } = req.body;
    const { _id, name } = req.user;
    const product = await Product.findById(productId);
    if (product) {
        const review = await ProductReview.findOne({ product : productId, "user.id": _id });
        if (review) {
            review.rating = rating;
            review.comment = comment;
            const response = await review.save();
            res.status(201).json({
                message: "Review added successfully",
                response,
            });
        } else {
            const newReview = new ProductReview({
                user: { id: _id, name },
                rating,
                comment,
                product: productId,
            });
            const response = await newReview.save();
            res.status(201).json({
                message: "Review added successfully",
                response,
            });
            await updatedProductRatingandReview(productId);
        }
    } else {
        throw new Error("Invalid Product ID", 404);
    }
});

// ---------------------- ADMIN ------------------------------

exports.deleteReview = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const review = await ProductReview.findById(id);
    if (review) {
        const productId = review.product;
        const response = await review.deleteOne();
        if (response.deletedCount === 1) {
            res.status(200).json({
                review,
                message: "Review deleted successfully",
            });
            await updatedProductRatingandReview(productId);
        } else {
            res.status(500).json({ message: "Error occured" });
        }
    } else {
        throw new Error("Invalid Review ID", 404);
    }
});

exports.updateReview = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const { rating, comment } = req.body;
    const review = await ProductReview.findById(id);
    if (review) {
        review.rating = rating;
        review.comment = comment;
        const response = await review.save();
        res.status(200).json({
            response,
            message: "Review updated Successfully",
        });
        const productId = review.product
        await updatedProductRatingandReview(productId);
    } else {
        throw new Error("Invalid Review ID", 404);
    }
});

exports.getAllReviews = catchAsyncError(async (req, res) => {
    const reviewList = await ProductReview.find()
        .populate({ path: "user", select: "email" })
        .populate({ path: "product", select: "name" });

    res.status(200).json({
        response: reviewList,
        reviewCount: reviewList?.length || 0,
    });
});

const updatedProductRatingandReview = async function (productId) {
    const product = await Product.findById(productId);
    const reviews = await ProductReview.find({ product: productId });
    let noOfReviews = reviews.length;
    let ratings = 0;
    reviews.map((review) => {
        ratings += review.rating;
    });
    product.noOfReviews = noOfReviews;
    product.ratings =
        noOfReviews != 0 ? ratings / parseFloat(noOfReviews).toFixed(2) : 0;
    await product.save();
};
