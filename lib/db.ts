import mongoose from "mongoose";



const MONGODB_URI=process.env.MONGODB_URI! 
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

 
let cashed=global.mongoose
if(!cashed){
    cashed=global.mongoose={conn:null,promise:null}
}

export async function connectDB(){
if(cashed.conn){
    return cashed.conn
}
if(!cashed.promise){
   const opt={
        bufferCommands:true,
        maxPollSize:10
    }
    cashed.promise=mongoose.connect(MONGODB_URI,opt).then(()=>mongoose.connection)
}
try {
    cashed.conn=await cashed.promise
} catch (error) {
    cashed.promise=null
    throw new Error('promise error')
}
return cashed.conn

}