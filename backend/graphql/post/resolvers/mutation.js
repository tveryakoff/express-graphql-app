import {User} from '../../../models/user'
import {Post} from '../../../models/post'
import validator from 'validator'

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

    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl
    })

    const createdPost = await post.save()
    //add post to users' posts

    return {...createdPost._doc, _id: createdPost._id.toString(), createdAt: createdPost.createdAy.toISOString(), updatedAt: createdPost.updatedAt.toISOString()}
  }


}
