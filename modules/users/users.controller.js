const { UserService } = require('./users.service');

const { createUserSchema } = require('./validation/users-validation');

class UserController {
  async createUser(req, res) {
    const { username, email, password, role } = req.body;

    const { error } = createUserSchema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    // logic of check unique email
    const existEmail = await UserService.getUserByEmail(email);

    if (existEmail) {
      return res.status(400).send({
        code: 400,
        message: 'Email is exists',
        data: null,
      });
    }

    /*
    
    
    // logic of hashing password #TODO bollarga o'rganishni vazifa qilib beraman
    
    
    */

    // logic of create user
    const user = await UserService.createUser(username, email, password, role);

    res.status(201).send({
      code: 201,
      message: 'Created user',
      data: user,
    });
  }

  async getUsers(req, res) {}
}

module.exports.UserController = new UserController();
