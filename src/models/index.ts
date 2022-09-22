import { AuthorFactory } from './Author';
import { CategoryFactory } from './Category';
import { StoryFactory } from './Story';
import { StoryTagFactory } from './StoryTag';
import { TagFactory } from './Tag';
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
export const Author = AuthorFactory(sequelize, postProcessors);
export const Category = CategoryFactory(sequelize, postProcessors);
export const Story = StoryFactory(sequelize, postProcessors);
export const StoryTag = StoryTagFactory(sequelize, postProcessors);
export const Tag = TagFactory(sequelize, postProcessors);

// associate models
postProcessors.associations.forEach((association) => {
  association();
});

// register hooks
postProcessors.hooks.forEach((hook) => {
  hook();
});
