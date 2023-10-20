import {Post} from "../../../models/post";

const resolver = {
  posts: async () => {
    const count = await Post.find().countDocuments()
    const posts = await Post.find().sort({createdAt: -1}).populate('creator')

    return {
      posts: posts.map(p => ({...p._doc, _id: p._id.toString(), createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString()})),
      count
    }
  }
}

export default resolver
