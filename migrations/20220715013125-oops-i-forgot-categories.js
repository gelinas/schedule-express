'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      /**
       * stories table
       */
      await queryInterface.createTable('categories', {
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
        label: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }),
      /**
       * update stories table
       * - add categoryId column
       */
      await queryInterface.addColumn('stories', 'categoryId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      /**
       * foreign key constraint story -> author
       */
      await queryInterface.addConstraint('stories', {
        fields: ['categoryId'],
        type: 'FOREIGN KEY',
        name: 'FK_story_category',
        references: {
          table: 'categories',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint('stories', 'FK_story_category'),
      await queryInterface.removeColumn('stories', 'categoryId'),
      await queryInterface.dropTable('categories'),
    ]);
  },
};
