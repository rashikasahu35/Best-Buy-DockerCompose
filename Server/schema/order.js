const mongoose = require("mongoose");
const { Schema } = mongoose;
const { resetCart } = require("../controllers/cart");
const { Product } = require("./product");

const schema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please enter the user whose order is this"],
    },
    orderedItems: {
        type: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Product",
                    required: [true, "Please enter the product details"],
                },
                name: {
                    type: String,
                    required: [true, "Please enter product name"],
                },
                price: {
                    type: Number,
                    required: [true, "Please enter product price"],
                },
                quantity: {
                    type: Number,
                    required: [true, "Please enter product quantity"],
                },
                image: {
                    type: String,
                    required: [true, "Please enter product image url"],
                },
            },
        ],
        required: [true, "Enter ordered items"],
    },
    price: {
        type: {
            itemPrice: {
                type: Number,
                required: [true, "Please enter item price"],
            },
            taxPrice: {
                type: Number,
                required: [true, "Please enter total price"],
            },
            shippingPrice: {
                type: Number,
                required: [true, "Please enter shipping price"],
            },
            totalPrice: {
                type: Number,
                required: [true, "Please enter total price"],
            },
        },
        required: [true, "Enter order price"],
    },
    noOfItems: {
        type: Number,
    },
    shippingDetails: {
        type: {
            name: {
                type: String,
                required: [true, "Please enter your name for shipping"],
                maxLength: 30,
            },
            email: {
                type: String,
                required: [true, "Please enter your email for shipping"],
                maxLength: 40,
            },
            address: {
                type: String,
                required: [true, "Please enter your address for shipping"],
                maxLength: 50,
            },
            city: {
                type: String,
                required: [true, "Please enter your city for shipping"],
                maxLength: 20,
            },
            state: {
                type: String,
                required: [true, "Please enter your state for shipping"],
            },
            country: {
                type: String,
                default: "India",
            },
            pincode: {
                type: Number,
                required: [true, "Please enter your pincode for shipping"],
                maxLength: 6,
            },
            phoneNumber: {
                type: Number,
                required: [true, "Please enter your mobile number"],
                maxLength: 10,
            },
        },
        required: [true, "Please enter your shipping address"],
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: [
                true,
                "Please enter your opted payment method either COD or Online",
            ],
            enum: ["COD", "Card"],
        },
        status: {
            type: String,
            required: true,
        },
    },
    orderStatus: {
        type: String,
        default: "Processing",
        required: true,
    },
    deliveredAt: {
        type: Date,
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

schema.pre("save", async function(next){
    let noOfItems = 0;
    this.orderedItems.map((item) => (noOfItems += item.quantity));
    this.noOfItems = noOfItems
    next()
});

schema.post("save", async function(){
    const user = this.user;
    await resetCart(user);
    await Promise.all(
        this.orderedItems.map(async (item) => {
            const product = await Product.findById(item.product);
            if (!product)
                throw new Error(`Product ${product} does not exist`, 404);
            else {
                product.noOfStock -= item.quantity;
                await product.save();
            }
        })
    );
});

exports.Order = mongoose.model("Order", schema);
