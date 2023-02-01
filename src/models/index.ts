import { EngineerFactory } from './Engineer';
import { ShiftFactory } from './Shift';
import { sequelize } from '../conn';

export interface PostProcessors {
  associations: Array<() => void>;
  hooks: Array<() => void>;
}

const postProcessors: PostProcessors = {
  associations: [],
  hooks: [],
};

// initialize models
export const Engineer = EngineerFactory(sequelize, postProcessors);
export const Shift = ShiftFactory(sequelize, postProcessors);

// associate models
postProcessors.associations.forEach((association) => {
  association();
});

// register hooks
postProcessors.hooks.forEach((hook) => {
  hook();
});
