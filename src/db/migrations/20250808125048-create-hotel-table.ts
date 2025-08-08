import { QueryInterface } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface) {
    // await queryInterface.createTable('hotels', {
    //   id: {
    //     type: 'INTEGER',
    //     autoIncrement: true,
    //     primaryKey: true,
    //     allowNull: false
    //   },
    //   name: {
    //     type: 'VARCHAR(255)',
    //     allowNull: false
    //   },
    //   address: {
    //     type: 'VARCHAR(255)',
    //     allowNull: false
    //   }
    // });
    // If you want to create using raw SQL
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS hotels;
    `);
  },
};
