const { UserService } = require('../users/users.service');

const { loginSchema } = require('./validation/auth-validation');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // logic of find user
    const existEmail = await UserService.getUserByEmail(email);

    if (!existEmail) {
      return res.status(400).send({
        code: 400,
        message: 'Email or password incorret!',
        data: null,
      });
    }

    /*

    // logic of check password #TODO bu logic o'zgaradi bollar hashing ni o'rganganidan so'ng


    */

    const isTruePassword = await checkPassword(email, password);

    if (!isTruePassword) {
      return res.status(400).send({
        code: 400,
        message: 'Email or password incorret!',
        data: null,
      });
    }

    /* 


      TOKEN GENERATE


     */

    // logic of generate token #TODO bu yerda token yasash ni o'rganish vazifa

    res.status(200).send({
      code: 200,
      message: 'Logged in',
      data: {},
    });
  }
}

module.exports.AuthController = new AuthController();
