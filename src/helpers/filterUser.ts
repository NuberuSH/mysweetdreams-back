import { UserModel } from '../models/user';

export const filterUser = (user: UserModel, filter: string[]) => {
  const filtered = {};

  filter.forEach((field) => {
    filtered[field] = user[field];
  });

  return filtered;
};