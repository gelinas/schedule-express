import { Sequelize, Model, DataTypes, Association, UUIDV4 } from 'sequelize';
import { EngineerInterface } from '../types';
import { PostProcessors } from '.';
import { ShiftModel } from './Shift';

export class EngineerModel extends Model implements EngineerInterface {
  public readonly id!: number;
  public readonly uuid!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date;

  public name!: string;
  public email!: string;

  public shifts!: ShiftModel[];

  static Shifts: Association;
}

export const EngineerFactory = (sequelize: Sequelize, postProcessors: PostProcessors) => {
  EngineerModel.init(
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
        allowNull: false,
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
    { sequelize, tableName: 'engineers' },
  );

  postProcessors.associations.push(() => {
    EngineerModel.Shifts = EngineerModel.hasMany(ShiftModel, {
      as: 'shifts',
      foreignKey: 'engineerId',
    });
  });

  return EngineerModel;
};
