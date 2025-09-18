import mongoose ,{ model,models,Schema } from "mongoose";
import bcrypt from 'bcrypt';

export interface User {
    email: string;
    password: string;
    _id?:mongoose.Types.ObjectId;
    createAt?: Date;
    updateAt?: Date;
}
const userSchema = new Schema<User>({
email:{type:String,required:true,unique:true},
password:{type:String,required:true}
},{
    timestamps:true
})

userSchema.pre('save' ,async function(next){
if (this.isModified('password')) {
 this.password = await bcrypt.hash(this.password, 10);
}
   next();
})

export const UserModel= models?.User || model<User>('User',userSchema);