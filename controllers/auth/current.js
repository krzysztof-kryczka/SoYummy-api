import { currentUser } from '../../services/auth.service.js'
import { ApiError } from '../../utils/errors/ApiError.js'

export const current = async (req, res, next) => {
  try {
    const id = req.user.id
    const loggedUser = await currentUser(id)
    
    // Current user unauthorized error
    if (!loggedUser) {
      return next(ApiError.unauthorized(loggedUser.error))
    }

    const {email, subscription} = loggedUser.user

    // Current user success response
    return res.status(200).json({
      code: 200,
      status: `OK`,
      ResponseBody: {
        email: email,
        subscription: subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}
