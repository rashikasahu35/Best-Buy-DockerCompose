const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please enter user id"],
        unique: [true, "duplicate user order"],
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Product",
                    required: [true, "Please enter product id"],
                },
                name: {
                    type: String,
                    required: [true, "Please enter name of product"],
                },
                quantity: {
                    type: Number,
                    required: [true, "Please enter quantity of product"],
                },
                price: {
                    type: Number,
                    required: [true, "Please enter price of product"],
                },
                image: {
                    type: String,
                    required: [true, "Please enter product image url"],
                },
            },
        ],
    },
    noOfItems : { type: Number},
    subTotal :  { type: Number}
});

schema.pre("save", async function(){
    let noOfItems=0
    let subTotal=0

    this.products.map((product) => {
        noOfItems += product.quantity
        subTotal+=(product.price * product.quantity)
    })
    this.subTotal = subTotal
    this.noOfItems = noOfItems
})
exports.Cart = mongoose.model("Cart", schema)