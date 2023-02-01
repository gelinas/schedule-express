import { Engineer, Shift } from './models';

/**
 * engineersView
 *
 * @returns
 */
export const engineersView = async () => {
  const engineers = await Engineer.findAll({
    include: [
      {
        association: Engineer.Shifts,
        separate: true,
      },
    ],
  });
  return engineers;
};

/**
 * engineersView
 *
 * @returns
 */
export const engineersViewRaw = async () => {
  const engineers = await Engineer.findAll({
    include: [
      {
        association: Engineer.Shifts,
        separate: true,
      },
    ],
    raw: true,
    nest: true,
  });
  return engineers;
};

export const shiftView = async (id: number) => {
  const shift = await Shift.findByPk(id, {
    include: [Shift.Engineer],
    plain: true,
  });
  return shift;
};

export const shiftsView = async () => {
  const shifts = await Shift.findAll({
    include: [Shift.Engineer],
  });
  return shifts;
};

export const shiftsViewLogged = async () => {
  const shifts = await Shift.findAll({
    include: [Shift.Engineer],
    logging: console.log,
  });
  return shifts;
};
