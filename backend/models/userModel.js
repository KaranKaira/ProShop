import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default  : false
    }
} , {
    timestamps : true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//? stuff to do before save method is called for User model
userSchema.pre('save',async function(next){
    //? this check is for checking to hash the password only when password is changed(updated) or created 1st time
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt )
})

const User = mongoose.model('User' , userSchema);

export default User;