"use strict";
import { Model, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  authenticate: (password: string, hash: string) => boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User
    extends Model<Omit<UserAttributes, "authenticate">>
    implements UserAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    authenticate!: (password: string, hash: string) => boolean;
    id!: string;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: "ProjectAssignment",
      });
    }
  }

  User.prototype.authenticate = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  };

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: (user) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeBulkCreate: (users) => {
          users.forEach((user) => {
            if (user.password) {
              const salt = bcrypt.genSaltSync(10, "a");
              user.password = bcrypt.hashSync(user.password, salt);
            }
          });
        },
      },
      // getterMethods: {
      //   authenticate: (password: string) => {
      //     return bcrypt.compareSync(password, this.password);
      //   },
      // },
    }
  );
  // User.prototype.authenticate = (password: string, hash: string) => {
  //   return bcrypt.compareSync(password, this.password);
  // };
  return User;
};
