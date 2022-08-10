const UserModel = require('../../Models/User');

class UserService {
  async createUser(username, email, password, role) {
    const user = new UserModel({
      username,
      email,
      password,
      role,
    });

    const savedUser = await user.save();

    savedUser.password = null;

    return savedUser;
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

module.exports.UserService = new UserService();
