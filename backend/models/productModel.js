import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    //? individual reviews
    name : {type : String,required : true},
    rating : {type : Number,required : true},
    comment : {type : String,required : true}

},{
    timestamps : true    
})

const productSchema = new mongoose.Schema ({
    user : {
        //? tells which user added this product
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    brand: {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    reviews : [reviewSchema],
    rating : {
        //? averge rating
        type : Number,
        required : true,
        default : 0
    },
    newReviews : {
        type : Number,
        required : true,
        default : 0
    },
    price : {
        type :Number,
        required : true,
        default : 0
    },
    countInStock : {
        type :Number,
        required : true,
        default : 0
    },
    
} , {
    timestamps : true
});

const Product = mongoose.model('Product' , productSchema);

export default Product;