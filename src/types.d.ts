import { TagModel } from './models/Tag';

export interface AuthorInterface {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  uuid: string;

  name: string;
  email: string | null;

  // stories: StoryModel[];
}

export interface CategoryInterface {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  uuid: string;

  label: string;

  // stories: StoryModel[];
}

export interface StoryInterface {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  uuid: string;

  title: string;
  body: string;
  published: boolean;

  authorId: number;
  categoryId: number | null;

  // author: AuthorModel;
  // category: CategoryModel;

  tags: TagModel[];
}

export interface StoryTagInterface {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  uuid: string;

  storyId: number;
  tagId: number;
}

export interface TagInterface {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  uuid: string;

  label: string;
}
