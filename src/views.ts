import { Author, Story } from './models';

/**
 * authorsView
 *
 * @returns
 */
export const authorsView = async () => {
  const authors = await Author.findAll({
    include: [
      {
        association: Author.Stories,
        separate: true,
        include: [
          {
            association: Story.Category,
          },
          {
            association: Story.Tags,
          },
        ],
      },
    ],
  });
  return authors;
};

/**
 * authorsView
 *
 * @returns
 */
export const authorsViewRaw = async () => {
  const authors = await Author.findAll({
    include: [
      {
        association: Author.Stories,
        separate: true,
        include: [
          {
            association: Story.Category,
          },
          {
            association: Story.Tags,
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });
  return authors;
};

export const storyView = async (id: number) => {
  const story = await Story.findByPk(id, {
    include: [Story.Author, Story.Category, Story.Tags],
    plain: true,
  });
  return story;
};

export const storiesView = async () => {
  const stories = await Story.findAll({
    include: [Story.Author, Story.Category, Story.Tags],
  });
  return stories;
};

export const storiesViewLogged = async () => {
  const stories = await Story.findAll({
    include: [Story.Author, Story.Category, Story.Tags],
    logging: console.log,
  });
  return stories;
};

export const storView = async () => {
  const stories = await Story.findAll({
    include: [Story.Author, Story.Category, Story.Tags],
  });
  return stories;
};
