import { TRPCError } from "@trpc/server";

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Sagar Yenkure" },
];

export const getAllUsers = () => users;

export const getUserById = (id: number): User => {
  const user = users.find((user) => user.id === id);
  if (!user) throw new TRPCError({ code: "NOT_FOUND" });
  return user;
};

export const createUser = (name: string): User[] => {
  const newUser: User = { id: users.length + 1, name };
  users.push(newUser);
  return users;
};
