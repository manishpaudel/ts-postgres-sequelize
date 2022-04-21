"use strict";

const { v4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: v4(),
        name: "Manish",
        email: "manish@gmail.com",
        password: "asdf1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

// export default {
//   up: async (queryInterface, Sequelize) => {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//      */
//     return await queryInterface.bulkInsert("Users", [
//       {
//         name: "Manish",
//         email: "manish@gmail.com",
//         password: "asdf1234",
//       },
//     ]);
//   },
//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     return queryInterface.bulkDelete("Users", null, {});
//   },
// };
