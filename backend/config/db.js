import mongoose from 'mongoose';

const connectDB = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI , {
            useUnifiedTopology : true,
            useCreateIndex : true,
            useNewUrlParser : true
        })
        console.log(`mongodb connected : ${connection.connection.host}` )
        
    } catch(err){
        console.error(`error  : ${err.message}`)
        process.exit(1); //? exit with failure
    }
}

export default connectDB;