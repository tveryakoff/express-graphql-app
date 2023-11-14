import {User} from '../../../models/user'
import {Post} from '../../../models/post'
import validator from 'validator'
import deleteFile from "../../../utils/deleteFile";

export default {
  createPost: async function(_, {postInput}, {req}) {
    const errors = []
    if (validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, {min: 5})) {
      errors.push({title: 'too short'})
    }

    if (validator.isEmpty(postInput.content)) {
      errors.push({content: 'cant be empty'})
    }

    if (errors.length > 0) {
      const error = new Error('invalid input')
      error.fields = errors
      error.status = 400
      throw error
    }

    const {userId} = req
    const user = await User.findById(userId)

    if (!userId || !user) {
      const error = new Error('Not authenticated')
      error.status = 401
      throw error
    }

    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      creator: user
    })


    const createdPost = await post.save()
    user.posts.push(createdPost)
    await user.save()

    return {...createdPost._doc, _id: createdPost._id.toString(), createdAt: createdPost.createdAt.toISOString(), updatedAt: createdPost.updatedAt.toISOString()}
  },
  updatePost: async function(_, {id, postInput}, {req}) {
    const errors = []
    if (validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, {min: 5})) {
      errors.push({title: 'too short'})
    }

    if (validator.isEmpty(postInput.content)) {
      errors.push({content: 'cant be empty'})
    }

    if (errors.length > 0) {
      const error = new Error('invalid input')
      error.fields = errors
      error.status = 400
      throw error
    }

    const {userId} = req
    const post = await Post.findById(id).populate('creator')

    if (!post) {
      const error = new Error('Post not found')
      error.status = 404
      throw error
    }

    if (!post.creator || post.creator._id.toString() !== userId) {
      const error = new Error('No rights for updating the post')
      throw error
    }



    post.title = postInput.title || post.title
    post.content = postInput.content || post.content
    post.imageUrl = postInput.imageUrl || post.imageUrl

    await post.save()

    return post
  },
  deletePost: async function(_, {id}, {req}) {
    const post = await Post.findById(id)
    deleteFile(post.imageUrl)
    await Post.findByIdAndDelete(id)
    const user = User.findById(req.userId)
    user.posts.pull(id)
    await user.save()
    return true
  }


}
