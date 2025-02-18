const catchAsyncError = require("../middleware/catchAsyncError");
const { Product } = require("../schema/product");
const Error = require("../utils/Error");

exports.getProduct = catchAsyncError(async (req, res) => {
    const productId = req.params.id;
    const response = await Product.findOne({ _id: productId });
    if (response) res.status(200).json({ response });
    else throw new Error("Product does not exist", 404);
});

exports.searchProduct = catchAsyncError(async (req, res) => {
    const { keyword } = req.query;
    const query = keyword ? { name: { $regex: new RegExp(keyword, "i") } } : {}; // if u have multiple keywords then u can create regex to match any of the keyword
    const response = await Product.find(query);

    const productCount = response.length;
    if (productCount > 0) {
        res.status(200).json({
            response,
            productCount,
            message: `Search result for '${keyword}'`,
        });
    } else {
        res.status(200).json({
            response,
            productCount,
        });
    }
});

exports.getAllProducts = catchAsyncError(async (req, res) => {
    const { category, minPrice, maxPrice, page, sortBy, order } = req.query;
    const queryCondition = {};
    let sortCondition = {};
    const resultPerPage = 8;
    const skip = resultPerPage * ((page || 1) - 1); // page here refers to the current page

    if (category) {
        queryCondition.category = category;
    }
    if (minPrice && maxPrice) {
        queryCondition.price = {
            $gte: Number(minPrice),
            $lte: Number(maxPrice),
        };
    }
    if (sortBy && order) {
        sortCondition = { [sortBy]: Number(order) };
    }

    const productCount = await Product.find(queryCondition)
        .sort(sortCondition)
        .countDocuments();
    const response = await Product.find(queryCondition)
        .sort(sortCondition)
        .limit(resultPerPage)
        .skip(skip);
    res.status(200).json({
        response,
        productCount,
    });
});

exports.productSort = catchAsyncError(async (req, res) => {
    const { sort, condition, page } = req.query;
    const resultPerPage = 6;
    const skip = resultPerPage * ((page || 1) - 1); // page here refers to the current page
    const sortCondtion = sort && condition ? { [sort]: Number(condition) } : {};
    const response = await Product.find()
        .sort(sortCondtion)
        .limit(resultPerPage)
        .skip(skip);
    const productCount = await Product.find().countDocuments();

    res.status(200).json({
        response,
        productCount,
    });
});
