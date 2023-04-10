import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user'

const verifyToken = async (req, res, next) => {
  const token = req.headers['token']
  if (!token || token == undefined) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    req.user = decoded
    const existEmail = await User.findOne({ userName: req.body.userName })
    console.log(existEmail?.token, token)
    if (existEmail?.token === token) {
    } else {
      return res.status(401).send('Please login')
    }
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}
export default verifyToken
