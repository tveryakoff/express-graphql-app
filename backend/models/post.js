import mongoose from 'mongoose'
import {POST_MODEL_NAME, USER_MODEL_NAME} from "./constants";
const Schema = mongoose.Schema


const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  }
}, {timestamps: true})

export const Post = mongoose.model(POST_MODEL_NAME, postSchema)


