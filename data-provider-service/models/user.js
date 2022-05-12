"use strict";
const { Model, where } = require("sequelize");
const bcrypt = require("bcrypt");
const { values } = require("d3");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
    static async createUser(username, password, role) {
      if (!role) {
        role = "Read-only";
      }

      var err = false;
      const salt = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(password, salt);
      await User.build({
        username: username,
        password: encryptedPassword,
        role: role,
      })
        .save()
        .catch((reason) => {
          // console.log(reason.name);
          err = reason.name;
        });

      return err;
    }

    static async getAllUser(username, password) {
      return User.findAll();
    }

    static async getUser(username, password) {
      return User.findOne({ where: { username: username } });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
