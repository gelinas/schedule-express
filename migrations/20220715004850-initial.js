'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      /**
       * stories table
       */
      await queryInterface.createTable('stories', {
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
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        published: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        authorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      }),
      /**
       * authors table
       */
      await queryInterface.createTable('authors', {
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
       * tags table
       */
      await queryInterface.createTable('tags', {
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
       * storytags join table
       */
      await queryInterface.createTable('storytags', {
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
        storyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        tagId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      }),
      /**
       * foreign key constraint story -> author
       */
      await queryInterface.addConstraint('stories', {
        fields: ['authorId'],
        type: 'FOREIGN KEY',
        name: 'FK_story_author',
        references: {
          table: 'authors',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }),
      await queryInterface.addConstraint('storytags', {
        fields: ['tagId'],
        type: 'FOREIGN KEY',
        name: 'FK_storytag_tag',
        references: {
          table: 'tags',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }),
      await queryInterface.addConstraint('storytags', {
        fields: ['storyId'],
        type: 'FOREIGN KEY',
        name: 'FK_storytag_story',
        references: {
          table: 'stories',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint('storytags', 'FK_storytag_story'),
      await queryInterface.removeConstraint('storytags', 'FK_storytag_tag'),
      await queryInterface.removeConstraint('stories', 'FK_story_author'),
      await queryInterface.dropTable('storytags'),
      await queryInterface.dropTable('tags'),
      await queryInterface.dropTable('authors'),
      await queryInterface.dropTable('stories'),
    ]);
  },
};
