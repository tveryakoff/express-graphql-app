import {User} from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtPrivateKeySecret from '../../../constants/jwtPrivateKey'

export default {
  login:async (_, {email, password}) => {
    const user = await User.findOne({email})

    if (!user) {
      const error = new Error ('User not found')
      error.status = 401
      throw error
    }

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) {
      const error = new Error('Password is incorrect')
      error.code = 401
      throw error
    }

    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    }, jwtPrivateKeySecret, {expiresIn: '1h'})

    return {token, userId: user._id.toString()}
  }

}
