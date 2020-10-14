import User from '../db/models/User'

export const findOneByEmail = async (email: string) => await User.findOne({ where: { email } })

const UserService = {
  findOneByEmail
}

export default UserService
