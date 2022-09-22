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

export const storiesView = async () => {
  const stories = await Story.findAll({
    include: [Story.Author, Story.Category, Story.Tags],
  });
  return stories;
};

export const storView = async () => {
  const stories = await Story.findAll({
    include: [Story.Author, Story.Category, Story.Tags],
  });
  return stories;
};
