const CrudDAO = require('./crudDAO');
const UserModel = require('../models/userModel');


class UserDAO extends CrudDAO {
  constructor() {
    super(UserModel, '_id');
  }
}

module.exports = UserDAO;
