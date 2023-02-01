'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      /**
       * shifts table
       */
      await queryInterface.createTable('shifts', {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        engineerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      }),
      /**
       * engineers table
       */
      await queryInterface.createTable('engineers', {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      }),
      /**
       * foreign key constraint shift -> engineer
       */
      await queryInterface.addConstraint('shifts', {
        fields: ['engineerId'],
        type: 'FOREIGN KEY',
        name: 'FK_shift_engineer',
        references: {
          table: 'engineers',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }),
      await queryInterface.bulkInsert('engineers', [
        // five engineers, Andy, Louis, Scott, James, and Nate
        {
          name: 'Andy',
          email: 'andy@rivet.work',
          uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Louis',
          email: 'louis@rivet.work',
          uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6q',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scott',
          email: 'scott@rivet.work',
          uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6r',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'James',
          email: 'james@rivet.work',
          uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6s',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Nate',
          email: 'nate@rivet.work',
          uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6t',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint('shifts', 'FK_shift_engineer'),
      await queryInterface.dropTable('engineers'),
      await queryInterface.dropTable('shifts'),
    ]);
  },
};
