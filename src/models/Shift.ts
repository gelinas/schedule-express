import { Association, DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';
import { PostProcessors } from '.';
import { ShiftInterface } from '../types';
import { EngineerModel } from './Engineer';

export class ShiftModel extends Model implements ShiftInterface {
  public readonly id!: number;
  public readonly uuid!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date;

  public startDate!: Date;
  public endDate!: Date;

  public engineerId!: number;

  public engineer!: EngineerModel;

  static Engineer: Association;
}

export const ShiftFactory = (sequelize: Sequelize, postProcessors: PostProcessors) => {
  ShiftModel.init(
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
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      engineerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Engineer',
          key: 'id',
        },
      },
    },
    { sequelize, tableName: 'shifts' },
  );

  postProcessors.associations.push(() => {
    ShiftModel.Engineer = ShiftModel.belongsTo(EngineerModel, {
      as: 'engineer',
    });
  });

  return ShiftModel;
};
