import { QueryInterface } from "sequelize";
module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        room_category_id INTEGER,
        hotel_id INTEGER NOT NULL,
        room_number INTEGER NOT NULL,
        date_of_availability DATE NOT NULL,
        booking_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
      );
    `);
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS rooms;
    `);
  }
};
