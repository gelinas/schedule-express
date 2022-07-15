import { Sequelize, Model, DataTypes, Association, UUIDV4 } from 'sequelize';
import { AuthorInterface } from '../types';
import { postProcessors } from '.';
import { StoryModel } from './Story';

export class AuthorModel extends Model implements AuthorInterface {
  public readonly id!: number;
  public readonly uuid!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date;

  public name!: string;
  public email!: string;
  public published!: boolean;

  public stories!: StoryModel[];

  static Stories: Association;
}

export const AuthorFactory = (sequelize: Sequelize, postProcessors: postProcessors) => {
  AuthorModel.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { sequelize, tableName: 'authors' },
  );

  postProcessors.associations.push(() => {
    AuthorModel.Stories = StoryModel.hasMany(StoryModel, {
      as: 'stories',
      foreignKey: 'AuthorId',
    });
  });

  return AuthorModel;
};
