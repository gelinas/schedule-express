import { Sequelize, Model, DataTypes, UUIDV4 } from 'sequelize';
import { TagInterface } from '../types';
import { PostProcessors } from '.';
import { sanitizeTags } from '../utils';

export class TagModel extends Model implements TagInterface {
  public readonly id!: number;
  public readonly uuid!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date;

  public label!: string;
}

export const TagFactory = (sequelize: Sequelize, postProcessors: PostProcessors) => {
  TagModel.init(
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
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'tags' },
  );

  postProcessors.hooks.push(() => {
    TagModel.beforeCreate((tag) => {
      tag.label = sanitizeTags(tag.label);
    });
    TagModel.beforeUpdate((tag) => {
      tag.label = sanitizeTags(tag.label);
    });
    TagModel.beforeSave((tag) => {
      tag.label = sanitizeTags(tag.label);
    });
  });

  return TagModel;
};
