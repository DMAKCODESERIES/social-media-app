import mongoose,{model ,models,Schema} from "mongoose";

export interface Video {
    title: string;
    description: string;
    url: string;
    thumbnailUrl?: string;
    controls?:boolean
    trasformations?:{
        height:number,
        width:number,
        quality?:number

    }
    _id?:mongoose.Types.ObjectId;
    createAt?: Date;
    updateAt?: Date;

}
export const videoDimensions = {
    height: 1080 ,
    width: 1920 
} as const;

const videoSchema = new Schema<Video>({
title:{type:String,required:true},
description:{type:String,required:true},
url:{type:String,required:true},
thumbnailUrl:{type:String,required:true},
controls:{type:Boolean,default:true},
trasformations:{
    height:{type:Number,default:videoDimensions.height},
    width:{type:Number,default:videoDimensions.width},
    quality:{type:Number,min:1,max:100}
},

},{
    timestamps:true
})

export const VideoModel= models?.Video || model<Video>('Video',videoSchema);