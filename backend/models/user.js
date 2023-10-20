import mongoose  from 'mongoose'
import {POST_MODEL_NAME, USER_MODEL_NAME} from "./constants";
const Schema = mongoose.Schema


const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'I am new'
  },
  posts: [
    {type: Schema.Types.ObjectId, ref: POST_MODEL_NAME}
  ]
})

export const User = mongoose.model(USER_MODEL_NAME, userSchema)
