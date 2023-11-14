import {Post} from "../../../models/post";

const resolver = {
  post: async (_, {id}) => {
    const post = await Post.findById(id).populate('creator')
    if (!post) {
      return {}
    }

    return {
      ...post._doc,
      id: post.id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }
  },
  posts: async (_, {page}) => {
    const perPage = 2
    const currentPage = page || 1
    const count = await Post.find().countDocuments()
    const posts = await Post.find().skip((currentPage-1) * perPage).limit(perPage).sort({createdAt: -1}).populate('creator')

    return {
      posts: posts.map(p => ({...p._doc, _id: p._id.toString(), createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString()})),
      count
    }
  }
}

export default resolver
