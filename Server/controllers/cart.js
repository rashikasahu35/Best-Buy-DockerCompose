const catchAsyncError = require("../middleware/catchAsyncError");
const { Cart } = require("../schema/cart");
const { Product } = require("../schema/product");
const Error = require("../utils/Error");

exports.getCartItems = catchAsyncError(async (req, res) => {
    const { _id } = req.user;
    const cart = await Cart.findOne({ user: _id });
    if (!cart)
        res.status(200).json({ response: cart }); // if user cart is empty
    else {
        // remove all the product that are invalid
        let invalidProduct = [];
        await Promise.all(
            cart.products.map(async (product) => {
                const p = await Product.findById(product.product);
                if (!p) invalidProduct.push(product.product);
            })
        );
        cart.products = cart.products.filter(
            (product) => !invalidProduct.includes(product.product)
        );
        const response = await cart.save();
        res.status(200).json({ response });
    }
});

exports.addItemInCart = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const { product, name, quantity, price, image } = req.body;

    const productDetail = await Product.findById(product);
    const cart = await Cart.findOne({ user: userId });

    if (!productDetail) {
        // product does not exist and is added in cart, then remove it from the cart
        throw new Error("Invalid product ID", 400);
    }

    if (productDetail.noOfStock < quantity) {
        throw new Error(
            `Only ${productDetail.noOfStock} ${productDetail.name}${
                productDetail.noOfStock > 1 ? " are" : " is"
            } in stock!`,
            400
        );
    }

    if (cart) {
        const existingProduct = cart.products.find(
            (p) => p.product.toString() === product
        );

        if (existingProduct) {
            res.status(200).json({ response: cart, message : "Item already present in cart" })
        } else {
            cart.products.push({ product, name, quantity, price, image }); // if product doesnt exist then add in cart
            const response = await cart.save();
            res.status(200).json({ response, message: "Item added to cart" });
        }
    } else {
        const newCart = new Cart({
            user: userId,
            products: [{ product, name, quantity, price, image }],
        });
        const response = await newCart.save();
        res.status(200).json({ response, message: "Item added to cart" });
    }
});

exports.updateProductQuantityInCart = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const { product, quantity } = req.body;
    if(quantity<=0) throw new Error("Invalid product quantity", 400)

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new Error(`User does not have the same product in the cart`, 400);
    }

    const productDetail = await Product.findById(product);
    if (!productDetail) {
        cart.products = cart.products.filter(
            (p) => p.product.toString() !== product
        );
        await cart.save();
        throw new Error(
            "Product does not exist anymore and has been removed from your cart.",
            404
        );
    }

    const existingProduct = cart.products.find(
        (p) => p.product.toString() === product
    );

    if (existingProduct) {
        if (productDetail.noOfStock < quantity) {
            throw new Error(
                `Only ${productDetail.noOfStock} ${productDetail.name}${
                    productDetail.noOfStock > 1 ? " are" : " is"
                } in stock!`,
                400
            ); 
        } 
        existingProduct.quantity = quantity;
    }
    else throw new Error("Product not present in cart", 400)

    const response = await cart.save();
    res.status(200).json({ response, message: "Product Quantity Updated" });
});

exports.deleteCartItem = catchAsyncError(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    const id = req.body.product;
    let productExist = false;
    cart?.products.map((product) => {
        if (product.product.toString() === id) productExist = true;
    });
    if (productExist) {
        cart.products = cart.products.filter(
            (product) => product.product.toString() !== id
        );
        const response = await cart.save();
        res.status(200).json({ response, message: "Item removed from cart" });
    } else {
        throw new Error("Product does not exist in cart", 404);
    }
});
