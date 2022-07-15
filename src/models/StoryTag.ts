import { Association, DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';
import { postProcessors } from '.';
import { StoryTagInterface } from '../types';
import { StoryModel } from './Story';
import { TagModel } from './Tag';

export class StoryTagModel extends Model implements StoryTagInterface {
  public id!: number;
  public readonly uuid!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date;

  public storyId!: number;
  public tagId!: number;

  public story!: StoryModel;
  public tag!: TagModel;

  static Story: Association;
  static Tag: Association;
}

export const StoryTagFactory = (sequelize: Sequelize, postProcessors: postProcessors) => {
  StoryTagModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
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
      storyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Story',
          key: 'id',
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Tag',
          key: 'id',
        },
      },
    },
    { sequelize, tableName: 'storytags' },
  );

  postProcessors.associations.push(() => {
    StoryTagModel.Story = StoryTagModel.belongsTo(StoryModel, {
      as: 'story',
    });
    StoryTagModel.Tag = StoryTagModel.belongsTo(TagModel, {
      as: 'tag',
    });
  });

  return StoryTagModel;
};
