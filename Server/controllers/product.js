const catchAsyncError = require("../middleware/catchAsyncError");
const { Product } = require("../schema/product");
const Error = require("../utils/Error");
const { uploadImage, destroyImage } = require("../utils/manageImage");
const { ProductReview } = require("../schema/productReview");

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

// ---------------------- ADMIN ----------------------------

exports.getProducts = catchAsyncError(async (req, res) => {
    const response = await Product.find();
    res.status(200).json({ response, productCount: response?.length });
});

exports.createProduct = catchAsyncError(async (req, res) => {
    const { name, description, price, category, noOfStock, images } = req.body;
    if (!images) throw new Error("Please enter product image", 400);
    const prodImages = [];

    await Promise.all(
        images?.map(async (img) => {
            const { public_id, secure_url } = await uploadImage(
                img,
                "products"
            );
            prodImages.push({ public_id, url: secure_url });
        })
    );
    const newProduct = new Product({
        name,
        description,
        price,
        category,
        noOfStock,
        images: prodImages,
    });
    const response = await newProduct.save();
    res.status(201).json({ response, message: "Product Created" });
});

exports.updateProduct = catchAsyncError(async (req, res) => {
    const { name, description, price, category, noOfStock, images } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product does not exist", 404);
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.noOfStock = noOfStock || product.noOfStock;
    product.category = category || product.category;

    if (images) {
        // only include those images which does not have public id & url, these are new images and have to be uploaded on cloud
        const newImages = images.filter(
            (image) => !(image.public_id && image.url)
        );
        const existingImages = images.filter(
            (image) => image.public_id && image.url
        );
        const removedImages = [];
        const newProductImages = [];

        //gather all the images that have been removed (for destroying them)
        product.images.map((i) => {
            let removed = true;
            existingImages.map((j) => {
                if (i.public_id === j.public_id) {
                    removed = false;
                }
            });
            if (removed) {
                removedImages.push(i.public_id);
            }
        });

        await Promise.all(
            removedImages.map(async (image) => {
                await destroyImage(image);
            })
        );

        await Promise.all(
            newImages.map(async (image) => {
                const { public_id, secure_url } = await uploadImage(
                    image,
                    "products"
                );
                newProductImages.push({ public_id, url: secure_url });
            })
        );
        product.images = [...newProductImages, ...existingImages];
    }
    const response = await product.save();
    res.status(200).json({ response, message: "Product Updated" });
});

exports.deleteProduct = catchAsyncError(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product does not exist", 404);

    await Promise.all(
        product.images.map(async (image) => {
            await destroyImage(image.public_id);
        })
    );
    const response = await product.deleteOne();
    const review = await ProductReview.findOneAndDelete({ product: productId });

    if (response.deletedCount === 1) {
        res.status(200).json({ message: "Product deleted successfully" });
    } else {
        throw new Error("Failed to delete product", 500);
    }
});

