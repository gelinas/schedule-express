import { EngineerModel } from './models/Engineer';
import { ShiftModel } from './models/Shift';

export interface EngineerInterface {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  uuid: string;

  name: string;
  email: string | null;

  shifts: ShiftModel[];
}

export interface ShiftInterface {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  uuid: string;

  engineerId: number;

  startDate: Date;
  endDate: Date;

  engineer: EngineerModel;
}
