import { Association, DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';
import { postProcessors } from '.';
import { StoryInterface } from '../types';
import { AuthorModel } from './Author';
import { CategoryModel } from './Category';
import { TagModel } from './Tag';

export class StoryModel extends Model implements StoryInterface {
  public readonly id!: number;
  public readonly uuid!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date;

  public title!: string;
  public body!: string;
  public published!: boolean;

  public authorId!: number;
  public categoryId!: number | null;

  public author!: AuthorModel;
  public category!: CategoryModel;
  public tags!: TagModel[];

  static Author: Association;
  static Category: Association;
  static Tags: Association;
}

export const StoryFactory = (sequelize: Sequelize, postProcessors: postProcessors) => {
  StoryModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Author',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    { sequelize, tableName: 'stories' },
  );

  postProcessors.associations.push(() => {
    StoryModel.Author = StoryModel.belongsTo(AuthorModel, {
      as: 'author',
    });
    StoryModel.Category = StoryModel.belongsTo(CategoryModel, {
      as: 'category',
    });
    StoryModel.Tags = StoryModel.belongsToMany(TagModel, {
      as: 'tags',
      through: 'storyTags',
      foreignKey: 'storyId',
      otherKey: 'tagId',
    });
  });

  return StoryModel;
};
