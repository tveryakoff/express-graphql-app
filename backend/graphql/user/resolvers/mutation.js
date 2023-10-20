import validator from "validator";
import {User} from "../../../models/user";
import bcrypt from "bcryptjs";

export default {
  createUser: async function(_, {userInput}) {
    const errors = []
    if (!validator.isEmail(userInput.email)) {
      errors.push({email: 'email is invalid'})
    }
    if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 3})) {
      errors.push({password: 'password is too short'})
    }

    if (errors.length > 0) {
      const error = new Error('invalid input')
      error.fields = errors
      error.status = 400
      throw error
    }
    const existingUser = await User.findOne({email: userInput?.email})
    if (existingUser) {
      throw new Error('User exists already')
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12)
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    })
    const result = await user.save()
    return {...result._doc, _id: result._id.toString()}
  },
}
