import jwt from 'jsonwebtoken'
import JwtPrivateKeySecret from '../constants/jwtPrivateKey'

const auth = (req, res, next) => {
  const token = req.get('Authorization')?.split?.(' ')?.[1]
  if (!token) {
    req.isAuth = false
    return next()
  }
  try {
    const decodedToken = jwt.verify(token, JwtPrivateKeySecret)
    if (!decodedToken) {
      req.isAuth = false
      return next()
    }

    const {userId} = decodedToken
    req.userId = userId
    req.isAuth = true
    return next()
  } catch (e) {
    next(e)
  }
}

export default auth
